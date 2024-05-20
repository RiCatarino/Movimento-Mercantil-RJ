'use client';

import Loader from '@/components/loader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Turnstile, { useTurnstile } from 'react-turnstile';

export default function SignInPage() {
  const [useremail, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState('');
  const turnstile = useTurnstile();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      return;
    }
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
        toast({
          title: 'Erro',
          variant: 'destructive',
          description: 'Email ou senha incorretos',
          duration: 5000,
        });
        return;
      }

      router.push('/admin/dashboard');
    } catch (error) {
      console.error(error);
      turnstile.reset();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex flex-col h-screen lg:flex-row'>
      <div className='flex items-center justify-center w-full h-1/2 lg:h-auto '>
        <Image
          src='/logo.webp'
          alt='Sign In'
          width={500}
          height={500}
          style={{ filter: 'sepia(100%) hue-rotate(190deg) saturate(500%)' }}
          className='w-1/2'
        />
      </div>
      <div className='flex flex-col items-center justify-center w-full gap-4 bg-blue-400 h-1/2 lg:h-auto '>
        <h1 className='text-4xl font-bold text-center text-white '>
          Entrar no
          <br />
          <span className='font-extrabold text-white '>Backoffice</span>
        </h1>
        <form
          onSubmit={handleSubmit}
          className='flex flex-col items-center w-full gap-4'
        >
          <Input
            name='useremail'
            type='email'
            placeholder='Email'
            className='rounded-xl w-[50%]'
            value={useremail}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            name='password'
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
          <Turnstile
            sitekey='0x4AAAAAAAaieK38rD9jtI_y'
            onVerify={(token) => setToken(token)}
          />
        </form>
      </div>
    </div>
  );
}
