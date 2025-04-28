import React from 'react';
import { SignupForm } from '../_components/signup-form';

const RegisterPage = ({params}) => {
    
    return (
        <div className='w-full flex-col h-screen flex items-center justify-center'>
            <div className='container'>
                <SignupForm role={params.role} />
            </div>
        </div>
    );
};

export default RegisterPage;