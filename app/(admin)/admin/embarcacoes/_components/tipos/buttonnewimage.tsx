import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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

import { useState } from "react";
import { Plus } from "lucide-react";
import Loader from "@/components/loader";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  imagem: z.string().url({ message: "URL inválido" }),
});

export default function BotaoNovaImagem(props: {
  mutate: () => void;
  tipo_id: number | undefined;
}) {
  const { mutate, tipo_id } = props;
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      imagem: "",
    },
  });

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    setSubmitting(true);
    const result = await fetch("/api/imagem_embarcacao/create", {
      method: "POST",
      body: JSON.stringify({
        ...values,
        tipo_id: tipo_id,
      }),
    });

    if (result.ok) {
      setOpen(false);
      form.reset();
      mutate();
      toast({
        className: "bg-green-200",
        title: "Sucesso",
        duration: 5000,
        description: "Imagem adicionada com sucesso",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Erro",
        duration: 5000,
        description: "Erro ao adicionar imagem",
      });
    }
    setSubmitting(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="self-end w-full transition-all duration-500 bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl md:w-fit hover:scale-105 hover:bg-gradient-to-l hover:from-blue-400 hover:to-blue-600 ">
          Adicionar Imagem <Plus size={24} />
        </Button>
      </DialogTrigger>
      <DialogContent
        className="  w-11/12 p-6 rounded-lg max-h-[95%] overflow-y-scroll"
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle className="text-blue-500">Adicionar Imagem</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col gap-2"
          >
            <FormField
              control={form.control}
              name="imagem"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: https://www.example.com/image.jpg"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {form.watch("imagem") && (
              <img
                src={form.watch("imagem")}
                alt="Url Inválido"
                className="max-w-full rounded-lg"
              />
            )}
            <Button
              type="submit"
              className="self-end mt-2 bg-blue-500 rounded-2xl hover:bg-blue-600 w-fit"
              disabled={submitting}
            >
              Adicionar {submitting && <Loader classProp="ml-2 w-6 h-6" />}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
