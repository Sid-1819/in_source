import React from 'react'
import EditForm from './edit-form'
import { getSubmissionById } from '~/actions/submissions';


export default async function EditPage({ params }: { readonly params: Promise<{ submissionId: string }> }) {
    console.log("id: ", (await params).submissionId);

    const { submissionId } = await params;
    const submissionById = await getSubmissionById(submissionId);

    return (
        <EditForm initialData={submissionById} />
    )
}
