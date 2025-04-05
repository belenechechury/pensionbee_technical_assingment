import React, { useMemo } from 'react';
import { getRoutes } from '@/app/utils/routes';

const Navbar = () => {
    const routes = useMemo(() => getRoutes(), [])
    
    return (
        <nav className="container mx-auto flex justify-between items-center">
            <div className="logo"><p><span className='text-brandBlack'>Acme</span> <span classNameName='text-brandYellow'>Co.</span></p></div>
            <ul className="flex items-center">
                {routes.forEach((route) => {
                    return (
                        <li className="mr-6"><a href={`/${route}`} className="text-gray-700 hover:text-gray-900">Home</a></li>
                    )
                })}
            </ul>
        </nav>
    )
}