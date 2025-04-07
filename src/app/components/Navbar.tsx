import React, { useMemo } from 'react';
import { getRoutes } from '@/app/utils/routes';

const Navbar = () => {
    const routes = useMemo(() => getRoutes(), [])

    return (
        <nav className="container mx-auto flex justify-between items-center">
            <div className="logo"><p><span className='text-brandBlack'>Acme</span> <span className='text-brandYellow'>Co.</span></p></div>
            <ul className="flex items-center">
                {routes.map((route) => (
                    <li key={route} className="mr-6">
                        <a href={`/${route}`} className="uppercase text-xs text-brandBlack hover:text-brandYellow">
                            {route.replaceAll('-', ' ')}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Navbar