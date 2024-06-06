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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SetStateAction, useEffect, useState } from "react";
import Loader from "@/components/loader";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  id: z.number(),
  unidade: z.string().min(1, { message: "Nome muito curto" }),
});

export default function DialogEditarUnidadeMedida(props: {
  mutate: () => void;
  unidade: UnidadeDeMedida | undefined;
  open: boolean;
  setOpen: (value: SetStateAction<boolean>) => void;
}) {
  const { mutate, unidade, open, setOpen } = props;
  const { toast } = useToast();
  // const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [selectPais, setSelectPais] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: unidade?.id,
      unidade: unidade?.unidade_medida,
    },
  });

  useEffect(() => {
    form.reset({
      id: unidade?.id,
      unidade: unidade?.unidade_medida,
    });
  }, [unidade]);

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    setSubmitting(true);
    const result = await fetch("/api/unidade_de_medida/update", {
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
        description: "Unidade de medida editada com sucesso",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Erro",
        duration: 5000,
        description: "Erro ao editar unidade de medida",
      });
    }
    setSubmitting(false);
  }

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className=" w-11/12 p-6 rounded-lg max-h-[95%] overflow-y-scroll"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <DialogHeader>
            <DialogTitle className="text-blue-500">Editar Usuário</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="flex flex-col gap-2"
            >
              <FormField
                control={form.control}
                name="unidade"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input className="rounded-xl" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="self-end mt-2 bg-blue-500 rounded-2xl hover:bg-blue-600 w-fit"
                disabled={
                  submitting || form.watch().unidade == unidade?.unidade_medida
                }
              >
                Editar {submitting && <Loader classProp="ml-2 w-6 h-6" />}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
