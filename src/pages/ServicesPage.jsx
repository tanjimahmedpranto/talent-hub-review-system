import { Link } from "react-router-dom";
import { servicesData } from "../data/items"; // Sample data for services

const ServicesPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-gold-500 text-3xl font-semibold mb-6">Services</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {servicesData.map((item) => (
          <div
            key={item.id}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-200 border border-gray-300"
          >
            <div className="relative pb-2/3 mb-4">
              <Link to={`/services/${item.id}`}>
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="h-full w-full object-cover rounded-lg"
                />
              </Link>
            </div>
            <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
            <p className="text-gray-600 mb-4">
              <strong>Provider:</strong> {item.provider}
            </p>
            <p className="text-gray-800 mb-4">
              <strong>Description:</strong> {item.description}
            </p>
            <p className="text-lg font-semibold text-gold-500 mb-4">
              <strong>Price:</strong> {item.price}
            </p>
            <Link
              to={`/services/${item.id}`}
              className="w-full bg-gold-600 text-white py-2 px-4 rounded hover:bg-gold-700 transition-colors duration-200"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesPage;
