import { z } from "zod";

export const bookingFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  date: z.string().min(1, "Please select a date"),
  guests: z.string().min(1, "Please enter number of guests"),
  eventType: z.string().min(1, "Please select event type"),
  location: z.string().min(1, "Please enter event location"),
  message: z.string().optional(),
});

export type BookingFormValues = z.infer<typeof bookingFormSchema>;