import { getApplications } from "@/api/apiApplications"
import useFetch from "@/hooks/use-fetch"
import { useUser } from "@clerk/clerk-react"
import { useEffect } from "react";
import { BarLoader } from "react-spinners";
import ApplicationCard from "./application-card";

const CreatedApplications = () => {

    const { user, isLoaded } = useUser();


    const {
        loading: loadingApplications,
        data: dataApplications,
        fn: fnApplications
    } = useFetch(getApplications, {
        user_id: user.id
    })

    useEffect(() => {
        if (isLoaded && user?.id) {
            fnApplications();
        }
    }, [isLoaded, user?.id]);

    if (!isLoaded || loadingApplications) {
        return (
            <BarLoader
                className="mb-4"
                width={"100%"}
                color="#36d7b7"
            />
        );
    }


    return (
        <>
            <div className="flex flex-col gap-2">
                {dataApplications?.map((application) => {
                    return <ApplicationCard
                        key={application.id}
                        application={application}
                        isCandidate
                    />
                })}
            </div>
        </>
    )
}

export default CreatedApplications