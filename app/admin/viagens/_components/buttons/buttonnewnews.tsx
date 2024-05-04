import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
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

const formSchema = z.object({
  assunto: z.string().min(1, { message: 'Nome muito curto' }),
});

import { useToast } from '@/components/ui/use-toast';
import { Textarea } from '@/components/ui/textarea';
import Loader from '@/components/loader';

export default function ButtonNewNews(props: {
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
      assunto: '',
    },
  });

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    setSubmitting(true);
    const result = await fetch('/api/noticia/create', {
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
        description: 'Notícia adicionada com sucesso',
      });
      form.reset();
      setOpen(false);
    } else {
      toast({
        variant: 'destructive',
        title: 'Erro',
        duration: 5000,
        description: 'Erro ao adicionadar notícia',
      });
    }
    setSubmitting(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className='mt-2 mb-2 bg-blue-400 rounded-lg  float-end'>
          Adicionar Notícia <Plus size={24} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='text-blue-500'>Adicionar Notícia</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            className='flex flex-col gap-2'
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <FormField
              control={form.control}
              name='assunto'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assunto</FormLabel>
                  <Textarea
                    {...field}
                    rows={10}
                    placeholder='Nome do Periódico h-fit'
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
