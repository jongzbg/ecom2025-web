import React, { useState, useEffect, memo } from 'react'
import useEcomStore from '../store/ecom-store'
import { currentAdmin } from '../api/auth'
import LoadingToRedirect from '../routes/LoadingToRedirect'

const ProtectRouteAdmin = ({ element }) => {
    const [ok, setOk] = useState(false)
    const user = useEcomStore((state) => state.user)
    const token = useEcomStore((state) => state.token)

    // useEffect(() => {
    //     if (user && token) {
    //         // send to back
    //         currentAdmin(token)
    //             .then((res) => setOk(true))
    //             .catch((err) => setOk(false))
    //         // .then((res) => console.log(res))
    //         // .catch((err) => console.log(err))
    //     }
    // }, [user, token])

    useEffect(() => {
        if (user && token) {
        
            currentAdmin(token)
                .then(() => {
                    console.log("Admin access granted");
                    setOk(true);
                })
                .catch(() => {
                    console.log("Admin access denied");
                    setOk(false);
                });
        }
    }, [user, token]);

    // console.log(token)
    return ok ? element : <LoadingToRedirect />
    // return ok ? <MemoizedElement element={element} /> : <LoadingToRedirect />;
}

export default ProtectRouteAdmin