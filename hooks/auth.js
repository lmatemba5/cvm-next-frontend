import axios from "@/lib/proxyurl";
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from "next/router";
import useSWR from 'swr'
import {
    setLoading,
    setAuthenticated,
    setActive,
} from "@/redux/reducers/userReducer";
import hashCode from "../lib/hash";

const useAuth = () => {
    const { is_logged_in, loading, active } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const router = useRouter()

    const { data: user, error, mutate } = useSWR('user', () =>
        axios.get('/api/user').then(res => res.data)
    )

    const signin = async ({ setError, ...props }) => {
        dispatch(setLoading(true))

        setError(null)

        await axios.post('/api/login', props).then(res => {
            dispatch(setAuthenticated(true))
            mutate()
        }).catch(error => {
            setError({ ...error.response.data })
        })

        dispatch(setLoading(false))
    }

    const signout = async () => {
        let response = await axios.post('/api/logout');

        if (response.status === 200) {
            mutate(null)
        }
    }

    const register = async ({ setError, ...props }) => {
        setError(null)
        return await axios.post('/api/users', props);
    }

    const resetActive = (value) => {
        dispatch(setActive(value))
    }


    const checkAuthentication = () => {
        if (typeof window !== 'undefined' && error) {
            router.push('/login')
        }

        if (typeof window !== 'undefined' && user) {
            const path = router.pathname
            if (path === '/login') {
                router.push(user.role?.split(' ').join('-').toLowerCase())
            } else {
                if (path.startsWith('/admin/users')) {
                    dispatch(setActive(hashCode('/admin/users')))
                } else if (path.startsWith('/admin/surveys')) {
                    dispatch(setActive(hashCode('/admin/surveys')))
                } else {
                    dispatch(setActive(hashCode(router.pathname)))
                }
            }
        }
    }

    useEffect(() => {
        checkAuthentication()
    }, [])

    useEffect(() => {
        checkAuthentication()
    }, [user, error])

    return {
        user,
        register,
        signin,
        signout,
        is_logged_in,
        loading,
        active,
        resetActive,
        setLoading,
        dispatch
    }
}

export default useAuth;