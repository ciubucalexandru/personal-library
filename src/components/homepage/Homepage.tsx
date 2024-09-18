import React, { useEffect } from 'react';
import { useBookList } from '../../api/useBooks';
import { Card, Container, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import BookCard from './BookCard';
import { Book } from '../../types';
import { useAppSelector } from '../../store/hook';
import DeleteItemModal from './DeleteItemModal';
import AddBookModal from './AddBookModal';
import TopBar from '../top-bar/TopBar';

const useStyles = makeStyles((theme: any) => ({
  root: {
    marginTop: '50px',
  },
}));

const Homepage: React.FC = () => {
  const { data: books, loading: isBookListLoading, mutate } = useBookList();
  const classes = useStyles();
  const { isVisible: isDeleteVisible, isLoading: isDeleteLoading } = useAppSelector(
    (state) => state.deleteItem,
  );

  const { isVisible: isAddVisible, isLoading: isAddLoading } = useAppSelector((state) => state.addBook);

  useEffect(() => {
    if (!isAddVisible && !isDeleteVisible) mutate();
  }, [isAddVisible, isDeleteVisible]);

  return (
    <>
      <TopBar />
      <AddBookModal />
      <DeleteItemModal />
      <Container className={classes.root}>
        <Grid container spacing={2}>
          {books.map((book: Book) => (
            <Grid item xs={12} sm={12} md={4} key={book.id}>
              <BookCard book={book} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Homepage;
