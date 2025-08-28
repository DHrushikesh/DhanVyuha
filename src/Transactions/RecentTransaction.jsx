import { useEffect, useState } from "react";
import useTheme from "../custom hooks/theme";
import { Waveform } from 'ldrs/react'
import 'ldrs/react/Waveform.css'
import axios from "axios";
import toast from "react-hot-toast";
import { CSVLink } from "react-csv";


// Default values shown


function RecentTransaction({ refreshFlag }) {

    const url = import.meta.env.VITE_HOST_URL;

    const [loading, setloading] = useState(true)
    const [Transactions, setTransactions] = useState(true)
    const headers = [
        { label: "Amount", key: "amount" },
        { label: "Type", key: "transactionType" },
        { label: "Description", key: "description" },
        { label: "Date", key: "date" }
    ];


    const colors = useTheme();

    useEffect(() => {

        async function fetchtransaction() {
            try {
                const response = await axios.post(`${url}/api/transaction/all`, null,
                    {
                        headers: {
                            "Authorization": `Bearer ${localStorage.getItem("token")}`
                        }
                    })
                // console.log(response.data[0])
                setTransactions(response.data);
                setloading(false);
            }
            catch (error) {
                if (error.response) {
                    toast.error(error.response.data.message || 'Transacction failed!');
                } else {
                    toast.error('Network error!');
                }
                // console.log(error);
            }

        }
        fetchtransaction()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refreshFlag])

    const headerStyle = {
        background: colors.surface,
        color: colors.textPrimary,
        border: `1px solid ${colors.border}`,
    };

    return (
        <>
            {/* Title */}
            <h1 className="text-2xl font-bold text-center mb-5 ">
                Recent transactions
            </h1>
            <div className="overflow-x-auto mb-4 md:w-[700px] lg:w-[1000px] text-center border-2 border-amber-950 shadow-lg">
                {
                    loading ?
                        <Waveform
                            size="35"
                            stroke="3.5"
                            speed="1"
                            color={`${colors.textPrimary}`}
                        />
                        : <>
                            <table className="w-full ">
                                <thead>
                                    <tr>
                                        <th className="p-3 " style={headerStyle}>Amount</th>
                                        <th className="p-3 " style={headerStyle}>Type</th>
                                        <th className="p-3 " style={headerStyle}>Description</th>
                                        <th className="p-3 " style={headerStyle}>Date</th>
                                    </tr>
                                </thead>
                                <tbody className="text-center md:text-xl font-mono">
                                    {Transactions.map((row, index) => (
                                        <tr key={index}>
                                            <td>{row.amount}</td>
                                            <td className={row.transactionType === "credit" ? "text-green-500" : "text-red-500"}>
                                                {row.transactionType}
                                            </td>
                                            <td>{row.description}</td>
                                            <td>{row.date}</td>
                                        </tr>
                                    ))}
                                </tbody>



                            </table>


                            <CSVLink
                                data={Transactions}
                                headers={headers}
                                filename="transactions.csv"
                                className="inline-block px-6 my-4 
  rounded-lg font-semibold shadow-md transition-transform duration-200 bg-orange-500 text-white hover:bg-orange-600 hover:scale-105"
                            >
                                Download
                            </CSVLink>


                        </>

                }

            </div>

        </>
    );
}

export default RecentTransaction;
