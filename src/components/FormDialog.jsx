import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { Grid } from "@mui/material";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { provinceData, districtData, communeData } from "../fakeData";
import { addEmployee, updateEmployee } from "./employeeService";

export default function FormDialog(props) {
  const { handleClose, data, updateTable } = props;

  const [employee, setEmployee] = useState({
    ...data,
    age: 20,
    province: provinceData,
    district: districtData,
    commune: communeData,
  });

  const handleSubmit = async () => {
    let res = await (data.id
      ? updateEmployee(employee)
      : addEmployee(employee));
    if (res.data.code !== 200) {
      toast.warning(res.data.message);
    } else {
      data.id ? updateTable("Edit") : updateTable("Add");
    }
  };
  useEffect(() => {
    ValidatorForm.addValidationRule("isTrulyAge", (value) => {
      if (value >= 1 && value <= 150) {
        return true;
      }
      return false;
    });
    ValidatorForm.addValidationRule("isText", (value) => {
      if (/\d/.test(value) && /[0-9]/.test(value)) {
        return false;
      }
      return true;
    });
    ValidatorForm.addValidationRule("isLegal", (value) => {
      if (value !== undefined) {
        if (value.length >= 6 && value.length <= 10) {
          return true;
        }
        return false;
      }
    });
    return () => {
      ValidatorForm.removeValidationRule("isTrulyAge");
      ValidatorForm.removeValidationRule("isText");
      ValidatorForm.removeValidationRule("isLegal");
    };
  }, []);
  return (
    <>
      <Dialog open={true} maxWidth={"md"} fullWidth={true}>
        <DialogTitle className="text-sky-600 font-bold">
          Add Employee
        </DialogTitle>
        <ValidatorForm onSubmit={handleSubmit}>
          <DialogContent>
            <Grid className="mb-16" container spacing={3}>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <TextValidator
                  className="w-full mb-16"
                  label={
                    <span className="font">
                      <span className="text-red-600"> * </span>
                      Code
                    </span>
                  }
                  value={employee.code}
                  onChange={(e) => {
                    setEmployee({ ...employee, code: e.target.value });
                  }}
                  type="text"
                  validators={["required", "isLegal"]}
                  errorMessages={[
                    "This field is required",
                    "Code in range 6 to 10",
                  ]}
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <TextValidator
                  className="w-full mb-16"
                  label={
                    <span className="font">
                      <span className="text-red-600"> * </span>
                      Name
                    </span>
                  }
                  value={employee.name}
                  onChange={(e) => {
                    setEmployee({ ...employee, name: e.target.value });
                  }}
                  type="text"
                  validators={["required", "isText"]}
                  errorMessages={[
                    "This field is required",
                    "Do not enter number",
                  ]}
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <TextValidator
                  className="w-full mb-16"
                  label={
                    <span className="font">
                      <span className="text-red-600"> * </span>
                      Email
                    </span>
                  }
                  type="text"
                  value={employee.email}
                  onChange={(e) => {
                    setEmployee({ ...employee, email: e.target.value });
                  }}
                  validators={["required", "isEmail"]}
                  errorMessages={[
                    "This field is required",
                    "Please checked one more times",
                  ]}
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <TextValidator
                  className="w-full  mb-16"
                  label={
                    <span className="font">
                      <span className="text-red-600"> * </span>
                      Phone Number
                    </span>
                  }
                  type="text"
                  value={employee.phone}
                  onChange={(e) => {
                    setEmployee({ ...employee, phone: e.target.value });
                  }}
                  validators={["required", "isNumber"]}
                  errorMessages={[
                    "This field is required",
                    "Please checked one more times",
                  ]}
                  variant="outlined"
                  size="small"
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions spacing={2} className="flex flex-end flex-middle">
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="contained" type="submit">
              Save
            </Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
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
    </>
  );
}
