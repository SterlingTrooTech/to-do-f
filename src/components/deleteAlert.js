import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export const DeleteToDoAlert = ({
  agree,
  open,
  handleClose,
  dataId
}) => (
  <div>
  <Dialog
    open={open}
    onClose={handleClose}
    aria-labelledby="alert-dialog-description"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle >
      {dataId
        ? "Delete This To-Do ??"
        : "Delete All To-Do's ??" }
    </DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
      {dataId
        ? "This To-Do will be Removed From The DataBase !!"
        : "All To-Do's will be Removed From The DataBase !!" }
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>Disagree</Button>
      <Button onClick={() => agree(dataId)} autoFocus>
        Agree
      </Button>
    </DialogActions>
  </Dialog>
</div>
)