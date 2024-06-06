import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import Loader from "@/components/loader";
import { toast } from "@/components/ui/use-toast";

const formSchema = z.object({
  nome: z.string().min(1, { message: "Nome muito curto" }).optional(),
  gentilico: z.string().min(1, { message: "Gentílico muito curto" }).optional(),
  id_pais: z.number().optional(),
});

export default function DialogEditarPais(props: {
  mutate: () => void;
  id_pais: number | undefined;
  nome: string | undefined;
  gentilico: string | undefined;
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const { mutate, id_pais, nome, gentilico, open, setOpen } = props;
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: nome,
      gentilico: gentilico,
      id_pais: id_pais,
    },
  });

  useEffect(() => {
    if (open) {
      form.reset({
        nome: nome,
        gentilico: gentilico,
        id_pais: id_pais,
      });
    }
  }, [open]);

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    setSubmitting(true);
    const result = await fetch("/api/pais/update", {
      method: "PUT",
      body: JSON.stringify(values),
    });

    if (result.ok) {
      setOpen(false);
      form.reset();
      mutate();
      toast({
        className: "bg-green-200",
        title: "Sucesso",
        duration: 5000,
        description: "País editado com sucesso",
      });
    } else if (result.status === 409) {
      toast({
        variant: "destructive",
        title: "Erro",
        duration: 5000,
        description: "País já existe",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Erro",
        duration: 5000,
        description: "Erro ao editar país",
      });
    }
    setSubmitting(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className=" w-11/12 p-6 rounded-lg max-h-[95%] overflow-y-scroll">
        <DialogHeader>
          <DialogTitle className="text-blue-500">Editar País</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col gap-2"
          >
            <FormField
              control={form.control}
              name="nome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do País</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Brasil" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gentilico"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gentílico</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Brasileira" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="self-end mt-2 bg-blue-500 rounded-2xl hover:bg-blue-600 w-fit"
              disabled={
                submitting ||
                (form.watch().nome == nome &&
                  form.watch().gentilico == gentilico)
              }
            >
              Editar {submitting && <Loader classProp="ml-2 w-6 h-6" />}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
