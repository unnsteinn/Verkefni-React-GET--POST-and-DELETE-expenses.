import { useEffect, useState } from "react";
import { Expense, api } from "./api";
import { Card, CardTitle } from "./card";

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [name, setName] = useState("");
  const [cost, setCost] = useState("");

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const data = await api.getExpenses();
      setExpenses(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddExpense = async () => {
    const costNumber = parseFloat(cost);
    if (name && !isNaN(costNumber) && costNumber > 0) {
      try {
        const newExpense = await api.postExpenses({ name, cost: costNumber });
        setExpenses([...expenses, newExpense]);
        setName("");
        setCost("");
        fetchExpenses();
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("Please enter a valid name and cost");
    }
  };

  const handleDeleteExpense = async (id: number) => {
    try {
      await api.deleteExpense(id);
      setExpenses(expenses.filter((expense) => expense.id !== id));
      fetchExpenses();
    } catch (error) {
      console.error(error);
    }
  };

  const totalSum = expenses.reduce(
    (sum, expense) => sum + (isNaN(expense.cost) ? 0 : expense.cost),
    0
  );
  const totalCount = expenses.length;

  return (
    <div className="bg-custom h-screen grid grid-cols-2">
      <div className="m-10 col-start-1">
        <h1 style={{ color: "#19cdab" }} className="text-3xl font-bold pb-8">
          Add Expense
        </h1>
        <div className="pl-10 pr-24">
          <div className="flex justify-between pb-4">
            <p className="text-white">Name</p>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex justify-between pb-4">
            <p className="text-white">Cost</p>
            <input
              type="text"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
            />
          </div>
          <button
            className="bg-white text-black p-2 font-bold"
            onClick={handleAddExpense}
          >
            Add
          </button>
        </div>
        <div className="mt-6">
          <h1 style={{ color: "#19cdab" }} className="text-3xl font-bold pb-8">
            Stats
          </h1>
          <div className="pl-10">
            <p className="text-white">Sum: {totalSum}</p>
            <p className="text-white">Count: {totalCount}</p>
          </div>
        </div>
      </div>
      <div className="grid gap-5 col-start-2 m-10 h-fit ">
        {expenses.map((expense) => (
          <Card style={{ borderColor: "#19cdab" }} key={expense.id}>
            <div className="flex justify-between p-4">
              <div className="">
                <CardTitle>
                  <div className="flex pb-2">
                    {" "}
                    Name: <p className="pl-2 font-normal">{expense.name}</p>
                  </div>
                </CardTitle>
                <CardTitle>
                  <div className="flex">
                    {" "}
                    Cost: <p className="pl-2 font-normal">{expense.cost} kr.</p>
                  </div>
                </CardTitle>
              </div>
              <button
                className="text-red-500 font-bold"
                onClick={() => handleDeleteExpense(expense.id)}
              >
                X
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ExpenseTracker;
