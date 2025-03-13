import React from 'react';
import Header from '@/components/Header';
import SchoolCard from '@/components/SchoolCard';
import EtablissementCard from '@/components/EtablissementCard';

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow p-8">
        <h1>Les informations des prochaines écoles</h1>
        {/* <SchoolCard /> */}
        <EtablissementCard />
      </main>
    </div>
  );
}

