import { ChatBubbleLeftIcon, TrashIcon } from '@heroicons/react/24/outline';
import { collection, deleteDoc, doc, orderBy, query } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../firebase';

interface Props {
  id: string;
}
export default function ChatRow({ id }: Props) {
  const pathName = usePathname();
  const route = useRouter();
  const { data: session } = useSession();
  const active = useMemo(() => pathName?.includes(id), [pathName]);

  const [messages] = useCollection(
    session &&
      query(
        collection(db, 'users', session.user?.email!, 'chats', id, 'messages'),
        orderBy('createdAt', 'asc')
      )
  );

  async function handleRemoveChat() {
    await deleteDoc(doc(db, 'users', session?.user?.email!, 'chats', id));
    route.replace('/');
  }

  return (
    <Link
      href={`/chat/${id}`}
      className={`chatRow justify-center mt-2 ${active && 'bg-gray-700'}`}
    >
      <ChatBubbleLeftIcon className="h-5 w-5" />
      <p className="flex-1 hidden md:inline-flex truncate">
        {messages?.docs[0]?.data().text || 'New Chat'}
      </p>
      <TrashIcon
        onClick={handleRemoveChat}
        className="h-5 w-5 text-gray-300 hover:text-red-700"
      />
    </Link>
  );
}
