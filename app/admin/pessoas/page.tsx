"use client";
import fetcher from "@/lib/fetch";
import useSWR from "swr";

export default function PessoasPage() {
  const { data, isLoading } = useSWR<Pessoa[]>("/api/pessoa/read", fetcher);
  console.log(data);

  return (
    <main className="flex p-4 border-gray-300 border-solid border-2 rounded-3xl mx-10 md:mx-24 mt-5 shadow-lg ">
      <table className="table-auto w-full text-left rounded-xl p-10 border border-separate border-spacing-y-2 ">
        <thead className="bg-blue-200 rounded-xl p-1 uppercase text-xs">
          <tr>
            <th className="p-2 rounded-l-lg">Nome</th>
            {/* <th>Nome</th>
            <th>Observação</th> */}
            <th className="p-2 rounded-r-lg">Relação</th>
          </tr>
        </thead>
        <tbody className="">
          {data?.map((pessoa) => (
            <tr className="text-xs  hover:bg-blue-200 hover:bg-opacity-30 cursor-pointer">
              <td className="p-2 rounded-l-lg ">{pessoa?.nome}</td>
              <td>
                {pessoa?.relacao_embarcacao_proprietario[0].embarcacao.nome}
              </td>

              <td className="p-2 rounded-r-lg"></td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
