import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import Swal from 'sweetalert2';
import { FaGoogle, FaTimes } from "react-icons/fa";

const Login = () => {
    const { signInUser, signInWithGoogle } = useContext(AuthContext);

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        signInUser(email, password)
            .then(result => {
                const loggedInUser = result.user;
                
                const user = { email, lastLoggedAt: new Date().toISOString() };
                fetch('http://localhost:2000/user', {
                    method: 'PATCH',
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify(user)
                })
                .then(res => res.json())
                .then(data => {
                    console.log('Login time updated:', data);
                });

                Swal.fire({
                    icon: 'success',
                    title: 'Login Successful!',
                    timer: 2000,
                    showConfirmButton: false
                });
                form.reset();
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text: 'Invalid credentials. Please try again.',
                });
            });
    }

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                const loggedInUser = result.user;

                const user = { email: loggedInUser.email, lastLoggedAt: new Date().toISOString() };
                fetch('http://localhost:2000/user', {
                    method: 'PATCH',
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify(user)
                })
                .then(res => res.json())
                .then(data => {
                    console.log('Login time updated for Google user:', data);
                });
                
                Swal.fire({
                    icon: 'success',
                    title: 'Login Successful!',
                    timer: 2000,
                    showConfirmButton: false
                });
            })
            .catch(error => {
                Swal.fire('Error', error.message, 'error');
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-200 p-4">
            <div className="relative flex flex-col md:flex-row w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden">
                <Link to="/" className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 z-10 transition-colors">
                    <FaTimes size={24} />
                </Link>
                <div className="md:w-1/2 hidden md:block">
                    <img 
                        src="https://images.unsplash.com/photo-1559496417-e7f25cb247f3?q=80&w=1887" 
                        alt="Cup of Coffee" 
                        className="w-full h-full object-cover" 
                    />
                </div>
                <div className="w-full md:w-1/2 p-8 sm:p-12">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome Back!</h1>
                    <p className="text-gray-500 mb-8">Login to continue your coffee adventure.</p>
                    <form onSubmit={handleLogin} className="space-y-5">
                        <div className="form-control">
                            <label className="label"><span className="label-text font-semibold">Email</span></label>
                            <input type="email" name="email" placeholder="amelie@example.com" className="input input-bordered rounded-full" required />
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text font-semibold">Password</span></label>
                            <input type="password" name="password" placeholder="••••••••" className="input input-bordered rounded-full" required />
                        </div>
                        <button type="submit" className="btn btn-warning w-full rounded-full text-lg font-bold">Login</button>
                    </form>
                    <div className="divider my-6">OR</div>
                    <div className="flex flex-col gap-4">
                        <button onClick={handleGoogleSignIn} className="btn btn-outline w-full rounded-full">
                            <FaGoogle />
                            Sign in with Google
                        </button>
                    </div>
                    <p className="text-center text-sm text-gray-500 mt-8">
                        Don't have an account? 
                        <Link to="/signup" className="link link-warning ml-1 font-semibold">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;