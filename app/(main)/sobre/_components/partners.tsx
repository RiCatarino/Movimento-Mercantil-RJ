'use client';
import Image from 'next/image';
import React from 'react';

export function Partners() {
  return (
    <div className='flex flex-col items-center justify-center w-full gap-8 mb-10 overflow-x-hidden lg:flex-row'>
      <div className='flex flex-row gap-8 '>
        <Image
          src='/partners/unifesp.png'
          alt='UNIFESP'
          width={100}
          height={100}
          // style={{ filter: 'sepia(100%) hue-rotate(190deg) saturate(500%)' }}
          // className='w-1/2'
        />
        <Image
          src='/logocircuitosoceanicos.png'
          alt='Circuitos Oceanicos'
          width={60}
          height={50}
          // style={{ filter: 'sepia(100%) hue-rotate(190deg) saturate(500%)' }}
          // className='w-1/2'
        />
        <Image
          src='/partners/ual.png'
          alt='UNIFESP'
          width={100}
          height={100}
          // style={{ filter: 'sepia(100%) hue-rotate(190deg) saturate(500%)' }}
          // className='w-1/2'
        />
      </div>
      <div className='flex flex-row gap-8'>
        <Image
          src='/partners/ufg.png'
          alt='UNIFESP'
          width={60}
          height={60}
          // style={{ filter: 'sepia(100%) hue-rotate(190deg) saturate(500%)' }}
          // className='w-1/2'
        />
        <Image
          src='/partners/ESNIDH.png'
          alt='UNIFESP'
          width={90}
          height={60}
          // style={{ filter: 'sepia(100%) hue-rotate(190deg) saturate(500%)' }}
          // className='w-1/2'
        />
      </div>
      <Image
        src='/partners/fapesp.gif'
        alt='FAPESP'
        width={140}
        height={60}
        // className='w-1/3'

        // style={{ filter: 'sepia(100%) hue-rotate(190deg) saturate(500%)' }}
        // className='w-1/2'
      />
    </div>
  );
}
