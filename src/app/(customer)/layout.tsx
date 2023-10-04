import type { Metadata } from 'next';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CheckoutProvider from '../store/CheckoutContext';
import Toaster from '../components/Toaster';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default async function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <CheckoutProvider>{children}</CheckoutProvider>
      <Footer />
      <Toaster />
    </>
  );
}
