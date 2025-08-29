import { useEffect, useState } from "react";
import NavigationBar from "../Components/NavigationBar";
import BankBalanceCheck from "./BankBalanceCheck";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import { addTransaction } from "../../redux/Slices/transactions.js";
import { useDispatch } from "react-redux";
import useTheme from "../custom hooks/theme";
import { Waveform } from 'ldrs/react'
import 'ldrs/react/Waveform.css'
import MonthlyTransactions from "./MonthlyTransactions.jsx";

function Dashboard() {

    const colors = useTheme();
    const [loading, setloading] = useState(true)
    const dispatch = useDispatch();
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const url = import.meta.env.VITE_HOST_URL;

    useEffect(() => {
        if (!token) {

            toast.error("Your are not logged In , PLease login In")
            navigate("/login");
        }

        async function fetchtransaction() {
        try {
            const response = await axios.post(`${url}/api/transaction/all`, null,
                {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                })
            // console.log("Transcation ",response.data)
            dispatch(addTransaction(response.data))
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
    }, [token, navigate ]);


    

    return (
        <>
            <Toaster position="top" reverseOrder={false} autoClose={1000} />
            <NavigationBar />
            {
                loading ?
                <div className="flex justify-center mt-20">
                <Waveform
                            size="35"
                            stroke="3.5"
                            speed="1"
                            color={`${colors.textPrimary}`}
                        />
                </div>        
                        :
            <div>          
            <BankBalanceCheck />
            <MonthlyTransactions/>
            </div>
            }

        </>
    )
}

export default Dashboard;