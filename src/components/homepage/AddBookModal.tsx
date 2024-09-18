import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Box, Button, Checkbox, FormControlLabel, Modal, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { setEditBookData, setIsAddLoading, setIsAddVisible } from '../../slices/addBookSlice';
import { Book } from '../../types';
import { addBook, updateBook } from '../../api/useBooks';

const useStyles = makeStyles((theme: any) => ({
  root: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor: 'white',
    border: '2px solid #000',
    borderRadius: 16,
    boxShadow: '24',
    padding: 24,
    '@media (max-width: 600px)': {
      width: '80%',
    },
  },
  buttonContainer: {
    marginTop: 24,
    display: 'flex',
    width: '100%',
    justifyContent: 'space-around',
  },
}));

interface Props {
  mutate: () => void;
}

const addBookValidationSchema = yup.object({
  name: yup
    .string()
    .min(1, 'Book name should be at least a character long')
    .required('Book name is required'),
  author: yup
    .string()
    .min(5, 'Book author should be at least 5 characters long')
    .required('Book author is required'),
  description: yup
    .string()
    .min(20, 'Book description should be at least 20 characters long')
    .required('Book description is required'),
  wasRead: yup.bool(),
  genres: yup.string(),
});

const initialValues: Partial<Book> = {
  name: '',
  author: '',
  description: '',
  wasRead: false,
  genres: '',
};

const AddBookModal: React.FC<Props> = ({ mutate }) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const { isVisible, isLoading, editBookData } = useAppSelector((state) => state.addBook);

  const onSubmitForm = (values: any): any => {
    dispatch(setIsAddLoading(true));
    const newBook: Book = {
      id: editBookData?.id || null,
      name: values.name,
      author: values.author,
      genres: values.genres,
      description: values.description,
      imageUrl: 'https://img.freepik.com/free-photo/book-composition-with-open-book_23-2147690555.jpg',
      wasRead: values.wasRead,
    };

    editBookData ? updateBook(newBook) : addBook(newBook, mutate);
    onClose();
  };

  const formik = useFormik({
    initialValues: editBookData ?? initialValues,
    validationSchema: addBookValidationSchema,
    onSubmit: onSubmitForm,
    enableReinitialize: true,
  });

  const handleReset = () => {
    formik.resetForm();
  };

  const onClose = () => {
    dispatch(setIsAddLoading(false));
    dispatch(setIsAddVisible(false));
    dispatch(setEditBookData(null));
    handleReset();
  };

  return (
    <Modal
      open={isVisible}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={classes.root}>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="name"
            name="name"
            label="Book Name"
            style={{ marginTop: 16, marginBottom: 16 }}
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            disabled={formik.isSubmitting}
          />
          <TextField
            fullWidth
            id="author"
            name="author"
            label="Author Name"
            style={{ marginBottom: 16 }}
            value={formik.values.author}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.author && Boolean(formik.errors.author)}
            helperText={formik.touched.author && formik.errors.author}
            disabled={formik.isSubmitting}
          />
          <TextField
            fullWidth
            id="description"
            name="description"
            label="Book Description"
            style={{ marginBottom: 16 }}
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.description && Boolean(formik.errors.description)}
            helperText={formik.touched.description && formik.errors.description}
            disabled={formik.isSubmitting}
          />
          <TextField
            fullWidth
            id="genres"
            name="genres"
            label="Book Genres"
            style={{ marginBottom: 16 }}
            value={formik.values.genres}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.genres && Boolean(formik.errors.genres)}
            helperText={formik.touched.genres && formik.errors.genres}
            disabled={formik.isSubmitting}
          />
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked
                id="wasRead"
                name="wasRead"
                value={formik.values.wasRead}
                disabled={formik.isSubmitting}
              />
            }
            label="The book was read"
          />
          <Box className={classes.buttonContainer}>
            <Button
              size="medium"
              variant="contained"
              color="secondary"
              disabled={!(formik.isValid && formik.dirty)}
              type="submit"
            >
              {editBookData ? 'Edit' : 'Add'}
            </Button>
            <Button size="medium" variant="outlined" color="info" onClick={onClose}>
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default AddBookModal;
