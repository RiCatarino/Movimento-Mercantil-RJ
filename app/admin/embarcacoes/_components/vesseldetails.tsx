import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Dispatch, SetStateAction } from 'react';

export default function VesselDetails(props: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  embarcacao_id: number | undefined;
}) {
  const { open, setOpen, embarcacao_id } = props;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Embarcação #{embarcacao_id}</DialogTitle>
          <DialogDescription asChild></DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
