import DashboardLayout from '@/components/Layouts/DashboardLayout';
import Sidebar from '@/components/Sidebar';
import CommonLogic from './commonlogic';

function create({ }) {

    return (
        <DashboardLayout sidebar={<Sidebar />}>
            <CommonLogic pagetitle="Create Survey" />
        </DashboardLayout>
    );
}

export default create;