import React, { useEffect, useState, useMemo, useRef } from "react";
import { Button, IconButton, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeIcon from "@mui/icons-material/Mode";
import FormDialog from "./FormDialog";
import { toast, ToastContainer } from "react-toastify";
import ConfirmDialog from "./ConfirmDialog";
import { newEmployee } from "../fakeData";
import { getEmployeeData, searchEmployee } from "./employeeService";
import "react-toastify/dist/ReactToastify.css";
import Table from "./Table";

export default function DataTable() {
  const [open, setOpen] = useState(false);
  const [employee, setEmployee] = useState({});
  const [employees, setEmployees] = useState([]);
  const [openConfirm, setOpenConfirm] = useState(false);
  const inputRef = useRef();
  const columns = useMemo(
    () => [
      {
        field: "code",
        headerName: "Code",
        width: 150,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "name",
        headerName: "Name",
        width: 230,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "email",
        headerName: "Email",
        width: 278,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "phone",
        headerName: "Phone",
        type: "string",
        width: 200,
        headerClassName: "super-app-theme--header",
      },

      {
        field: "action",
        headerName: "Actions",
        width: 140,
        headerClassName: "super-app-theme--header",
        renderCell: (params) => (
          <>
            <IconButton
              aria-label="modify"
              onClick={() => handleEdit(params.row)}
            >
              <ModeIcon />
            </IconButton>
            <IconButton
              aria-label="delete"
              onClick={() => handleDelete(params.row)}
            >
              <DeleteIcon />
            </IconButton>
          </>
        ),
      },
    ],
    []
  );
  useEffect(() => {
    const getData = async () => {
      const res = await getEmployeeData();
      setEmployees(res.data.data);
    };
    getData();
  }, []);

  const handlePress = async (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };
  const handleSearch = async () => {
    const res = await searchEmployee(inputRef.current.value);
    setEmployees(res.data.data);
    inputRef.current.value = "";
  };
  const handleAdd = () => {
    setOpen(true);
    setEmployee(newEmployee);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (data) => {
    setEmployee(data);
    setOpenConfirm(true);
  };
  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };
  const updateTable = async (type) => {
    switch (type) {
      case "Add":
        toast.success("Add Success");
        break;
      case "Edit":
        toast.success("Edit Success");
        break;
      case "Delete":
        toast.success("Delete Success");
        break;
      default:
        break;
    }
    const res = await getEmployeeData();
    setEmployees(res.data.data);
    setOpen(false);
    setOpenConfirm(false);
  };
  const handleEdit = (data) => {
    setEmployee(data);
    setOpen(true);
  };

  return (
    <>
      <h1 className="text-lg font-bold mb-24">Employee Management</h1>
      <div
        className="abc"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <Button variant="contained" onClick={handleAdd}>
          Add Employee
        </Button>
        <ToastContainer
          position="top-right"
          autoClose={500}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />

        <TextField
          size="small"
          label="Search by code or name"
          inputRef={inputRef}
          onKeyPress={handlePress}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <IconButton onClick={handleSearch}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </div>
      <Table employees={employees} columns={columns} />
      {open && (
        <FormDialog
          handleClose={handleClose}
          data={employee}
          updateTable={updateTable}
        />
      )}
      {openConfirm && (
        <ConfirmDialog
          handleClose={handleCloseConfirm}
          data={employee}
          updateTable={updateTable}
        />
      )}
    </>
  );
}
