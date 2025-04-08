import React, { useMemo } from 'react';
import { getRoutes } from '@/app/utils/routes';
import Brand from '@/app/components/Brand';

const Navbar = () => {
    const routes = useMemo(() => getRoutes(), [])

    return (
        <nav className="container w-full p-6 flex justify-between items-center bg-white rounded-b-lg">
            <Brand />
            <ul className="flex gap-[2vw] items-center">
                {routes.map((route) => (
                    <li key={route}>
                        <a href={`/${route}`} className="font-bold uppercase text-xs text-[#343a40] hover:text-[#f9c000]">
                            {route.replaceAll('-', ' ')}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Navbar