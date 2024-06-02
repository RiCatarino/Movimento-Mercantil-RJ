'use client';

import { WobbleCard } from '@/components/ui/wobblecard';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function DataPage() {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full mt-10 p-4'>
      <Link
        className='col-span-1 lg:col-span-2 h-full bg-pink-800 min-h-[200px] lg:min-h-[300px] rounded-2xl bg-transparent'
        href='/dados/embarcacoes'
      >
        <WobbleCard containerClassName=' h-full bg-pink-800 min-h-[200px] lg:min-h-[300px]'>
          <h2 className='text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white'>
            Embarcações
          </h2>
          <p className='max-w-sm mt-4 text-left  text-base/6 text-neutral-200'>
            Descubra detalhes sobre os navios mercantes que navegaram pelo Rio
            de Janeiro entre 1808 e 1830.
          </p>
          <Image
            src='/Caravela.webp'
            width={600}
            height={500}
            alt='linear demo image'
            className='absolute collapse md:visible -right-4 md:-right-[40%] -bottom-80 object-contain rounded-2xl'
          />
        </WobbleCard>
      </Link>
      <Link
        className='col-span-1 min-h-[200px] rounded-2xl bg-transparent'
        href='/dados/pessoas'
      >
        <WobbleCard containerClassName='h-full col-span-1 min-h-[200px]'>
          <h2 className='max-w-80  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white'>
            Pessoas
          </h2>
          <p className='mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200'>
            Conheça as figuras importantes do movimento marítimo mercantil da
            época.
          </p>
        </WobbleCard>
      </Link>
      <Link
        className='col-span-1 lg:col-span-3 bg-blue-900 min-h-[200px] md:min-h-[300px] lg:min-h-[300px] xl:min-h-[300px] radius-2xl bg-transparent'
        href='/dados/viagens'
      >
        <WobbleCard containerClassName='h-full bg-blue-900 min-h-[200px] md:min-h-[300px] lg:min-h-[300px] xl:min-h-[300px]'>
          <div className='max-w-sm'>
            <h2 className='max-w-sm md:max-w-lg  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white'>
              Viagens
            </h2>
            <p className='mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200'>
              Explore as rotas comerciais e as viagens realizadas entre 1808 e
              1830.
            </p>
          </div>
          <Image
            src='/viagens.webp'
            width={500}
            height={500}
            alt='linear demo image'
            className='absolute collapse md:visible  -right-10 md:-right-[20%] lg:-right-[0%] -bottom-10 object-contain rounded-2xl'
          />
        </WobbleCard>
      </Link>
    </div>
  );
}
