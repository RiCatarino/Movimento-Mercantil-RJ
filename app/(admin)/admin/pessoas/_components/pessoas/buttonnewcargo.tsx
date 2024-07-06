import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
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
import useSWR from 'swr';
import fetcher from '@/lib/fetch';

import { useState } from 'react';
import { ChevronsUpDown, LucideCalendar, PlusIcon } from 'lucide-react';
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
import { toast } from '@/components/ui/use-toast';
import { Calendar } from '@/components/ui/calendar';
import { ptBR } from 'date-fns/locale';
import dayjs from 'dayjs';
var customParseFormat = require('dayjs/plugin/customParseFormat');
dayjs.extend(customParseFormat);

const formSchema = z.object({
  cargo: z.string().min(1, { message: 'Nome muito curto' }),
  data: z.string(),
  ano: z.string(),
});

export default function BotaoNovoCargo(props: {
  pessoa_id: number;
  mutate: () => void;
}) {
  const { mutate, pessoa_id } = props;
  const [selectCargo, setSelectCargo] = useState(false);
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cargo: '',
      data: '',
      ano: '',
    },
  });

  const { data: cargos, isLoading } = useSWR<Cargo[]>(
    '/api/cargo/read',
    fetcher
  );

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    setSubmitting(true);

    const data = {
      ...values,
      pessoa: pessoa_id,
    };

    const result = await fetch('/api/pessoa/create/cargo', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (result.ok) {
      setOpen(false);
      form.reset();
      mutate();
      toast({
        className: 'bg-green-200',
        title: 'Sucesso',
        duration: 5000,
        description: 'Cargo adicionado com sucesso',
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Erro',
        duration: 5000,
        description: 'Erro ao adicionar cargo',
      });
    }
    setSubmitting(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className='self-end w-full transition-all duration-500 bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl md:w-fit hover:scale-105 hover:bg-gradient-to-l hover:from-blue-400 hover:to-blue-600'>
          Adicionar Cargo <PlusIcon size={24} className='ml-2' />
        </Button>
      </DialogTrigger>
      <DialogContent
        className=' w-11/12 p-6 rounded-lg max-h-[95%] overflow-y-scroll'
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle className='text-blue-500'>Adicionar Cargo</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className='flex flex-col gap-2'
          >
            <FormField
              control={form.control}
              name='cargo'
              render={({ field }) => (
                <FormItem className='flex flex-col'>
                  <FormLabel>Cargo</FormLabel>
                  <Popover open={selectCargo} onOpenChange={setSelectCargo}>
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
                            ? cargos?.find(
                                (cargo) => cargo.id.toString() === field.value
                              )?.cargo
                            : 'Seleccionar Cargo'}
                          <ChevronsUpDown className='w-4 h-4 ml-2 opacity-50 shrink-0' />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className='w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height]'>
                      <Command>
                        <CommandInput placeholder='Procurar...' />
                        <CommandEmpty>Sem resultados</CommandEmpty>
                        <CommandGroup>
                          <CommandList>
                            {cargos?.map((cargo) => (
                              <CommandItem
                                value={cargo.cargo}
                                key={cargo.id}
                                onSelect={() => {
                                  form.setValue('cargo', cargo.id?.toString());
                                  setSelectCargo(false);
                                }}
                              >
                                {cargo.cargo}
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
              name='data'
              render={({ field }) => (
                <FormItem className='flex flex-col'>
                  <FormLabel>Data</FormLabel>
                  <div className='flex w-full gap-2'>
                    <Input
                      placeholder='DD-MM-YYYY'
                      value={field.value}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                      }}
                    />
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          size='icon'
                          className='bg-blue-500 hover:bg-blue-600'
                        >
                          <LucideCalendar className='w-4 h-4' />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent>
                        <Calendar
                          fromDate={new Date('01-01-1808')}
                          toDate={new Date('12-31-1830')}
                          locale={ptBR}
                          defaultMonth={
                            dayjs(field.value, 'DD-MM-YYYY').isValid()
                              ? dayjs(field.value, 'DD-MM-YYYY').toDate()
                              : undefined
                          }
                          selected={
                            dayjs(field.value, 'DD-MM-YYYY').isValid()
                              ? dayjs(field.value, 'DD-MM-YYYY').toDate()
                              : undefined
                          }
                          onSelect={(date) => {
                            form.setValue(
                              'data',
                              dayjs(date).format('DD-MM-YYYY')
                            );
                          }}
                          mode='single'
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='ano'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ano</FormLabel>
                  <FormControl>
                    <Input placeholder='Ex: 1890' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type='submit'
              className='self-end mt-2 bg-blue-500 rounded-2xl hover:bg-blue-600 w-fit'
              disabled={submitting}
            >
              Criar {submitting && <Loader classProp='ml-2 w-6 h-6' />}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
