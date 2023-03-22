import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { deleteEmployee } from "./employeeService";
export default function ConfirmDialog(props) {
  const { handleClose, data, updateTable } = props;

  const handleDelete = async () => {
    await deleteEmployee(data.id);
    updateTable("Delete");
  };
  return (
    <Dialog open={true} maxWidth="md" fullWidth={true}>
      <DialogTitle className="text-sky-600 font-bold">Delete</DialogTitle>
      <DialogContent>
        <DialogContentText>You won't able to revert this</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleDelete}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
