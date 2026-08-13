import Cards from "./Cards"
import LoanCards from "./LoanCards"
import History from "./History"
import { useAuth } from "../context/AuthContext"
import { getTransactions } from "../utils/storage"

function DashboardMain({ transactions }) {
    const { user } = useAuth();

    // Merge localStorage transactions with any new ones from props
    const storedTransactions = getTransactions(user?.id);

    // Use the latest data — props may have newly added transactions not yet in storage
    const allTransactions = transactions.length > storedTransactions.length
        ? transactions
        : storedTransactions;

    return (
        <main>
            <div className="container">
                <div className="welcome">
                    <h1 id="welcome">Welcome to dashboard, {user?.name || ""}</h1>
                    <p>Manage your banking activities, monitor your loans, and keep track of every transaction from one
                        place.</p>
                </div>

                <Cards />
                <LoanCards />
                <History transactions={allTransactions} />
            </div>
        </main>
    )
}

export default DashboardMain