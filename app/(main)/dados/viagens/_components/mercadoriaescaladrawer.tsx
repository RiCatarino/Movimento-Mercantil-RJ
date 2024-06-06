import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function EscalasDrawer(props: {
  open: boolean;
  setOpen: (open: boolean) => void;
  relac_mercadoria_escala: RelacMercadoriaEscala[] | undefined;
}) {
  const { open, setOpen, relac_mercadoria_escala } = props;

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent className=" mb-3.5 min-h-[50%]">
        <div className="w-full max-w-xl mx-auto ">
          <DrawerHeader>
            <DrawerTitle>Mercadorias</DrawerTitle>
            <DrawerDescription></DrawerDescription>
          </DrawerHeader>
          <Table className="w-full">
            <TableHeader className="p-2 text-xs bg-blue-200 border-t-0 ">
              <TableRow className="rounded-ss-xl">
                <TableHead>Qt.</TableHead>
                <TableHead>Mercadoria</TableHead>
                <TableHead>Unid. Medida</TableHead>
                <TableHead>Frete</TableHead>
                <TableHead>Cosignatário</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {relac_mercadoria_escala?.map((mercadoria) => (
                <TableRow
                  className="cursor-pointer hover:bg-blue-100"
                  key={mercadoria.id}
                >
                  <TableCell className="text-xs font-medium">
                    {mercadoria.quantidade}
                  </TableCell>
                  <TableCell className="text-xs font-medium">
                    {mercadoria.mercadoria.nome}
                  </TableCell>
                  <TableCell className="text-xs font-medium">
                    {mercadoria?.unidade_de_medida.unidade_medida}
                  </TableCell>
                  <TableCell className="text-xs font-medium">
                    {/* format value as brazilian real */}
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(mercadoria.valor_frete)}
                  </TableCell>
                  <TableCell className="text-xs font-medium">
                    {mercadoria?.cosignatario?.nome}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={1} className="text-xs font-bold">
                  Total:{" "}
                  {relac_mercadoria_escala?.reduce(
                    (acc, mercadoria) => acc + (mercadoria.quantidade || 0),
                    0,
                  ) || 0}
                </TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>

                <TableCell colSpan={1} className="text-xs font-bold">
                  Total:{" "}
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(
                    relac_mercadoria_escala?.reduce(
                      (acc, mercadoria) => acc + (mercadoria.valor_frete || 0),
                      0,
                    ) || 0,
                  )}
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableFooter>
          </Table>
          {/* <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose asChild>
              <Button variant='outline'>Cancel</Button>
            </DrawerClose>
          </DrawerFooter> */}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
