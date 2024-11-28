import React from 'react'
import EditForm from './edit-form'

export default function EditPage({ params }: { readonly params: Promise<{ id: number }> }) {
    // populate the edit form with previous submission value
    return (
        <EditForm />
    )
}
