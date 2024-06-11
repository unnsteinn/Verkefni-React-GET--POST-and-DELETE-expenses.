import React, { useState, useEffect } from "react";

export type Expense = {
  id: number;
  name: string;
  cost: number;
};

const getExpenses = async (): Promise<Expense[]> => {
  const res = await fetch("http://localhost:3001/api/expenses");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const response = await res.json();
  console.log("getting expenses", response);
  return response;
};

const postExpenses = async (expense: {
  name: string;
  cost: number;
}): Promise<Expense> => {
  const res = await fetch("http://localhost:3001/api/create-expense", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(expense),
  });

  if (!res.ok) {
    throw new Error("Failed to post data");
  }

  const response = await res.json();
  console.log(response);
  return response;
};

const deleteExpense = async (id: number): Promise<void> => {
  const res = await fetch(`http://localhost:3001/api/expense/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to delete data");
  }
};

export const api = {
  getExpenses,
  postExpenses,
  deleteExpense,
};
