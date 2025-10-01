import { useLoaderData } from "react-router-dom";
import Swal from 'sweetalert2';

const UpdateCoffee = () => {
    const coffee = useLoaderData();
    const { _id, name, quantity, supplier, taste, category, details, photo } = coffee;

    const handleUpdateCoffee = event => {
        event.preventDefault();

        const form = event.target;

        const name = form.name.value;
        const quantity = form.quantity.value;
        const supplier = form.supplier.value;
        const taste = form.taste.value;
        const category = form.category.value;
        const details = form.details.value;
        const photo = form.photo.value;
        
        const updatedCoffee = { name, quantity, supplier, taste, category, details, photo };
        console.log(updatedCoffee);

        fetch(`http://localhost:2000/coffee/${_id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedCoffee)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if (data.modifiedCount > 0) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Coffee Updated Successfully',
                    icon: 'success',
                    confirmButtonText: 'Great!'
                });
            }
        });
    }

    return (
        <div className="bg-[#F4F3F0] p-4 sm:p-8 md:p-24">
            <h1 className="text-3xl md:text-4xl font-extrabold text-center text-[#374151] mb-8">Update Coffee: <span className="text-amber-600">{name}</span></h1>
            
            <form onSubmit={handleUpdateCoffee} className="bg-amber-500 p-6 rounded-md max-w-4xl mx-auto shadow-lg">
                
                {/* form row 1: Name and Quantity */}
                <div className="md:flex gap-6 mb-4">
                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text font-semibold">Coffee Name</span>
                        </label>
                        <input type="text" name="name" defaultValue={name} placeholder="Coffee Name" className="input input-bordered w-full" />
                    </div>
                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text font-semibold">Available Quantity</span>
                        </label>
                        <input type="text" name="quantity" defaultValue={quantity} placeholder="Available Quantity" className="input input-bordered w-full" />
                    </div>
                </div>

                {/* form row 2: Supplier and Taste */}
                <div className="md:flex gap-6 mb-4">
                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text font-semibold">Supplier Name</span>
                        </label>
                        <input type="text" name="supplier" defaultValue={supplier} placeholder="Supplier Name" className="input input-bordered w-full" />
                    </div>
                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text font-semibold">Taste</span>
                        </label>
                        <input type="text" name="taste" defaultValue={taste} placeholder="Taste" className="input input-bordered w-full" />
                    </div>
                </div>

                {/* form row 3: Category and Details */}
                <div className="md:flex gap-6 mb-4">
                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text font-semibold">Category</span>
                        </label>
                        <input type="text" name="category" defaultValue={category} placeholder="Category" className="input input-bordered w-full" />
                    </div>
                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text font-semibold">Details</span>
                        </label>
                        <input type="text" name="details" defaultValue={details} placeholder="Details" className="input input-bordered w-full" />
                    </div>
                </div>

                {/* form row 4: Photo URL */}
                <div className="mb-6">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-semibold">Photo URL</span>
                        </label>
                        <input type="text" name="photo" defaultValue={photo} placeholder="Photo URL" className="input input-bordered w-full" />
                    </div>
                </div>

                {/* Submit Button */}
                <input type="submit" value="Update Coffee" className="btn btn-block bg-gray-700 hover:bg-gray-800 text-white" />
            </form>
        </div>
    );
};

export default UpdateCoffee;