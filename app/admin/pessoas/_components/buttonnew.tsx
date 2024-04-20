import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import useSWR, { mutate } from 'swr';
import fetcher from '@/lib/fetch';

import { toast } from 'sonner';
import { useState } from 'react';
import { ChevronsUpDown, PlusCircleIcon } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { cn } from '@/lib/utils';
import Loader from '@/components/loader';

const formSchema = z.object({
  nome: z.string().min(1, { message: 'Nome muito curto' }),
  titulo_nobreza: z
    .string()
    .min(1, { message: 'Selecione um título de Nobreza' }),
  pais: z.string().min(1, { message: 'Selecione um país' }),
});

export default function NewPerson() {
  const [selectPais, setSelectPais] = useState(false);
  const [selectNobreza, setSelectNobreza] = useState(false);
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: '',
      titulo_nobreza: '',
      pais: '',
    },
  });

  const { data: pais, isLoading } = useSWR<Pais[]>('/api/pais/read', fetcher);
  const { data: titulo_nobreza, isLoading: isLoadingNobreza } = useSWR<
    TituloNobreza[]
  >('/api/titulo_nobreza/read', fetcher);

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    setSubmitting(true);
    const result = await fetch('/api/pessoa/create', {
      method: 'POST',
      body: JSON.stringify(values),
    });

    if (result.ok) {
      setOpen(false);
      form.reset();
      mutate('/api/pessoa/read');
      toast.success('Pessoa adicionada com sucesso');
    } else {
      toast.error('Erro ao adicionar pessoa');
    }
    setSubmitting(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className=' w-fit self-end rounded-full p-2 mb-2 bg-blue-200'
          variant='outline'
        >
          <PlusCircleIcon className='text-black' />
        </Button>
      </DialogTrigger>
      <DialogContent
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>Criar Pessoa</DialogTitle>
          <DialogDescription asChild>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className='flex flex-col gap-2'
              >
                <FormField
                  control={form.control}
                  name='nome'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <Input placeholder='Ex: António Palma' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='titulo_nobreza'
                  render={({ field }) => (
                    <FormItem className='flex flex-col'>
                      <FormLabel>Título de Nobreza</FormLabel>
                      <Popover
                        open={selectNobreza}
                        onOpenChange={setSelectNobreza}
                      >
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant='outline'
                              role='combobox'
                              className={cn(
                                'w-full justify-between',
                                !field.value && 'text-muted-foreground'
                              )}
                            >
                              {field.value
                                ? titulo_nobreza?.find(
                                    (titulo_nobreza) =>
                                      titulo_nobreza.id.toString() ===
                                      field.value
                                  )?.titulo
                                : 'Seleccionar Título de Nobreza'}
                              <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className='w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height]'>
                          <Command>
                            <CommandInput placeholder='Procurar...' />
                            <CommandEmpty>Sem resultados</CommandEmpty>
                            <CommandGroup>
                              <CommandList>
                                {titulo_nobreza?.map((titulo_nobreza) => (
                                  <CommandItem
                                    value={titulo_nobreza.titulo}
                                    key={titulo_nobreza.id}
                                    onSelect={() => {
                                      form.setValue(
                                        'titulo_nobreza',
                                        titulo_nobreza.id.toString()
                                      );
                                      setSelectNobreza(false);
                                    }}
                                  >
                                    {titulo_nobreza.titulo}
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

                <FormField
                  control={form.control}
                  name='pais'
                  render={({ field }) => (
                    <FormItem className='flex flex-col'>
                      <FormLabel>País</FormLabel>
                      <Popover open={selectPais} onOpenChange={setSelectPais}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant='outline'
                              role='combobox'
                              className={cn(
                                'w-full justify-between',
                                !field.value && 'text-muted-foreground'
                              )}
                            >
                              {field.value
                                ? pais?.find(
                                    (pais) => pais.id.toString() === field.value
                                  )?.pais
                                : 'Seleccionar País'}
                              <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className='w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height]'>
                          <Command>
                            <CommandInput placeholder='Procurar país...' />
                            <CommandEmpty>País não encontrado</CommandEmpty>
                            <CommandGroup>
                              <CommandList>
                                {pais?.map((pais) => (
                                  <CommandItem
                                    value={pais.pais}
                                    key={pais.id}
                                    onSelect={() => {
                                      form.setValue('pais', pais.id.toString());
                                      setSelectPais(false);
                                    }}
                                  >
                                    {pais.pais}
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
                {submitting && <Loader />}
                <Button
                  type='submit'
                  className='mt-2 self-end rounded-2xl bg-blue-500 hover:bg-blue-600 w-fit'
                  disabled={submitting}
                >
                  Criar
                </Button>
              </form>
            </Form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
