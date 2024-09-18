import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import React from 'react';
import { Book } from '../../types';
import { makeStyles } from '@mui/styles';
import { setDeleteId, setIsDeleteVisible } from '../../slices/deleteItemSlice';
import { useAppDispatch } from '../../store/hook';
import { setEditBookData, setIsAddVisible } from '../../slices/addBookSlice';

interface Props {
  book: Book;
}

const useStyles = makeStyles((theme: any) => ({
  root: {
    height: '500px',
  },
  image: {
    height: '250px',
    alt: 'Book image',
  },
  description: {
    height: '85px',
    overflowY: 'auto',
  },
  buttonActions: {
    justifyContent: 'space-between',
  },
}));

const BookCard: React.FC<Props> = ({ book }) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const triggerDeleteAction = () => {
    dispatch(setDeleteId(book.id));
    dispatch(setIsDeleteVisible(true));
  };

  const editBook = () => {
    dispatch(setIsAddVisible(true));
    dispatch(setEditBookData(book));
  };

  return (
    <Card className={classes.root}>
      <CardMedia component="img" image={book.imageUrl} className={classes.image} />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {book.name}
        </Typography>
        <Typography gutterBottom variant="h6" color="text.secondary" component="div">
          {book.author}
        </Typography>
        <Typography variant="body2" color="text.secondary" className={classes.description}>
          {book.description}
        </Typography>
      </CardContent>
      <CardActions className={classes.buttonActions}>
        <Button size="small" onClick={editBook}>
          Edit
        </Button>
        <Button size="small" style={{ color: 'red', float: 'right' }} onClick={triggerDeleteAction}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default BookCard;
