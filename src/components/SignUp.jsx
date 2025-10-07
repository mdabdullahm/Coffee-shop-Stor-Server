import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import Swal from 'sweetalert2';
import { FaGoogle, FaTimes } from "react-icons/fa";

const SignUp = () => {
    const { createUser, updateUserProfile, signInWithGoogle } = useContext(AuthContext);

    const handleSignUp = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        
        createUser(email, password)
            .then(result => {
                const loggedUser = result.user;
                console.log('Firebase user created:', loggedUser);

                updateUserProfile(name, null)
                    .then(() => {
                        console.log('User profile updated with name.');
                        
                        const user = { 
                            name: name,
                            email: loggedUser.email,
                            createdAt: new Date().toISOString()
                        };

                        fetch('http://localhost:2000/user', {
                            method: 'POST',
                            headers: { 'content-type': 'application/json' },
                            body: JSON.stringify(user)
                        })
                        .then(res => res.json())
                        .then(data => {
                            if (data.insertedId) {
                                Swal.fire('Success!', 'Account created successfully!', 'success');
                            }
                        });
                    })
                    .catch(error => {
                        console.error('Profile update error:', error);
                    });
                
                form.reset();
            })
            .catch(error => {
                console.error('Sign Up Error:', error);
                Swal.fire('Error', error.message, 'error');
            });
    };

    const handleGoogleSignIn = () => {
        // আপনি চাইলে Google সাইন-ইন-এর জন্যও MongoDB-তে ডেটা পাঠাতে পারেন
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-200 p-4">
            <div className="relative flex flex-col md:flex-row w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden">
                <Link to="/" className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 z-10 transition-colors">
                    <FaTimes size={24} />
                </Link>
                <div className="md:w-1/2 hidden md:block">
                    <img 
                        src="https://images.unsplash.com/photo-1511920170033-f8329729d71f?q=80&w=1887" 
                        alt="Coffee Beans" 
                        className="w-full h-full object-cover" 
                    />
                </div>
                <div className="w-full md:w-1/2 p-8 sm:p-12">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">Create an Account</h1>
                    <p className="text-gray-500 mb-8">Sign up and get a 10% discount on your first order!</p>
                    <form onSubmit={handleSignUp} className="space-y-5">
                        <div className="form-control">
                            <label className="label"><span className="label-text font-semibold">Full Name</span></label>
                            <input type="text" name="name" placeholder="Amélie Laurent" className="input input-bordered rounded-full" required />
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text font-semibold">Email</span></label>
                            <input type="email" name="email" placeholder="amelie@example.com" className="input input-bordered rounded-full" required />
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text font-semibold">Password</span></label>
                            <input type="password" name="password" placeholder="••••••••" className="input input-bordered rounded-full" required />
                        </div>
                        <button type="submit" className="btn btn-warning w-full rounded-full text-lg font-bold">Submit</button>
                    </form>
                    <div className="divider my-6">OR</div>
                    <div className="flex flex-col gap-4">
                        <button onClick={handleGoogleSignIn} className="btn btn-outline w-full rounded-full">
                            <FaGoogle />
                            Sign up with Google
                        </button>
                    </div>
                    <p className="text-center text-sm text-gray-500 mt-8">
                        Already have an account? 
                        <Link to="/login" className="link link-warning ml-1 font-semibold">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;