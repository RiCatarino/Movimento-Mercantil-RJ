'use client';

import Loader from '@/components/loader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SignInPage() {
  const [useremail, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/user/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ useremail, password }),
      });

      if (!response.ok) {
        throw new Error('Invalid email or password');
      }

      router.push('/admin/dashboard');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex flex-row h-screen'>
      <div className='flex items-center justify-center w-full'>
        <Image
          src='/logo.webp'
          alt='Sign In'
          width={500}
          height={500}
          style={{ filter: 'sepia(100%) hue-rotate(190deg) saturate(500%)' }}
        />
      </div>
      <div className='flex flex-col items-center justify-center w-full bg-blue-400 gap-4'>
        <h1 className=' text-4xl text-white font-extrabold'>
          Entrar no backoffice
        </h1>
        <form
          onSubmit={handleSubmit}
          className='flex flex-col gap-4 w-full items-center'
        >
          <Input
            type='email'
            placeholder='Email'
            className='rounded-xl w-[50%]'
            value={useremail}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type='password'
            placeholder='Senha'
            className='rounded-xl w-[50%]'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type='submit'
            className='shadow-[0_4px_14px_0_rgb(0,118,255,39%)] hover:shadow-[0_6px_20px_rgba(0,118,255,23%)] hover:bg-[rgba(0,118,255,0.9)] px-8 py-2 bg-[#0070f3] rounded-2xl text-white font-light transition duration-200 ease-linear w-[50%] font-bold'
          >
            {loading && <Loader classProp='ml-2 w-6 h-6' />}
            {loading ? 'Entrando...' : 'Entrar'}
          </Button>
        </form>
      </div>
    </div>
  );
}
