'use client';

import { Button } from '@/components/ui/button';
import {
  ChevronsUpDown,
  ChevronsUpDownIcon,
  LucideCalendar,
  Plus,
} from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import dayjs from 'dayjs';
import { useToast } from '@/components/ui/use-toast';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import useSWR from 'swr';
import fetcher from '@/lib/fetch';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import Loader from '@/components/loader';

const formSchema = z.object({
  data_partida: z.string(),
  data_chegada: z.string(),
  dias_viagem: z.number().gte(1, { message: 'Quantos dias durou a viagem?' }),
  tripulacao: z.number().gte(1, { message: 'Quanta tripulação?' }),
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
  const { toast } = useToast();
  const [selectPortoOrigem, setSelectPortoOrigem] = useState(false);
  const [selectPortoDestino, setSelectPortoDestino] = useState(false);
  const [searchPortoName, setSearchPortoName] = useState('');
  const [selectEmbarcacao, setSelectEmbarcacao] = useState(false);
  const [searchEmbarcacaoName, setSearchEmbarcacaoName] = useState('');
  const [searchPersonName, setSearchPersonName] = useState('');
  const [selectComandante, setSelectComandante] = useState(false);
  const [selectCapitao, setSelectCapitao] = useState(false);
  const [selectArmador, setSelectArmador] = useState(false);
  const [selectMestre, setSelectMestre] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      data_partida: '',
      data_chegada: '',
      dias_viagem: 0,
      tripulacao: 0,
      passageiros: 0,
      porto_origem: 0,
      porto_destino: 0,
      id_embarcacao: 0,
      id_comandante: 0,
      id_capitao: 0,
      id_armador: 0,
      id_mestre: 0,
    },
  });

  const { data: portos } = useSWR<Porto[]>(
    searchPortoName && '/api/porto/read/byname?name=' + searchPortoName,
    fetcher
  );

  const { data: embarcacoes } = useSWR<Embarcacao[]>(
    searchEmbarcacaoName &&
      '/api/embarcacao/read/byname?nome=' + searchEmbarcacaoName,
    fetcher
  );

  const { data: pessoas, isLoading } = useSWR<Pessoa[]>(
    searchPersonName && '/api/pessoa/read/byname?nome=' + searchPersonName,
    fetcher
  );

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className='self-end bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl w-full md:w-fit hover:scale-105 transition-all duration-500 hover:bg-gradient-to-l hover:from-blue-400 hover:to-blue-600 '>
          Adicionar Viagem
          <Plus size={24} />
        </Button>
      </SheetTrigger>
      <SheetContent className='flex flex-col h-[99%] mr-[2.5%] sm:mr-2  my-auto rounded-lg sm:max-w-[90%] md:max-w-[75%] lg:max-w-[50%] w-[95%]  '>
        <SheetHeader>
          <SheetTitle className='text-blue-500'>Adicionar Viagem</SheetTitle>
        </SheetHeader>
        <ScrollArea className='h-full overflow-y-auto no-scrollbar'>
          <Form {...form}>
            <form className='flex flex-wrap gap-2 md:gap-4 '>
              <FormField
                control={form.control}
                name='data_partida'
                render={({ field }) => (
                  <FormItem className='flex flex-col basis-1/2 grow md:grow-0'>
                    <FormLabel>Data de partida</FormLabel>
                    <div className='flex w-full gap-2'>
                      <Input
                        placeholder='DD-MM-YYYY'
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e.target.value);
                        }}
                      />
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            size='icon'
                            className='bg-blue-500 hover:bg-blue-600'
                          >
                            <LucideCalendar className='w-4 h-4' />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                          <Calendar
                            defaultMonth={
                              dayjs(field.value, 'DD-MM-YYYY').isValid()
                                ? dayjs(field.value, 'DD-MM-YYYY').toDate()
                                : undefined
                            }
                            selected={
                              dayjs(field.value, 'DD-MM-YYYY').isValid()
                                ? dayjs(field.value, 'DD-MM-YYYY').toDate()
                                : undefined
                            }
                            onSelect={(date) => {
                              form.setValue(
                                'data_partida',
                                dayjs(date).format('DD-MM-YYYY')
                              );
                            }}
                            mode='single'
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='data_chegada'
                render={({ field }) => (
                  <FormItem className='flex flex-col grow'>
                    <FormLabel>Data de Chegada</FormLabel>
                    <div className='flex w-full gap-2'>
                      <Input
                        disabled={!form.getValues('data_chegada')}
                        placeholder='DD-MM-YYYY'
                        value={field.value}
                        onChange={(e) => {
                          //if date is after data_inicio
                          if (
                            dayjs(e.target.value, 'DD-MM-YYYY').isBefore(
                              dayjs(
                                form.getValues('data_chegada'),
                                'DD-MM-YYYY'
                              )
                            )
                          ) {
                            form.setValue('data_chegada', e.target.value);
                          } else {
                            toast({
                              variant: 'destructive',
                              title: 'Erro',
                              description:
                                'Data de fim deve ser após a data de início',
                            });
                          }
                          field.onChange(e.target.value);
                        }}
                      />
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            size='icon'
                            className='bg-blue-500 hover:bg-blue-600'
                            disabled={!form.watch('data_partida')}
                          >
                            <LucideCalendar className='w-4 h-4 ' />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                          <Calendar
                            defaultMonth={
                              dayjs(field.value, 'DD-MM-YYYY').isValid()
                                ? dayjs(field.value, 'DD-MM-YYYY').toDate()
                                : undefined
                            }
                            selected={
                              dayjs(field.value, 'DD-MM-YYYY').isValid()
                                ? dayjs(field.value, 'DD-MM-YYYY').toDate()
                                : undefined
                            }
                            onSelect={(date) => {
                              if (
                                dayjs(date).isAfter(
                                  dayjs(
                                    form.watch('data_partida'),
                                    'DD-MM-YYYY'
                                  )
                                )
                              ) {
                                form.setValue(
                                  'data_chegada',
                                  dayjs(date).format('DD-MM-YYYY')
                                );
                              } else {
                                toast({
                                  variant: 'destructive',
                                  title: 'Erro',
                                  description:
                                    'Data de fim deve ser após a data de início',
                                });
                              }
                            }}
                            mode='single'
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </FormItem>
                )}
              />
              <div className='grid  grid-cols-3 grid-rows-1 grow gap-4 '>
                <FormField
                  control={form.control}
                  name='dias_viagem'
                  render={({ field }) => (
                    <FormItem className='col-span-3 md:col-span-1'>
                      <FormLabel>Dias da Viagem (Qt.)</FormLabel>
                      <FormControl>
                        <Input placeholder='123' {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='tripulacao'
                  render={({ field }) => (
                    <FormItem className='col-span-3 md:col-span-1'>
                      <FormLabel>Tripulação</FormLabel>
                      <FormControl>
                        <Input placeholder='123' {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='passageiros'
                  render={({ field }) => (
                    <FormItem className='col-span-3 md:col-span-1'>
                      <FormLabel>Passageiros (Qt.)</FormLabel>
                      <FormControl>
                        <Input placeholder='123' {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              {/* PORTOS */}
              <FormField
                control={form.control}
                name='porto_origem'
                render={({ field }) => (
                  <FormItem className='flex flex-col basis-full md:basis-1/2'>
                    <FormLabel>Porto de Origem</FormLabel>
                    <Popover
                      open={selectPortoOrigem}
                      onOpenChange={setSelectPortoOrigem}
                    >
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant='outline'
                            role='combobox'
                            className={cn(
                              'w-full justify-between',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value
                              ? portos?.find(
                                  (porto) => porto.id === field.value
                                )?.nome
                              : 'Seleccionar Porto'}
                            <ChevronsUpDownIcon className='w-4 h-4 ml-2 opacity-50 shrink-0' />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className='w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height]'>
                        <Command>
                          <CommandInput
                            onValueChange={(value) => {
                              setSearchPortoName(value);
                            }}
                            placeholder='Procurar porto...'
                          />
                          <CommandEmpty>Porto não encontrado</CommandEmpty>
                          <CommandGroup>
                            <CommandList>
                              {portos?.map((porto) => (
                                <CommandItem
                                  value={porto.nome}
                                  key={porto.id}
                                  onSelect={() => {
                                    form.setValue('porto_origem', porto.id);
                                    setSelectPortoOrigem(false);
                                  }}
                                >
                                  {porto.nome}{' '}
                                  {porto.pais?.pais && ' | ' + porto.pais.pais}
                                </CommandItem>
                              ))}
                            </CommandList>
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='porto_destino'
                render={({ field }) => (
                  <FormItem className='flex flex-col grow'>
                    <FormLabel>Porto de Destino</FormLabel>
                    <Popover
                      open={selectPortoDestino}
                      onOpenChange={setSelectPortoDestino}
                    >
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant='outline'
                            role='combobox'
                            className={cn(
                              'w-full justify-between',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value
                              ? portos?.find(
                                  (porto) => porto.id === field.value
                                )?.nome
                              : 'Seleccionar Porto'}
                            <ChevronsUpDownIcon className='w-4 h-4 ml-2 opacity-50 shrink-0' />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className='w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height]'>
                        <Command>
                          <CommandInput
                            onValueChange={(value) => {
                              setSearchPortoName(value);
                            }}
                            placeholder='Procurar porto...'
                          />
                          <CommandEmpty>Porto não encontrado</CommandEmpty>
                          <CommandGroup>
                            <CommandList>
                              {portos?.map((porto) => (
                                <CommandItem
                                  value={porto.nome}
                                  key={porto.id}
                                  onSelect={() => {
                                    form.setValue('porto_origem', porto.id);
                                    setSelectPortoDestino(false);
                                  }}
                                >
                                  {porto.nome}{' '}
                                  {porto.pais?.pais && ' | ' + porto.pais.pais}
                                </CommandItem>
                              ))}
                            </CommandList>
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />
              {/* EMBARCAÇÃO */}
              <FormField
                control={form.control}
                name='id_embarcacao'
                render={({ field }) => (
                  <FormItem className='flex flex-col grow w-full'>
                    <FormLabel>Embarcação</FormLabel>
                    <Popover
                      open={selectEmbarcacao}
                      onOpenChange={setSelectEmbarcacao}
                    >
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant='outline'
                            role='combobox'
                            className={cn(
                              'w-full justify-between',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value
                              ? embarcacoes?.find(
                                  (embarcacao) => embarcacao.id === field.value
                                )?.nome
                              : 'Seleccionar Embarcação'}
                            <ChevronsUpDownIcon className='w-4 h-4 ml-2 opacity-50 shrink-0' />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className='w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height]'>
                        <Command>
                          <CommandInput
                            onValueChange={(value) => {
                              setSearchEmbarcacaoName(value);
                            }}
                            placeholder='Procurar embarcação...'
                          />
                          <CommandEmpty>Embarcação não encontrada</CommandEmpty>
                          <CommandGroup>
                            <CommandList>
                              {embarcacoes?.map((embarcacao) => (
                                <CommandItem
                                  value={embarcacao.nome}
                                  key={embarcacao.id}
                                  onSelect={() => {
                                    form.setValue(
                                      'id_embarcacao',
                                      embarcacao.id
                                    );
                                    setSelectEmbarcacao(false);
                                  }}
                                >
                                  {embarcacao.nome} |{' '}
                                  {embarcacao.tipo_embarcacao.tipo}
                                </CommandItem>
                              ))}
                            </CommandList>
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />
              {/* COMANDANTE */}
              <FormField
                control={form.control}
                name='id_comandante'
                render={({ field }) => (
                  <FormItem className='flex flex-col basis-full md:basis-1/2'>
                    <FormLabel>Comandante</FormLabel>
                    <Popover
                      open={selectComandante}
                      onOpenChange={setSelectComandante}
                    >
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant='outline'
                            role='combobox'
                            className={cn(
                              'w-full justify-between',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value
                              ? pessoas?.find(
                                  (pessoa) => pessoa.id === field.value
                                )?.nome
                              : 'Seleccionar Comandante'}
                            <ChevronsUpDown className='w-4 h-4 ml-2 opacity-50 shrink-0' />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className='w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height]'>
                        <Command>
                          <CommandInput
                            onValueChange={(value) => {
                              setSearchPersonName(value);
                            }}
                            placeholder='Procurar comandante...'
                          />
                          <CommandEmpty>Pessoa não encontrada</CommandEmpty>
                          <CommandGroup>
                            <CommandList>
                              {pessoas?.map((pessoa) => (
                                <CommandItem
                                  value={pessoa.nome}
                                  key={pessoa.id}
                                  onSelect={() => {
                                    form.setValue('id_comandante', pessoa.id);
                                    setSelectComandante(false);
                                  }}
                                >
                                  {pessoa.nome}
                                </CommandItem>
                              ))}
                            </CommandList>
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />
              {/* CAPITÃO */}
              <FormField
                control={form.control}
                name='id_capitao'
                render={({ field }) => (
                  <FormItem className='flex flex-col grow'>
                    <FormLabel>Capitão</FormLabel>
                    <Popover
                      open={selectCapitao}
                      onOpenChange={setSelectCapitao}
                    >
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant='outline'
                            role='combobox'
                            className={cn(
                              'w-full justify-between',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value
                              ? pessoas?.find(
                                  (pessoa) => pessoa.id === field.value
                                )?.nome
                              : 'Seleccionar Capitão'}
                            <ChevronsUpDown className='w-4 h-4 ml-2 opacity-50 shrink-0' />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className='w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height]'>
                        <Command>
                          <CommandInput
                            onValueChange={(value) => {
                              setSearchPersonName(value);
                            }}
                            placeholder='Procurar capitão...'
                          />
                          <CommandEmpty>Pessoa não encontrada</CommandEmpty>
                          <CommandGroup>
                            <CommandList>
                              {pessoas?.map((pessoa) => (
                                <CommandItem
                                  value={pessoa.nome}
                                  key={pessoa.id}
                                  onSelect={() => {
                                    form.setValue('id_capitao', pessoa.id);
                                    setSelectCapitao(false);
                                  }}
                                >
                                  {pessoa.nome}
                                </CommandItem>
                              ))}
                            </CommandList>
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />
              {/* ARMADOR */}
              <FormField
                control={form.control}
                name='id_armador'
                render={({ field }) => (
                  <FormItem className='flex flex-col basis-full md:basis-1/2'>
                    <FormLabel>Armador</FormLabel>
                    <Popover
                      open={selectArmador}
                      onOpenChange={setSelectArmador}
                    >
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant='outline'
                            role='combobox'
                            className={cn(
                              'w-full justify-between',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value
                              ? pessoas?.find(
                                  (pessoa) => pessoa.id === field.value
                                )?.nome
                              : 'Seleccionar Pessoa'}
                            <ChevronsUpDown className='w-4 h-4 ml-2 opacity-50 shrink-0' />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className='w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height]'>
                        <Command>
                          <CommandInput
                            onValueChange={(value) => {
                              setSearchPersonName(value);
                            }}
                            placeholder='Procurar armador...'
                          />
                          <CommandEmpty>Pessoa não encontrada</CommandEmpty>
                          <CommandGroup>
                            <CommandList>
                              {pessoas?.map((pessoa) => (
                                <CommandItem
                                  value={pessoa.nome}
                                  key={pessoa.id}
                                  onSelect={() => {
                                    form.setValue('id_armador', pessoa.id);
                                    setSelectArmador(false);
                                  }}
                                >
                                  {pessoa.nome}
                                </CommandItem>
                              ))}
                            </CommandList>
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />
              {/* MESTRE */}
              <FormField
                control={form.control}
                name='id_mestre'
                render={({ field }) => (
                  <FormItem className='flex flex-col grow'>
                    <FormLabel>Mestre</FormLabel>
                    <Popover open={selectMestre} onOpenChange={setSelectMestre}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant='outline'
                            role='combobox'
                            className={cn(
                              'w-full justify-between',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value
                              ? pessoas?.find(
                                  (pessoa) => pessoa.id === field.value
                                )?.nome
                              : 'Seleccionar Pessoa'}
                            <ChevronsUpDown className='w-4 h-4 ml-2 opacity-50 shrink-0' />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className='w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height]'>
                        <Command>
                          <CommandInput
                            onValueChange={(value) => {
                              setSearchPersonName(value);
                            }}
                            placeholder='Procurar mestre...'
                          />
                          <CommandEmpty>Pessoa não encontrada</CommandEmpty>
                          <CommandGroup>
                            <CommandList>
                              {pessoas?.map((pessoa) => (
                                <CommandItem
                                  value={pessoa.nome}
                                  key={pessoa.id}
                                  onSelect={() => {
                                    form.setValue('id_mestre', pessoa.id);
                                    setSelectMestre(false);
                                  }}
                                >
                                  {pessoa.nome}
                                </CommandItem>
                              ))}
                            </CommandList>
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />
              <div className='w-full  text-right'>
                <Button
                  disabled={submitting}
                  className=' mt-2 bg-blue-500 rounded-2xl hover:bg-blue-600 w-full md:w-fit'
                >
                  {submitting ? (
                    <>
                      <Loader classProp='w-4 h-4 mr-2 animate-spin' /> A
                      adicionar...
                    </>
                  ) : (
                    'Guardar'
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
