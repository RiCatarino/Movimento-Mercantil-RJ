import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { SetStateAction, useEffect, useState } from 'react';
import Loader from '@/components/loader';
import { useToast } from '@/components/ui/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const formSchema = z.object({
  id: z.string(),
  email: z.string().email({ message: 'Email inválido' }),
  nome: z.string().min(1, { message: 'Nome inválido' }),
  role: z.enum(['ADMIN', 'EDITOR']),
});

export default function DialogEditarUsuario(props: {
  mutate: () => void;
  user_id: string | undefined;
  nome: string | undefined;
  email: string | undefined;
  role: 'ADMIN' | 'EDITOR' | undefined;
  open: boolean;
  setOpen: (value: SetStateAction<boolean>) => void;
}) {
  const { mutate, user_id, nome, email, role, open, setOpen } = props;
  const { toast } = useToast();
  // const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [selectPais, setSelectPais] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: user_id,
      email: email,
      nome: nome,
      role: role,
    },
  });

  useEffect(() => {
    form.reset({
      id: user_id,
      email: email,
      nome: nome,
      role: role,
    });
  }, [user_id, nome, email, role]);

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    setSubmitting(true);
    const result = await fetch('/api/user/update', {
      method: 'PUT',
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
        description: 'Usuário editado com sucesso',
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Erro',
        duration: 5000,
        description: 'Erro ao editar usuário',
      });
    }
    setSubmitting(false);
  }

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className=' w-11/12 p-6 rounded-lg max-h-[95%] overflow-y-scroll'
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <DialogHeader>
            <DialogTitle className='text-blue-500'>Editar Usuário</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className='flex flex-col gap-2'
            >
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type='email' className='rounded-xl' {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='nome'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input className='rounded-xl' {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='role'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Função</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue>{field.value}</SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='ADMIN'>Admin</SelectItem>
                          <SelectItem value='EDITOR'>Editor</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                type='submit'
                className='self-end mt-2 bg-blue-500 rounded-2xl hover:bg-blue-600 w-fit'
                disabled={
                  submitting ||
                  (form.watch().nome == nome &&
                    form.watch().email == email &&
                    form.watch().role == role)
                }
              >
                Editar {submitting && <Loader classProp='ml-2 w-6 h-6' />}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
