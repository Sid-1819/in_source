'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '~/components/ui/button';

export default function JoinButton({ contestId, userId }: { contestId: string, userId: string }) {
    const { pending } = useFormStatus();

    return (
        <Button
            variant='default'
            type="submit"
            disabled={pending}
        >
            {pending ? "Joining..." : "Join Hackathon"}
        </Button>
    );
}