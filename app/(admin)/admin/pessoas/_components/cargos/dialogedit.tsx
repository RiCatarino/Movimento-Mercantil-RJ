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
import { KeyedMutator } from "swr";

const formSchema = z.object({
  id: z.number(),
  cargo: z.string().min(1, { message: "Escreva o nome do Cargo" }),
});

export default function DialogEditarCargo(props: {
  mutate: KeyedMutator<Cargo[]>;
  cargo: Cargo | undefined;
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const { mutate, cargo, open, setOpen } = props;
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    form.reset({
      id: cargo?.id,
      cargo: cargo?.cargo,
    });
  }, [cargo]);

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    setSubmitting(true);
    const result = await fetch("/api/cargo/update", {
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
        description: "Cargo editado com sucesso",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Erro",
        duration: 5000,
        description: "Erro ao editar cargo",
      });
    }
    setSubmitting(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-11/12 p-6 rounded-lg max-h-[95%] overflow-y-scroll">
        <DialogHeader>
          <DialogTitle className="text-blue-500">Editar Cargo</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col gap-2"
          >
            <FormField
              control={form.control}
              name="cargo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cargo</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Mestre" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="self-end mt-2 bg-blue-500 rounded-2xl hover:bg-blue-600 w-fit"
              disabled={submitting}
            >
              Editar {submitting && <Loader classProp="ml-2 w-6 h-6" />}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
