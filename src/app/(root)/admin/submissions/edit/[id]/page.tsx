import React from 'react'
import EditForm from './edit-form'
import { getSubmissionById } from '~/lib/actions'

export default async function EditPage({ params }: { readonly params: Promise<{ id: number }> }) {
    const { id } = await params;
    const submissionById = await getSubmissionById(id);

    return (
        <EditForm initialData={submissionById} />
    )
}
