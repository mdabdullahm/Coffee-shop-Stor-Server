import Swal from 'sweetalert2';

const AddCoffee = () => {
    const handleAddCoffee = event => {
        event.preventDefault();
        const form = event.target;

        const name = form.name.value;
        const quantity = form.quantity.value;
        const supplier = form.supplier.value;
        const taste = form.taste.value;
        const category = form.category.value;
        const details = form.details.value;
        const photo = form.photo.value;
        
        const newCoffee = { name, quantity, supplier, taste, category, details, photo };
        console.log(newCoffee);

        fetch('http://localhost:2000/coffee', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newCoffee)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if (data.insertedId) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Coffee Added Successfully',
                    icon: 'success',
                    confirmButtonText: 'Cool'
                });
                form.reset();
            }
        });
    }

    return (
        <div className="bg-[#F4F3F0] p-4 sm:p-8 md:p-12 lg:p-24">
            <div className="max-w-4xl mx-auto bg-[#FFFFFF] p-6 sm:p-8 md:p-10 rounded-lg shadow-lg">
                <h1 className="text-3xl md:text-4xl font-extrabold text-center text-[#374151] mb-8">Add a New Coffee</h1>
                <p className="text-center text-gray-500 mb-8 max-w-2xl mx-auto">
                    Fill out the form below to add a new delicious coffee to our collection. Make sure to provide all the details to help our customers choose the best.
                </p>
                
                <form onSubmit={handleAddCoffee}>
                    {/* form row 1: Name and Quantity */}
                    <div className="flex flex-col md:flex-row gap-6 mb-4">
                        <div className="form-control w-full md:w-1/2">
                            <label className="label">
                                <span className="label-text font-semibold">Coffee Name</span>
                            </label>
                            <input type="text" name="name" placeholder="Enter coffee name" className="input input-bordered w-full" />
                        </div>
                        <div className="form-control w-full md:w-1/2">
                            <label className="label">
                                <span className="label-text font-semibold">Available Quantity</span>
                            </label>
                            <input type="text" name="quantity" placeholder="Enter available quantity" className="input input-bordered w-full" />
                        </div>
                    </div>

                    {/* form row 2: Supplier and Taste */}
                    <div className="flex flex-col md:flex-row gap-6 mb-4">
                        <div className="form-control w-full md:w-1/2">
                            <label className="label">
                                <span className="label-text font-semibold">Supplier</span>
                            </label>
                            <input type="text" name="supplier" placeholder="Enter coffee supplier" className="input input-bordered w-full" />
                        </div>
                        <div className="form-control w-full md:w-1/2">
                            <label className="label">
                                <span className="label-text font-semibold">Taste</span>
                            </label>
                            <input type="text" name="taste" placeholder="Enter coffee taste" className="input input-bordered w-full" />
                        </div>
                    </div>

                    {/* form row 3: Category and Details */}
                    <div className="flex flex-col md:flex-row gap-6 mb-4">
                        <div className="form-control w-full md:w-1/2">
                            <label className="label">
                                <span className="label-text font-semibold">Category</span>
                            </label>
                            <input type="text" name="category" placeholder="Enter coffee category" className="input input-bordered w-full" />
                        </div>
                        <div className="form-control w-full md:w-1/2">
                            <label className="label">
                                <span className="label-text font-semibold">Details</span>
                            </label>
                            <input type="text" name="details" placeholder="Enter coffee details" className="input input-bordered w-full" />
                        </div>
                    </div>

                    {/* form row 4: Photo URL */}
                    <div className="mb-6">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-semibold">Photo URL</span>
                            </label>
                            <input type="text" name="photo" placeholder="Enter photo URL" className="input input-bordered w-full" />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <input type="submit" value="Add Coffee" className="btn btn-block bg-gray-700 hover:bg-gray-800 text-white" />
                </form>
            </div>
        </div>
    );
};

export default AddCoffee;