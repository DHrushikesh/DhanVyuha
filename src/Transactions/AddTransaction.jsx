import useTheme from "../custom hooks/theme";
import RecentTransaction from "./RecentTransaction";
import TransactionForm from "./TransactionForm";
import { useState } from "react";

function AddTransaction() {
    const color = useTheme();
    const [refreshFlag, setRefreshFlag] = useState(false);

    return (
        <section
            className="flex flex-col justify-evenly items-center mx-auto relative mt-10 w-11/12 max-w-[1000px] rounded-2xl shadow-lg p-6 overflow-hidden"
            style={{
                background: color.background,
                color: color.textPrimary,
                border: `1px solid ${color.border}`,
            }}
        >
            <TransactionForm onAdded={() => setRefreshFlag(prev => !prev)} />
                 {/* Title */}
            <h1 className="text-2xl font-bold text-center mb-5 ">
                ALL TRANSACTIONS
            </h1>
            <RecentTransaction refreshFlag={refreshFlag} />
        </section>
    );
}

export default AddTransaction;
