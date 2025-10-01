import { useLoaderData, Link } from "react-router-dom";
import { FaArrowLeft } from 'react-icons/fa';

const CoffeeDetails = () => {
    const coffee = useLoaderData();
    const { name, quantity, supplier, taste, category, details, photo } = coffee;

    return (
        <div className="bg-[#F4F3F0] min-h-screen p-4 sm:p-8 md:p-12 flex items-center justify-center">
            <div className="container mx-auto max-w-4xl">
                {/* Back to Home Button */}
                <Link to="/" className="flex items-center gap-2 text-lg font-semibold text-[#374151] hover:text-amber-600 mb-8">
                    <FaArrowLeft />
                    <span>Back to Home</span>
                </Link>

                <div className="bg-stone-100 p-8 rounded-lg shadow-xl flex flex-col md:flex-row gap-8">
                    {/* Coffee Image */}
                    <div className="md:w-1/2">
                        <img src={photo} alt={name} className="w-full h-auto object-cover rounded-lg" />
                    </div>

                    {/* Coffee Details */}
                    <div className="md:w-1/2 space-y-4">
                        <h1 className="text-3xl font-bold text-gray-800 border-b-2 pb-2 border-amber-500">{name}</h1>
                        <p className="text-gray-700">
                            <span className="font-bold">Details:</span> {details}
                        </p>
                        <div className="space-y-2 text-gray-600">
                            <p><span className="font-semibold">Supplier:</span> {supplier}</p>
                            <p><span className="font-semibold">Taste:</span> {taste}</p>
                            <p><span className="font-semibold">Category:</span> {category}</p>
                            <p><span className="font-semibold">Available Quantity:</span> {quantity}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoffeeDetails;