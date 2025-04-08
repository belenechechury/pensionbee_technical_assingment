import React from 'react';
import Brand from '@/app/components/Brand';

const Footer = () => {
    return (
        <footer className="bg-brandBlack p-6 bg-white rounded-t-lg shadow-lg">
            <div className='w-full flex justify-between items-center'>
                <Brand size='sm' />
                <p className="text-right text-xs text-gray-500">© Acme Co. {new Date().getFullYear()} <br/> All Rights Reserved
                </p>
            </div>
        </footer>
    )
}

export default Footer