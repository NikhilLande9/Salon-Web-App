import Link from 'next/link';
import { Button } from '@/components/ui/button';
import NavBar from '@/components/ui/NavBar';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <NavBar />

      <main className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">Experience Luxury Hair Care</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Transform your look with our expert stylists. Book your appointment today and discover the difference professional care makes.
          </p>
          <div className="space-x-4">
            <Link href="/booking">
              <Button size="lg" className="px-8">Book Now</Button>
            </Link>
            <Link href="/services">
              <Button size="lg" variant="outline" className="px-8">View Services</Button>
            </Link>
          </div>
        </div>

        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <div className="bg-card p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">Expert Stylists</h3>
            <p className="text-muted-foreground">Our team of professional stylists brings years of experience and creativity to every service.</p>
          </div>
          <div className="bg-card p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">Premium Products</h3>
            <p className="text-muted-foreground">We use only the highest quality products to ensure the best results for your hair.</p>
          </div>
          <div className="bg-card p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">Modern Techniques</h3>
            <p className="text-muted-foreground">Stay ahead with the latest trends and cutting-edge styling techniques.</p>
          </div>
        </div>
      </main>
    </div>
  );
}