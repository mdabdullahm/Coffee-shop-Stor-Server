import { useContext, useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

const Header = () => {
    const { user, logOut, loading } = useContext(AuthContext);
    const logoUrl = "https://i.ibb.co/6y4t3Fq/logo1.png";
    const [theme, setTheme] = useState(localStorage.getItem("theme") ? localStorage.getItem("theme") : "light");

    const handleToggle = (e) => {
        if (e.target.checked) setTheme("dark");
        else setTheme("light");
    };

    useEffect(() => {
        localStorage.setItem("theme", theme);
        document.querySelector("html").setAttribute("data-theme", theme);
    }, [theme]);

    const handleLogOut = () => {
        logOut()
            .then(() => console.log('User logged out successfully.'))
            .catch(error => console.error(error));
    }

    const navLinks = (
        <>
            <li><NavLink to="/" className="font-semibold">Home</NavLink></li>
            <li><NavLink to="/addCoffee" className="font-semibold">Add Coffee</NavLink></li>
            <li><NavLink to="/users" className="font-semibold">Users</NavLink></li>
        </>
    );

    return (
        <div className="navbar bg-base-100 shadow-lg px-4 sm:px-8">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {navLinks}
                    </ul>
                </div>
                <NavLink to="/" className="btn btn-ghost text-xl font-bold">
                    <img src={logoUrl} alt="Coffee House Logo" className="w-10 h-10" />
                    <span className="hidden sm:inline">Coffee House</span>
                </NavLink>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">{navLinks}</ul>
            </div>
            <div className="navbar-end flex-1 justify-end space-x-2 sm:space-x-4">
                <label className="swap swap-rotate">
                    <input type="checkbox" onChange={handleToggle} checked={theme === "dark"} />
                    <svg className="swap-on fill-current w-6 h-6 sm:w-8 sm:h-8" viewBox="0 0 24 24"><path d="M5.64,17l-1.41-1.41L12,7.05,19.77,14.83,18.36,16.24,12,9.88ZM12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Z"/></svg>
                    <svg className="swap-off fill-current w-6 h-6 sm:w-8 sm:h-8" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22,8.27,8.27,0,0,1,15.92,10.6,7.9,7.9,0,0,1,12.14,19.73Z"/></svg>
                </label>

                {
                    loading ? 
                    <span className="loading loading-spinner loading-sm"></span> :
                    user ? (
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                    <img alt="User profile" src={user.photoURL || 'https://i.ibb.co/6y4t3Fq/logo1.png'} referrerPolicy="no-referrer" />
                                </div>
                            </div>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                <li className="px-4 py-2 font-semibold">
                                    {user.displayName || 'User'}
                                </li>
                                <li className="px-4 pb-2 text-xs text-gray-500">
                                    {user.email}
                                </li>
                                <li><button onClick={handleLogOut} className="btn btn-sm btn-ghost w-full">Logout</button></li>
                            </ul>
                        </div>
                    ) : (
                        <div className="space-x-2">
                            <Link to="/login"><button className="btn btn-primary">Login</button></Link>
                            <Link to="/signup"><button className="btn btn-secondary">Sign Up</button></Link>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default Header;