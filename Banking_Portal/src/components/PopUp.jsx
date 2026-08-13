import { useState } from "react";
import { storeTransaction, updateBalance } from "../utils/storage";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { validateAmount } from "../utils/validation";

function PopUp({ isOpen, onClose, onTransactionAdded }) {
    const { user, updateUser } = useAuth();
    const { showToast } = useToast();

    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("");

    if (!isOpen) {
        return null;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate amount
        const amountValidation = validateAmount(amount);
        if (!amountValidation.valid) {
            showToast(amountValidation.message, 'error');
            return;
        }

        if (!type) {
            showToast("Please select transaction type", 'warning');
            return;
        }

        const numAmount = Number(amount);

        if (type === 'debit' && user.balance < numAmount) {
            showToast('Insufficient balance for this transaction', 'error');
            return;
        }

        const transaction = {
            id: Date.now(),
            userId: user.id,
            type: type,
            amount: numAmount,
            description: description || 'No description',
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString()
        };

        // 1. Save transaction
        storeTransaction(transaction);

        // 2. Update user balance in localStorage and get updated user
        const updatedUser = updateBalance(user.id, type, numAmount);

        // 3. Sync AuthContext so all components re-render with new data
        if (updatedUser) {
            updateUser(updatedUser);
        }

        // 4. Update parent's transaction list
        onTransactionAdded(transaction);

        showToast("Transaction saved successfully!", 'success');

        // Reset form
        setAmount("");
        setDescription("");
        setType("");
        onClose();
    };

    return (
        <div className="popup-overlay" role="dialog" aria-modal="true" aria-labelledby="popup-title">
            <div className="popup-box">
                <div className="head">
                    <h1 id="popup-title">Add Transaction</h1>
                    <button
                        onClick={onClose}
                        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                        aria-label="Close popup"
                    >
                        <i className="fa-regular fa-circle-xmark" id="cross"></i>
                    </button>
                </div>

                <form onSubmit={handleSubmit} id="dataForm">
                    <div className="dt">
                        <label htmlFor="amount">Amount</label>
                        <input
                            type="number"
                            name="amount"
                            id="amount"
                            placeholder="Enter amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            min="1"
                            required
                        />

                        <label htmlFor="des">Description</label>
                        <input
                            type="text"
                            name="des"
                            id="des"
                            placeholder="Salary, Shopping, Bills"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <h3>Transaction Type</h3>
                    <div className="rbtn" role="radiogroup" aria-label="Transaction type">
                        <input
                            type="radio"
                            name="trans"
                            id="credit"
                            value="credit"
                            checked={type === "credit"}
                            onChange={(e) => setType(e.target.value)}
                        />
                        <label htmlFor="credit">Credit</label>

                        <input
                            type="radio"
                            name="trans"
                            id="debit"
                            value="debit"
                            checked={type === "debit"}
                            onChange={(e) => setType(e.target.value)}
                        />
                        <label htmlFor="debit">Debit</label>
                    </div>

                    <div className="btns">
                        <button type="button" onClick={onClose} id="cancel">Cancel</button>
                        <button type="submit" id="save">Save Transaction</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default PopUp;