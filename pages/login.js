import Link from 'next/link';
import useAuth from '@/hooks/auth';
import Spinner from '@/components/Spinner';
import { useState } from 'react';

function Login() {
    const [error, setError] = useState(null)
    const { signin, loading } = useAuth()

    const submit = async (event) => {
        event.preventDefault()
        const { email, password } = Object.fromEntries(new FormData(event.target))

        signin({
            email,
            password,
            setError
        })
    }

    return (
        <div className='mx-0 m min-h-screen flex items-center justify-center bg-gray-100 p-4'>
            <div className='w-full md:w-4/12'>
                <div className='flex justify-end'>
                    <label className='px-4 py-2 bg-blue-800 text-white rounded-t-lg'>SIGNIN</label>
                </div>
                <form method="post" action="#" onSubmit={submit} className='rounded-lg bg-white p-4 shadow-lg'>

                    <div className=''>
                        <label>Email</label>
                        <input type="email" name="email" className="mt-1 block w-full px-3 py-2 bg-white border rounded-md focus:outline-none focus:border-sky-500" autoFocus />
                    </div>

                    <div className='mb-3 text-red-500'>
                        {error ? error.message : ''}
                    </div>

                    <div className=''>
                        <label>Password</label>
                        <input type="password" name="password" className="mt-1 block w-full px-3 py-2 bg-white border rounded-md focus:outline-none focus:border-sky-500" autoFocus />
                    </div>

                    <div className='mb-1 flex justify-between mt-10'>
                        <Link href="/forgot-password" className='text-blue-500'>
                            Forgot password?
                        </Link>
                        <button type="submit" className="bg-blue-800 rounded text-white px-3 py-1">
                            {
                                loading ? <Spinner text="Loading..." /> : "Login"
                            }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;