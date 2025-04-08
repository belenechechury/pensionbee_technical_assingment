import React from 'react';

const Brand = (children: React.ReactNode) => {
    return (
        <div
          className="w-full rounded-lg bg-white p-4"
        >
          {children}
        </div>
    )
}

export default Brand