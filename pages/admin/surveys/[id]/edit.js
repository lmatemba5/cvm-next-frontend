import DashboardLayout from '@/components/Layouts/DashboardLayout';
import Sidebar from '@/components/Sidebar';

function edit() {
    return (
        <DashboardLayout sidebar={<Sidebar />}>
            Edit survey
        </DashboardLayout>
    );
}

export default edit;