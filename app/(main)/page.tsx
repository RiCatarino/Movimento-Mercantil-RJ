"use client";

import React from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const World = dynamic(
  () => import("@/components/ui/globe").then((m) => m.World),
  {
    ssr: false,
  }
);

function Globe() {
  const globeConfig = {
    pointSize: 10,
    globeColor: "#84CBF9",
    showAtmosphere: false,
    atmosphereColor: "#000",
    atmosphereAltitude: 0.1,
    emissive: "#062056",
    emissiveIntensity: 0.1,
    shininess: 0.9,
    polygonColor: "#BF1222",
    ambientLight: "#38bdf8",
    directionalLeftLight: "#fff",
    directionalTopLight: "#fff",
    pointLight: "#000",
    arcTime: 1000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    initialPosition: { lat: 22.3193, lng: 114.1694 },
    autoRotate: true,
    autoRotateSpeed: 0.1,
  };
  const colors = ["#06b6d4", "#3b82f6", "#6366f1"];
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
    // <div className='relative z-0 flex flex-row items-center justify-center py-20 md:h-auto dark:bg-black w-fit'>

    <div className='lg:max-w-[50%] w-full relative overflow-hidden h-30  lg:h-[40rem] bg-transparent  '>
      <div>
        {/* <div className='relative inset-x-0 bottom-0 z-40 h-40 pointer-events-none select-none w-fit bg-gradient-to-b from-transparent dark:to-black to-white' /> */}
        <div className='z-10 w-full transition-all duration-300 ease-in-out cursor-pointer lg:absolute lg:-bottom-5 h-72 lg:h-full drop-shadow-xl hover:scale-105 '>
          <World data={sampleArcs} globeConfig={globeConfig} />
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="flex max-h-screen ">
      <div className="z-10 flex flex-wrap-reverse items-center justify-center w-full  dark:bg-black md:h-screen md:mt-0 mt-52">
        <Globe />
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
          className="div"
        >
          <h1 className="text-4xl text-red-500 font-extrabold text-center bg-white p-2 rounded-xl">
            Este site encontra-se em desenvolvimento.
            <p> Report de bugs e sugestões para: 30008236@students.ual.pt  </p>
          </h1>
          <h2 className="text-xl font-bold text-center text-black md:text-4xl dark:text-white">
            Viagens pelo globo, a partir do Rio.
          </h2>
          <p className="max-w-md mx-auto mt-2 text-base font-normal text-center md:text-lg text-neutral-700 dark:text-neutral-200">
            Universidade Autónoma de Lisboa
          </p>

          <Image
            src="/logocircuitosoceanicos.png"
            className="mx-auto mt-4 bg-cover rounded-full hover:rotate-12 hover:scale-105 hover:shadow-2xl transition-all duration-300 ease-in-out"
            width={200}
            height={200}
            alt="logo"
          />
          <div className="flex justify-center p-3" style={{}}>
            <Button
              asChild
              className="self-end w-full text-lg shadow-2xl h-14 transition-all duration-500 bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl md:w-fit hover:scale-105 hover:bg-gradient-to-l hover:from-blue-400 hover:to-blue-600"
            >
              <Link href={"/admin/dashboard"}>Visitar BackOffice</Link>
            </Button>
          </div>
        </motion.div>
        {/* </div> */}
      </div>
      <div
        style={{
          position: "absolute",
          width: "100%",
        }}
        className="z-0 mb-0 pointer-events-none "
      >
    <>
      <div className='absolute z-0 w-full pointer-events-none '>
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          width="100%"
          // height='100vh'
          className="h-screen"
          viewBox="0 0 1600 900"
          preserveAspectRatio="xMidYMax slice"
          className='absolute h-screen'
          viewBox='0 0 1600 900'
          preserveAspectRatio='xMidYMax slice'
        >
          <defs>
            <linearGradient id="bg">
              <stop
                offset="0%"
                style={{
                  stopColor: "rgba(130, 158, 249, 0.06)",
                }}
              ></stop>
              <stop
                offset="50%"
                style={{ stopColor: "rgba(76, 190, 255, 0.6)" }}
              ></stop>

              <stop
                offset="100%"
                style={{ stopColor: "rgba(10, 10, 72, 0.2)" }}
              ></stop>
            </linearGradient>
            <path
              id="wave"
              fill="url(#bg)"
              d="M-363.852,502.589c0,0,236.988-41.997,505.475,0
	s371.981,38.998,575.971,0s293.985-39.278,505.474,5.859s493.475,48.368,716.963-4.995v560.106H-363.852V502.589z"
            />
          </defs>
          <g>
            <use xlinkHref="#wave" opacity=".3">
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="translate"
                dur="10s"
                calcMode="spline"
                values="270 230; -334 180; 270 230"
                keyTimes="0; .5; 1"
                keySplines="0.42, 0, 0.58, 1.0;0.42, 0, 0.58, 1.0"
                repeatCount="indefinite"
              />
            </use>
            <use xlinkHref="#wave" opacity=".6">
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="translate"
                dur="8s"
                calcMode="spline"
                values="-270 230;243 220;-270 230"
                keyTimes="0; .6; 1"
                keySplines="0.42, 0, 0.58, 1.0;0.42, 0, 0.58, 1.0"
                repeatCount="indefinite"
              />
            </use>
            <use xlinkHref="#wave" opacity=".9">
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="translate"
                dur="6s"
                calcMode="spline"
                values="0 230;-140 200;0 230"
                keyTimes="0; .4; 1"
                keySplines="0.42, 0, 0.58, 1.0;0.42, 0, 0.58, 1.0"
                repeatCount="indefinite"
              />
            </use>
          </g>
        </svg>
      </div>
      {/* <div className='max-h-screen '> */}
      <div className='z-10 flex flex-wrap-reverse w-full min-h-screen p-0 lg:w-full lg:p-10 lg:flex-nowrap dark:bg-black lg:h-screen'>
        <Globe />
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
          className='lg:max-w-[50%] w-full relative  h-full my-auto lg:h-[40rem] z-40 p-3  '
        >
          <div className='z-10 w-full transition-all duration-300 ease-in-out cursor-pointer h-fit lg:absolute -bottom-5 h-72 lg:h-full drop-shadow-xl hover:scale-105 '>
            <h1 className='justify-center w-full p-2 mx-auto text-xl font-extrabold text-center text-red-500 bg-white lg:text-4xl lg:w-1/2 rounded-xl'>
              Este site encontra-se em <br /> desenvolvimento.
            </h1>
            <h2 className='text-xl font-bold text-center text-black lg:text-4xl dark:text-white'>
              Viagens pelo globo, a partir do Rio.
            </h2>
            <p className='max-w-md mx-auto mt-2 text-base font-normal text-center lg:text-lg text-neutral-700 dark:text-neutral-200'>
              Universidade Autónoma de Lisboa
            </p>

            <Image
              src='/logocircuitosoceanicos.png'
              className='w-24 mx-auto mt-4 transition-all duration-300 ease-in-out bg-cover rounded-full hover:rotate-12 hover:scale-105 hover:shadow-2xl'
              width={200}
              height={200}
              alt='logo'
            />
            <div className='flex justify-center p-3' style={{}}>
              <Button
                asChild
                className='self-end w-full text-lg transition-all duration-500 shadow-2xl h-14 bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl lg:w-fit hover:scale-105 hover:bg-gradient-to-l hover:from-blue-400 hover:to-blue-600'
              >
                <Link href={'/auth/signin'}>Visitar BackOffice</Link>
              </Button>
            </div>
          </div>
        </motion.div>
        {/* </div> */}
      </div>
      {/* </div> */}
    </>
  );
}
