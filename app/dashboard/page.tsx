'use client';

import { useStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, CreditCard, Star } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import NavBar from '@/components/ui/NavBar';

const subscriptionPlans = [
  {
    name: 'Basic',
    price: '₹2,500',
    features: ['Priority Booking', 'Monthly Hair Treatment', '10% Off on Products'],
  },
  {
    name: 'Premium',
    price: '₹4,000',
    features: ['VIP Booking', 'Bi-weekly Hair Treatment', '20% Off on Products', 'Free Style Consultation'],
  },
];

export default function DashboardPage() {
  const { user } = useStore();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <NavBar />

      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Next Appointment</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">No upcoming</div>
              <p className="text-xs text-muted-foreground">appointments</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Last Visit</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2 weeks ago</div>
              <p className="text-xs text-muted-foreground">Haircut & Style</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Subscription</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{user.subscription || 'None'}</div>
              <p className="text-xs text-muted-foreground">Current plan</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Next Payment</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">-</div>
              <p className="text-xs text-muted-foreground">Auto-renewal</p>
            </CardContent>
          </Card>
        </div>

        {!user.isGuest && (
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            {subscriptionPlans.map((plan) => (
              <Card key={plan.name}>
                <CardHeader>
                  <CardTitle>{plan.name} Plan</CardTitle>
                  <CardDescription>
                    <span className="text-2xl font-bold">{plan.price}</span> / month
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center">
                        <Star className="h-4 w-4 mr-2 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-6">
                    {user.subscription === plan.name.toLowerCase()
                      ? 'Current Plan'
                      : `Upgrade to ${plan.name}`}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your recent appointments and transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-medium">Haircut & Style</p>
                    <p className="text-sm text-muted-foreground">April 1, 2024</p>
                  </div>
                  <span className="text-sm font-medium">₹500</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-medium">Hair Coloring</p>
                    <p className="text-sm text-muted-foreground">March 15, 2024</p>
                  </div>
                  <span className="text-sm font-medium">₹2,000</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 flex justify-center">
          <Link href="/booking">
            <Button size="lg" className="px-8">
              Book New Appointment
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}