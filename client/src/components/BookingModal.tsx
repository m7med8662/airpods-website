import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import BookingForm from "./BookingForm";
import { X } from "lucide-react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-gradient-to-br from-slate-900 to-slate-950 border border-white/10">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display font-bold text-white">
            Reserve Your AirPods
          </DialogTitle>
          <DialogDescription className="text-white/50 mt-2">
            Choose your product, date, and location. We'll confirm your booking and send you all the details.
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-6">
          <BookingForm onSuccess={onClose} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
