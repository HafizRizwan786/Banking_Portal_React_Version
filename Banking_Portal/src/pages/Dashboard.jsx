import DashboardNavbar from "../components/DashboardNavbar"
import DashboardMain from "../components/DashboardMain"
import PopUp from "../components/PopUp"
import { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import { getTransactions } from "../utils/storage"

function Dashboard() {
    const { user } = useAuth();
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [transactions, setTransactions] = useState([]);

    // Load initial transactions for the user
    useEffect(() => {
        if (user?.id) {
            const userTransactions = getTransactions(user.id);
            setTransactions(userTransactions);
        }
    }, [user?.id]);

    const handleTransactionAdded = (newTransaction) => {
        setTransactions(prev => [...prev, newTransaction]);
    };

    return (
        <div className="dashboard-page">
            <DashboardNavbar onClickTransaction={() => setIsPopupOpen(true)} />
            <DashboardMain transactions={transactions} />
            <PopUp
                isOpen={isPopupOpen}
                onClose={() => setIsPopupOpen(false)}
                onTransactionAdded={handleTransactionAdded}
            />
        </div>
    )
}

export default Dashboard