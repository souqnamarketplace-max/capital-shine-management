import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import MobileCTA from './MobileCTA';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pb-16 sm:pb-0">
        <Outlet />
      </main>
      <Footer />
      <MobileCTA />
    </div>
  );
}