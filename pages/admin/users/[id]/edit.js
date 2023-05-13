import DashboardLayout from '@/components/Layouts/DashboardLayout';
import Sidebar from '@/components/Sidebar';
import axios from '@/lib/proxyurl';
import { useEffect, useState } from 'react';
import Spinner from '@/components/Spinner';
import Button from '@/components/Button';
import LoginActivity from '@/components/charts/LoginActivity';
import useAuth from '@/hooks/auth';

function Edit() {
    const [user, setUser] = useState({})
    const [role, setRole] = useState('')
    const [error, setError] = useState(null)
    const { loading, dispatch, setLoading } = useAuth()

    const [loader, setLoad] = useState({
        is_saving: false,
        is_resetting: false
    })

    const handleSubmit = async (event) => {
        event.preventDefault()

        setLoad({ ...loader, is_saving: true })

        let data = Object.fromEntries(new FormData(event.target))
        await axios.put(`/api/users/${user.id}`, data).then(res => {
            setUser(res.data)
        }).catch(error => {
            console.log(error.response.data)
        })

        setLoad({ ...loader, is_saving: false })
    }

    useEffect(() => {
        const fetchEditableUser = async () => {
            const path = window.location.href.split('/')
            const id = path[path.length - 2];

            dispatch(setLoading(true))

            await axios.get(`/api/users/${id}`).then(res => {
                setRole(res.data.role)
                setUser(res.data)
            }).catch(error => {
                console.log(error.response.data)
            })

            dispatch(setLoading(false))
        }

        if (user?.id === undefined) {
            fetchEditableUser();
        }

    }, [user])

    return (
        <DashboardLayout sidebar={<Sidebar />}>
            <div className="p-4">
                <div className="h-12 mb-8">
                    <div className="text-2xl ">
                        <h1>Profile Information</h1>
                    </div>
                </div>

                {
                    loading ?
                        <div className=" h-60 flex items-center justify-center">
                            <Spinner size={50} text="fetching user data..." />
                        </div>
                        :
                        <div className=''>
                            <div className='flex mb-4'>
                                <div className="mr-3 flex items-center justify-center w-full md:w-2/4 rounded-lg shadow-lg bg-white">
                                    <LoginActivity />
                                </div>

                                <div className="w-full md:w-3/5 rounded-lg shadow-lg m-auto p-4 pb-1 bg-white">
                                    <div>
                                        <h1 className='font-bold'>Profile</h1>
                                        <form method="post" action="#" onSubmit={handleSubmit} className='rounded-lg bg-white p-4'>

                                            <div className=''>
                                                <label>Name</label>
                                                <input type="text" name="name" defaultValue={user.name} className="mt-1 block w-full px-3 py-2 bg-white border rounded-md focus:outline-none focus:border-sky-500" autoFocus />
                                            </div>

                                            <div className='mb-3 text-red-500 invisible'>
                                                {error}
                                            </div>

                                            <div className='mb-3'>
                                                <label>Email</label>
                                                <input type="email" name="email" defaultValue={user.email} className="mt-1 block w-full px-3 py-2 bg-white border rounded-md focus:outline-none focus:border-sky-500" autoFocus />
                                            </div>

                                            <div className=''>
                                                <label>Role {role}</label>

                                                <select defaultValue={role} name="role" className="mt-1 block w-full px-3 py-2 bg-white border rounded-md focus:outline-none focus:border-sky-500">
                                                    <option value="">--select--</option>
                                                    <option value="Admin">Administrator</option>
                                                    <option value="Manager">Branch Manager</option>
                                                    <option value="Chief Manager">Chief Manager</option>
                                                </select>
                                            </div>

                                            <div className='mb-1 flex justify-between mt-10'>
                                                <Button type="button" className="bg-red-800 rounded hover:bg-red-900 text-white px-3 py-1">
                                                    {
                                                        loader.is_resetting ? <Spinner text="Sending..." /> : "Send Password Reset Link"
                                                    }
                                                </Button>

                                                <Button type="submit" className="bg-blue-800 rounded text-white px-3 py-1">
                                                    {
                                                        loader.is_saving ? <Spinner text="Saving..." /> : "Save"
                                                    }
                                                </Button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                }
            </div>
        </DashboardLayout>
    );
}

export default Edit;