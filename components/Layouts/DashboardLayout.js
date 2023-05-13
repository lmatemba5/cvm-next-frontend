import Navigation from './Navigation';

function DashboardLayout({ children, sidebar }) {

    return (
        <main className='overflow-hidden'>
            <div className="min-h-screen bg-gray-100 overflow-hidden">
                <div className='flex justify-between min-h-full'>
                    {sidebar}
                    <div className='w-full min-h-screen md:ms-52'>
                        <Navigation />
                        <div className='w-full mx-auto'>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </main>

    );
}

export default DashboardLayout;