'use client';

import { useEffect, useState } from 'react';

export default function Page({ params }: { params: { id: string } }) {
  //pedir ao zé para fazer o fetch da embarcação com o id = params.id
  const [personData, setPersonData] = useState<Embarcacao>();
  useEffect(() => {
    fetch(`/api/pessoa/read/embarcacao_pessoa?id=${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setPersonData(data);
      });
  }, [params.id]);

  return (
    <main className='flex p-4 border-gray-300 border-solid border-2 rounded-3xl mx-10 md:mx-24 mt-5 shadow-lg '>
      <table className='table-auto w-full text-left rounded-xl p-10 border border-separate border-spacing-y-2 '>
        <thead className='bg-blue-200 rounded-xl p-1 uppercase text-xs'>
          <tr>
            <th className='p-2 rounded-l-lg'>Embarcação</th>
            <th>Tipo</th>
          </tr>
        </thead>
        <tbody className=''>
          {/* {personData?.map((row, index) => (
            <tr
              key={index}
              className='text-xs  hover:bg-blue-200 hover:bg-opacity-30 cursor-pointer'
              // onClick={() => router.push(`/embarcacao/${row.id}`)}
            >
              <td className='p-2 rounded-l-lg '>{row.nome}</td>
              <td className='p-2 rounded-r-lg'>
                {row.relacao_embarcacao_proprietario[0].pessoa.nome}
              </td>
            </tr>
          ))} */}
        </tbody>
      </table>
    </main>
  );

  return <div>My Post: {params.id}</div>;
}
