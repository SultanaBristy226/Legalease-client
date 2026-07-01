"use client";

import { useState, useEffect } from "react";
import axiosInstance from "@/lib/axios";

type Transaction = {
  _id: string;
  transactionId: string;
  user: { fullName: string; email: string };
  lawyer: { name: string };
  amount: number;
  createdAt: string;
};

export default function AllTransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axiosInstance.get("/transactions", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTransactions(res.data.transactions);
      } catch (err) {
        console.error("Failed to fetch transactions:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  if (loading) {
    return <p className="text-text-muted dark:text-white/50">Loading...</p>;
  }

  return (
    <div>
      <h1 className="font-heading text-2xl text-primary dark:text-white mb-6">
        All Transactions
      </h1>

      {transactions.length === 0 ? (
        <p className="text-text-muted dark:text-white/50">No transactions yet.</p>
      ) : (
        <div className="overflow-x-auto border border-gray-border dark:border-white/10 rounded-xl">
          <table className="w-full text-sm">
            <thead className="bg-gray-soft dark:bg-white/5 text-left">
              <tr>
                <th className="px-4 py-3 text-primary dark:text-white">Transaction ID</th>
                <th className="px-4 py-3 text-primary dark:text-white">Client</th>
                <th className="px-4 py-3 text-primary dark:text-white">Lawyer</th>
                <th className="px-4 py-3 text-primary dark:text-white">Amount</th>
                <th className="px-4 py-3 text-primary dark:text-white">Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx._id} className="border-t border-gray-border dark:border-white/10">
                  <td className="px-4 py-3 text-primary dark:text-white font-mono text-xs">
                    {tx.transactionId}
                  </td>
                  <td className="px-4 py-3 text-text-muted dark:text-white/60">
                    {tx.user?.fullName}
                  </td>
                  <td className="px-4 py-3 text-text-muted dark:text-white/60">
                    {tx.lawyer?.name}
                  </td>
                  <td className="px-4 py-3 text-primary dark:text-white font-semibold">
                    ${tx.amount}
                  </td>
                  <td className="px-4 py-3 text-text-muted dark:text-white/60">
                    {new Date(tx.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}