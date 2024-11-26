'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '~/components/ui/button';

export default function UnjoinButton({ participantId }: { participantId: number }) {
    const { pending } = useFormStatus();

    return (
        <Button
            variant='destructive'
            type="submit"
            disabled={pending}
        >
            {pending ? "Unjoining..." : "Unjoin"}
            { } X
        </Button>
    );
}