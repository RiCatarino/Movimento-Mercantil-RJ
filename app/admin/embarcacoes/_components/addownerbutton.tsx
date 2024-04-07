import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useSWR from "swr";
import fetcher from "@/lib/fetch";
import { useState } from "react";
import { z } from "zod";

const formSchema = z.object({
  pessoa: z.string().min(1, { message: "Selecione uma pessoa" }),
  data_inicio: z.date({ required_error: "Selecione uma data de início" }),
  data_fim: z.date({ required_error: "Selecione uma data de fim" }),
  pais: z.string().min(1, { message: "Selecione um país" }),
});

export default function AddOwner(props: { mutate: () => void }) {
  const { mutate } = props;
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const { data: pessoas, isLoading } = useSWR<Pessoa[]>(
    "/api/embarcacao/read/tipos",
    fetcher
  );

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    setSubmitting(true);
    const result = await fetch("/api/pessoa/create", {
      method: "POST",
      body: JSON.stringify(values),
    });

    if (result.ok) {
      setOpen(false);
      form.reset();
      mutate();
      toast.success("Pessoa criada com sucesso");
    } else {
      toast.error("Erro ao criar pessoa");
    }
  }
  //   async function handleSubmit(values: z.infer<typeof formSchema>) {
  //     setSubmitting(true);
  //     const result = await fetch('/api/embarcacao/create', {
  //       method: 'POST',
  //       body: JSON.stringify(values),
  //     });

  //     if (result.ok) {
  //       setOpen(false);
  //       form.reset();
  //       mutate();
  //       toast.success('Embarcação criada com sucesso');
  //     } else {
  //       toast.error('Erro ao criar embarcação');
  //     }
  //     setSubmitting(false);
  //   }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-xl bg-blue-500">
          Adicionar Proprietário
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Proprietário</DialogTitle>
          <DialogDescription asChild>
            {/* <Form {...form}>
             
            </Form> */}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
