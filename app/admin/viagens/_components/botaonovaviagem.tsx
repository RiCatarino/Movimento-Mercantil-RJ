import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { z } from 'zod';

const formSchema = z.object({
  data_partida: z.string(),
  data_chegada: z.string(),
  dias_viagem: z.number().gte(1, { message: 'Quantos dias durou a viagem?' }),
  tripulação: z.number().gte(1, { message: 'Quantoa tripulação?' }),
  passageiros: z
    .number()
    .gte(0, { message: 'Tem de ser igual o maior que 0.' }),
  porto_origem: z.number().min(1, { message: 'Tem de selecionar um porto.' }),
  porto_destino: z.number().min(1, { message: 'Tem de selecionar um porto.' }),
  id_embarcacao: z
    .number()
    .min(1, { message: 'Tem de selecionar uma embarcação.' }),
  id_comandante: z
    .number()
    .min(1, { message: 'Tem de selecionar um comandante.' }),
  id_capitao: z.number().min(1, { message: 'Tem de selecionar um capitão.' }),
  id_armador: z.number().min(1, { message: 'Tem de selecionar um armador.' }),
  id_mestre: z.number().min(1, { message: 'Tem de selecionar um mestre.' }),
});

export default function BotaoNovaViagem() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size='icon'
          variant='ghost'
          className=' text-blue-400 rounded-full flex-end'
        >
          <Plus size={24} />
        </Button>
      </SheetTrigger>
      <SheetContent className='h-[99%] mr-[2.5%] sm:mr-2  my-auto rounded-lg sm:max-w-[90%] md:max-w-[75%] lg:max-w-[50%] w-[95%]  '>
        <SheetHeader>
          <SheetTitle>Adicionar Viagem</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
