import React, { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'

function LoadingToRedirect() {

    const [count, setCount] = useState(3)
    const [redirect, setRedirect] = useState(false)

    useEffect(() => {
        let isMounted = true; // To avoid state updates on unmounted component
        const interval = setInterval(() => {
            setCount((currentCount) => {
                if (currentCount === 1) {
                    clearInterval(interval)
                    if (isMounted) setRedirect(true);
                    // setRedirect(true)
                }
                return currentCount - 1
            })
        }, 1000)

        return () => {
            isMounted = false,
            clearInterval(interval)
        }
    }, [])

    if (redirect) {
        console.log('hello to main')
        return <Navigate to={'/admin'} />
    }

    return (
        <div>No Permission, Redirect in {count}</div>
    )
}

export default LoadingToRedirect