import { UserButton, auth } from "@clerk/nextjs";
import MainNav from "@/components/main-nav";
import StoreSwitcher from "@/components/store-switcher";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";

export default async function Navbar() {
    const userId = auth().userId

    if (!userId) redirect('/sign-in')

    const stores = await prismadb.store.findMany({
        where: {
            userId
        },
    })
    return (
        <div className="border-b">
            <div className="flex h-16 items-center px-4">
                <StoreSwitcher items={stores} />
                <MainNav className="ms-6" />
                <div className="ml-auto flex items-center space-x-4">
                    <UserButton afterSignOutUrl="/" />
                </div>
            </div>

        </div>
    )
}