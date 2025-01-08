import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export function NavBar() {
    const navigate = useNavigate();
    const [isNavOpen, setIsNavOpen] = useState(false);

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen); // Toggle the state of the nav bar
    };

    return (
        <div>
            {/* Navigation Bar */}
            <nav className="bg-blue-100 p-4 flex items-center justify-between relative">
                <div className="flex items-center space-x-4">
                    <img
                        src={logo}
                        alt="Logo"
                        className="rounded-full h-12 w-auto"
                    />
                    <span className="text-2xl font-bold text-indigo-800">Click and Collect</span>
                </div>

                {/* Toggle Button for Mobile View */}
                <button
                    onClick={toggleNav}
                    className="lg:hidden p-2 bg-indigo-700 text-white rounded-lg"
                >
                    ☰
                </button>

                {/* Desktop Navigation */}
                <ul className="hidden lg:flex space-x-8 text-black">
                    <li
                        className="hover:bg-indigo-700 p-2 rounded-lg cursor-pointer transition duration-300"
                        onClick={() => navigate('/addItems')}
                    >
                        Add Product
                    </li>
                    <li
                        className="hover:bg-indigo-700 p-2 rounded-lg cursor-pointer transition duration-300"
                        onClick={() => navigate('/viewProducts')}
                    >
                        View Product
                    </li>
                </ul>
            </nav>

            {/* Sliding Navbar for Mobile View */}
            <div
                className={`lg:hidden fixed inset-0 bg-blue-100 p-4 transform transition-transform duration-300 ${isNavOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <button
                    onClick={toggleNav}
                    className="absolute top-4 right-4 text-2xl text-black"
                >
                    ✖
                </button>

                <ul className="space-y-4 text-black">
                    <li
                        className="hover:bg-indigo-700 p-2 rounded-lg cursor-pointer transition duration-300"
                        onClick={() => navigate('/addItems')}
                    >
                        Add Product
                    </li>
                    <li
                        className="hover:bg-indigo-700 p-2 rounded-lg cursor-pointer transition duration-300"
                        onClick={() => navigate('/viewProducts')}
                    >
                        View Product
                    </li>
                </ul>
            </div>
        </div>
    );
}
