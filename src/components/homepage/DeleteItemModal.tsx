import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { Box, Button, Modal, Typography } from '@mui/material';
import { setDeleteId, setIsDeleteLoading, setIsDeleteVisible } from '../../slices/deleteItemSlice';
import { makeStyles } from '@mui/styles';
import { deleteBook } from '../../api/useBooks';

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

const DeleteItemModal: React.FC = () => {
  const { id: itemId, isVisible, isLoading } = useAppSelector((state) => state.deleteItem);
  const dispatch = useAppDispatch();
  const classes = useStyles();

  const onDelete = () => {
    dispatch(setIsDeleteLoading(true));
    itemId !== null && deleteBook(itemId);
    onClose();
  };

  const onClose = () => {
    dispatch(setIsDeleteLoading(false));
    dispatch(setIsDeleteVisible(false));
    dispatch(setDeleteId(null));
  };

  return (
    <Modal
      open={isVisible}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={classes.root}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Are you sure you want to delete this item?
        </Typography>
        <Box className={classes.buttonContainer}>
          <Button size="medium" variant="contained" color="secondary" onClick={onDelete}>
            Accept
          </Button>
          <Button size="medium" variant="outlined" color="info" onClick={onClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteItemModal;
