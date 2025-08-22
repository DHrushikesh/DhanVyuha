import {  useState } from "react";
import { useNavigate } from "react-router-dom";
import toast , { Toaster } from "react-hot-toast";
import useTheme from "../custom hooks/theme.js";
import axios from "axios";

function Login() {
    const colors = useTheme();
    const navigateto = useNavigate();
    const url = import.meta.env.VITE_HOST_URL;

    const [form,setForm] = useState({ email: "", password: "" });

    function handlechange(e){
        setForm({...form,[e.target.name]:e.target.value})
    }

    function handlesubmit(e){
    e.preventDefault();
    if ( !form.email.trim() || !form.password.trim()) {
        alert("All fields are required!");
        return;
    }

    postthedatalogin(form);
    }

    async function postthedatalogin(data){
        try {
            const response = await axios.post(`${url}/api/users/login`,data)
            //console.log(response)
            if(response.status == 200 || response.status ==201){
                localStorage.setItem('token',response.data.token);
                //console.log(response.data.user)
                localStorage.setItem('user',JSON.stringify(response.data.user));
                const user =  JSON.parse(localStorage.getItem('user'));
                toast.success(`Hello , ${user.username}`)
                setTimeout(()=>{
                    navigateto("/dashboard")
                },[1000])
            }

            
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message || 'Registration failed!');
            } else {
                toast.error('Network error!');
            }
            //console.log(error);
            }
    }


    return (
        <section
            className="min-h-screen flex justify-center items-center px-4"
            style={{
                background: colors.background,
                color: colors.textPrimary,
            }}
        >
            
            <Toaster position="top-right" reverseOrder={false} autoClose={2000} />
            <form
                onSubmit={handlesubmit}
                className="flex justify-center items-center w-full"
                style={{ backdropFilter: "blur(16px)" }} // same as backdrop-blur-2xl
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
                        Login In to your Account
                    </h1>

                    {/* Username */}
                    <div className="flex flex-col">
                        <label htmlFor="email" className="mb-1 font-medium">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="text"
                            onChange={handlechange}
                            placeholder="Enter your email"
                            className="p-3 rounded outline-none"
                            style={{
                                background: colors.surface,
                                color: colors.textPrimary,
                                border: `1px solid ${colors.border}`,
                            }}
                        />
                    </div>


                    {/* Password */}
                    <div className="flex flex-col">
                        <label htmlFor="password" className="mb-1 font-medium">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            onChange={handlechange}
                            placeholder="Enter your password"
                            className="p-3 rounded outline-none"
                            style={{
                                background: colors.surface,
                                color: colors.textPrimary,
                                border: `1px solid ${colors.border}`,
                            }}
                        />
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full mt-4 py-3 rounded-xl font-semibold transition-transform duration-300 hover:scale-105"
                        style={{
                            background: colors.primary,
                            color: colors.textPrimary,
                            border: `2px solid ${colors.border}`,
                        }}
                    >
                        Login
                    </button>

                    {/* Divider */}
                    <div className="flex items-center gap-2 my-2">
                        <div
                            className="flex-1 h-px"
                            style={{ background: colors.border }}
                        />
                        <span className="text-sm" style={{ color: colors.textSecondary }}>
                            OR
                        </span>
                        <div
                            className="flex-1 h-px"
                            style={{ background: colors.border }}
                        />
                    </div>

                    {/* Register Button */}
                    <button
                        onClick={()=>{navigateto("/signup")}}
                        type="button"
                        className="w-full py-3 rounded-xl font-semibold transition-transform duration-300 hover:scale-105"
                        style={{
                            background: colors.secondary,
                            color: colors.textPrimary,
                            border: `2px solid ${colors.border}`,
                        }}
                    >
                        Register
                    </button>
                </div>
            </form>
        </section>
    );
}

export default Login;
