import React from 'react';

type BrandProps = {
    size?: 'xs' | 'sm' | 'xl' | '3xl';
};

const Brand: React.FC<BrandProps> = ({ size = '3xl' }) => {
    return (
        <div className="logo"><p className={`font-extrabold text-${size}`}><span className='text-[#343a40]'>Acme</span> <span className='text-[#f9c000]'>Co.</span></p></div>
    )
}

export default Brand