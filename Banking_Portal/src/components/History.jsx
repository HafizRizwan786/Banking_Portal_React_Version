
function History({ transactions }) {
    return (
        <>
            <div className="history" id="history">
                <h2>Transaction History</h2>
                <p>View all your debit and credit transactions.</p>
            </div>

            <div className="data">
                <table>
                    <caption className="sr-only">Transaction history table</caption>
                    <thead>
                        <tr>
                            <th scope="col">Date</th>
                            <th scope="col">Time</th>
                            <th scope="col">Description</th>
                            <th scope="col">Type</th>
                            <th scope="col">Amount</th>
                        </tr>
                    </thead>

                    <tbody>
                        {transactions.length > 0 ? (
                            transactions.map(transaction => (
                                <tr key={transaction.id}>
                                    <td>{transaction.date}</td>
                                    <td>{transaction.time}</td>
                                    <td>{transaction.description}</td>
                                    <td>{transaction.type}</td>
                                    <td>Rs. {transaction.amount}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">No transactions found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default History;