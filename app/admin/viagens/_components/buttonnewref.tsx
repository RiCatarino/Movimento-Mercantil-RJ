import { Button } from '@/components/ui/button';
import { CalendarIcon, Loader, Plus } from 'lucide-react';
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
import { Form, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import dayjs from 'dayjs';
import { Calendar } from '@/components/ui/calendar';

const formSchema = z.object({
  data: z.string().min(1, { message: 'Nome muito curto' }),
  nome_periodico: z.string().min(1, { message: 'Nome muito curto' }),
});

import { useToast } from '@/components/ui/use-toast';

export default function ButtonNewRef(props: {
  mutate: () => void;
  viagem_id: number | undefined;
}) {
  const { viagem_id, mutate } = props;
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      data: '',
      nome_periodico: '',
    },
  });

  console.log(viagem_id);

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    setSubmitting(true);
    const result = await fetch('/api/referencia_documental/create', {
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
        description: 'Referência Documental adicionada com sucesso',
      });
      form.reset();
      setOpen(false);
    } else {
      toast({
        variant: 'destructive',
        title: 'Erro',
        duration: 5000,
        description: 'Erro ao adicionadar referência documental',
      });
    }
    setSubmitting(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className='mt-2 mb-2 bg-blue-400 rounded-lg  float-end'>
          Adicionar Escala <Plus size={24} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='text-blue-500'>
            Adicionar Referência Documental
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            className='flex flex-col gap-2'
            onSubmit={form.handleSubmit(handleSubmit)}
          >
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
                          <CalendarIcon className='w-4 h-4' />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent>
                        <Calendar
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
              name='nome_periodico'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Periódico</FormLabel>
                  <Input
                    {...field}
                    placeholder='Nome do Periódico'
                    className='w-full'
                  />
                </FormItem>
              )}
            />
            <Button
              disabled={submitting}
              className='self-end mt-2 bg-blue-500 rounded-2xl hover:bg-blue-600 w-fit'
            >
              {submitting ? (
                <>
                  <Loader className='w-4 h-4 mr-2 animate-spin' /> A
                  adicionar...
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
