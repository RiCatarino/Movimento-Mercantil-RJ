"use client";
import fetcher from "@/lib/fetch";
import dayjs from "dayjs";
import useSWR from "swr";

export default function EmbarcacoesPage() {
  const { data, isLoading } = useSWR<Viagem[]>("/api/viagem/read", fetcher);
  console.log(data);

  return (
    <main className="flex p-4 border-gray-300 border-solid border-2 rounded-3xl mx-10 md:mx-24 mt-5 shadow-lg ">
      <table className="table-auto w-full text-left rounded-xl p-10 border border-separate border-spacing-y-2 ">
        <thead className="bg-blue-200 rounded-xl p-1 uppercase text-xs">
          <tr>
            <th className="p-2 rounded-l-lg">ID</th>
            <th>Data</th>
            <th>Origem</th>
            <th>Destino</th>
            <th>Embarcação</th>
            <th className="p-2 rounded-r-lg">Tripulação</th>
          </tr>
        </thead>
        <tbody className="">
          {data?.map((viagem) => (
            <tr
              key={viagem.id}
              className="text-xs  hover:bg-blue-200 hover:bg-opacity-30 cursor-pointer"
            >
              <td className="p-2 rounded-l-lg ">{viagem?.id}</td>
              <td>{dayjs(viagem?.data_viagem).format("DD-MM-YYYY")}</td>
              <td>
                {viagem?.porto_origem?.nome +
                  " | " +
                  viagem?.porto_origem?.pais?.pais}
              </td>
              <td>
                {viagem?.porto_destino?.nome +
                  " | " +
                  viagem?.porto_destino?.pais?.pais}
              </td>
              <td className="p-2 rounded-r-lg">{viagem.tripulacao}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
