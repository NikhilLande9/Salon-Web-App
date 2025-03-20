'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Scissors, Star, Clock, Check } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const services = [
  {
    id: 'haircut',
    name: 'Haircut',
    price: 500,
    description: 'Professional haircut tailored to your style preferences',
    duration: '45 mins',
    image: 'https://images.unsplash.com/photo-1560869713-da86a9ec0686?q=80&w=2000&auto=format&fit=crop',
    features: ['Consultation', 'Washing', 'Cutting', 'Styling'],
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    id: 'coloring',
    name: 'Hair Coloring',
    price: 2000,
    description: 'Premium hair coloring using high-quality products',
    duration: '2 hours',
    image: 'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?q=80&w=2000&auto=format&fit=crop',
    features: ['Consultation', 'Color Application', 'Processing', 'Washing', 'Styling'],
    gradient: 'from-blue-500 to-teal-500'
  },
  {
    id: 'styling',
    name: 'Hair Styling',
    price: 800,
    description: 'Expert styling for any occasion',
    duration: '1 hour',
    image: 'https://images.unsplash.com/photo-1522336572468-97b06e8ef143?q=80&w=2000&auto=format&fit=crop',
    features: ['Consultation', 'Washing', 'Blow Dry', 'Styling'],
    gradient: 'from-orange-500 to-red-500'
  },
  {
    id: 'treatment',
    name: 'Hair Treatment',
    price: 1500,
    description: 'Intensive hair treatment for healthy, shiny hair',
    duration: '1.5 hours',
    image: 'https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?q=80&w=2000&auto=format&fit=crop',
    features: ['Hair Analysis', 'Treatment Application', 'Steam Therapy', 'Washing', 'Styling'],
    gradient: 'from-green-500 to-emerald-500'
  }
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-teal-50 dark:from-gray-900 dark:to-gray-800">
      <nav className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50 dark:bg-gray-900/80">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Scissors className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
              Luxe Salon
            </span>
          </div>
          <div className="space-x-4">
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/register">
              <Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
                Register
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
            Our Services
          </h1>
          <p className="text-xl text-muted-foreground">
            Experience luxury hair care with our premium services
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {services.map((service) => (
            <Card key={service.id} className="group overflow-hidden border-2 hover:border-primary/50 transition-all duration-300">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-30 group-hover:opacity-40 transition-opacity duration-300`} />
              </div>
              <CardHeader className="relative">
                <CardTitle className="text-2xl">{service.name}</CardTitle>
                <CardDescription className="flex items-center space-x-4">
                  <span className="text-2xl font-bold text-primary">₹{service.price}</span>
                  <span className="flex items-center text-muted-foreground">
                    <Clock className="h-4 w-4 mr-1" />
                    {service.duration}
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-6 text-muted-foreground text-lg">{service.description}</p>
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <Check className="h-5 w-5 mr-3 text-primary" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/booking" className="block">
                  <Button className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-lg py-6">
                    Book Now
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}