import { Partners } from './_components/partners';
import { People } from './_components/people';
import { Titulo } from './_components/title';

export default function Sobre() {
  return (
    <div className='flex flex-col items-center justify-center gap-4 p-4 mt-10 overflow-x-hidden lg:p-0'>
      <Titulo />
      <span className='lg:mx-auto w-full h-[50%] lg:w-[50%] text-justify bg-white p-4 rounded-3xl dark:bg-slate-900'>
        O projeto Circuitos Oceânicos tem por objetivo mapear e analisar as
        petições enviadas da América portuguesa ao Conselho Ultramarino e
        Secretário de Estado, entre os séculos XVIII e XIX, tomando como central
        a participação dos vários agentes sociais e os caminhos institucionais e
        respostas que geravam. Neste sentido, trata-se não apenas de um esforço
        inédito de entendê-las conjuntamente, bem como de uma proposta ousada de
        problematização sobre a comunicação jurídico-política imperial. Seu
        recorte inicial justifica-se pela criação das Secretarias de Estado em
        1736, entre elas a Secretaria de Estado da Marinha e Ultramar, e o final
        pela alteração gerada com a vinda da Corte ao Rio de Janeiro. Ele é
        fruto de uma parceria entre pesquisadoras da área de História e de
        Dados, coordenado por Andréa Slemian (UNIFESP, São Paulo), Renata Silva
        Fernandes (UFG, Goiás), Roberta Giannubilo Stumpf (Universidade Autónoma
        de Lisboa, UAL) e Valéria Pequeno (Escola Superior Náutica Infante D.
        Henrique, Lisboa). Um dos seus principais produtos é uma Base de Dados
        que tem por finalidade o mapeamento das demandas enviadas da América
        portuguesa ao Reino de Portugal, bem como dos seus trâmites e ordens
        provocadas a partir delas em ambos os lados do Atlântico, na
        periodização destacada. A Base, desenvolvida por Paulo Ricardo Rodrigues
        Bastos (mestrando na UAL) sob a orientação de Laércio Cruvinel (UAL,
        Lisboa), está sendo atualmente alimentada a partir da documentação do
        Conselho Ultramarino e da Secretária de Estado da Marinha e do Ultramar,
        sob a guarda do Arquivo Ultramarino de Lisboa (AHU) - em grande parte,
        disponibilizada online pelo Projeto Resgate (BNDigital). Pela magnitude
        do tema e da documentação, delimita-se sua análise às capitanias de
        Minas Gerais, São Paulo, Mato Grosso e Goiás. O projeto possui
        atualmente financiamento da FAPESP (processo número 2021/09104-0).
      </span>
      <People />
      <Partners />
    </div>
  );
}
