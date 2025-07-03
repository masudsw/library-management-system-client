import { useGetAllBooksQuery } from '@/services/books';
import type { IBook } from '@/types';
import { DeleteAlert } from '@/components/DeleteAlert';
import { UpdateBookDialog } from '@/components/UpdateBookDialog';

export default function Books() {
    const { data: response, error, isLoading } = useGetAllBooksQuery('default');
    const books = response?.data || [];
    
    if (isLoading) {
        return <div className="p-4 text-center">Loading books...</div>;
    }

    if (error) {
        return (
            <div className="p-4 text-center text-red-500">
                Error loading books: {'message' in error ? error.message : 'Unknown error'}
            </div>
        );
    }

    if (!books || books.length === 0) {
        return <div className="p-4 text-center">No books found</div>;
    }

    return (
        <div className="overflow-x-auto">

            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Title
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Author
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Genre
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            ISBN
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Copies
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Available
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {books.map((book: IBook) => (
                        <tr key={book.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">{book.title}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-500">{book.author}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-500">{book.genre}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-500">{book.isbn}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-500">{book.copies}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span
                                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${book.available
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-red-100 text-red-800'
                                        }`}
                                >
                                    {book.available ? 'Available' : 'Unavailable'}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <div className="flex space-x-2">
                                    <button  className="text-indigo-600 hover:text-indigo-900">
                                        {/* <Pencil  className="h-5 w-5" /> */}
                                        <UpdateBookDialog book={book}/>
                                    </button>
                                    {/* <button className="text-red-600 hover:text-red-900">
                                        <Trash2 className="h-5 w-5" />
                                    </button> */}
                                    <DeleteAlert id={book._id}/>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}