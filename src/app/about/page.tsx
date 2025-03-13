import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">À propos d'EduMap</h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Cartographier l'avenir de l'éducation pour un accès équitable aux infrastructures scolaires
          </p>
        </div>
      </div>
      
      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 flex-grow">
        {/* Mission Section */}
        <section className="mb-16 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Notre mission
            </h2>
            <p className="text-gray-700 mb-4">
              EduMap rend visible l'invisible dans le paysage éducatif en cartographiant les établissements scolaires et leurs infrastructures pour 
              créer un système éducatif plus équitable et transparent.
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Identifier les priorités d'investissement en matière d'infrastructures éducatives</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Offrir aux parents un outil transparent pour choisir les établissements adaptés</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Favoriser l'équité éducative en identifiant les disparités d'accès aux ressources</span>
              </li>
            </ul>
          </div>
          <div className="relative h-64 rounded-xl overflow-hidden shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-blue-500 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-indigo-600 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            Fonctionnalités principales
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature Cards - Simplified */}
            <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Recherche avancée</h3>
              <p className="text-gray-600">
                Trouvez rapidement des établissements selon de multiples critères et services offerts.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Carte interactive</h3>
              <p className="text-gray-600">
                Visualisez géographiquement la distribution des établissements scolaires.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Filtrage précis</h3>
              <p className="text-gray-600">
                Identifiez les écoles disposant d'infrastructures spécifiques comme l'accès à l'eau potable.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Fiches détaillées</h3>
              <p className="text-gray-600">
                Consultez l'ensemble des informations de chaque établissement dans une interface claire.
              </p>
            </div>
          </div>
        </section>
        
        {/* Impact & Vision - Combined */}
        <section className="mb-16 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg overflow-hidden shadow-md p-8">
          <div className="md:flex gap-8">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-indigo-600 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Notre impact
              </h2>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-indigo-600 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-700">Cartographier plus de 2 500 établissements scolaires</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-indigo-600 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-700">Identifier les zones prioritaires pour l'amélioration des infrastructures</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-indigo-600 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-700">Guider la répartition des ressources éducatives</span>
                </li>
              </ul>
            </div>
            <div className="md:w-1/2">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-600 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                Notre vision
              </h2>
              <p className="text-gray-700 mb-4">
                Nous aspirons à créer un avenir où chaque élève a accès à un environnement 
                d'apprentissage bien équipé, quel que soit son lieu de résidence.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-600 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-700">Étendre notre couverture à toutes les régions du pays</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-600 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-700">Développer des indicateurs avancés d'équité éducative</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg shadow-lg overflow-hidden">
          <div className="p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Participez à l'avenir de l'éducation</h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Vous souhaitez contribuer à notre mission d'amélioration des infrastructures éducatives?
              Contactez-nous pour explorer les possibilités de collaboration.
            </p>
            <button className="px-6 py-3 bg-white text-indigo-700 font-medium rounded-full hover:bg-gray-50 shadow-md">
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