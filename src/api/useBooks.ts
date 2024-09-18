import useSWR from 'swr';
import { fetcher, getMethod } from './apiSetup';
import { Book, HTTP_METHODS } from '../types';
import { BOOK_URLS } from '../constants';

const getRandomBookImage = (): string => BOOK_URLS[Math.floor(Math.random() * BOOK_URLS.length)];

export const useBookList = () => {
  const pathKey = '/books';
  const { data, error, mutate } = useSWR<Book[]>(pathKey, getMethod, {
    refreshInterval: 10000,
  });

  return {
    data: data?.map((item) => ({ ...item, imageUrl: getRandomBookImage() })) || [],
    loading: !error && !data,
    mutate,
  };
};

export const addBook = async (book: Book, onOperationEnd: any) => {
  const pathKey = '/books';
  const { id, ...bookData } = book;
  const response = await fetcher(pathKey, HTTP_METHODS.POST, bookData);

  onOperationEnd();
  return response;
};

export const deleteBook = async (bookId: number) => {
  const pathKey = `/books/${bookId}`;
  const response = await fetcher(pathKey, HTTP_METHODS.DELETE);

  return response;
};

export const updateBook = async (book: Book) => {
  const pathKey = `/books/${book.id}`;
  const response = await fetcher(pathKey, HTTP_METHODS.PUT, book);

  return response;
};
