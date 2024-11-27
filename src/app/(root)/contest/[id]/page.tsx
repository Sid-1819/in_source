
import React from "react";
import ContestDetailsContent from "./contest-details-context";

async function Page({ params }: { params: Promise<{ id: string }> }) {

    // const id = (await params).id
    const { id } = await params;
    return (
        // make a async db call
        <ContestDetailsContent id={id} />
    )
};

export default Page;
