import React from 'react';
import { FaMapMarkerAlt, FaSearch, FaUsers } from 'react-icons/fa';
const ExtraSection4 = () => {
  const cities = [
    {
      name: "New York, NY",
      listings: 1243,
      image: "https://i.ibb.co/FbzdCym6/pedro-lastra-Nyvq2juw4-o-unsplash.jpg",
      popularNeighborhoods: ["Williamsburg", "Astoria", "Harlem"]
    },
    {
      name: "Austin, TX",
      listings: 892,
      image: "https://i.ibb.co/1tSBTvsD/meduana-Pdnse-Hu-DFZU-unsplash.jpg",
      popularNeighborhoods: ["Downtown", "South Congress", "East Austin"]
    },
    {
      name: "Chicago, IL",
      listings: 765,
      image: "https://i.ibb.co/DDwFT0xC/thomas-habr-6-Nmnr-AJPq7-M-unsplash.jpg",
      popularNeighborhoods: ["Wicker Park", "Logan Square", "Lakeview"]
    },
    {
      name: "Seattle, WA",
      listings: 621,
      image: "https://i.ibb.co/yms6dtPv/matt-jones-9-CPAj-GVB378-unsplash.jpg",
      popularNeighborhoods: ["Capitol Hill", "Ballard", "Fremont"]
    }
  ];





    return (
    <section className="py-16 ">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-green-600">Trending</span> Locations
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Where roommates are connecting right now
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {cities.map((city, index) => (
            <div key={index} className="relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <img 
                src={city.image} 
                alt={city.name} 
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <h3 className="text-xl font-bold mb-1">{city.name}</h3>
                <div className="flex items-center text-sm mb-2">
                  <FaUsers className="mr-1" />
                  <span>{city.listings.toLocaleString()} active listings</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {city.popularNeighborhoods.map((hood, i) => (
                    <span key={i} className="text-xs bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
                      {hood}
                    </span>
                  ))}
                </div>
              </div>
              <div className="absolute top-4 right-4">
                <span className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                  #{index + 1}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gray-50/80 rounded-xl p-8 md:p-10">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-6">
              <h3 className="text-xl font-bold mb-2">Can't find your city?</h3>
              <p className="text-gray-600">We're expanding to new locations every week</p>
            </div>
            <div className="w-full md:w-auto">
              <form className="flex">
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaSearch className="text-gray-400" />
                  </div>
                  <input 
                    type="text" 
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-l-lg focus:ring-green-500 focus:border-green-500" 
                    placeholder="Search your city..." 
                  />
                </div>
                <button 
                  type="submit" 
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-r-lg transition-colors"
                >
                  Search
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
    );
};

export default ExtraSection4;