import Dropdown from '@/components/Dropdown'
import { DropdownButton } from '@/components/DropdownLink'
import useAuth from '@/hooks/auth'
import { useState } from 'react'
import { Person } from 'react-bootstrap-icons'

const Navigation = () => {
    const { user, signout } = useAuth()
    const [open, setOpen] = useState(false)

    return (
        <nav className="bg-white shadow h-16">
            {/* Primary Navigation Menu */}
            <div className="px-4">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        {/* Hamburger */}
                        <div className="-mr-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setOpen(open => !open)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out">
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24">
                                    {open ? (
                                        <path
                                            className="inline-flex"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    ) : (
                                        <path
                                            className="inline-flex"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Settings Dropdown */}
                    <div className="flex items-center justify-center sm:ml-6">

                        {/*small screens*/}
                        <Dropdown
                            align="right"
                            width="48"
                            trigger={
                                <button className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 focus:outline-none transition duration-150 ease-in-out">
                                    <div>
                                        <Person size={30} className='p-1 mr-2 rounded-full bg-gray-200 ' />
                                    </div>
                                </button>
                            } className='block md:hidden'>
                            {/* Authentication */}
                            <DropdownButton onClick={signout}>
                                Logout
                            </DropdownButton>
                        </Dropdown>

                        {/*large screens*/}
                        <Dropdown
                            align="right"
                            width="48"
                            trigger={
                                <button className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 focus:outline-none transition duration-150 ease-in-out">
                                    <div>{user ? user.name : ''}</div>

                                    <div className="ml-1">
                                        <svg
                                            className="fill-current h-4 w-4"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20">
                                            <path
                                                fillRule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                </button>
                            } className='hidden md:block'>
                            {/* Authentication */}
                            <DropdownButton onClick={signout}>
                                Logout
                            </DropdownButton>
                        </Dropdown>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navigation
