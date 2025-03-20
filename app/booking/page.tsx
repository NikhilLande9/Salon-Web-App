'use client';

import { useState, useEffect } from 'react';
import { Calendar as BigCalendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { bookingSchema } from '@/lib/validations';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useStore } from '@/lib/store';
import NavBar from '@/components/ui/NavBar';

const locales = {
  'en-US': require('date-fns/locale/en-US'),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const services = [
  { id: 'haircut', name: 'Haircut', price: 500 },
  { id: 'coloring', name: 'Hair Coloring', price: 2000 },
  { id: 'styling', name: 'Hair Styling', price: 800 },
  { id: 'treatment', name: 'Hair Treatment', price: 1500 },
];

const timeSlots = [
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '2:00 PM',
  '3:00 PM',
  '4:00 PM',
  '5:00 PM',
];

export default function BookingPage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [bookedAppointments, setBookedAppointments] = useState<any[]>([]);
  const { setSelectedServices } = useStore();

  const form = useForm({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      service: '',
      date: new Date(),
      time: '',
    },
  });

  // Fetch booked slots and appointments for the selected date
  const fetchBookedSlots = async (date: Date) => {
    try {
      const dateKey = format(date, 'yyyy-MM-dd');
      const response = await fetch(`/api/bookings?date=${dateKey}`);
      const data = await response.json();
      setBookedSlots(data.bookedSlots || []);
      setBookedAppointments(data.appointments || []);
    } catch (error) {
      console.error('Error fetching booked slots:', error);
      setBookedSlots([]);
      setBookedAppointments([]);
    }
  };

  useEffect(() => {
    if (selectedDate) {
      fetchBookedSlots(selectedDate);
    }
  }, [selectedDate]);

  const onSubmit = (values: any) => {
    console.log('Form Values:', values);
    setShowConfirmation(true);
  };

  const handleSelectSlot = ({ start }: { start: Date }) => {
    setSelectedDate(start);
    form.setValue('date', start, { shouldValidate: true });
    console.log('Selected Date:', start);
    alert('Date selected: ' + format(start, 'MMMM d, yyyy'));
  };

  // Filter available time slots based on booked slots
  const availableTimeSlots = selectedDate
    ? timeSlots.filter((time) => !bookedSlots.includes(time))
    : timeSlots;

  // Map booked appointments to calendar events
  const events = bookedAppointments.map((appointment) => ({
    title: `${appointment.service} - Booked`,
    start: new Date(appointment.date),
    end: new Date(appointment.date),
  }));

  return (
    <div className="min-h-screen bg-background">
      <NavBar />

      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-[2fr,1fr]">
          <Card>
            <CardHeader>
              <CardTitle>Select Appointment Date</CardTitle>
              <CardDescription>Choose your preferred date and time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[600px]">
                <BigCalendar
                  localizer={localizer}
                  events={events}
                  startAccessor="start"
                  endAccessor="end"
                  selectable="ignoreEvents"
                  onSelectSlot={handleSelectSlot}
                  views={['month']}
                  defaultView="month"
                  className="bg-white rounded-lg shadow-sm"
                  date={selectedDate || undefined}
                  onNavigate={(date) => setSelectedDate(date)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Book Appointment</CardTitle>
              <CardDescription>Select your service and time</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Display Selected Date */}
                  <div>
                    <FormLabel>Selected Date</FormLabel>
                    <p className="text-sm text-gray-600">
                      {selectedDate ? format(selectedDate, 'MMMM d, yyyy') : 'No date selected'}
                    </p>
                  </div>

                  <FormField
                    control={form.control}
                    name="service"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Service</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a service" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {services.map((service) => (
                              <SelectItem key={service.id} value={service.id}>
                                {service.name} - ₹{service.price}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Time</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a time" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {availableTimeSlots.length > 0 ? (
                              availableTimeSlots.map((time) => (
                                <SelectItem key={time} value={time}>
                                  {time}
                                </SelectItem>
                              ))
                            ) : (
                              <SelectItem value="none" disabled>
                                No available slots
                              </SelectItem>
                            )}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full">
                    Book Appointment
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Appointment Confirmed!</DialogTitle>
              <DialogDescription>
                Your appointment has been successfully booked on{' '}
                {selectedDate ? format(selectedDate, 'MMMM d, yyyy') : ''} at{' '}
                {form.getValues('time') || 'N/A'}. We'll send you a confirmation email with the
                details.
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4">
              <Button onClick={() => setShowConfirmation(false)} className="w-full">
                Close
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}