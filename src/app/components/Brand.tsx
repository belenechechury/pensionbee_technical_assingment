import React from 'react';

type BrandProps = {
    size?: 'xs' | 'sm' | 'xl' | '2xl';
};

const Brand: React.FC<BrandProps> = ({ size = '2xl' }) => {
    return (
        <div className="logo"><p className={`font-extrabold text-${size ?? '2xl'}`}><span className='text-[#343a40]'>Acme</span> <span className='text-[#f9c000]'>Co.</span></p></div>
    )
}

export default Brand