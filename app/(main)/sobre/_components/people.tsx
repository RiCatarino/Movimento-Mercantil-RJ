'use client';
import { AnimatedTooltip } from '@/components/ui/animated-tooltip';
import React from 'react';

const people1 = [
  {
    id: 1,
    name: 'Ricardo Catarino',
    designation: 'Estudante de Engenharia Informática',
    image: 'https://avatars.githubusercontent.com/u/29524722?v=4',
  },
  {
    id: 2,
    name: 'José Carreira',
    designation: 'Estudante de Engenharia Informática',
    image: 'https://avatars.githubusercontent.com/u/87700998?v=4',
  },
  {
    id: 3,
    name: 'António Palma',
    designation: 'Estudante de Engenharia Informática',
    image: 'https://avatars.githubusercontent.com/u/63667943?v=4',
  },
];

const people2 = [
  {
    id: 4,
    name: 'Laercio Cruvinel Júnior',
    designation: 'Docente do Departamento de Ciências e Tecnologias -UAL',
    image: 'https://avatars.githubusercontent.com/u/43696678?v=4',
  },
];
export function People() {
  return (
    <div className='flex flex-col items-center justify-center w-full gap-8 mb-10 md:gap-0 lg:flex-row'>
      <div className='flex flex-row '>
        <AnimatedTooltip items={people1} />
      </div>
      <div className='flex flex-row '>
        <AnimatedTooltip items={people2} />
      </div>
    </div>
  );
}
