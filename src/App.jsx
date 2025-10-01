import { useLoaderData } from 'react-router-dom';
import './App.css';
import CoffeeCard from './components/CoffeeCard';
import { useState } from 'react';

function App() {
  const loadedCoffees = useLoaderData();
  const [coffees, setCoffees] = useState(loadedCoffees);

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-amber-100 p-4 sm:p-8 md:p-12'>
      <div className="container mx-auto">
        <h1 className='text-4xl md:text-5xl text-center font-extrabold text-gray-800 drop-shadow-lg mb-10'>
          Our Popular Coffees
        </h1>
        <h2 className='text-xl md:text-2xl text-center font-semibold text-amber-700 mb-12'>
          Available Coffees: {coffees.length}
        </h2>
        
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
          {
            coffees.map(coffee => 
              <CoffeeCard 
                key={coffee._id} 
                coffee={coffee}
                coffees={coffees}
                setCoffees={setCoffees}
              />
            )
          }
        </div>
      </div>
    </div>
  );
}

export default App;