import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import useSWR from 'swr';
import fetcher from '@/lib/fetch';
import { useState } from 'react';

export default function AddOwner(props: { mutate: () => void }) {
  const { mutate } = props;
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const { data: tiposEmbarcacao, isLoading } = useSWR<TipoEmbarcacao[]>(
    '/api/embarcacao/read/tipos',
    fetcher
  );

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
        <Button className='rounded-xl bg-blue-500'>
          Adicionar Proprietário
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar Embarcação</DialogTitle>
          <DialogDescription asChild>
            {/* <Form {...form}>
             
            </Form> */}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
