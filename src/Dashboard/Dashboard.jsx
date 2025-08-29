import { useEffect, useState } from "react";
import NavigationBar from "../Components/NavigationBar";
import BankBalanceCheck from "./BankBalanceCheck";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import { addTransaction } from "../../redux/Slices/transactions.js";
import { useDispatch } from "react-redux";
import { Waveform } from 'ldrs/react'
import 'ldrs/react/Waveform.css'
import MonthlyTransactions from "./MonthlyTransactions.jsx";
import RecentTransaction from "../Transactions/RecentTransaction.jsx";

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("test1");
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const url = import.meta.env.VITE_HOST_URL;

  useEffect(() => {
    if (!token) {
      toast.error("You are not logged in, please login.");
      navigate("/login");
    }

    async function fetchTransaction() {
      try {
        const response = await axios.post(`${url}/api/transaction/all`, null, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        });
        dispatch(addTransaction(response.data));
        setLoading(false);
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data.message || 'Transaction failed!');
        } else {
          toast.error('Network error!');
        }
      }
    }

    fetchTransaction();
  }, [token, navigate, url, dispatch]);

  return (
    <>
      <Toaster position="top" reverseOrder={false} autoClose={1000} />
      <NavigationBar />

      {loading ? (
        <div className="flex justify-center mt-20">
          <Waveform size="35" stroke="3.5" speed="1" color="#7c2d12" />
        </div>
      ) : (
        <div className="p-4">
          {/* Always show balance card */}
          <BankBalanceCheck />

          {/* Tab/Slider Control */}
          <div className="flex justify-center mt-6">
            <div className="flex bg-gray-200 rounded-full overflow-hidden shadow">
              {["Recent Transaction", "monthly"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2 transition-colors duration-200 ${
                    activeTab === tab ? "bg-orange-400 text-white" : "text-gray-700"
                  }`}
                >
                  {tab === "monthly" ? "Monthly Report" : tab.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Content based on active tab */}
          <div className="mt-6">
            {activeTab === "monthly" && <MonthlyTransactions />}
            {activeTab === "Recent Transaction" && (
              <div className="text-center text-gray-500 flex flex-col justify-center items-center">
                 {/* Title */}
            <h1 className="text-2xl font-bold text-center mb-5 ">
                Recent Transctions
            </h1>
                <RecentTransaction/>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Dashboard;
