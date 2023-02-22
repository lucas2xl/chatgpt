'use client';
import { signIn } from 'next-auth/react';
import Image from 'next/image';

export default function Login() {
  function handleSignIn() {
    signIn('google');
  }

  return (
    <div className="bg-loginBackground h-screen flex flex-col items-center justify-center text-center">
      <Image
        src="https://links.papareact.com/2i6"
        height={300}
        width={300}
        alt="Logo"
      />
      <button
        onClick={handleSignIn}
        className="text-white font-bold text-3xl animate-pulse cursor-pointer p-2 rounded hover:bg-zinc-600"
      >
        Sign In to use ChatGPT
      </button>
    </div>
  );
}
