export interface IBook {
    _id: string;
    title: string;
    author: string;
    genre: string;
    isbn: string;
    copies: number;
    available: boolean;
}


export interface IBorrow {
    _id: string;
    book: string;
    quantity: string;
    dueDate: Date;
}

export interface IBookSummary {
  totalQuantity: number;
  book: {
    title: string;
    isbn: string;
  };
}

