import { Button } from '@/components/ui/button';
import { IconPlus } from '@tabler/icons-react';
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
import { Textarea } from '@/components/ui/textarea';
import useSWR from 'swr';
import fetcher from '@/lib/fetch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { toast } from 'sonner';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  nome: z.string().min(1, { message: 'Nome muito curto' }),
  tipo: z.string().min(1, { message: 'Selecione um tipo' }),
  observacao: z
    .string()
    .min(1, { message: 'Tem de adicionar uma observação.' }),
});

export default function NewVessel(props: { mutate: () => void }) {
  const { mutate } = props;
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: '',
      tipo: '',
      observacao: '',
    },
  });

  const { data: tiposEmbarcacao, isLoading } = useSWR<TipoEmbarcacao[]>(
    '/api/embarcacao/read/tipos',
    fetcher
  );

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    setSubmitting(true);
    const result = await fetch('/api/embarcacao/create', {
      method: 'POST',
      body: JSON.stringify(values),
    });

    if (result.ok) {
      setOpen(false);
      form.reset();
      mutate();
      toast.success('Embarcação criada com sucesso');
    } else {
      toast.error('Erro ao criar embarcação');
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
          <IconPlus className='text-black' />
        </Button>
      </DialogTrigger>
      <DialogContent
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>Criar Embarcação</DialogTitle>
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
                        <Input placeholder='Ex: Nau do Brazil' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='tipo'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field?.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder='Selecione um tipo' />
                          </SelectTrigger>
                          <SelectContent className=' overflow-visible'>
                            {tiposEmbarcacao?.map((tipo) => (
                              <SelectItem
                                key={tipo.id}
                                value={tipo.id.toString()}
                              >
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger>{tipo.tipo}</TooltipTrigger>
                                    <TooltipContent
                                      side='right'
                                      className=' max-w-96 p-2  rounded-lg ml-10 max-h-96 overflow-y-auto'
                                    >
                                      <p className='font-bold'>Descrição: </p>
                                      <br />
                                      <p>{tipo.texto_descritivo}</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='observacao'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Observação</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder='Escreva aqui as observações'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type='submit'
                  className='mt-2 self-end rounded-2xl bg-blue-500 hover:bg-blue-600 w-fit'
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                      Criando...
                    </>
                  ) : (
                    'Criar'
                  )}
                </Button>
              </form>
            </Form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
