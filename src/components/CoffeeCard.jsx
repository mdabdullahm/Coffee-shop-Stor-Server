import { FaEye, FaPen, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

// App.jsx থেকে coffees এবং setCoffees কে prop হিসেবে গ্রহণ করতে হবে
const CoffeeCard = ({ coffee, coffees, setCoffees }) => {
    const { _id, name, quantity, supplier, taste, photo } = coffee;

    const handleDelete = _id => {
        console.log(_id);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                // সার্ভারে DELETE রিকোয়েস্ট পাঠানো হচ্ছে
                fetch(`http://localhost:2000/coffee/${_id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        if (data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your coffee has been deleted.",
                                icon: "success"
                            });
                            // UI থেকে ডিলিট হওয়া কফিটি বাদ দেওয়ার জন্য state আপডেট করা হচ্ছে
                            const remaining = coffees.filter(cof => cof._id !== _id);
                            setCoffees(remaining);
                        }
                    })
            }
        });
    }

    return (
        <div className="card lg:card-side bg-stone-100 shadow-xl p-4 flex flex-col lg:flex-row items-center gap-6">

            {/* ছবির অংশ */}
            <figure className="w-full lg:w-1/3 flex-shrink-0">
                <img className="w-full h-48 object-cover rounded-lg" src={photo} alt={name} />
            </figure>

            {/* কন্টেন্টের অংশ */}
            <div className="w-full lg:w-2/3 flex justify-between items-center">
                <div className="space-y-2">
                    <h2 className="card-title text-xl font-bold text-gray-800">
                        <span className="font-semibold">Name:</span> {name}
                    </h2>
                    <p className="text-gray-600"><span className="font-semibold">Supplier:</span> {supplier}</p>
                    <p className="text-gray-600"><span className="font-semibold">Taste:</span> {taste}</p>
                    <p className="text-gray-600"><span className="font-semibold">Quantity:</span> {quantity}</p>
                </div>

                {/* বাটন গ্রুপ */}
                <div className="flex flex-col gap-3">
                    {/* View Button */}
                    <Link to={`/coffee/${_id}`}>
                        <button className="btn btn-circle bg-amber-500 hover:bg-amber-600 text-white" title="View Details">
                            <FaEye className="text-xl" />
                        </button>
                    </Link>

                    {/* Edit Button */}
                    <Link to={`/updateCoffee/${_id}`}>
                        <button className="btn btn-circle bg-gray-700 hover:bg-gray-800 text-white" title="Edit Coffee">
                            <FaPen className="text-lg" />
                        </button>
                    </Link>

                    {/* Delete Button */}
                    <button
                        onClick={() => handleDelete(_id)}
                        className="btn btn-circle bg-red-600 hover:bg-red-700 text-white"
                        title="Delete Coffee"
                    >
                        <FaTrash className="text-lg" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CoffeeCard;