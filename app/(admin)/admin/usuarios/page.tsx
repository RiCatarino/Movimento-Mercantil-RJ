'use client';

import BotaoNovoUsuario from './_components/buttonnew';

export default function UserPage() {
  return (
    <main className='flex flex-col p-4 mt-5 border-2 border-gray-300 border-solid shadow-lg  gap-2 rounded-3xl md:mx-24'>
      <BotaoNovoUsuario />
    </main>
  );
}
