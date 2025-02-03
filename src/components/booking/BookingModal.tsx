import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";
import BookingForm from "./BookingForm";
import BookingHeader from "./BookingHeader";
import BookingAuth from "./BookingAuth";

interface BookingModalProps {
  children?: React.ReactNode;
}

const BookingModal = ({ children }: BookingModalProps) => {
  const [session, setSession] = useState<Session | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button variant="outline">Book Now</Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="py-6">
          <BookingHeader />
          {session ? <BookingForm /> : <BookingAuth />}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;