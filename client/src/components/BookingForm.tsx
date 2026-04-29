import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, LogIn } from "lucide-react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";

const bookingSchema = z.object({
  productName: z.string().min(1, "Please select a product"),
  bookingDate: z.string().min(1, "Please select a date and time"),
  location: z.string().min(1, "Please select a location"),
  customerName: z.string().min(2, "Name must be at least 2 characters"),
  customerEmail: z.string().email("Invalid email address"),
  customerPhone: z.string().min(10, "Phone number must be at least 10 digits"),
});

type BookingFormData = z.infer<typeof bookingSchema>;

interface BookingFormProps {
  onSuccess?: () => void;
}

const AIRPODS_PRODUCTS = [
  { id: "airpods-4", name: "AirPods 4" },
  { id: "airpods-pro-3", name: "AirPods Pro 3" },
  { id: "airpods-max", name: "AirPods Max" },
];

const STORE_LOCATIONS = [
  { id: "downtown", name: "Downtown Apple Store" },
  { id: "mall", name: "Shopping Mall Location" },
  { id: "airport", name: "Airport Terminal" },
  { id: "online", name: "Online Pickup" },
];

function LoginPrompt() {
  return (
    <div className="text-center py-8 px-6 rounded-lg bg-white/5 border border-white/10">
      <p className="text-white/70 mb-4">Sign in to make a reservation</p>
      <a
        href={getLoginUrl()}
        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#0071E3] hover:bg-[#0077ED] text-white font-medium text-sm transition-all duration-200"
      >
        <LogIn className="w-4 h-4" />
        Sign In with Manus
      </a>
    </div>
  );
}

export default function BookingForm({ onSuccess }: BookingFormProps) {
  const { user, loading } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const createBooking = trpc.bookings.create.useMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
  });

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    try {
      const bookingDate = new Date(data.bookingDate);
      await createBooking.mutateAsync({
        productName: data.productName,
        bookingDate,
        location: data.location,
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        customerPhone: data.customerPhone,
      });

      toast.success("Booking confirmed! We'll contact you soon.");
      reset();
      onSuccess?.();
    } catch (error) {
      toast.error("Failed to create booking. Please try again.");
      console.error("Booking error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateDateOptions = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 30; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  if (loading) {
    return <div className="text-white/50 text-center py-8">Loading...</div>;
  }

  if (!user) {
    return <LoginPrompt />;
  }

  const dateOptions = generateDateOptions();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-lg mx-auto">
      <div>
        <Label htmlFor="product" className="text-sm font-medium text-white/80">
          Which AirPods are you interested in?
        </Label>
        <select
          {...register("productName")}
          className="mt-2 w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-[#0071E3] transition-colors"
        >
          <option value="">Select a product</option>
          {AIRPODS_PRODUCTS.map((product) => (
            <option key={product.id} value={product.name}>
              {product.name}
            </option>
          ))}
        </select>
        {errors.productName && <p className="text-red-400 text-xs mt-1">{errors.productName.message}</p>}
      </div>

      <div>
        <Label htmlFor="date" className="text-sm font-medium text-white/80 flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          Preferred Date & Time
        </Label>
        <select
          {...register("bookingDate")}
          className="mt-2 w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-[#0071E3] transition-colors"
        >
          <option value="">Select a date and time</option>
          {dateOptions.map((date) => {
            const dateStr = date.toISOString().split("T")[0];
            const timeSlots = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"];
            return timeSlots.map((time) => (
              <option key={`${dateStr}-${time}`} value={`${dateStr}T${time}:00`}>
                {date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })} at {time}
              </option>
            ));
          })}
        </select>
        {errors.bookingDate && <p className="text-red-400 text-xs mt-1">{errors.bookingDate.message}</p>}
      </div>

      <div>
        <Label htmlFor="location" className="text-sm font-medium text-white/80">
          Pickup Location
        </Label>
        <select
          {...register("location")}
          className="mt-2 w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-[#0071E3] transition-colors"
        >
          <option value="">Select a location</option>
          {STORE_LOCATIONS.map((loc) => (
            <option key={loc.id} value={loc.name}>
              {loc.name}
            </option>
          ))}
        </select>
        {errors.location && <p className="text-red-400 text-xs mt-1">{errors.location.message}</p>}
      </div>

      <div>
        <Label htmlFor="name" className="text-sm font-medium text-white/80">
          Full Name
        </Label>
        <Input
          {...register("customerName")}
          type="text"
          placeholder="John Doe"
          className="mt-2 bg-white/5 border-white/10 text-white placeholder-white/40 focus:border-[#0071E3]"
        />
        {errors.customerName && <p className="text-red-400 text-xs mt-1">{errors.customerName.message}</p>}
      </div>

      <div>
        <Label htmlFor="email" className="text-sm font-medium text-white/80">
          Email Address
        </Label>
        <Input
          {...register("customerEmail")}
          type="email"
          placeholder="john@example.com"
          className="mt-2 bg-white/5 border-white/10 text-white placeholder-white/40 focus:border-[#0071E3]"
        />
        {errors.customerEmail && <p className="text-red-400 text-xs mt-1">{errors.customerEmail.message}</p>}
      </div>

      <div>
        <Label htmlFor="phone" className="text-sm font-medium text-white/80">
          Phone Number
        </Label>
        <Input
          {...register("customerPhone")}
          type="tel"
          placeholder="+1 (555) 123-4567"
          className="mt-2 bg-white/5 border-white/10 text-white placeholder-white/40 focus:border-[#0071E3]"
        />
        {errors.customerPhone && <p className="text-red-400 text-xs mt-1">{errors.customerPhone.message}</p>}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#0071E3] hover:bg-[#0077ED] text-white font-semibold py-2.5 rounded-lg transition-all duration-200 disabled:opacity-50"
      >
        {isSubmitting ? "Confirming..." : "Confirm Booking"}
      </Button>

      <p className="text-xs text-white/40 text-center">
        We'll send you a confirmation email with all the details.
      </p>
    </form>
  );
}
