import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import About from './components/About';
import Contact from './components/Contact';
import EstimateCalculator from './components/EstimateCalculator';
import Footer from './components/Footer';

// Force a new build on Vercel
const HomePage: React.FC = () => {
  return (
    <div>
      <Header />
      <main>
        <Hero />
        <Features />
        <About />
        <EstimateCalculator />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
