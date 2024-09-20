import ExpenseTracker from "@/components/expense-tracker";
import Image from "next/image";

export default function Home() {
  return (
      <main className="flex justify-center items-center ">
    <ExpenseTracker />
      </main>

  );
}
