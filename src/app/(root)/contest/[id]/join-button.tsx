'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '~/components/ui/button';

export default function JoinButton({ contestId, userId }: { contestId: number, userId: number }) {
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