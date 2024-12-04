import NoSubmissionsCard from '~/components/no-submission-card';
import AllSubmissionCard from '~/components/all-submission-card';
import { getAllSubmissions } from '~/actions/submissions';

export const dynamic = "force-dynamic"

const AllSubmissions = async () => {
    const submissionsList = await getAllSubmissions();

    if (submissionsList.length === 0) {
        return <NoSubmissionsCard />;
    }

    return (
        <div className="space-y-4">
            subsasfas
        </div>
    );
};

export default AllSubmissions;