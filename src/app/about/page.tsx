// app/about/page.tsx
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
// import Image from 'next/image';

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      {/* Hero Section - Enhanced with more engaging gradient */}
      <div className="bg-gradient-to-r from-blue-50 via-gray-100 to-blue-50 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">À propos d&apos;EduMap</h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Cartographier l&apos;avenir de l&apos;éducation pour un accès équitable aux infrastructures scolaires
          </p>
        </div>
      </div>
      
      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-grow">
        {/* Mission Section with Enhanced Split Layout */}
        <section className="mb-20 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9 mr-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Notre mission
            </h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              EduMap est née d&apos;une vision simple mais puissante : rendre visible l&apos;invisible dans le paysage éducatif. 
              Notre plateforme cartographie minutieusement les établissements scolaires et leurs infrastructures pour 
              créer un système éducatif plus équitable et transparent.
            </p>
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-start">
                <svg className="h-6 w-6 text-green-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span className="text-lg">Permettre aux décideurs d&apos;identifier les priorités d&apos;investissement en matière d&apos;infrastructures éducatives</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-green-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span className="text-lg">Offrir aux parents et tuteurs un outil transparent pour choisir les établissements adaptés aux besoins de leurs enfants</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-green-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span className="text-lg">Favoriser l&apos;équité éducative en identifiant et en mettant en lumière les disparités d&apos;accès aux ressources</span>
              </li>
            </ul>
          </div>
          <div className="relative h-96 rounded-xl overflow-hidden shadow-2xl">
            {/* Dynamic map illustration with animation */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-blue-50 to-indigo-100 flex items-center justify-center overflow-hidden">
              <div className="relative w-full h-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-40 w-40 text-blue-500 opacity-80 absolute transform -translate-y-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                {/* Educational elements overlay */}
                <div className="absolute top-1/4 left-1/4">
                  <div className="w-8 h-8 rounded-full bg-red-500 opacity-70"></div>
                </div>
                <div className="absolute bottom-1/3 right-1/3">
                  <div className="w-6 h-6 rounded-full bg-green-500 opacity-70"></div>
                </div>
                <div className="absolute top-1/2 right-1/4">
                  <div className="w-10 h-10 rounded-full bg-yellow-500 opacity-70"></div>
                </div>
                <div className="absolute bottom-1/4 left-1/3">
                  <div className="w-7 h-7 rounded-full bg-purple-500 opacity-70"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Enhanced Features Section with Improved Cards */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9 mr-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            Fonctionnalités principales
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature Card 1 - Enhanced with animation on hover */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
              <div className="p-7">
                <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mb-5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Recherche avancée</h3>
                <p className="text-gray-600 leading-relaxed">
                  Trouvez rapidement des établissements selon de multiples critères: localisation, 
                  type d&apos;école, infrastructures disponibles et services offerts.
                </p>
              </div>
            </div>
            
            {/* Feature Card 2 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
              <div className="p-7">
                <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mb-5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Carte interactive</h3>
                <p className="text-gray-600 leading-relaxed">
                  Visualisez géographiquement la distribution des établissements scolaires
                  et explorez leurs caractéristiques directement depuis l&apos;interface cartographique.
                </p>
              </div>
            </div>
            
            {/* Feature Card 3 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
              <div className="p-7">
                <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center mb-5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Filtrage précis</h3>
                <p className="text-gray-600 leading-relaxed">
                  Identifiez facilement les écoles disposant d&apos;infrastructures spécifiques comme
                  l&apos;accès à l&apos;eau potable, l&apos;électricité, l&apos;internet ou des installations sportives.
                </p>
              </div>
            </div>
            
            {/* Feature Card 4 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
              <div className="p-7">
                <div className="w-14 h-14 rounded-full bg-amber-100 flex items-center justify-center mb-5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Fiches détaillées</h3>
                <p className="text-gray-600 leading-relaxed">
                  Consultez l&apos;ensemble des informations de chaque établissement dans une 
                  interface claire, organisée et adaptée aux différents appareils.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* New Section: Impact & Vision */}
        <section className="mb-20 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl overflow-hidden shadow-lg">
          <div className="md:flex">
            <div className="md:w-1/2 p-10 md:p-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Notre impact
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Depuis notre lancement, EduMap a contribué à:
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="bg-white p-1 rounded-full mr-3 mt-1">
                    <svg className="h-5 w-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <span className="text-gray-700">Cartographier plus de 2 500 établissements scolaires</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-white p-1 rounded-full mr-3 mt-1">
                    <svg className="h-5 w-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <span className="text-gray-700">Identifier les zones prioritaires pour l&apos;amélioration des infrastructures</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-white p-1 rounded-full mr-3 mt-1">
                    <svg className="h-5 w-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <span className="text-gray-700">Guider la répartition des ressources éducatives</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-white p-1 rounded-full mr-3 mt-1">
                    <svg className="h-5 w-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <span className="text-gray-700">Sensibiliser sur l&apos;importance d&apos;infrastructures éducatives adéquates</span>
                </li>
              </ul>
            </div>
            <div className="md:w-1/2 p-10 md:p-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                Notre vision
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Nous aspirons à créer un avenir où chaque élève a accès à un environnement 
                d&apos;apprentissage bien équipé, quel que soit son lieu de résidence.
              </p>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Notre vision pour les prochaines années:
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="bg-white p-1 rounded-full mr-3 mt-1">
                    <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <span className="text-gray-700">Étendre notre couverture à toutes les régions du pays</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-white p-1 rounded-full mr-3 mt-1">
                    <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <span className="text-gray-700">Développer des indicateurs avancés d&apos;équité éducative</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-white p-1 rounded-full mr-3 mt-1">
                    <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <span className="text-gray-700">Intégrer des données longitudinales pour mesurer les progrès</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
        
        {/* Enhanced Call to Action Section */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-10 md:p-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Participez à l&apos;avenir de l&apos;éducation</h2>
            <p className="text-blue-100 text-lg md:text-xl mb-10 max-w-3xl mx-auto leading-relaxed">
              Vous souhaitez contribuer à notre mission d&apos;amélioration des infrastructures éducatives?
              Contactez-nous pour explorer les possibilités de collaboration et d&apos;engagement.
            </p>
            <button className="px-10 py-4 bg-white text-indigo-700 font-semibold text-lg rounded-full hover:bg-gray-50 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-transform">
              Contactez-nous
            </button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutPage;