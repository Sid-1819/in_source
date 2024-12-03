'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '~/components/ui/button';
import { X } from 'lucide-react';

export default function UnjoinButton({ participantId }: { participantId: string }) {
    const { pending } = useFormStatus();

    return (
        <Button
            variant='destructive'
            type="submit"
            disabled={pending}
        >
            {pending ? "Unjoining..." : "Unjoin"}
            <X />
        </Button>
    );
}