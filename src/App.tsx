import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Compatibility from './components/Compatibility';
import LiveExamples from './components/LiveExamples';
import Journey from './components/Journey';
import Partners from './components/Partners';
import FAQ from './components/FAQ';
import AboutUs from './components/AboutUs';

function App() {
  return (
    <div className="min-h-screen site-gradient">
      <Navbar />
      <Hero />
      <Compatibility />
      <LiveExamples />
      <Journey />
      <Partners />
      <FAQ />
      <AboutUs />
    </div>
  );
}

export default App;