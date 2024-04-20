import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function BotaoNovaViagem() {
  return (
    <Button
      size='icon'
      variant='ghost'
      className=' text-blue-400 rounded-full flex-end'
    >
      <Plus size={24} />
    </Button>
  );
}
