
import React from "react";
import ContestDetailsContent from "~/components/contest-details-context";

async function Page({ params }: { params: Promise<{ contestId: string }> }) {

    // const id = (await params).id
    const { contestId } = await params;
    return (
        // make a async db call
        <ContestDetailsContent id={contestId} />
    )
};

export default Page;
