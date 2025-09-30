import { Header } from './components/Header.jsx';
import { Hero } from './components/Hero.jsx';
import { BookingSection } from './components/BookingSection.jsx';
import { PortfolioSection } from './components/PortfolioSection.jsx';
import { OrdersSection } from './components/OrdersSection.jsx';
import { AboutSection } from './components/AboutSection.jsx';
import { Footer } from './components/Footer.jsx';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <Header />
      <main className="space-y-10">
        <Hero />
        <BookingSection />
        <PortfolioSection />
        <OrdersSection />
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
}
