import { Button } from '@/components/ui/button';
import { ChevronsUpDownIcon, Plus } from 'lucide-react';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';

import { useToast } from '@/components/ui/use-toast';
import Loader from '@/components/loader';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import useSWR from 'swr';
import fetcher from '@/lib/fetch';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const formSchema = z.object({
  tipodepassageiro: z
    .number()
    .gt(0, { message: 'Tipo de Passageiro é obrigatório' }),
  total: z.number().min(1, { message: 'Total de passageiros é obrigatório' }),
  observacoes: z.string().min(1, { message: 'Nome muito curto' }),
});

export default function BotaoNovoPassageiro(props: {
  mutate: () => void;
  viagem_id: number | undefined;
}) {
  const { viagem_id, mutate } = props;
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectTipoPassageiro, setSelectTipoPassageiro] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tipodepassageiro: 0,
      total: 0,
      observacoes: '',
    },
  });

  const { data: tiposdepassageiros } = useSWR<TipoPassageiro[]>(
    '/api/tiposdepassageiros/read',
    fetcher
  );

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    setSubmitting(true);
    const result = await fetch('/api/passageiros/create', {
      method: 'POST',
      body: JSON.stringify({
        ...values,
        viagem_id,
      }),
    });

    if (result.ok) {
      mutate();
      toast({
        className: 'bg-green-200',
        title: 'Sucesso',
        duration: 5000,
        description: 'Passageiro adicionado com sucesso',
      });
      form.reset();
      setOpen(false);
    } else {
      toast({
        variant: 'destructive',
        title: 'Erro',
        duration: 5000,
        description: 'Erro ao adicionadar passageiro',
      });
    }
    setSubmitting(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className='mt-2 mb-2 bg-blue-400 rounded-lg  float-end'>
          Adicionar Passageiro <Plus size={24} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='text-blue-500'>
            Adicionar Passageiro
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            className='flex flex-col gap-2'
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <FormField
              control={form.control}
              name='tipodepassageiro'
              render={({ field }) => (
                <FormItem className='flex flex-col'>
                  <FormLabel>Tipo de Passageiro</FormLabel>
                  <Popover
                    open={selectTipoPassageiro}
                    onOpenChange={setSelectTipoPassageiro}
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
                            ? tiposdepassageiros?.find(
                                (tipo) => tipo.id === field.value
                              )?.tipo
                            : 'Seleccionar Tipo'}
                          <ChevronsUpDownIcon className='w-4 h-4 ml-2 opacity-50 shrink-0' />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className='w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height]'>
                      <Command>
                        <CommandInput placeholder='Procurar tipo...' />
                        <CommandEmpty>Tipo não encontrado</CommandEmpty>
                        <CommandGroup>
                          <CommandList>
                            {tiposdepassageiros?.map((tipo) => (
                              <CommandItem
                                value={tipo.tipo}
                                key={tipo.id}
                                onSelect={() => {
                                  form.setValue('tipodepassageiro', tipo.id);
                                  setSelectTipoPassageiro(false);
                                }}
                              >
                                {tipo.tipo}
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
              name='total'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total de Passageiros</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type='number'
                      onChange={(e) => {
                        field.onChange(e.target.valueAsNumber);
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='observacoes'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Observações</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button
              disabled={submitting}
              className='self-end mt-2 bg-blue-500 rounded-2xl hover:bg-blue-600 w-fit'
            >
              {submitting ? (
                <>
                  <Loader classProp='w-4 h-4 mr-2' /> A adicionar...
                </>
              ) : (
                'Guardar'
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
