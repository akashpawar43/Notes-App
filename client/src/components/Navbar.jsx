import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
    const [ham, setHam] = useState(false);
    const location = useLocation()

    const handleham = () => {
        setHam(!ham)
    }

    const nav_items = [
        { name: "Home", link: "/" },
        { name: "Sign In", link: "/signin" },
        { name: "Register", link: "/register" },
        { name: "About", link: "/about" },
    ]

    return (
        <nav className="w-full bg-gray-800 text-white sticky top-0 drop-shadow-xl">
            <div className=" container mx-auto p-4 flex flex-col xl:flex-row justify-between">
                <div className="flex flex-row justify-between">
                    <div>
                        <p>Navbar</p>
                    </div>
                    <div onClick={handleham} className=" h-full p-1 flex xl:hidden flex-col gap-2 cursor-pointer">
                        <div className=" w-6 h-0.5 bg-white"></div>
                        <div className=" w-6 h-0.5 bg-white"></div>
                        <div className=" w-6 h-0.5 bg-white"></div>
                    </div>
                </div>
                <ul className={` flex-col text-center xl:flex xl:flex-row xl:text-right gap-3 ${ham ? "flex " : " hidden"}`} >
                    {nav_items.map((items, i) => (
                        <li key={i}>
                            <Link to={items.link}>
                                <span className={` hover:text-white ${location.pathname == items.link ? " text-white" : "text-gray-400"}`}>{items.name}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    )
}
