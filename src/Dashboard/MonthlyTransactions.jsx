import { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import {
  LineChart, Line,
  BarChart, Bar,
  CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
} from "recharts";

function MonthlyTransactions() {
  const transactions = useSelector((state) => state.transaction || []);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [chartType, setChartType] = useState("line");

  // --- helpers ---
  const getMonthKey = (dateString) => {
    const d = new Date(dateString);
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${year}-${month}`;
  };

  const formatMonthLabel = (key) => {
    const [year, month] = key.split("-");
    const d = new Date(`${year}-${month}-01`);
    return d.toLocaleString("en-US", { month: "short", year: "numeric" });
  };

  // --- collect available months ---
  const availableMonths = useMemo(() => {
    const keys = new Set();
    transactions.forEach((t) => keys.add(getMonthKey(t.date)));
    return Array.from(keys).sort();
  }, [transactions]);

  // --- filter transactions ---
  const filteredTransactions = useMemo(() => {
    return selectedMonth
      ? transactions.filter((t) => getMonthKey(t.date) === selectedMonth)
      : transactions;
  }, [transactions, selectedMonth]);

  // --- prepare chart data ---
  const chartData = useMemo(() => {
    const grouped = filteredTransactions.reduce((acc, tran) => {
      const key = selectedMonth
        ? new Date(tran.date).getDate().toString().padStart(2, "0")
        : getMonthKey(tran.date);
      if (!acc[key]) acc[key] = { credit: 0, debit: 0 };
      acc[key][tran.transactionType] += tran.amount;
      return acc;
    }, {});

    return Object.entries(grouped).map(([key, { debit, credit }]) => ({
      label: selectedMonth ? key : formatMonthLabel(key),
      credit,
      debit,
    }));
  }, [filteredTransactions, selectedMonth]);

  return (
    <section className="p-4 flex flex-col justify-center items-center w-full">
      <h2 className="text-xl font-semibold mb-3">Transactions Overview</h2>

      {/* Controls */}
      <div className="flex gap-4 mb-4">
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Months</option>
          {availableMonths.map((monthKey) => (
            <option key={monthKey} value={monthKey}>
              {formatMonthLabel(monthKey)}
            </option>
          ))}
        </select>

        <select
          value={chartType}
          onChange={(e) => setChartType(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="line">Line Chart</option>
          <option value="bar">Bar Chart</option>
        </select>
      </div>

      {/* Chart */}
      <div className="w-full h-72">
        <ResponsiveContainer>
          {chartType === "line" ? (
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
              <XAxis dataKey="label" stroke="#333" />
              <YAxis stroke="#333" />
              <Tooltip contentStyle={{ backgroundColor: "#fff", color: "#000" }} />
              <Legend />
              <Line type="monotone" dataKey="credit" stroke="#16a34a" strokeWidth={3} dot={false} />
              <Line type="monotone" dataKey="debit" stroke="#dc2626" strokeWidth={3} dot={false} />
            </LineChart>
          ) : (
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
              <XAxis dataKey="label" stroke="#333" />
              <YAxis stroke="#333" />
              <Tooltip contentStyle={{ backgroundColor: "#fff", color: "#000" }} />
              <Legend />
              <Bar dataKey="credit" fill="#16a34a" />
              <Bar dataKey="debit" fill="#dc2626" />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </section>
  );
}

export default MonthlyTransactions;
