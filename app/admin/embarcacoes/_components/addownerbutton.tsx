"use client";

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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "postcss";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  pessoa: z.string().min(1, { message: "Selecione uma pessoa" }),
  data_inicio: z.date({ required_error: "Selecione uma data de início" }),
  data_fim: z.date({ required_error: "Selecione uma data de fim" }),
  pais: z.string().min(1, { message: "Selecione um país" }),
});

export default function AddOwner(props: { mutate: () => void }) {
  const { mutate } = props;
  const [open, setOpen] = useState(false);
  const [selectPessoa, setSelectPessoa] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pessoa: "",
      data_inicio: new Date(),
      data_fim: new Date(),
      pais: "",
    },
  });

  const { data: pessoas, isLoading } = useSWR<Pessoa[]>(
    "/api/pessoa/read",
    fetcher
  );
  console.table(form.getValues());

  // async function handleSubmit(values: z.infer<typeof formSchema>) {
  //   setSubmitting(true);
  //   const result = await fetch("/api/pessoa/create", {
  //     method: "POST",
  //     body: JSON.stringify(values),
  //   });

  //   if (result.ok) {
  //     setOpen(false);
  //     form.reset();
  //     mutate();
  //     toast.success("Pessoa criada com sucesso");
  //   } else {
  //     toast.error("Erro ao criar pessoa");
  //   }
  // }

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
            <Form {...form}>
              <form className="flex flex-col gap-2">
                <FormField
                  control={form.control}
                  name="pessoa"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Pessoa</FormLabel>
                      <Popover
                        open={selectPessoa}
                        onOpenChange={setSelectPessoa}
                      >
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "w-full justify-between",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value
                                ? pessoas?.find(
                                    (pessoa) =>
                                      pessoa.id.toString() === field.value
                                  )?.nome
                                : "Seleccionar Pessoa"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height]">
                          <Command>
                            <CommandInput placeholder="Procurar pessoa..." />
                            <CommandEmpty>Pessoa não encontrada</CommandEmpty>
                            <CommandGroup>
                              <CommandList>
                                {pessoas?.map((pessoa) => (
                                  <CommandItem
                                    value={pessoa.nome}
                                    key={pessoa.id}
                                    onSelect={() => {
                                      form.setValue(
                                        "pessoa",
                                        pessoa.id.toString()
                                      );
                                      setSelectPessoa(false);
                                    }}
                                  >
                                    {pessoa.nome}
                                  </CommandItem>
                                ))}
                              </CommandList>
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
