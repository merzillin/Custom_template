import { useEffect, useState } from "react";
import { PageCard } from "../../components/Card/PageCard";
import ReportService from "../../api/report/report";

export interface Product {
  name: string;
  category: string;
  price: string;
  stock: number;
  rating: string;
}

export default function ReportPage() {
  const [tableData, setTableData] = useState<Product[]>([]);
  const fetchTableData = async () => {
    try {
      const response = await ReportService.getReport();
      const { data } = response;
      if (!data.status) return;
      setTableData(data.result);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchTableData();
  }, []);

  return (
    <PageCard title="Product Report">
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border-b">Product Name</th>
              <th className="py-2 px-4 border-b">Category</th>
              <th className="py-2 px-4 border-b">Price</th>
              <th className="py-2 px-4 border-b">Stock</th>
              <th className="py-2 px-4 border-b">Rating</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((product, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b">{product.name}</td>
                <td className="py-2 px-4 border-b">{product.category}</td>
                <td className="py-2 px-4 border-b">{product.price}</td>
                <td className="py-2 px-4 border-b">{product.stock}</td>
                <td className="py-2 px-4 border-b">{product.rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageCard>
  );
}
