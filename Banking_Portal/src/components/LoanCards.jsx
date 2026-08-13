import { LOAN_DATA } from "../utils/constants";

function LoanCards() {
    return (
        <>
            <div className="loan" id="loan">
                <h2>My Loans</h2>
                <p>Overview of all active loans and remaining balances.</p>
            </div>

            <div className="lcards">
                {LOAN_DATA.map(loan => (
                    <div className="loan-card" key={loan.title}>
                        <i className={`fa-solid ${loan.icon}`} style={{ color: "var(--color-primary)" }}></i>
                        <h3>{loan.title}</h3>
                        <h2>Rs. {loan.amount}</h2>
                        <p>{loan.description}</p>
                    </div>
                ))}
            </div>
        </>
    )
}

export default LoanCards