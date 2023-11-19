"use client"

import AverageAccidentByCompany from "@/components/Home/AverageAccidentByCompany"
import CollaboratorsByCompany from "@/components/Home/CollaboratorsByCompany"
import RevenueByCompany from "@/components/Home/RevenueByCompany"

function Home() {

    return (
        <>
            <br />
            <AverageAccidentByCompany />
            <br /><br />
            <CollaboratorsByCompany />
            <br /><br />
            <RevenueByCompany />
            <br /><br />
        </>
    )
}

export default Home