import Link from 'next/link';
import React from 'react';
export default function registryPage() {
  return (
    // <main
    //   // style={{ backgroundColor: "green" }}
    //   className="flex flex-col min-h-full overflow-visible"
    // >
    <div className='py-24 md:px-28'>
      <div className='grid md:mx-auto w-full p-6 lg:p-0 lg:w-10/12 sm:grid-cols-1 md:grid-cols-3 '>
        <Link href='/registry/embarcacoes'>
          <div className='relative m-2 mb-10 bg-white shadow-lg rounded-xl'>
            <div className='relative w-auto h-full overflow-hidden cursor-pointer rounded-xl group '>
              <div className='absolute z-30 text-4xl md:text-3xl text-white -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'>
                <p className='font-extrabold text-white '>Embarcações</p>
              </div>

              <div className='absolute inset-x-0 z-50 flex items-end text-white transition duration-300 ease-in-out opacity-0 cursor-pointer rounded-xl group-hover:opacity-100 from-primarypurple to-transparent bg-gradient-to-t -bottom-2 pt-60'>
                <div className='w-full'>
                  <div className='justify-end p-4 pb-10 space-y-3 text-lg transition duration-300 ease-in-out transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0'>
                    <div className='text-right uppercase '>
                      Aceda a todas a toda a informação sobre as embarcações
                    </div>
                  </div>
                </div>
              </div>

              <img
                alt=''
                className='object-cover object-bottom transition duration-300 ease-in-out contrast-50 blur-sm group-hover:scale-110'
                src='Caravela.webp'
              />
            </div>
          </div>
        </Link>
        {/* VIAGENS */}
        <Link href='/registry/viagens'>
          <div className='relative m-2 mb-10 bg-white shadow-lg rounded-xl'>
            <div className='relative w-auto h-full overflow-hidden cursor-pointer rounded-xl group '>
              <div className='absolute z-30 text-4xl md:text-3xl text-white -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'>
                <p className='font-extrabold text-white '>Viagens</p>
              </div>

              <div className='absolute inset-x-0 z-50 flex items-end text-white transition duration-300 ease-in-out opacity-0 cursor-pointer rounded-xl group-hover:opacity-100 from-primarypurple to-transparent bg-gradient-to-t -bottom-2 pt-60'>
                <div className='w-full'>
                  <div className='justify-end p-4 pb-10 space-y-3 text-lg transition duration-300 ease-in-out transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0'>
                    <div className='text-right uppercase '>
                      Aceda a todas a toda a informação sobre as viagens
                    </div>
                  </div>
                </div>
              </div>

              <img
                alt=''
                className='object-cover object-bottom transition duration-300 ease-in-out contrast-50 blur-sm group-hover:scale-110'
                src='viagens.webp'
              />
            </div>
          </div>
        </Link>
        {/* PESSOAS */}
        <Link href='/registry/pessoas'>
          <div className='relative m-2 mb-10 bg-white shadow-lg rounded-xl'>
            <div className='relative w-auto h-full overflow-hidden cursor-pointer rounded-xl group '>
              <div className='absolute z-30 text-4xl md:text-3xl text-white -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'>
                <p className='font-extrabold text-white '>Pessoas</p>
              </div>

              <div className='absolute inset-x-0 z-50 flex items-end text-white transition duration-300 ease-in-out opacity-0 cursor-pointer rounded-xl group-hover:opacity-100 from-primarypurple to-transparent bg-gradient-to-t -bottom-2 pt-60'>
                <div className='w-full'>
                  <div className='justify-end p-4 pb-10 space-y-3 text-lg transition duration-300 ease-in-out transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0'>
                    <div className='text-right uppercase '>
                      Aceda a todas a toda a informação sobre as pessoas
                    </div>
                  </div>
                </div>
              </div>

              <img
                alt=''
                className='object-cover object-bottom transition duration-300 ease-in-out contrast-50 blur-sm group-hover:scale-110'
                src='pessoas.webp'
              />
            </div>
          </div>
        </Link>
        {/* EMBARCAÇÕES */}
        {/* <InfoCard
          title="Viagens"
          value={10}
          description="Deixar aqui uma descrição do que há aqui.   - 10 viagens realizadas."
          icon={<GitCompareArrows className="w-20 h-20" />}
          href="/registry/viagens"
        /> */}
        {/*
        <InfoCard
          title="Embarcações"
          value={20}
          icon={<Ship className="w-20 h-20" />}
          description=""
          href="/registry/embarcacoes"
        />
        <InfoCard
          title="Pessoas"
          value={30}
          icon={<Users className="w-20 h-20" />}
          description=""
          href="/registry/pessoas"
        />
        <InfoCard
          title="asdasd"
          value={40}
          icon={<PersonStanding className="w-20 h-20" />}
          description=""
          href="#"
        />
        <InfoCard
          title="Informação"
          value={123120}
          icon={<PersonStanding className="w-20 h-20" />}
          description=""
          href="#"
        />

        <InfoCard
          title="Informação"
          value={41}
          icon={<PersonStanding className="w-20 h-20" />}
          description=""
          href="#"
        />
        <InfoCard
          title="Informação"
          value={92}
          icon={<PersonStanding className="w-20 h-20" />}
          description=""
          href="#"
        /> */}
      </div>
    </div>
    // </main>
  );
}
