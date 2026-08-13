import { useAuth } from "../context/AuthContext";

function Cards() {
    const { user } = useAuth();

    return (
        <div className="cards">
            <div className="balance-card total">
                <h3><i className="fa-solid fa-wallet" style={{ color: "var(--color-primary)" }}></i>&nbsp;&nbsp;Total Balance</h3>
                <h2 id="tbalance">Rs. {user?.balance || 0}</h2>
            </div>

            <div className="balance-card credit">
                <h3><i className="fa-solid fa-arrow-trend-up" style={{ color: "var(--color-primary)" }}></i>&nbsp;&nbsp;Total Credit</h3>
                <h2 id="tcredit">Rs. {user?.totalDeposit || 0}</h2>
            </div>

            <div className="balance-card debit">
                <h3><i className="fa-solid fa-arrow-trend-down" style={{ color: "var(--color-primary)" }}></i>&nbsp;&nbsp;Total Debit</h3>
                <h2 id="tdebit">Rs. {user?.totalWithDraw || 0}</h2>
            </div>
        </div>
    )
}

export default Cards