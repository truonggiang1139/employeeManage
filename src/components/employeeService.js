import axios from "axios";
export const getEmployeeData = () => {
  return axios.post(
    "http://training-api.oceantech.com.vn/cms/employees/search",
    {}
  );
};
export const updateEmployee = (employee) => {
  return axios.put(
    `http://training-api.oceantech.com.vn/cms/employees/${employee.id}`,
    employee
  );
};
export const addEmployee = (employee) => {
  return axios.post(
    "http://training-api.oceantech.com.vn/cms/employees",
    employee
  );
};

export const deleteEmployee = (id) => {
  return axios.delete(
    "http://training-api.oceantech.com.vn/cms/employees/" + id
  );
};

export const searchEmployee = (value) => {
  if (/[0-9]/.test(value)) {
    return axios.post(
      "http://training-api.oceantech.com.vn/cms/employees/search",
      { code: value }
    );
  }
  return axios.post(
    "http://training-api.oceantech.com.vn/cms/employees/search",
    { name: value }
  );
};
