import StatsCard from './_components/statscard';
import {
  GitCompareArrows,
  PersonStanding,
  Sailboat,
  Ship,
  Users,
} from 'lucide-react';

export default function AdminPage() {
  return (
    <div className='flex flex-wrap gap-2'>
      <StatsCard
        title='Total de viagens'
        value={10}
        icon={<GitCompareArrows />}
      />
      <StatsCard title='Total de Embarcações' value={20} icon={<Ship />} />
      <StatsCard title='Total de Usuários' value={30} icon={<Users />} />
      <StatsCard
        title='Total de Pessoas'
        value={40}
        icon={<PersonStanding />}
      />
    </div>
  );
}
