import { useEffect, useState } from "react";
import useTheme from "../custom hooks/theme.js";

function SignUp() {
    const colors = useTheme();

    const [form,setForm] = useState({ username: "", email: "", password: "" });

    function handlechange(e){
        setForm({...form,[e.target.name]:e.target.value})
    }

    function handlesubmit(e){
        e.preventDefault();
        console.log(form)
    }

    useEffect(() => {
    }, []);

    return (
        <section
            className="min-h-screen flex justify-center items-center px-4"
            style={{
                background: colors.background,
                color: colors.textPrimary,
            }}
        >
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
                        Create Your Account
                    </h1>

                    {/* Username */}
                    <div className="flex flex-col">
                        <label htmlFor="username" className="mb-1 font-medium">
                            Username
                        </label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            onChange={handlechange}
                            placeholder="Enter your username"
                            className="p-3 rounded outline-none"
                            style={{
                                background: colors.surface,
                                color: colors.textPrimary,
                                border: `1px solid ${colors.border}`,
                            }}
                        />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col">
                        <label htmlFor="email" className="mb-1 font-medium">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
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

                    {/* Register Button */}
                    <button
                        type="submit"
                        className="w-full mt-4 py-3 rounded-xl font-semibold transition-transform duration-300 hover:scale-105"
                        style={{
                            background: colors.primary,
                            color: colors.textPrimary,
                            border: `2px solid ${colors.border}`,
                        }}
                    >
                        Register
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

                    {/* Login Button */}
                    <button
                        type="button"
                        className="w-full py-3 rounded-xl font-semibold transition-transform duration-300 hover:scale-105"
                        style={{
                            background: colors.secondary,
                            color: colors.textPrimary,
                            border: `2px solid ${colors.border}`,
                        }}
                    >
                        Login
                    </button>
                </div>
            </form>
        </section>
    );
}

export default SignUp;
