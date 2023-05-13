import Sidebar from "@/components/Sidebar";
import DashboardLayout from "@/components/Layouts/DashboardLayout";
import { useEffect, useState } from "react";
import { Pencil, ThreeDotsVertical, Trash3 } from "react-bootstrap-icons";
import { DropdownButton } from "@/components/DropdownLink";
import Dropdown from "@/components/Dropdown";
import axios from '@/lib/proxyurl'
import useAuth from "@/hooks/auth";
import { useDispatch } from "react-redux";
import Spinner from "@/components/Spinner";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

const UserModal = dynamic(() => import("@/components/modals/userModal"), { ssr: false });

function Users() {
    const [error, setError] = useState(null)
    const [processing, setProcessing] = useState(false)
    const [showModal, setShow] = useState(false)
    const [users, setUsers] = useState([])

    const { loading, setLoading, register } = useAuth()
    const dispatch = useDispatch()
    const router = useRouter()

    const handleAddUserForm = async (event) => {
        event.preventDefault()

        setProcessing(true)

        const data = Object.fromEntries(new FormData(event.target))
        try {
            const response = await register({ setError, ...data })

            if (response.status === 201) {
                event.target.name.value = ''
                event.target.email.value = ''

                users.push(response.data.data)
                setUsers(users)
                setShow(false)
            }
        } catch (error) {
            setError(error.response?.data.error.replace('(and 1 more error)', ''))
        }

        setProcessing(false)
    }

    const handleDelete = async (user) => {
        let response = await axios.delete(`/api/users/${user.id}`)

        if (response.status === 200) {
            let index = users.indexOf(user)

            if (index !== -1) {
                setUsers(users.filter(pred => pred.id !== user.id))
            }
        } else {
            console.log(response.data)
        }
    }

    useEffect(() => {
        const getUsers = async () => {
            dispatch(setLoading(true))
            let response = await axios.get('/api/users')

            if (response.status === 200) {
                setUsers(response.data)
            }

            dispatch(setLoading(false))
        }

        getUsers();
    }, [])

    return (
        <DashboardLayout sidebar={<Sidebar />}>
            <div className="p-4">
                <div className="h-24">
                    <div className="text-2xl ">
                        <h1>Users</h1>
                        <h5 className="text-gray-500 text-sm hidden md:block">Manager system users</h5>
                    </div>
                    <div className="flex justify-end items-center mb-4">
                        <button
                            type="button"
                            className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                            data-te-toggle="modal"
                            data-te-target="#userModal"
                            data-te-ripple-init
                            data-te-ripple-color="light"
                            onClick={() => setShow(true)}
                        >
                            ADD USER
                        </button>
                    </div>
                </div>

                {
                    loading ?
                        <div className=" h-60 flex items-center justify-center">
                            <Spinner size={50} text="fetching data..." />
                        </div>
                        :

                        <div className="w-full rounded-lg shadow-lg m-auto pt-4 pb-1 bg-white">
                            <table className="w-full table-auto">
                                <thead>
                                    <tr className="text-left font-bold">
                                        <th className="ps-2 w-1/12">#</th>
                                        <th className="w-4/12">Name</th>
                                        <th className="w-3/12">Role</th>
                                        <th className="hidden w-4/12 md:block">Email</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        users.map((user, index) => {
                                            return (
                                                <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : ''} hover:bg-gray-100 px-2 py-3 border-t`}>
                                                    <td className="ps-2 py-2">{index + 1}</td>
                                                    <td>{user.name}</td>
                                                    <td>{user.role}</td>
                                                    <td className="hidden md:block">{user.email}</td>
                                                    <td>
                                                        <div className="flex items-center justify-end pr-2">
                                                            <Dropdown
                                                                align="right"
                                                                width="48"
                                                                trigger={
                                                                    <button className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 focus:outline-none transition duration-150 ease-in-out">
                                                                        <div>
                                                                            <ThreeDotsVertical />
                                                                        </div>
                                                                    </button>
                                                                }>
                                                                {/* Authentication */}
                                                                <DropdownButton className="flex items-center" onClick={() => router.push(`/admin/users/${user.id}/edit`)}>
                                                                    <Pencil className="mr-3" /> Edit
                                                                </DropdownButton>
                                                                <DropdownButton className="flex items-center" onClick={() => handleDelete(user)}>
                                                                    <Trash3 className="mr-3 text-red-500" /> Delete
                                                                </DropdownButton>
                                                            </Dropdown>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                }
            </div>

            <UserModal handleSubmit={handleAddUserForm} error={error} show={showModal} processing={processing} />
        </DashboardLayout>
    );
}

export default Users;