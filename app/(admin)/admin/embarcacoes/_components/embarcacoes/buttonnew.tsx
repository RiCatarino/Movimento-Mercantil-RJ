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
import { useState } from 'react';
import { Plus } from 'lucide-react';
import Loader from '@/components/loader';
import { useToast } from '@/components/ui/use-toast';

const formSchema = z.object({
  nome: z.string().min(1, { message: 'Nome muito curto' }),
  tipo: z.string().min(1, { message: 'Selecione um tipo' }),
  observacao: z.string().optional(),
});

export default function NewVessel(props: { mutate: () => void }) {
  const { mutate } = props;
  const { toast } = useToast();
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
      toast({
        className: 'bg-green-200',
        title: 'Sucesso',
        duration: 5000,
        description: 'Embarcação adicionada com sucesso',
      });
    } else if (result.status === 409) {
      toast({
        variant: 'destructive',
        title: 'Erro',
        duration: 5000,
        description: 'Esta embarcação já existe',
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Erro',
        duration: 5000,
        description: 'Erro ao adicionar embarcação',
      });
    }
    setSubmitting(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className='self-end w-full transition-all duration-500 bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl md:w-fit hover:scale-105 hover:bg-gradient-to-l hover:from-blue-400 hover:to-blue-600 '>
          Adicionar Embarcação <Plus className='ml-2' size={24} />
        </Button>
      </DialogTrigger>
      <DialogContent
        className=' min-w-[75%] w-11/12 p-6 rounded-lg max-h-[95%] overflow-y-scroll'
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle className='text-blue-500'>Criar Embarcação</DialogTitle>
        </DialogHeader>
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
                  <Select
                    name='tipos'
                    onValueChange={field.onChange}
                    value={field?.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Selecione um tipo' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className='overflow-visible '>
                      {tiposEmbarcacao?.map((tipo) => (
                        <SelectItem key={tipo.id} value={tipo.id.toString()}>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>{tipo.tipo}</TooltipTrigger>
                              <TooltipContent
                                side='right'
                                className='p-2 ml-10 overflow-y-auto rounded-lg max-w-96 max-h-96'
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
