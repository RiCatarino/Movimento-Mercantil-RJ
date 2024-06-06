import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import Loader from "@/components/loader";
import ButtonNewNews from "../buttons/buttonnewnews";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
import chunk from "@/lib/chunk";
import Paginacao from "@/components/sharedpagination";

export default function TableNews(props: {
  news: Noticia[] | undefined;
  mutate: () => void;
  viagem_id: number | undefined;
}) {
  const { news, mutate, viagem_id } = props;
  const [deleting, setDeleting] = useState(false);
  const [activePage, setPage] = useState(1);

  const chunked = chunk(news ?? [], 5);
  const newsdata = chunked[activePage - 1];

  async function handleDeleteNoticia(id: number) {
    setDeleting(true);
    await fetch(`/api/noticia/delete`, {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });
    mutate();
    setDeleting(false);
  }

  if (deleting) {
    return <Loader classProp="w-10 h-10" />;
  }

  return (
    <>
      <Table className="border-b">
        <TableHeader className="p-2 text-xs bg-blue-200 border-t-0 dark:bg-slate-900 ">
          <TableRow className="rounded-ss-xl">
            <TableHead>Assunto</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {newsdata?.map((noticia) => (
            <TableRow
              className="cursor-pointer hover:bg-blue-100"
              key={noticia.id}
            >
              <TableCell className="text-xs font-medium">
                {noticia.assunto}
              </TableCell>
              <TableCell className="w-4">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      size="icon"
                      variant="link"
                      className="text-xs text-blue-500"
                    >
                      <XIcon className="w-4 text-red-700" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-red-500">
                        Tem a certeza?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Esta ação não pode ser desfeita. Esta ação irá remover a
                        referência documental.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction
                        disabled={deleting}
                        className="bg-red-500 hover:bg-red-600"
                        onClick={() => handleDeleteNoticia(noticia.id)}
                      >
                        {deleting ? "Aguarde..." : "Remover"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        {news?.length === 0 && (
          <TableCaption>Nenhuma notícia encontrada</TableCaption>
        )}
      </Table>
      <Paginacao chunked={chunked} activePage={activePage} setPage={setPage} />
      <ButtonNewNews mutate={mutate} viagem_id={viagem_id} />
    </>
  );
}
