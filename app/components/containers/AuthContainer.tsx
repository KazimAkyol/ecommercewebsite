import React from 'react'

const AuthContainer = ({ children }: { children: React.ReactNode }) => {
    return (
        <div
            className='min-h-fit mt-25 h-full w-full flex items-center justify-center'>
            {children}
        </div>
    )
}

export default AuthContainer