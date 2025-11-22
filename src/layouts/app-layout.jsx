import Header from "@/components/header";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
    return (
        <>
            <div className="grid-background"></div>

            <main className="min-h-screen container mx-auto">
                <Header />
                <Outlet />
            </main>

            <div className="p-10 text-center bg-gray-800 mt-10">
                Made by Touheed Ahmad
            </div>
        </>
    )
}

export default AppLayout;