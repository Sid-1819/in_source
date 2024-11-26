import React from 'react';

interface ParticipationFormProps {
    action: (formData: FormData) => void; // Function to handle the form submission
    hiddenFields: { name: string; value: string | number }[]; // Array of hidden inputs
    ButtonComponent: React.ReactNode; // The button to render inside the form
    onSubmit?: () => void; // Optional callback for additional functionality
}

const ParticipationForm: React.FC<ParticipationFormProps> = ({
    action,
    hiddenFields,
    ButtonComponent,
    onSubmit,
}) => {
    return (
        <form
            action={action}
            onSubmit={onSubmit ? (e) => { e.preventDefault(); onSubmit(); } : undefined}
        >
            {hiddenFields.map((field, idx) => (
                <input
                    key={idx + 1}
                    type="hidden"
                    name={field.name}
                    value={field.value}
                />
            ))}
            {ButtonComponent}
        </form>
    );
};

export default ParticipationForm;
