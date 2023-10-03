import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const AlertDialog = ({deleteHandler,open, handleClose}) => {
  console.log('alert dialog render')

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Caution"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           This account will be permanently deleted.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>cancel</Button>
          <Button onClick={deleteHandler} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default React.memo(AlertDialog)