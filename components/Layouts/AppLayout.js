
const AppLayout = ({ children }) => {

    return (
        <div className="min-h-screen bg-gray-100 overflow-hidden">
            {/* Page Content */}
            <main>{children}</main>
        </div>
    )
}

export default AppLayout
