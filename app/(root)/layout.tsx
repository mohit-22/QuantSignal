import Header from "@/components/Header";
import {auth} from "@/lib/better-auth/auth";
import {headers} from "next/headers";
import {redirect} from "next/navigation";

const Layout = async ({ children }: { children : React.ReactNode }) => {
    try {
        if (!auth) throw new Error('Auth not initialized');
        const session = await auth.api.getSession({ headers: await headers() });

        if(!session?.user) redirect('/sign-in');

        const user = {
            id: session.user.id,
            name: session.user.name,
            email: session.user.email,
        }

        return (
            <main className="min-h-screen text-gray-400">
                <Header user={user} />

                <div className="container py-10">
                    {children}
                </div>
            </main>
        )
    } catch (error: any) {
        // If database is not connected, redirect to error page
        if (error?.message === 'DATABASE_NOT_CONNECTED') {
            redirect('/mongodb-error');
        }
        // For other errors, still redirect to sign-in
        redirect('/sign-in');
    }
}
export default Layout
