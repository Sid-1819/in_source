import React from 'react';
import UnjoinButton from '~/app/(root)/user/participations/unjoin-button';
import { removeParticipation } from '~/lib/actions';

interface UnjoinFormProps {
    participantId: number;
    onSubmit?: () => void; // Optional callback for additional functionality
}

const UnjoinForm: React.FC<UnjoinFormProps> = ({ participantId, onSubmit }) => {
    return (
        <form
            action={removeParticipation}
            onSubmit={onSubmit ? (e) => { e.preventDefault(); onSubmit(); } : undefined}
        >
            <input type="hidden" name="participantId" value={participantId} />
            <UnjoinButton participantId={participantId} />
        </form>
    );
};

export default UnjoinForm;
