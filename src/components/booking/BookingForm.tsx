import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { bookingFormSchema, type BookingFormValues } from "./bookingFormSchema";
import PersonalInfoFields from "./PersonalInfoFields";
import EventDetailsFields from "./EventDetailsFields";

const BookingForm = () => {
  const { toast } = useToast();
  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      date: "",
      guests: "",
      eventType: "",
      location: "",
      message: "",
    },
  });

  const onSubmit = async (values: BookingFormValues) => {
    try {
      const { error } = await supabase
        .from('booking_requests')
        .insert({
          name: values.name,
          email: values.email,
          phone: values.phone,
          event_date: values.date,
          guests: parseInt(values.guests),
          event_type: values.eventType,
          location: values.location,
          message: values.message || null,
          status: 'pending'
        });

      if (error) throw error;

      toast({
        title: "Booking Request Received",
        description: "We'll get back to you within 24 hours to confirm your booking.",
      });

      form.reset();
    } catch (error: any) {
      console.error('Error submitting booking request:', error);
      toast({
        title: "Error",
        description: "Failed to submit booking request. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <PersonalInfoFields form={form} />
        <EventDetailsFields form={form} />
        
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional Details</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us more about your event..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full bg-purple hover:bg-purple-dark">
          Submit Booking Request
        </Button>
      </form>
    </Form>
  );
};

export default BookingForm;