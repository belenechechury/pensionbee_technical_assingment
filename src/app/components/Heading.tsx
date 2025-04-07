import React from 'react';

const Heading = ({ level, children }: { children: React.ReactNode, level?: 1 | 2 | 3 }) => {
    const Tag = `h${level || 1}` as keyof JSX.IntrinsicElements;

    return <Tag className={`font-extrabold text-brandYellow`}>{children}</Tag>;
}

export default Heading