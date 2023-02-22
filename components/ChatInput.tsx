'use client';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { FormEvent, useState } from 'react';
import { toast } from 'react-hot-toast';
import useSWR from 'swr';
import { db } from '../firebase';
import ModelSelection from './ModelSelection';

interface Props {
  chatId: string;
}

const AVATAR_URL = 'https://ui-avatar.com/api';

export default function ChatInput({ chatId }: Props) {
  const [prompt, setPrompt] = useState('');
  const { data: session } = useSession();
  const { data: model } = useSWR('model', {
    fallbackData: 'text-davinci-003',
  });

  async function handleSendMessage(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!prompt) return;

    const input = prompt.trim();
    setPrompt('');

    const message: Message = {
      text: input,
      createdAt: serverTimestamp(),
      user: {
        _id: session?.user?.email!,
        name: session?.user?.name!,
        avatar:
          session?.user?.image || `${AVATAR_URL}/?name=${session?.user?.name}`,
      },
    };

    await addDoc(
      collection(
        db,
        'users',
        session?.user?.email!,
        'chats',
        chatId,
        'messages'
      ),
      message
    );

    const notification = toast.loading('ChatGPT is thinking...');

    try {
      const res = await fetch('/api/askQuestion', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          prompt: input,
          chatId,
          model,
          session,
        }),
      });
      await res.json();
      toast.success('ChatGPT has responded!', { id: notification });
    } catch (error) {
      toast.error(
        `ChatGPT didn't find an answer, but he'll look into it and maybe he'll be able to answer in the future`,
        { id: notification }
      );
    }
  }

  return (
    <div className="bg-gray-700/50 text-white rounded-lg text-sm">
      <form
        onSubmit={handleSendMessage}
        action=""
        className="flex p-5 space-x-5"
      >
        <input
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          type="text"
          placeholder="Type your message here..."
          className="flex-1 bg-transparent focus:outline-none disabled:cursor-not-allowed disabled:text-gray-300"
        />

        <button
          disabled={!prompt || !session}
          type="submit"
          className="bg-loginBackground hover:opacity-50 cursor-pointer text-white font-bold px-4 py-2 rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          <PaperAirplaneIcon className="h-4 w-4 -rotate-45" />
        </button>
      </form>

      <div className="sm:hidden">
        <ModelSelection />
      </div>
    </div>
  );
}
