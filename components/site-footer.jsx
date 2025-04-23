import React from 'react'
import Logo from './logo';

const SiteFooter = ({children}) => {
    return (
        <div className='flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0 px-4 md:px-16'>
            <div className='flex flex-col itms-center gap-4 px-8 md:flex-row md:gap-2 md:px-0'>
                <Logo></Logo>
                <p className='text-center text-sm leading-loose md:text-left'>Build by @ Easy Learning 2025</p>
            </div>
        </div>
    );
}

export default SiteFooter;