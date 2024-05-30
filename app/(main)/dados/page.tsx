'use client';

import { WobbleCard } from '@/components/ui/wobblecard';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function DataPage() {
  return (
    // <main
    //   // style={{ backgroundColor: "green" }}
    //   className="flex flex-col min-h-full overflow-visible"
    // >
    // <div className='py-24 md:px-28'>
    //   <div className='w-full p-6 grid md:mx-auto lg:p-0 lg:w-10/12 sm:grid-cols-1 md:grid-cols-3 '>
    //     <Link href='/registry/embarcacoes'>
    //       <div className='relative m-2 mb-10 bg-white shadow-lg rounded-xl'>
    //         <div className='relative w-auto h-full overflow-hidden cursor-pointer rounded-xl group '>
    //           <div className='absolute z-30 text-4xl text-white md:text-3xl -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'>
    //             <p className='font-extrabold text-white '>Embarcações</p>
    //           </div>

    //           <div className='absolute inset-x-0 z-50 flex items-end text-white opacity-0 cursor-pointer transition duration-300 ease-in-out rounded-xl group-hover:opacity-100 from-primarypurple to-transparent bg-gradient-to-t -bottom-2 pt-60'>
    //             <div className='w-full'>
    //               <div className='justify-end p-4 pb-10 text-lg space-y-3 transition duration-300 ease-in-out transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0'>
    //                 <div className='text-right uppercase '>
    //                   Aceda a todas a toda a informação sobre as embarcações
    //                 </div>
    //               </div>
    //             </div>
    //           </div>

    //           <img
    //             alt=''
    //             className='object-cover object-bottom transition duration-300 ease-in-out contrast-50 blur-sm group-hover:scale-110'
    //             src='Caravela.webp'
    //           />
    //         </div>
    //       </div>
    //     </Link>
    //     {/* VIAGENS */}
    //     <Link href='/registry/viagens'>
    //       <div className='relative m-2 mb-10 bg-white shadow-lg rounded-xl'>
    //         <div className='relative w-auto h-full overflow-hidden cursor-pointer rounded-xl group '>
    //           <div className='absolute z-30 text-4xl text-white md:text-3xl -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'>
    //             <p className='font-extrabold text-white '>Viagens</p>
    //           </div>

    //           <div className='absolute inset-x-0 z-50 flex items-end text-white opacity-0 cursor-pointer transition duration-300 ease-in-out rounded-xl group-hover:opacity-100 from-primarypurple to-transparent bg-gradient-to-t -bottom-2 pt-60'>
    //             <div className='w-full'>
    //               <div className='justify-end p-4 pb-10 text-lg space-y-3 transition duration-300 ease-in-out transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0'>
    //                 <div className='text-right uppercase '>
    //                   Aceda a todas a toda a informação sobre as viagens
    //                 </div>
    //               </div>
    //             </div>
    //           </div>

    //           <img
    //             alt=''
    //             className='object-cover object-bottom transition duration-300 ease-in-out contrast-50 blur-sm group-hover:scale-110'
    //             src='viagens.webp'
    //           />
    //         </div>
    //       </div>
    //     </Link>
    //     {/* PESSOAS */}
    //     <Link href='/registry/pessoas'>
    //       <div className='relative m-2 mb-10 bg-white shadow-lg rounded-xl'>
    //         <div className='relative w-auto h-full overflow-hidden cursor-pointer rounded-xl group '>
    //           <div className='absolute z-30 text-4xl text-white md:text-3xl -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'>
    //             <p className='font-extrabold text-white '>Pessoas</p>
    //           </div>

    //           <div className='absolute inset-x-0 z-50 flex items-end text-white opacity-0 cursor-pointer transition duration-300 ease-in-out rounded-xl group-hover:opacity-100 from-primarypurple to-transparent bg-gradient-to-t -bottom-2 pt-60'>
    //             <div className='w-full'>
    //               <div className='justify-end p-4 pb-10 text-lg space-y-3 transition duration-300 ease-in-out transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0'>
    //                 <div className='text-right uppercase '>
    //                   Aceda a todas a toda a informação sobre as pessoas
    //                 </div>
    //               </div>
    //             </div>
    //           </div>

    //           <img
    //             alt=''
    //             className='object-cover object-bottom transition duration-300 ease-in-out contrast-50 blur-sm group-hover:scale-110'
    //             src='pessoas.webp'
    //           />
    //         </div>
    //       </div>
    //     </Link>

    // </div>
    // </div>
    // </main>
    <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full mt-10'>
      <Link
        className='col-span-1 lg:col-span-2 h-full bg-pink-800 min-h-[500px] lg:min-h-[300px] rounded-2xl bg-transparent'
        href='/dados/embarcacoes'
      >
        <WobbleCard containerClassName=' h-full bg-pink-800 min-h-[500px] lg:min-h-[300px]'>
          <h2 className='text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white'>
            Embarcações
          </h2>
          <p className='mt-4 text-left  text-base/6 text-neutral-200'>
            Descubra detalhes sobre os navios mercantes que navegaram pelo Rio
            de Janeiro entre 1808 e 1830.
          </p>
          <Image
            src='/Caravela.webp'
            width={600}
            height={500}
            alt='linear demo image'
            className='absolute -right-4 lg:-right-[30%]   -bottom-40 object-contain rounded-2xl'
          />
        </WobbleCard>
      </Link>
      <Link
        className='col-span-1 min-h-[300px] rounded-2xl bg-transparent'
        href='/dados/pessoas'
      >
        <WobbleCard containerClassName='h-full col-span-1 min-h-[300px]'>
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
        className='col-span-1 lg:col-span-3 bg-blue-900 min-h-[500px] lg:min-h-[600px] xl:min-h-[300px] radius-2xl bg-transparent'
        href='/dados/viagens'
      >
        <WobbleCard containerClassName='h-full bg-blue-900 min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]'>
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
            className='absolute -right-10 md:-right-[40%] lg:-right-[0%] -bottom-10 object-contain rounded-2xl'
          />
        </WobbleCard>
      </Link>
    </div>
  );
}
