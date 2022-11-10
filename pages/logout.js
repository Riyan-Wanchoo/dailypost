import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import React, {useEffect} from 'react'

const Logout = () => {
    const router = useRouter()
    useEffect(() => {
        if (Cookies.get("jwt")) {
          Cookies.remove("jwt")
          Cookies.remove("username")
          router.push("/")
        }
        else{
            router.push("/")
        }
      }, [])
    return (
        <div></div>
    )
}

export default Logout