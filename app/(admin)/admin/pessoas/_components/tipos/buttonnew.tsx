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
import { useState } from 'react';
import { PlusIcon, UserPlus } from 'lucide-react';

import Loader from '@/components/loader';
import { toast } from '@/components/ui/use-toast';

const formSchema = z.object({
  tipo: z.string().min(1, { message: 'Escreva o nome do Tipo' }),
});

export default function NovoTipo(props: { mutate: () => void }) {
  const { mutate } = props;
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tipo: '',
    },
  });

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    setSubmitting(true);
    const result = await fetch('/api/tiposdepassageiros/create', {
      method: 'POST',
      body: JSON.stringify(values),
    });

    if (result.ok) {
      setOpen(false);
      form.reset();
      mutate();
      toast({
        className: 'bg-green-200',
        title: 'Sucesso',
        duration: 5000,
        description: 'Tipo criado com sucesso',
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Erro',
        duration: 5000,
        description: 'Erro ao criar tipo',
      });
    }
    setSubmitting(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className='self-end w-full transition-all duration-500 bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl md:w-fit hover:scale-105 hover:bg-gradient-to-l hover:from-blue-400 hover:to-blue-600'>
          Novo Tipo <PlusIcon size={24} className='ml-2' />
        </Button>
      </DialogTrigger>
      <DialogContent className='w-11/12 p-6 rounded-lg max-h-[95%] overflow-y-scroll'>
        <DialogHeader>
          <DialogTitle className='text-blue-500'>
            Criar novo Tipo de Passageiro
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className='flex flex-col gap-2'
          >
            <FormField
              control={form.control}
              name='tipo'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo</FormLabel>
                  <FormControl>
                    <Input placeholder='Ex: Nobre' {...field} />
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
