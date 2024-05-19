'use client';
import { AnimatedTooltip } from '@/components/ui/animated-tooltip';
import React from 'react';

const people = [
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
  {
    id: 4,
    name: 'Laercio Cruvinel Júnior',
    designation: 'Docente do Departamento de Ciências e Tecnologias -UAL',
    image:
      'https://lh6.googleusercontent.com/SVoY-JU7PrJgCG6ttphXGpsnIqvtcwGHJlEl5RhXKm66WVbF3IptTq_CkXD-lyitu1iM-d6ygE0I_ihrDmuVZePEoMKD4yn2vl0l05PZVN-CkyiKNVwXpeCrbs3D9alhiQ=w1280',
  },
];

export function AnimatedTooltipPreview() {
  return (
    <div className='flex flex-row items-center justify-center w-full mb-10'>
      <AnimatedTooltip items={people} />
    </div>
  );
}
