import Sidebar from "@/components/Sidebar";
import DashboardLayout from "@/components/Layouts/DashboardLayout";
import { useEffect, useState } from "react";
import { ThreeDotsVertical } from "react-bootstrap-icons";
import { DropdownButton } from "@/components/DropdownLink";
import Dropdown from "@/components/Dropdown";
import Button from "@/components/Button";

function Branches(props) {
    const [users, setUsers] = useState([])

    useEffect(() => {
        setUsers(props.users)
    }, [props?.users])

    return (
        <DashboardLayout sidebar={<Sidebar />}>
            <div className="p-4">
                <div className="">
                    <div className="text-2xl ">
                        <h1>Users</h1>
                        <h5 className="text-gray-500 text-sm hidden md:block">Manager system users</h5>
                    </div>
                    <div className="flex justify-end items-center mb-4">
                        <Button type="button" className="bg-blue-700 hover:bg-blue-900 active:bg-blue-800">
                            new user
                        </Button>
                    </div>
                </div>
                <div className="w-full rounded-lg shadow-lg m-auto pt-4 bg-white overflow-auto">
                    <div className="sm:text-sm w-full my-2 px-2 grid md:grid-cols-5 grid-cols-3 items-center justify-between">
                        <span className="">Name</span>
                        <span className="hidden md:grid">Email</span>
                        <span>Role</span>
                        <span className="hidden md:grid">Last Login</span>
                        <span></span>
                    </div>
                    <ul>
                        {
                            users.map((user, index) => {
                                return (
                                    <li key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : ''} hover:bg-gray-100 p-2 grid md:grid-cols-5 border-t grid-cols-3 items-center justify-between`}>
                                        <label>{user.name}</label>
                                        <label className="hidden md:block">{user.email}</label>
                                        <label>{user.role.join('')}</label>
                                        <label className="hidden md:block">{user.last_login}</label>
                                        <label className="flex justify-end">
                                            <Dropdown
                                                align="right"
                                                width="48"
                                                trigger={
                                                    <button className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 focus:outline-none transition duration-150 ease-in-out">
                                                        <div>
                                                            <ThreeDotsVertical />
                                                        </div>
                                                    </button>
                                                } className="absolute mr-4">
                                                {/* Authentication */}
                                                <DropdownButton>
                                                    View
                                                </DropdownButton>
                                                <DropdownButton>
                                                    Edit
                                                </DropdownButton>
                                                <DropdownButton>
                                                    Delete
                                                </DropdownButton>
                                            </Dropdown>
                                        </label>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        </DashboardLayout>
    );
}

Branches.getInitialProps = async (context) => {
    let users = [
        {
            id: 1,
            name: 'Administrator',
            email: 'admin@isg.com',
            last_login: 'Jan 15, 2023',
            role: ['Admin']
        },
        {
            id: 2,
            name: 'Marriam James',
            email: 'mjames@isg.com',
            last_login: 'Jan 15, 2023',
            role: ['Manager']
        }, {
            id: 3,
            name: 'Shaffie Matemba',
            email: 'smatemba@isg.com',
            last_login: 'Jan 15, 2023',
            role: ['Chief Manager']
        }
    ]

    return {
        users
    }
}

export default Branches;