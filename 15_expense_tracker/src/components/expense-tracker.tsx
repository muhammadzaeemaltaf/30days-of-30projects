"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import { FilePenIcon, PlusIcon, TrashIcon } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { format } from "date-fns";

type Expense = {
  id: number;
  name: string;
  amount: number;
  date: Date;
};

const initialExpenses: Expense[] = [
  {
    id: 1,
    name: "Groceries",
    amount: 250,
    date: new Date("2024-05-15"),
  },
  {
    id: 2,
    name: "Rent",
    amount: 250,
    date: new Date("2024-06-01"),
  },
];

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editingExpenseId, setEditingExpenseId] = useState<number | null>(null);
  const [newExpense, setNewExpense] = useState<{
    name: string;
    amount: string;
    date: string;
  }>({
    name: "",
    amount: "",
    date: new Date().toISOString().slice(0, 10),
  });

  useEffect(() => {
    const storedExpense = localStorage.getItem("expense");
    if (storedExpense) {
      const parsedExpenses = JSON.parse(storedExpense);
      setExpenses(
        parsedExpenses.map((expense: Expense) => ({
          ...expense,
          date: new Date(expense.date),
        }))
      );
    } else {
      setExpenses(initialExpenses);
    }
  }, []);

  useEffect(() => {
    if (expenses.length > 0) {
      localStorage.setItem("expense", JSON.stringify(expenses));
    }
  }, [expenses]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { id, value } = e.target;
    setNewExpense((preExpense) => ({
      ...preExpense,
      [id]: id === "date" ? value : value,
    }));
  };

  const handleAddExpense = () => {
    const newExpenseObj: Expense = {
      id: expenses.length + 1,
      name: newExpense.name,
      amount: parseFloat(newExpense.amount),
      date: new Date(newExpense.date),
    };

    setExpenses([...expenses, newExpenseObj]);

    resetForm();
    setShowModal(false);
  };

  const resetForm = (): void => {
    setNewExpense({
      name: "",
      amount: "",
      date: new Date().toISOString().slice(0, 10),
    });
    setIsEditing(false);
  };

  const totalExpenses = expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  const handleDeleteExpense = (id: number) => {
    const newExpenseObj = expenses.filter((expense) => expense.id !== id);

    setExpenses(newExpenseObj);
  };

  const handleSaveEditExpense = () => {
    if (editingExpenseId !== null) {
      const updateExpenseObj = expenses.map((expense) =>
        expense.id === editingExpenseId
          ? {
              ...expense,
              name: newExpense.name,
              amount: parseFloat(newExpense.amount),
              date: new Date(newExpense.date),
            }
          : expense
      );
      setExpenses(updateExpenseObj);
      setEditingExpenseId(null)
      resetForm();
      setShowModal(false);

    }
  };

  const handleEditExpense = (id: number) => {
    const editExpenseObj = expenses.find((expense) => expense.id === id);
    if (editExpenseObj) {
      setNewExpense({
        name: editExpenseObj.name,
        amount: editExpenseObj.amount.toString(),
        date: editExpenseObj.date.toISOString().slice(0, 10),
      });
      setEditingExpenseId(editExpenseObj.id);
      setIsEditing(true);
      setShowModal(true);
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center text-white bg-blue-950 px-8 py-4">
        <h1 className="text-2xl font-bold">Expense Tracker</h1>
        <h1 className="text-2xl font-bold">
          Total: ${totalExpenses.toFixed(2)}
        </h1>
      </div>

      <div className="cards px-8 py-5 space-y-4">
        {expenses.map((expense) => (
          <div
            key={expense.id}
            className="text-black bg-white rounded-xl flex items-center justify-between p-5"
          >
            <div className="space-y-1">
              <h3 className="font-semibold text-xl">{expense.name}</h3>
              <p className="text-muted-foreground ">
                ${expense.amount.toFixed(2)} -{" "}
                {format(expense.date, "dd/MM/yyyy")}
              </p>
            </div>
            <div className="flex items-center justify-center gap-5">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleEditExpense(expense.id)}
              >
                <FilePenIcon className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDeleteExpense(expense.id)}
              >
                <TrashIcon className="w-5 h-5" />
              </Button>{" "}
            </div>
          </div>
        ))}
      </div>

      <div className="w-max p-2 fixed bottom-6 right-6">
        <Button
          size="icon"
          className="rounded-full shadow-lg bg-blue-950"
          onClick={() => {
            setShowModal(true);
            setIsEditing(false);
            resetForm();
          }}
        >
          <PlusIcon className="w-6 h-6" />
        </Button>{" "}
      </div>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="bg-card p-6 rounded-lg shadow w-full max-w-md text-black">
          <DialogHeader>
            <DialogTitle>
              {!isEditing ? "Add Expense" : "Edit Expense"}
            </DialogTitle>
          </DialogHeader>
          <DialogDescription>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Expense Name</Label>
                <Input
                  type="text"
                  id="name"
                  value={newExpense.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <Input
                  type="number"
                  id="amount"
                  value={newExpense.amount}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  type="date"
                  id="date"
                  value={newExpense.date}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </DialogDescription>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button
              onClick={!isEditing ? handleAddExpense : handleSaveEditExpense}
            >
              {!isEditing ? "Add Expense" : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ExpenseTracker;
