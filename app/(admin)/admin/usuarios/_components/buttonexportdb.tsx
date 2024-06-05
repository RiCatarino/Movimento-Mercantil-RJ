'use client';

import { Button } from '@/components/ui/button';

import { useState } from 'react';
import Loader from '@/components/loader';
import { useToast } from '@/components/ui/use-toast';
import { DatabaseBackupIcon } from 'lucide-react';

export default function BotaoExportarBD() {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit() {
    setSubmitting(true);
    const response = await fetch('/api/exportdb');
    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'backup.zip';
      document.body.appendChild(a);
      a.click();
      a.remove();
      toast({
        className: 'bg-green-200',
        title: 'Sucesso',
        duration: 5000,
        description: 'Utilizador criado com sucesso',
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Erro',
        duration: 5000,
        description: 'Erro ao criar utilizador',
      });
    }
    setSubmitting(false);
  }

  return (
    <Button
      disabled={submitting}
      onClick={handleSubmit}
      className='self-end w-full transition-all duration-500 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-xl md:w-fit hover:scale-105 hover:bg-gradient-to-l hover:from-blue-yellow hover:to-yellow-600 '
    >
      {submitting ? (
        <>
          A exportar base de dados...
          <Loader classProp='ml-2 w-4 h-4' />
        </>
      ) : (
        <>
          Exportar base de dados
          <DatabaseBackupIcon className='ml-2' size={24} />
        </>
      )}
    </Button>
  );
}
