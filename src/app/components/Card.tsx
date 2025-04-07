import React, { useMemo } from 'react';
import { getRoutes } from '@/app/utils/routes';

const Brand = () => {
    const routes = useMemo(() => getRoutes(), [])

    return (
        <div className="logo"><p><span className='text-brandBlack'>Acme</span> <span className='text-brandYellow'>Co.</span></p></div>
    )
}

export default Brand