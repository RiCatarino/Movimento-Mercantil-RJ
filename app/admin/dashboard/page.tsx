import { Button } from '@/components/ui/button';
import StatsCard from './_components/statscard';
import { Sailboat, Ship, Users } from 'lucide-react';
import {
  IconDirectionSign,
  IconFriends,
  IconUserScreen,
  IconUsersGroup,
} from '@tabler/icons-react';

export default function AdminPage() {
  return (
    <div className='flex flex-wrap gap-2'>
      <StatsCard
        title='Total de viagens'
        value={10}
        icon={<IconDirectionSign />}
      />
      <StatsCard title='Total de Embarcações' value={20} icon={<Ship />} />
      <StatsCard
        title='Total de Usuários'
        value={30}
        icon={<IconUserScreen />}
      />
      <StatsCard
        title='Total de Pessoas'
        value={40}
        icon={<IconUsersGroup />}
      />
    </div>
  );
}
