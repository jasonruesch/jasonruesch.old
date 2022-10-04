import { Expense } from '@jasonruesch/api-interfaces';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export function Expense() {
  const router = useRouter();
  const { id } = router.query;
  const [expense, setExpense] = useState<Expense>();

  useEffect(() => {
    const loadExpenseById = async (id) => {
      const res = await fetch(`/api/v1.0/expenses/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (res.status === 200) {
        const json = await res.json();
        setExpense(json);
      } else if (res.status === 401) {
        router.push({
          pathname: '/login',
          query: {
            redirect: router.asPath,
          },
        });
      }
    };

    loadExpenseById(id);
  }, [router, id]);

  return (
    <>
      <h1 className="bold pb-4 text-4xl">Expense</h1>

      <div className="rounded-md border bg-white ring-1 ring-black">
        {expense ? (
          <table className="w-full table-auto rounded-md">
            <thead>
              <tr className="border-b border-black">
                <th className="w-1/4 p-2 text-left">Name</th>
                <th className="p-2 text-left">Due</th>
                <th className="p-2 text-right">Amount</th>
                <th className="p-2 text-left">Category</th>
                <th className="w-3/4 p-2 text-left">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white">
                <td className="p-2">{expense.name}</td>
                <td className="whitespace-nowrap p-2">
                  {new Date(expense.due).toLocaleDateString()}
                </td>
                <td className="p-2 text-right">${expense.amount.toFixed(2)}</td>
                <td className="p-2">{expense.category}</td>
                <td className="p-2">{expense.description}</td>
              </tr>
            </tbody>
          </table>
        ) : (
          <div className="p-4">
            <p className="text-center">No expense found with an ID of {id}.</p>
          </div>
        )}
      </div>
    </>
  );
}

export default Expense;
