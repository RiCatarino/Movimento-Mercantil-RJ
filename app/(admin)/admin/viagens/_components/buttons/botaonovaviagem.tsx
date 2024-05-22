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
import useSWR, { mutate } from 'swr';
import fetcher from '@/lib/fetch';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import Loader from '@/components/loader';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
var customParseFormat = require('dayjs/plugin/customParseFormat');
dayjs.extend(customParseFormat);
import { ptBR } from 'date-fns/locale';

const formSchema = z.object({
  data_viagem: z.string().nullable(),
  data_chegada: z.string().nullable(),
  data_rio: z.string().nullable(),
  dias_viagem: z.string(),
  tripulacao: z.string(),
  passageiros: z.string(),
  porto_origem: z.number().nullable(),
  dias_porto_origem: z.string(),
  porto_destino: z.number().nullable(),
  dias_porto_destino: z.string(),
  id_embarcacao: z.number().nullable(),
  id_comandante: z.number().nullable(),
  id_capitao: z.number().nullable(),
  id_armador: z.number().nullable(),
  id_mestre: z.number().nullable(),
  entrada_sahida: z.string().nullable(),
});

export default function BotaoNovaViagem() {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [selectPortoOrigem, setSelectPortoOrigem] = useState(false);
  const [selectPortoDestino, setSelectPortoDestino] = useState(false);
  const [searchPortoName, setSearchPortoName] = useState('');
  const [selectEmbarcacao, setSelectEmbarcacao] = useState(false);
  const [searchEmbarcacaoName, setSearchEmbarcacaoName] = useState('');
  const [searchComandanteName, setSearchComandanteName] = useState('');
  const [searchCapitaoName, setSearchCapitaoName] = useState('');
  const [searchArmadorName, setSearchArmadorName] = useState('');
  const [searchMestreName, setSearchMestreName] = useState('');
  const [selectComandante, setSelectComandante] = useState(false);
  const [selectCapitao, setSelectCapitao] = useState(false);
  const [selectArmador, setSelectArmador] = useState(false);
  const [selectMestre, setSelectMestre] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      data_viagem: '',
      data_chegada: '',
      data_rio: '',
      dias_viagem: '',
      tripulacao: '',
      passageiros: '',
      porto_origem: null,
      dias_porto_origem: '',
      porto_destino: null,
      dias_porto_destino: '',
      id_embarcacao: null,
      id_comandante: null,
      id_capitao: null,
      id_armador: null,
      id_mestre: null,
      entrada_sahida: null,
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

  const { data: comandantes } = useSWR<Pessoa[]>(
    searchComandanteName &&
      '/api/pessoa/read/byname?nome=' + searchComandanteName,
    fetcher
  );

  const { data: capitoes } = useSWR<Pessoa[]>(
    searchCapitaoName && '/api/pessoa/read/byname?nome=' + searchCapitaoName,
    fetcher
  );

  const { data: armadores } = useSWR<Pessoa[]>(
    searchArmadorName && '/api/pessoa/read/byname?nome=' + searchArmadorName,
    fetcher
  );

  const { data: mestres } = useSWR<Pessoa[]>(
    searchMestreName && '/api/pessoa/read/byname?nome=' + searchMestreName,
    fetcher
  );

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    setSubmitting(true);
    if (values.data_rio || values.id_embarcacao || values.entrada_sahida)
      try {
        await fetcher('/api/viagem/create', {
          method: 'POST',
          body: JSON.stringify(values),
        });
        form.reset();
        toast({
          className: 'bg-green-200',
          title: 'Sucesso',
          duration: 5000,
          description: 'Viagem adicionada com sucesso',
        });
        mutate('/api/viagem/read');
        setOpen(false);
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Erro',
          description: 'Erro ao adicionar viagem',
        });
      }
    else {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description:
          'Por favor preencha pelo menos o campo de data de rio, embarcação e tipo de viagem',
      });
    }
    setSubmitting(false);
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className='self-end w-full transition-all duration-500 bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl lg:w-fit hover:scale-105 hover:bg-gradient-to-l hover:from-blue-400 hover:to-blue-600 '>
          Adicionar Viagem
          <Plus size={24} />
        </Button>
      </SheetTrigger>
      <SheetContent className=' flex flex-col h-[99%] mr-[2.5%] sm:mr-2  my-auto rounded-lg md:max-w-[98%] lg:max-w-[50%] w-[95%]  '>
        <SheetHeader>
          <SheetTitle className='text-blue-500'>Adicionar Viagem</SheetTitle>
        </SheetHeader>
        <ScrollArea className='h-full overflow-y-auto no-scrollbar'>
          <Form {...form}>
            <form
              className='flex flex-wrap p-1 gap-2 md:gap-4'
              onSubmit={form.handleSubmit(handleSubmit)}
            >
              <FormField
                control={form.control}
                name='data_viagem'
                render={({ field }) => (
                  <FormItem className='flex flex-col basis-1/2 grow md:grow-0'>
                    <FormLabel>Data da Viagem</FormLabel>

                    <div className='flex w-full gap-2'>
                      <FormControl>
                        <Input
                          placeholder='DD-MM-YYYY'
                          value={field.value || ''}
                          onChange={(e) => {
                            field.onChange(e.target.value);
                          }}
                        />
                      </FormControl>
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
                            locale={ptBR}
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
                                'data_viagem',
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
                      <FormControl>
                        <Input
                          placeholder='DD-MM-YYYY'
                          value={field.value || ''}
                          onChange={(e) => {
                            //if date is after data_inicio

                            if (form.watch('data_viagem')) {
                              if (
                                dayjs(e.target.value, 'DD-MM-YYYY').isBefore(
                                  dayjs(
                                    form.getValues('data_viagem'),
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
                            } else {
                              field.onChange(e.target.value);
                            }
                          }}
                        />
                      </FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            size='icon'
                            className='bg-blue-500 hover:bg-blue-600'
                          >
                            <LucideCalendar className='w-4 h-4 ' />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                          <Calendar
                            locale={ptBR}
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
                              if (form.watch('data_viagem')) {
                                if (
                                  dayjs(date).isAfter(
                                    dayjs(
                                      form.watch('data_viagem'),
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
                              } else {
                                form.setValue(
                                  'data_chegada',
                                  dayjs(date).format('DD-MM-YYYY')
                                );
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
              {/* DATA RIO */}
              <FormField
                control={form.control}
                name='data_rio'
                render={({ field }) => (
                  <FormItem className='flex flex-col basis-1/2 grow md:grow-0'>
                    <FormLabel>Data Rio</FormLabel>
                    <div className='flex w-full gap-2'>
                      <FormControl>
                        <Input
                          placeholder='DD-MM-YYYY'
                          value={field.value || ''}
                          onChange={(e) => {
                            field.onChange(e.target.value);
                          }}
                        />
                      </FormControl>
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
                            locale={ptBR}
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
                                'data_rio',
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
                name='entrada_sahida'
                render={({ field }) => (
                  <FormItem className='flex flex-col grow'>
                    <FormLabel>Tipo</FormLabel>
                    <Select
                      name='entrada_sahida'
                      onValueChange={field.onChange}
                      // defaultValue={field.value?.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Entrada ou Saída?' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='undefined'>
                          Sem informação
                        </SelectItem>
                        <SelectItem value='Entrada'>Entrada</SelectItem>
                        <SelectItem value='Sahida'>Saída</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <div className='grid grid-cols-3 grid-rows-1 gap-4 grow'>
                <FormField
                  control={form.control}
                  name='dias_viagem'
                  render={({ field }) => (
                    <FormItem className='col-span-3 md:col-span-1'>
                      <FormLabel>Dias de Viagem (Qt.)</FormLabel>
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
                  <FormItem className='flex flex-col basis-full md:basis-8/12'>
                    <FormLabel>Porto de Origem</FormLabel>
                    <Popover
                      modal
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
                                )?.nome +
                                (portos?.find(
                                  (porto) => porto.id === field.value
                                )?.pais?.pais
                                  ? ' | ' +
                                    portos?.find(
                                      (porto) => porto.id === field.value
                                    )?.pais?.pais
                                  : '')
                              : 'Selecionar Porto'}
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
                          {field.value ? (
                            <CommandEmpty> Porto não encontrado</CommandEmpty>
                          ) : null}

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
                name='dias_porto_origem'
                render={({ field }) => (
                  <FormItem className='flex flex-col grow'>
                    <FormLabel>Dias no Porto de Origem</FormLabel>
                    <FormControl>
                      <Input placeholder='123' {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='porto_destino'
                render={({ field }) => (
                  <FormItem className='flex flex-col basis-full md:basis-8/12'>
                    <FormLabel>Porto de Destino</FormLabel>
                    <Popover
                      modal
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
                                )?.nome +
                                (portos?.find(
                                  (porto) => porto.id === field.value
                                )?.pais?.pais
                                  ? ' | ' +
                                    portos?.find(
                                      (porto) => porto.id === field.value
                                    )?.pais?.pais
                                  : '')
                              : 'Selecionar Porto'}
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
                          {field.value ? (
                            <CommandEmpty> Porto não encontrado</CommandEmpty>
                          ) : null}{' '}
                          <CommandGroup>
                            <CommandList>
                              {portos?.map((porto) => (
                                <CommandItem
                                  value={porto.nome}
                                  key={porto.id}
                                  onSelect={() => {
                                    form.setValue('porto_destino', porto.id);
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

              <FormField
                control={form.control}
                name='dias_porto_destino'
                render={({ field }) => (
                  <FormItem className='flex flex-col grow'>
                    <FormLabel>Dias no Porto de Destino</FormLabel>
                    <FormControl>
                      <Input placeholder='123' {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              {/* EMBARCAÇÃO */}
              <FormField
                control={form.control}
                name='id_embarcacao'
                render={({ field }) => (
                  <FormItem className='flex flex-col w-full grow'>
                    <FormLabel>Embarcação</FormLabel>
                    <Popover
                      modal
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
                          {field.value ? (
                            <CommandEmpty>
                              Embarcação não encontrada
                            </CommandEmpty>
                          ) : null}
                          <CommandGroup>
                            <CommandList>
                              {embarcacoes?.map((embarcacao) => {
                                return (
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
                                    {embarcacao.tipo_embarcacao?.tipo}{' '}
                                    {embarcacao.pais
                                      ? ' | ' + embarcacao.pais?.pais
                                      : ''}
                                  </CommandItem>
                                );
                              })}
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
                      modal
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
                              ? comandantes?.find(
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
                              setSearchComandanteName(value);
                            }}
                            placeholder='Procurar comandante...'
                          />
                          {field.value ? (
                            <CommandEmpty> Pessoa não encontrada</CommandEmpty>
                          ) : null}{' '}
                          <CommandGroup>
                            <CommandList>
                              {comandantes?.map((pessoa) => (
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
                      modal
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
                              ? capitoes?.find(
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
                              setSearchCapitaoName(value);
                            }}
                            placeholder='Procurar capitão...'
                          />
                          {field.value ? (
                            <CommandEmpty> Pessoa não encontrada</CommandEmpty>
                          ) : null}{' '}
                          <CommandGroup>
                            <CommandList>
                              {capitoes?.map((pessoa) => (
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
                      modal
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
                              ? armadores?.find(
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
                              setSearchArmadorName(value);
                            }}
                            placeholder='Procurar armador...'
                          />
                          {field.value ? (
                            <CommandEmpty> Pessoa não encontrada</CommandEmpty>
                          ) : null}{' '}
                          <CommandGroup>
                            <CommandList>
                              {armadores?.map((pessoa) => (
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
                    <Popover
                      open={selectMestre}
                      onOpenChange={setSelectMestre}
                      modal
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
                              ? mestres?.find(
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
                              setSearchMestreName(value);
                            }}
                            placeholder='Procurar mestre...'
                          />
                          {field.value ? (
                            <CommandEmpty> Pessoa não encontrada</CommandEmpty>
                          ) : null}{' '}
                          <CommandGroup>
                            <CommandList>
                              {mestres?.map((pessoa) => (
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
              <div className='w-full text-right '>
                <Button
                  disabled={submitting}
                  className='w-full mt-2 bg-blue-500 rounded-2xl hover:bg-blue-600 md:w-fit'
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
