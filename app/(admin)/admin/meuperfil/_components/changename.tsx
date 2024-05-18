'use client';

import { useSession } from '@/app/SessionContext';
import Loader from '@/components/loader';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  nome: z.string().min(1, { message: 'Nome inválido' }),
});
export default function ChangeName() {
  const [submitting, setSubmitting] = useState(false);
  const { user } = useSession();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: user?.nome,
    },
  });

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    setSubmitting(true);
    const result = await fetch('/api/user/update/name', {
      method: 'PUT',
      body: JSON.stringify(values),
    });
    if (result.ok) {
      form.setValue('nome', values.nome);
      router.refresh();
      toast({
        className: 'bg-green-200',
        title: 'Sucesso',
        duration: 5000,
        description: 'Nome alterada com sucesso.',
      });
    } else {
      toast({
        className: 'bg-red-200',
        title: 'Erro',
        duration: 5000,
        description: 'Erro ao alterar o nome',
      });
    }

    setSubmitting(false);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-blue-500'>Alterar senha</CardTitle>
        <CardDescription>Pode alterar aqui a sua senha</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className='flex flex-col gap-2'
          >
            <FormField
              control={form.control}
              disabled={submitting}
              name='nome'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className='flex justify-end h-max'>
              <Button
                disabled={submitting}
                type='submit'
                className='self-end mt-2 bg-blue-500 rounded-2xl hover:bg-blue-600 w-fit '
              >
                {submitting && <Loader classProp='ml-2 w-6 h-6' />}
                Alterar nome
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
