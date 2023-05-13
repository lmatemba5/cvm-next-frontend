import Link from 'next/link';
import { Briefcase, Building, House, Person, Cpu } from 'react-bootstrap-icons';
import useAuth from '@/hooks/auth';
import hashCode from '@/lib/hash';

function Sidebar({ }) {
    const { active, resetActive } = useAuth()

    return (
        <aside className='text-lg fixed min-h-full w-52 bg-blue-500 text-white hidden md:block'>
            <div>
                <div className='p-4 flex items-center text-4xl mb-4'>
                    <Cpu className='mr-3' size={45} />
                    <span>ISG</span>
                </div>
                <ul className='px-4'>
                    <li className='flex items-center ps-3 mb-4 uppercase'>
                        <h2>Admin Panel</h2>
                    </li>
                    <li className='flex rounded'>
                        <Link onClick={() => resetActive(hashCode("/admin"))} href="/admin" className={`flex hover:bg-blue-950 items-center py-2 pr-2 rounded w-full ${active == hashCode("/admin") ? 'bg-blue-950' : ''}`}>
                            <span className={`h-6 bg-gray-200 w-1 rounded-r-lg ${active == hashCode("/admin") ? '' : 'invisible'}`}></span>
                            <House className='mx-2' />
                            <span>Dashboard</span>
                        </Link>
                    </li>
                    <li className='flex rounded' >
                        <Link onClick={() => resetActive(hashCode("/admin/users"))} href="/admin/users" className={`flex hover:bg-blue-950 items-center py-2 pr-2 rounded w-full  ${active == hashCode("/admin/users") ? 'bg-blue-950' : ''}`}>
                            <span className={`h-6 bg-gray-200 w-1 rounded-r-lg ${active == hashCode("/admin/users") ? '' : 'invisible'}`}></span>
                            <Person className='mx-2' />
                            <span>Users</span>
                        </Link>
                    </li>
                    <li className='flex rounded' >
                        <Link onClick={() => resetActive(hashCode("/admin/branches"))} href="/admin/branches" className={`flex hover:bg-blue-950 items-center py-2 pr-2 rounded w-full  ${active == hashCode("/admin/branches") ? 'bg-blue-950' : ''}`}>
                            <span className={`h-6 bg-gray-200 w-1 rounded-r-lg ${active == hashCode("/admin/branches") ? '' : 'invisible'}`}></span>
                            <Building className='mx-2' />
                            <span>Branches</span>
                        </Link>
                    </li>
                    <li className='flex rounded' >
                        <Link onClick={() => resetActive(hashCode("/admin/surveys"))} href="/admin/surveys" className={`flex hover:bg-blue-950 items-center py-2 pr-2 rounded w-full  ${active == hashCode("/admin/surveys") ? 'bg-blue-950' : ''}`}>
                            <span className={`h-6 bg-gray-200 w-1 rounded-r-lg ${active == hashCode("/admin/surveys") ? '' : 'invisible'}`}></span>
                            <Briefcase className='mx-2' />
                            <span>Surveys</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </aside>
    );
}

export default Sidebar;