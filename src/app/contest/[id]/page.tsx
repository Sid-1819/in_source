
import React from "react";

import ContestDetailsContent from "./_components/contest-details-context";

async function Page({ params }: { params: Promise<{ id: string }> }) {

    const id = (await params).id
    return (
        // make a async db call
        <ContestDetailsContent id={id} />
    )
};

export default Page;
