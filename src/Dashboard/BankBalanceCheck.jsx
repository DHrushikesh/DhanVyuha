import useTheme from "../custom hooks/theme";
import { useNavigate } from "react-router-dom"

function MoneyCard() {
  const color = useTheme();
  const navigate = useNavigate();

  return (
    <section className="flex justify-center items-center p-4 min-h-60 relative">
      <article
        className="flex flex-col justify-between items-center rounded-3xl shadow-lg p-6 w-full sm:max-w-[500px] transition-transform duration-300 hover:scale-[1.02]"
        style={{
          background: color.balanceGradient,
          color: color.textPrimary,
          border: `1px solid ${color.border}`,
        }}
      >
        {/* Card Content */}
        <div className="text-center">
          <div className="text-sm opacity-80">Available Balance</div>
          <div className="text-4xl font-semibold mt-1">$12,540.75</div>
        </div>

        {/* See More Button */}
        <button
          onClick={()=>navigate("/transactions")}
          className="mt-4 px-5 py-2 rounded-full font-medium shadow-md transition-all duration-300 hover:shadow-lg cursor-pointer"
          style={{
            background: color.surface,
            color: color.textPrimary,
            border: `1px solid ${color.border}`,
          }}
        >
            Add transaction
        </button>
      </article>
    </section>
  );
}

export default MoneyCard;
