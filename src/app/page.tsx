import Hero from '@/components/Hero';
import Universities from '@/components/Universities';
import About from '@/components/About';
import Programs from '@/components/Programs';
import Newsletter from '@/components/Newsletter';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Universities />
      <About />
      <Programs />
      <Newsletter />
    </div>
  );
}