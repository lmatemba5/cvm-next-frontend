import Sidebar from "@/components/Sidebar";
import DashboardLayout from "@/components/Layouts/DashboardLayout";
import { Pencil, ThreeDotsVertical, Trash3 } from "react-bootstrap-icons";
import Dropdown from "@/components/Dropdown";
import { DropdownButton } from "@/components/DropdownLink";
import { useState } from 'react'
import Link from "next/link";
import { useRouter } from "next/router";


function Surveys() {
    const router = useRouter()

    const [surveys, setServeys] = useState([
        {
            id: 1,
            title: 'Customer Satisfaction',
            description: 'measures how customers are satisfied with our service',
            responses: 25,
            created_at: 'Dec 2022'
        },
        {
            id: 2,
            title: 'VSAT',
            description: 'description here',
            responses: 50,
            created_at: 'Jan 2023'
        }
    ])

    return (
        <DashboardLayout sidebar={<Sidebar />}>
            <div className="p-4">
                <div className="h-24">
                    <div className="text-2xl ">
                        <h1>Surveys</h1>
                        <h5 className="text-gray-500 text-sm hidden md:block">Manager Surveys</h5>
                    </div>
                    <div className="flex justify-end items-center mb-4">
                        <Link href="/admin/surveys/create"
                            className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                            data-te-ripple-init
                            data-te-ripple-color="light"
                        >
                            Create Survey
                        </Link>
                    </div>
                </div>

                <div className="w-full rounded-lg shadow-lg m-auto pt-4 pb-1 bg-white">

                    <table className="w-full table-auto">
                        <thead>
                            <tr className="text-left font-bold">
                                <th className="ps-2">#</th>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Responses</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                surveys.map((survey, index) => {
                                    return (
                                        <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : ''} border-t-2 mb-2`}>
                                            <td className="ps-2 py-3">{index + 1}</td>
                                            <td>{survey.title}</td>
                                            <td>{survey.description}</td>
                                            <td>{survey.responses}</td>
                                            <td>
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
                                                        <DropdownButton className="flex items-center" onClick={() => router.push(`/admin/surveys/${survey.id}/edit`)}>
                                                            <Pencil className="mr-3" /> Edit
                                                        </DropdownButton>
                                                        <DropdownButton className="flex items-center" onClick={() => handleDelete(user)}>
                                                            <Trash3 className="mr-3 text-red-500" /> Delete
                                                        </DropdownButton>
                                                    </Dropdown>
                                                </label>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </DashboardLayout>
    );
}

export default Surveys;