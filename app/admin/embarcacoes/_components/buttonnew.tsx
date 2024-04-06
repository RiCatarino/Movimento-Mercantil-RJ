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
import { ScrollArea } from '@/components/ui/scroll-area';

const formSchema = z.object({
  nome: z.string().min(1, { message: 'Nome muito curto' }),
  tipo: z.string(),
  observacao: z.string(),
  proprietario: z.string(),
});

export default function NewVessel() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: '',
      tipo: undefined,
      observacao: '',
      proprietario: undefined,
    },
  });

  const { data: tiposEmbarcacao, isLoading } = useSWR<TipoEmbarcacao[]>(
    '/api/embarcacao/read/tipos',
    fetcher
  );

  console.table(form.getValues());

  function handleSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Dialog>
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
              <form onSubmit={form.handleSubmit(handleSubmit)}>
                <FormField
                  control={form.control}
                  name='nome'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <Input placeholder='shadcn' {...field} />
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
                <FormField
                  control={form.control}
                  name='proprietario'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Proprietário</FormLabel>
                      <FormControl>
                        <Input placeholder='shadcn' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type='submit' className='mt-2'>
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
