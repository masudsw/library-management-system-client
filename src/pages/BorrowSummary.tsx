import { useGetBorrwedBooksQuery } from "@/services/books";
import type { IBookSummary } from "@/types";


const BorrowSummary = () => {
    const { data: response, error, isLoading } = useGetBorrwedBooksQuery('default');
        const borroweSummary = response?.data || [];
        console.log(borroweSummary);
        if (isLoading) {
            return <div className="p-4 text-center">Loading Borrow summary...</div>;
        }
    
        if (error) {
            return (
                <div className="p-4 text-center text-red-500">
                    Error loading borrow summary: {'message' in error ? error.message : 'Unknown error'}
                </div>
            );
        }
    
        if (!borroweSummary || borroweSummary.length === 0) {
            return <div className="p-4 text-center">No borrow found</div>;
        }
    return (
        <div className="overflow-x-auto">
        
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Book Title
                                </th>
                               
                                
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    ISBN
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Total Quantity Borrowed
                                </th>
                               
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {borroweSummary.map((bookSummary:IBookSummary) => (
                                <tr key={bookSummary.book.isbn} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{bookSummary.book.title}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{bookSummary.book.isbn}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{bookSummary.totalQuantity}</div>
                                    </td>
                                        
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
    );
};

export default BorrowSummary;