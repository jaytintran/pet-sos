import React, { useState } from 'react';
import { Filter, MapPin, Calendar } from 'lucide-react';

const MOCK_PETS = [
  {
    id: '1',
    name: 'Luna',
    type: 'cat',
    age: '2 years',
    location: 'New York, NY',
    description: 'Friendly calico cat, very affectionate',
    imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    status: 'lost',
    contactInfo: 'john@example.com',
    createdAt: '2024-02-20',
    userId: 'user1'
  },
  {
    id: '2',
    name: 'Max',
    type: 'dog',
    age: '1 year',
    location: 'Los Angeles, CA',
    description: 'Energetic golden retriever puppy',
    imageUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    status: 'adoption',
    contactInfo: 'sarah@example.com',
    createdAt: '2024-02-19',
    userId: 'user2'
  }
];

const PetList = () => {
  const [filters, setFilters] = useState({
    type: '',
    location: '',
    status: ''
  });

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Available Pets</h1>
        
        <div className="flex items-center gap-4">
          <select
            className="bg-white border border-gray-300 rounded-lg px-4 py-2"
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
          >
            <option value="">All Types</option>
            <option value="dog">Dogs</option>
            <option value="cat">Cats</option>
            <option value="fish">Fish</option>
            <option value="other">Other</option>
          </select>

          <select
            className="bg-white border border-gray-300 rounded-lg px-4 py-2"
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          >
            <option value="">All Status</option>
            <option value="lost">Lost</option>
            <option value="found">Found</option>
            <option value="adoption">Adoption</option>
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_PETS.map((pet) => (
          <div key={pet.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
            <img 
              src={pet.imageUrl} 
              alt={pet.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-semibold">{pet.name}</h3>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  pet.status === 'lost' ? 'bg-red-100 text-red-800' :
                  pet.status === 'found' ? 'bg-green-100 text-green-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {pet.status.charAt(0).toUpperCase() + pet.status.slice(1)}
                </span>
              </div>
              
              <div className="flex items-center text-gray-600 mb-2">
                <MapPin className="h-4 w-4 mr-1" />
                {pet.location}
              </div>
              
              <div className="flex items-center text-gray-600 mb-4">
                <Calendar className="h-4 w-4 mr-1" />
                {pet.age}
              </div>
              
              <p className="text-gray-600 mb-4">{pet.description}</p>
              
              <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition">
                Contact Owner
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PetList;