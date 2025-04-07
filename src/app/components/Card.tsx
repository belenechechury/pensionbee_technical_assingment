import React from 'react';

const Brand = (children: React.ReactNode) => {
    return (
        <div
          className="w-full rounded-lg bg-white p-4 shadow-lg"
        >
          {children}
        </div>
    )
}

export default Brand