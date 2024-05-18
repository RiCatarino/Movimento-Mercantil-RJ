'use client';

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
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const passwordSchema = z
  .object({
    password: z.string().min(4),
    confirmPassword: z.string().min(4),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'As senhas não coincidem',
  });

export default function ChangePassword() {
  const [submitting, setSubmitting] = useState(false);
  const form = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const router = useRouter();

  async function handleSubmit(values: z.infer<typeof passwordSchema>) {
    setSubmitting(true);
    const result = await fetch('/api/user/update/password', {
      method: 'PUT',
      body: JSON.stringify(values),
    });
    if (result.ok) {
      form.reset();
      toast({
        className: 'bg-green-200',
        title: 'Sucesso',
        duration: 5000,
        description:
          'Senha alterada com sucesso, será redirecionado para o login',
      });
      await fetch('/api/user/signout', {
        method: 'GET',
      }).then(() => {
        setTimeout(() => {
          router.push('/auth/signin');
        }, 2000);
      });
    } else {
      toast({
        className: 'bg-red-200',
        title: 'Erro',
        duration: 5000,
        description: 'Erro ao alterar a senha',
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
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input type='password' {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              disabled={submitting}
              name='confirmPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmar senha</FormLabel>
                  <FormControl>
                    <Input type='password' {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            {form.formState.errors.confirmPassword && (
              <FormMessage>
                {form.formState.errors.confirmPassword.message}
              </FormMessage>
            )}
            <Button
              disabled={submitting}
              type='submit'
              className='self-end mt-2 bg-blue-500 rounded-2xl hover:bg-blue-600 w-fit'
            >
              {submitting && <Loader classProp='ml-2 w-6 h-6' />}
              Alterar senha
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
