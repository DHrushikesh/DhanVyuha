import { useDispatch , useSelector } from "react-redux";
import { toggleMode } from "../../redux/Slices/themecolor.js";
import useTheme  from "../custom hooks/theme.js"
import { Link } from "react-router-dom";

function NavigationBar() {
    const mode = useSelector((state)=>state.theme.mode)
    const color = useTheme();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem("user"));

    return (
        <section
            className="w-full"
            style={{
                background: color.surface,
                borderBottom: `1px solid ${color.border}`,
                color: color.textPrimary
            }}
        >
            <div
                className="flex flex-col sm:flex-row items-center justify-between max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-2"
            >
                {/* Left side */}
                <div className="mb-2 sm:mb-0 font-bold text-3xl" style={{ color: color.textPrimary }}>
                    DhanVyuha
                </div>

                {/* Right side */}
                <div className="flex justify-center items-center gap-4">
                    <div className="cursor-pointer" style={{ color: color.textSecondary }}>
                        Dashboard
                    </div>

                    {/* Theme toggle switch */}
                    <button
                    onClick={() => dispatch(toggleMode())}
                    type="button"
                    className="relative w-14 h-7 flex items-center rounded-full transition-all duration-300"
                    style={{
                        background: mode === "light" ? "#fbbf24" : "#374151",
                        border: "1px solid #ccc"
                    }}
                    >
                    <span
                        className={`absolute left-1 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                        mode === "dark" ? "translate-x-7" : "translate-x-0"
                        }`}
                    />
                    </button>

                    {/* User profile */}
                    <Link to="/login">
                        <div
                            className="rounded-full size-12 overflow-hidden border"
                            style={{ borderColor: color.border }}
                        >
                            <img
                                src={user?.profilepicture || "/placeholder.png"}
                                alt="Logo Icon"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default NavigationBar;
