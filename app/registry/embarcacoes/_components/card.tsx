import { Button } from '@/components/ui/button';

export default function EmbarcacaoCard(props: {
  image: string | undefined;
  nome: string;
  tipo: string;
  descricao: string;
}) {
  const { image, nome, tipo, descricao } = props;

  return (
    <>
      <div className='cursor-pointer hover:scale-105 transition-all duration-300 col-span-1 relative flex max-w-[24rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md h-96'>
        <div className='relative m-0 overflow-hidden rounded-none bg-transparent bg-clip-border text-gray-700 shadow-none'>
          <img
            src={
              image
                ? image
                : 'https://jangadashow.com.br/wp-content/uploads/2023/09/a-historia-das-caravelas-os-navios-de-antigamente.webp'
            }
            alt='imagem embarcação'
            className='object-cover w-full rounded-xl'
          />
        </div>
        <div className='p-6'>
          <h4 className='block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased'>
            {nome} - {tipo}
          </h4>
          <p className='mt-3 font-sans text-lg font-normal leading-relaxed text-gray-700 antialiased line-clamp-4 '>
            {descricao}
          </p>
        </div>
        {/* <Button className='w-fit bottom-4 right-4 float-end self-center ml-4 mb-4 mr-4 bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl md:w-fit hover:scale-105 hover:bg-gradient-to-l hover:from-blue-400 hover:to-blue-600 '> */}
        {/* Ver Detalhes
        </Button> */}
        {/* <p className='font-bold text-center p-2'>Ver detalhes...</p> */}
      </div>

      <link
        rel='stylesheet'
        href='https://unpkg.com/@material-tailwind/html@latest/styles/material-tailwind.css'
      />
    </>
  );
}
