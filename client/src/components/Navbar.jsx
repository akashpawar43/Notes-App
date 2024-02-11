import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaRegNoteSticky } from "react-icons/fa6";
import { FaNoteSticky } from "react-icons/fa6";

export default function Navbar() {
    const [ham, setHam] = useState(false);
    const location = useLocation()
    const navigate = useNavigate();
    const handleham = () => {
        setHam(!ham)
    }

    const nav_items = [
        { name: "Home", link: "/" },
        { name: "About", link: "/about" },
    ]

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login')
    }
    return (
        <nav className="w-full bg-gray-800 text-white sticky top-0 drop-shadow-xl">
            <div className=" container mx-auto p-4 flex flex-col xl:flex-row justify-between items-center">
                <div className="flex flex-row justify-between">
                    <div className="flex flex-row justify-center items-center gap-1">
                        {/* <FaRegNoteSticky /> */}
                        <FaNoteSticky />
                        <p>Your Notes</p>
                    </div>
                    <div onClick={handleham} className=" h-full p-1 flex xl:hidden flex-col gap-2 cursor-pointer">
                        <div className=" w-6 h-0.5 bg-white"></div>
                        <div className=" w-6 h-0.5 bg-white"></div>
                        <div className=" w-6 h-0.5 bg-white"></div>
                    </div>
                </div>
                <ul className={` flex-col justify-center items-center text-center xl:flex xl:flex-row xl:text-right gap-3 ${ham ? "flex " : " hidden"}`} >
                    {nav_items.map((items, i) => (
                        <li key={i}>
                            <Link to={items.link}>
                                <span className={` hover:text-white ${location.pathname == items.link ? " text-white" : "text-gray-400"}`}>{items.name}</span>
                            </Link>
                        </li>
                    ))}
                    {!localStorage.getItem('token') ?
                        <>
                            <Link to="/login" className=" bg-gray-500 px-3 py-1 rounded-md">
                                <span className="hover:text-white text-white">Log In</span>
                            </Link>
                            <Link to="/signup" className=" bg-gray-500 px-3 py-1 rounded-md">
                                <span className="hover:text-white text-white">Sign up</span>
                            </Link>
                        </>
                        :
                        <li>
                            <Link to="/login" onClick={handleLogout} className=" bg-gray-500 px-3 py-1 rounded-md">
                                <span className="hover:text-white text-white">Logout</span>
                            </Link>
                        </li>

                    }
                </ul>
            </div>
        </nav>
    )
}
