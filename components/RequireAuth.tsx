import useAuth from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import React from 'react'

function RequireAuth() {
const {auth}:any=useAuth()
const location = useRouter()
return (
    // auth?.roles?.find(role => allowedRoles?.includes(role))
    // ? <Outlet />
    // : auth?.user
    //     ? <Navigate to="/unauthorized" state={{ from: location }} replace />
    //     : <Navigate to="/login" state={{ from: location }} replace />
)
}

export default RequireAuth