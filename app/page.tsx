'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import React from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Image from 'next/image';

const World = dynamic(
  () => import('@/components/ui/globe').then((m) => m.World),
  {
    ssr: false,
  }
);

export function GlobeDemo() {
  const globeConfig = {
    pointSize: 4,
    globeColor: '#062056',
    showAtmosphere: true,
    atmosphereColor: '#FFFFFF',
    atmosphereAltitude: 0.1,
    emissive: '#062056',
    emissiveIntensity: 0.1,
    shininess: 0.9,
    polygonColor: 'rgba(255,255,255,0.7)',
    ambientLight: '#38bdf8',
    directionalLeftLight: '#ffffff',
    directionalTopLight: '#ffffff',
    pointLight: '#ffffff',
    arcTime: 1000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    initialPosition: { lat: 22.3193, lng: 114.1694 },
    autoRotate: true,
    autoRotateSpeed: 0.5,
  };
  const colors = ['#06b6d4', '#3b82f6', '#6366f1'];
  const sampleArcs = [
    {
      order: 1,
      startLat: -22.908333,
      startLng: -43.196388,
      endLat: -22.9068,
      endLng: -43.1729,
      arcAlt: 0.1,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 1,
      startLat: -22.908333,
      startLng: -43.196388,
      endLat: 3.139,
      endLng: 101.6869,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 1,
      startLat: -22.908333,
      startLng: -43.196388,
      endLat: -1.303396,
      endLng: 36.852443,
      arcAlt: 0.5,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 2,
      startLat: -22.908333,
      startLng: -43.196388,
      endLat: 35.6762,
      endLng: 139.6503,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 2,
      startLat: -22.908333,
      startLng: -43.196388,
      endLat: 3.139,
      endLng: 101.6869,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 2,
      startLat: -22.908333,
      startLng: -43.196388,
      endLat: 36.162809,
      endLng: -115.119411,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 3,
      startLat: -22.908333,
      startLng: -43.196388,
      endLat: 22.3193,
      endLng: 114.1694,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 3,
      startLat: -22.908333,
      startLng: -43.196388,
      endLat: 40.7128,
      endLng: -74.006,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 3,
      startLat: -22.908333,
      startLng: -43.196388,
      endLat: 51.5072,
      endLng: -0.1276,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 4,
      startLat: -22.908333,
      startLng: -43.196388,
      endLat: -15.595412,
      endLng: -56.05918,
      arcAlt: 0.5,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 4,
      startLat: -22.908333,
      startLng: -43.196388,
      endLat: 22.3193,
      endLng: 114.1694,
      arcAlt: 0.7,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 4,
      startLat: -22.908333,
      startLng: -43.196388,
      endLat: 48.8566,
      endLng: -2.3522,
      arcAlt: 0.1,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 5,
      startLat: -22.908333,
      startLng: -43.196388,
      endLat: 51.5072,
      endLng: -0.1276,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 5,
      startLat: -22.908333,
      startLng: -43.196388,
      endLat: -33.8688,
      endLng: 151.2093,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 5,
      startLat: -22.908333,
      startLng: -43.196388,
      endLat: 48.8566,
      endLng: -2.3522,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 6,
      startLat: -22.908333,
      startLng: -43.196388,
      endLat: 1.094136,
      endLng: -63.34546,
      arcAlt: 0.7,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 6,
      startLat: -22.908333,
      startLng: -43.196388,
      endLat: 35.6762,
      endLng: 139.6503,
      arcAlt: 0.1,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 6,
      startLat: -22.908333,
      startLng: -43.196388,
      endLat: 51.5072,
      endLng: -0.1276,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 7,
      startLat: -22.908333,
      startLng: -43.196388,
      endLat: -15.595412,
      endLng: -56.05918,
      arcAlt: 0.1,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 7,
      startLat: -22.908333,
      startLng: -43.196388,
      endLat: 52.52,
      endLng: 13.405,
      arcAlt: 0.1,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 7,
      startLat: -22.908333,
      startLng: -43.196388,
      endLat: 34.0522,
      endLng: -118.2437,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 8,
      startLat: -22.908333,
      startLng: -43.196388,
      endLat: -33.936138,
      endLng: 18.436529,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 8,
      startLat: -22.908333,
      startLng: -43.196388,
      endLat: 52.3676,
      endLng: 4.9041,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 8,
      startLat: -22.908333,
      startLng: -43.196388,
      endLat: 40.7128,
      endLng: -74.006,
      arcAlt: 0.5,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 9,
      startLat: -22.908333,
      startLng: -43.196388,
      endLat: 34.0522,
      endLng: -118.2437,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 9,
      startLat: -22.908333,
      startLng: -43.196388,
      endLat: -22.9068,
      endLng: -43.1729,
      arcAlt: 0.7,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 9,
      startLat: -22.908333,
      startLng: -43.196388,
      endLat: -34.6037,
      endLng: -58.3816,
      arcAlt: 0.5,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 10,
      startLat: -22.908333,
      startLng: -43.196388,
      endLat: 28.6139,
      endLng: 77.209,
      arcAlt: 0.7,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 10,
      startLat: -22.908333,
      startLng: -43.196388,
      endLat: 31.2304,
      endLng: 121.4737,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 10,
      startLat: -22.908333,
      startLng: -43.196388,
      endLat: 52.3676,
      endLng: 4.9041,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 11,
      startLat: -22.908333,
      startLng: -43.196388,
      endLat: 34.0522,
      endLng: -118.2437,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 11,
      startLat: -22.908333,
      startLng: -43.196388,
      endLat: 31.2304,
      endLng: 121.4737,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 11,
      startLat: -22.908333,
      startLng: -43.196388,
      endLat: 1.3521,
      endLng: 103.8198,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 12,
      startLat: -22.908333,
      startLng: -43.196388,
      endLat: 37.7749,
      endLng: -122.4194,
      arcAlt: 0.1,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 12,
      startLat: -22.908333,
      startLng: -43.196388,
      endLat: 22.3193,
      endLng: 114.1694,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 12,
      startLat: -22.908333,
      startLng: -43.196388,
      endLat: 34.0522,
      endLng: -118.2437,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 13,
      startLat: -22.908333,
      startLng: -43.196388,
      endLat: 22.3193,
      endLng: 114.1694,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 13,
      startLat: -22.908333,
      startLng: -43.196388,
      endLat: 35.6762,
      endLng: 139.6503,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 13,
      startLat: -22.908333,
      startLng: -43.196388,
      endLat: -34.6037,
      endLng: -58.3816,
      arcAlt: 0.1,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 14,
      startLat: -22.908333,
      startLng: -43.196388,
      endLat: 21.395643,
      endLng: 39.883798,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
  ];

  return (
    // <div className='flex flex-row items-center justify-center py-20 md:h-auto dark:bg-black relative w-fit z-0'>
    <div className=' lg:max-w-[50%] w-full  relative overflow-hidden  md:h-[40rem]  '>
      <div>
        {/* <div className='relative w-fit bottom-0 inset-x-0 h-40 bg-gradient-to-b pointer-events-none select-none from-transparent dark:to-black to-white z-40' /> */}
        <div className='lg:absolute w-full -bottom-5 h-72 md:h-full z-10 cursor-pointer drop-shadow-2xl'>
          <World data={sampleArcs} globeConfig={globeConfig} />
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className='flex max-h-screen '>
      <div className='flex w-full mt-10 md:mt-0 flex-wrap-reverse  justify-center items-center md:h-auto dark:bg-black relative z-0'>
        <GlobeDemo />
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
          }}
          className='div'
        >
          <h2 className='text-center text-xl md:text-4xl font-bold text-black dark:text-white'>
            Viagens pelo globo, a partir do Rio.
          </h2>
          <p className='text-center text-base md:text-lg font-normal text-neutral-700 dark:text-neutral-200 max-w-md mt-2 mx-auto'>
            Universidade Autónoma de Lisboa
          </p>
          <Image
            src='/logocircuitosoceanicos.png'
            className='mx-auto mt-4'
            width={200}
            height={200}
            alt='logo'
          />
        </motion.div>
        {/* </div> */}
      </div>
      <div
        style={{
          position: 'absolute',
          width: '100%',
        }}
        className=' pointer-events-none'
      >
        <svg
          version='1.1'
          xmlns='http://www.w3.org/2000/svg'
          xmlnsXlink='http://www.w3.org/1999/xlink'
          x='0px'
          y='0px'
          width='100%'
          // height='100vh'
          className='h-screen'
          viewBox='0 0 1600 900'
          preserveAspectRatio='xMidYMax slice'
        >
          <defs>
            <linearGradient id='bg'>
              <stop
                offset='0%'
                style={{
                  stopColor: 'rgba(130, 158, 249, 0.06)',
                }}
              ></stop>
              <stop
                offset='50%'
                style={{ stopColor: 'rgba(76, 190, 255, 0.6)' }}
              ></stop>

              <stop
                offset='100%'
                style={{ stopColor: 'rgba(10, 10, 72, 0.2)' }}
              ></stop>
            </linearGradient>
            <path
              id='wave'
              fill='url(#bg)'
              d='M-363.852,502.589c0,0,236.988-41.997,505.475,0
	s371.981,38.998,575.971,0s293.985-39.278,505.474,5.859s493.475,48.368,716.963-4.995v560.106H-363.852V502.589z'
            />
          </defs>
          <g>
            <use xlinkHref='#wave' opacity='.3'>
              <animateTransform
                attributeName='transform'
                attributeType='XML'
                type='translate'
                dur='10s'
                calcMode='spline'
                values='270 230; -334 180; 270 230'
                keyTimes='0; .5; 1'
                keySplines='0.42, 0, 0.58, 1.0;0.42, 0, 0.58, 1.0'
                repeatCount='indefinite'
              />
            </use>
            <use xlinkHref='#wave' opacity='.6'>
              <animateTransform
                attributeName='transform'
                attributeType='XML'
                type='translate'
                dur='8s'
                calcMode='spline'
                values='-270 230;243 220;-270 230'
                keyTimes='0; .6; 1'
                keySplines='0.42, 0, 0.58, 1.0;0.42, 0, 0.58, 1.0'
                repeatCount='indefinite'
              />
            </use>
            <use xlinkHref='#wave' opacity='.9'>
              <animateTransform
                attributeName='transform'
                attributeType='XML'
                type='translate'
                dur='6s'
                calcMode='spline'
                values='0 230;-140 200;0 230'
                keyTimes='0; .4; 1'
                keySplines='0.42, 0, 0.58, 1.0;0.42, 0, 0.58, 1.0'
                repeatCount='indefinite'
              />
            </use>
          </g>
        </svg>
      </div>
    </main>
  );
}
