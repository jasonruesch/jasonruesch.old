import { Expense } from '@jasonruesch/api-interfaces';
import { useEffect, useState } from 'react';
import { clsx } from 'clsx';
import { useRouter } from 'next/router';

export function Index() {
  const router = useRouter();
  const [expenses, setExpenses] = useState<Expense[]>();
  const totalAmount = expenses?.reduce((acc, cur) => acc + cur.amount, 0);

  const handleItemSelected = (expense: Expense) => {
    router.push(`/expenses/${expense.id}`);
  };

  useEffect(() => {
    const loadExpenses = async () => {
      const res = await fetch('/api/v1.0/expenses', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (res.status === 200) {
        const json = await res.json();
        setExpenses(json);
      } else if (res.status === 401) {
        router.push({
          pathname: '/login',
          query: {
            redirect: router.asPath,
          },
        });
      }
    };

    loadExpenses();
  }, [router]);

  return (
    <>
      <h1 className="bold pb-4 text-4xl">Expenses</h1>

      <div className="rounded-md border bg-white ring-1 ring-black">
        {expenses ? (
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
              {expenses?.map((expense, i) => (
                <tr
                  key={expense.id}
                  className={clsx(
                    'cursor-pointer',
                    i % 2 === 0 ? 'bg-white' : 'bg-neutral-100',
                    'hover:bg-neutral-200'
                  )}
                  onClick={() => handleItemSelected(expense)}
                >
                  <td className="p-2">{expense.name}</td>
                  <td className="whitespace-nowrap p-2">
                    {new Date(expense.due).toLocaleDateString()}
                  </td>
                  <td className="p-2 text-right">
                    ${expense.amount.toFixed(2)}
                  </td>
                  <td className="p-2">{expense.category}</td>
                  <td className="p-2">{expense.description}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t border-black">
                <td className="p-2" colSpan={2}></td>
                <td className="p-2 text-right font-bold">
                  ${totalAmount?.toFixed(2)}
                </td>
                <td className="p-2" colSpan={2}></td>
              </tr>
            </tfoot>
          </table>
        ) : (
          <div className="p-4">
            <p className="text-center">No expenses found.</p>
          </div>
        )}
      </div>
    </>
  );
}

export default Index;
