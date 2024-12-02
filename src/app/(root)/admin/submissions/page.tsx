import { currentUser } from '@clerk/nextjs/server';
import { getAllSubmissions } from '~/lib/actions';
import NoSubmissionsCard from '~/components/no-submission-card';
import SubmissionCard from '~/components/submission-card';

export const dynamic = "force-dynamic"



const UserSubmissionsCard = async () => {
    const submissionsList = await getAllSubmissions();

    if (submissionsList.length === 0) {
        return <NoSubmissionsCard />;
    }

    return (
        <div className="space-y-4">
            {/* {submissionsList.map((submission, idx) => (
                <SubmissionCard
                    key={idx + 1}
                    submission={submission}
                />
            ))} */}

            subsasfas
        </div>
    );
};

export default UserSubmissionsCard;