import Sidebar from "@/components/Sidebar";
import DashboardLayout from "@/components/Layouts/DashboardLayout";

function Home() {
    return (
        <DashboardLayout sidebar={<Sidebar />}>
            Dashboard here
        </DashboardLayout>
    );
}

export default Home;