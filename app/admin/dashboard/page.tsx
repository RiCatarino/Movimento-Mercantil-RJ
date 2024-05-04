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
      <StatsCard title='Viagens' value={10} icon={<GitCompareArrows />} />
      <StatsCard title='Embarcações' value={20} icon={<Ship />} />
      <StatsCard title='Tipos de Embarcações' value={20} icon={<Ship />} />

      <StatsCard title='Usuários' value={30} icon={<Users />} />
      <StatsCard
        title='Total de Pessoas'
        value={40}
        icon={<PersonStanding />}
      />
      <StatsCard
        title='Títulos de Nobreza'
        value={50}
        icon={<PersonStanding />}
      />
      <StatsCard
        title='Unidades de Medida'
        value={60}
        icon={<PersonStanding />}
      />
      <StatsCard
        title='Unidades de Medida'
        value={60}
        icon={<PersonStanding />}
      />
    </div>
  );
}
