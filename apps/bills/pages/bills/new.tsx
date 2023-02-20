import BillForm from '../../components/BillForm';
import useBills from '../../lib/use-bills';

export function AddBill() {
  const { addBill: createBill } = useBills();

  return (
    <div className="min-h-screen grid place-items-center">
      <div className="p-4 max-w-lg w-full">
        <BillForm onSave={createBill} />
      </div>
    </div>
  );
}

export default AddBill;
