import { connectToDatabase } from "@/database/mongoose";
import { redirect } from "next/navigation";
import AIAnalystDashboard from "@/components/AIAnalystDashboard";

export default async function AIAnalystPage() {
    // Check database connection first
    try {
        await connectToDatabase();
    } catch (error) {
        redirect('/mongodb-error');
    }

    return <AIAnalystDashboard />;
}
