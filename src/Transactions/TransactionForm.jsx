import { useState } from "react";
import axios from 'axios'
import useTheme from "../custom hooks/theme.js";
import toast, { Toaster } from 'react-hot-toast';


function TransactionForm({onAdded}){
const colors = useTheme();
    const today = new Date().toISOString().split("T")[0];

    const [form,setForm] = useState({ amount: "", description: "", transactionType: "credit" , date:new Date().toISOString().split("T")[0]});

    function handlechange(e){
        setForm({...form,[e.target.name]:e.target.value})
    }
    const url = import.meta.env.VITE_HOST_URL;

    function handlesubmit(e) {
    e.preventDefault();
     console.log(form)
    if (!form.amount.trim() || !form.description.trim() || !form.transactionType.trim()) {
        alert("All fields are required!");
        return;
    }

    postthedata(form);
    }


    async function postthedata(data){
        try{
            const response = await axios.post(`${url}/api/transaction/add`, data ,
                {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
            // console.log(response.status)
            if(response.status === 201 || response.status === 200){
            toast.success('Added Your Transaction Successfully');
            onAdded?.();
        }
            else{
                alert(`Unexpected status: ${response.status}`);
            }
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
    return (
        <section
            className="h-fit  w-full flex justify-center items-center p-4"
            style={{
                background: colors.background,
                color: colors.textPrimary,
            }}
        >
            <Toaster position="top-right" reverseOrder={false} autoClose={2000} />
            <form
                onSubmit={handlesubmit}
                className="flex justify-center items-center w-full"
                style={{ backdropFilter: "blur(16px)" }} 
                action=""
                method="post"
            >
                <div
                    className="flex flex-col w-full max-w-md justify-center gap-5 p-8 rounded-2xl shadow-lg"
                    style={{
                        background: colors.surface,
                        border: `2px solid ${colors.border}`,
                    }}
                >
                    {/* Title */}
                    <h1 className="text-2xl font-bold text-center mb-2">
                        Add Transaction
                    </h1>

                    {/* amount */}
                    <div className="flex flex-col">
                        <label htmlFor="amount" className="mb-1 font-medium">
                            Amount
                        </label>
                        <input
                            id="amount"
                            name="amount"
                            type="number"
                            onChange={handlechange}
                            placeholder="Enter your amount"
                            className="p-3 rounded outline-none focus:ring-2 focus:ring-orange-400"
                            style={{
                                background: colors.surface,
                                color: colors.textPrimary,
                                border: `1px solid ${colors.border}`,
                            }}
                        />
                    </div>

                    {/* transactionType */}
                    <div className="flex flex-col">
                    <label htmlFor="transactionType" className="mb-1 font-medium">
                        TransactionType
                    </label>
                    <select 
                        id="transactionType" 
                        name="transactionType"
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                        value={form.transactionType} 
                        onChange={(e) => setForm({ ...form, transactionType: e.target.value })}
                    >
                        <option defaultChecked value="credit">Credit</option>
                        <option value="debit">Debit</option>
                    </select>
                    </div>


                    {/* description */}
                    <div className="flex flex-col">
                        <label htmlFor="description" className="mb-1 font-medium">
                            Description
                        </label>
                        <input
                            id="description"
                            name="description"
                            type="text"
                            onChange={handlechange}
                            placeholder="Enter your description"
                            className="p-3 rounded outline-none focus:ring-2 focus:ring-orange-400"
                            style={{
                                background: colors.surface,
                                color: colors.textPrimary,
                                border: `1px solid ${colors.border}`,
                            }}
                        />
                    </div>

                    {/* date */}
                    <div className="flex flex-col">
                    <label htmlFor="date" className="mb-1 font-medium">
                        Date
                    </label>
                    <input
                        id="date"
                        name="date"
                        type="date"
                        defaultValue={today}
                        onChange={handlechange}
                        className="p-3 rounded outline-none focus:ring-2 focus:ring-orange-400"
                        style={{
                        background: colors.surface,
                        color: colors.textPrimary,
                        border: `1px solid ${colors.border}`,
                        }}
                    />
                    </div>


                    {/* Add transaction Button */}
                    <button
                        type="submit"
                        className="w-full mt-4 py-3 rounded-xl font-semibold transition-transform duration-300 hover:scale-105"
                        style={{
                            background: colors.primary,
                            color: colors.textPrimary,
                            border: `2px solid ${colors.border}`,
                        }}
                    >
                        Add transaction
                    </button>

                    
                </div>
            </form>
        </section>
    );
}

export default TransactionForm;