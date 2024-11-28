import { currentUser } from '@clerk/nextjs/server';
import { getUserSubmission } from '~/lib/actions';
import NoSubmissionsCard from '~/components/no-submission-card';
import SubmissionCard from '~/components/submission-card';

export const dynamic = "force-dynamic"

const UserSubmissionsCard = async () => {
    const user = await currentUser();
    const email = user?.primaryEmailAddress?.emailAddress ?? "john@example.com";
    const submissionsList = await getUserSubmission(email);

    if (!submissionsList.length) {
        return <NoSubmissionsCard />;
    }

    return (
        <div className="space-y-4">
            {submissionsList.map((submission, idx) => (
                <SubmissionCard
                    key={idx + 1}
                    submission={submission}
                />
            ))}
        </div>
    );
};

export default UserSubmissionsCard;