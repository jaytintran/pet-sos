import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Search, PawPrint, MapPin, Filter, Calendar, X } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Pet {
  id: string;
  name: string;
  type: string;
  age: string;
  location: string;
  description: string;
  image_url: string;
  status: string;
  fee: number;
  contact_info: string;
}

const ITEMS_PER_PAGE = 20;

const Home = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [pets, setPets] = useState<Pet[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    type: '',
    ageRange: [0, 10],
    maxFee: 200,
    location: ''
  });

  useEffect(() => {
    fetchPets();
  }, [currentPage, filters]);

  const fetchPets = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('pets')
        .select('*', { count: 'exact' });

      // Apply filters
      if (filters.type) {
        query = query.eq('type', filters.type);
      }
      if (filters.location) {
        query = query.ilike('location', `%${filters.location}%`);
      }
      if (filters.maxFee < 200) {
        query = query.lte('fee', filters.maxFee);
      }

      // Add pagination
      const from = (currentPage - 1) * ITEMS_PER_PAGE;
      const to = from + ITEMS_PER_PAGE - 1;

      const { data, count, error } = await query
        .range(from, to)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setPets(data || []);
      setTotalPages(Math.ceil((count || 0) / ITEMS_PER_PAGE));
    } catch (error) {
      console.error('Error fetching pets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setCurrentPage(1);
    fetchPets();
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Find Your Perfect Pet Companion
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Connect with your future furry friend or help lost pets find their way home
        </p>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-2xl shadow-lg p-4 mb-8 sticky top-4 z-10">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Enter your location"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={filters.location}
                onChange={(e) => setFilters({ ...filters, location: e.target.value })}
              />
            </div>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            <Filter className="h-5 w-5" />
            Filters
          </button>
          <button 
            onClick={handleSearch}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
          >
            Search
          </button>
        </div>

        {/* Extended Filters Panel */}
        {showFilters && (
          <div className="mt-4 p-4 border-t">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Filters</h3>
              <button
                onClick={() => setShowFilters(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pet Type
                </label>
                <select
                  className="w-full border border-gray-200 rounded-lg p-2"
                  value={filters.type}
                  onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                >
                  <option value="">All Types</option>
                  <option value="dog">Dogs</option>
                  <option value="cat">Cats</option>
                  <option value="fish">Fish</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Age Range (years)
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={filters.ageRange[1]}
                    onChange={(e) => setFilters({ ...filters, ageRange: [0, parseInt(e.target.value)] })}
                    className="w-full"
                  />
                  <span className="text-sm text-gray-600">0-{filters.ageRange[1]} years</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Maximum Adoption Fee
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="0"
                    max="200"
                    value={filters.maxFee}
                    onChange={(e) => setFilters({ ...filters, maxFee: parseInt(e.target.value) })}
                    className="w-full"
                  />
                  <span className="text-sm text-gray-600">${filters.maxFee}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Pet Grid */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading pets...</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {pets.map((pet) => (
              <div key={pet.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition">
                <div className="relative">
                  <img 
                    src={pet.image_url} 
                    alt={pet.name}
                    className="w-full h-48 object-cover"
                  />
                  <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-sm hover:scale-110 transition">
                    <Heart className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold">{pet.name}</h3>
                    <span className="text-sm font-medium text-indigo-600">
                      {pet.fee === 0 ? 'Free' : `$${pet.fee}`}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    {pet.location}
                  </div>
                  <div className="flex items-center text-gray-600 mb-2">
                    <Calendar className="h-4 w-4 mr-1" />
                    {pet.age}
                  </div>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-4">{pet.description}</p>
                  <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mb-16">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded-lg ${
                    currentPage === page
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          )}
        </>
      )}

      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <Heart className="h-12 w-12 text-pink-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Lost Pet Support</h3>
          <p className="text-gray-600">
            Post details about your lost pet and get help from our community to bring them home safely.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <PawPrint className="h-12 w-12 text-indigo-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Pet Adoption</h3>
          <p className="text-gray-600">
            Find your perfect companion from our selection of pets available for adoption.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <Search className="h-12 w-12 text-green-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2">AI-Powered Help</h3>
          <p className="text-gray-600">
            Get personalized advice and support from our AI assistant specialized in pet care.
          </p>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-indigo-50 rounded-2xl p-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Help?</h2>
        <p className="text-gray-600 mb-6">
          Join our community of pet lovers and make a difference in an animal's life today.
        </p>
        <Link
          to="/add-pet"
          className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-full hover:bg-indigo-700 transition"
        >
          Post a Pet
        </Link>
      </div>
    </div>
  );
};

export default Home;