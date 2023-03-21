export const provinceData = {
  createDate: null,
  createdBy: null,
  modifyDate: null,
  modifiedBy: null,
  id: "c774140b-659e-4c9d-b805-9ea214f30c80",
  voided: false,
  name: "Ha Noi",
  code: "111111",
  districts: null,
};

export const districtData = {
  createDate: null,
  createdBy: null,
  modifyDate: null,
  modifiedBy: null,
  id: "96d79f36-136e-44b5-bf0b-adc1970e28a0",
  voided: false,
  name: "Cau Giay",
  code: "111113",
  province: null,
  communeList: null,
};

export const communeData = {
  createDate: null,
  createdBy: null,
  modifyDate: null,
  modifiedBy: null,
  id: "fca88647-ed4b-450a-adee-66bcc1f6bea5",
  voided: false,
  name: "Mai Dich",
  code: "111112",
  district: {
    createDate: null,
    createdBy: null,
    modifyDate: null,
    modifiedBy: null,
    id: "96d79f36-136e-44b5-bf0b-adc1970e28a0",
    voided: false,
    name: "Cau Giay",
    code: "111113",
    province: null,
    communeList: null,
  },
};

export const newEmployee = {
  code: "",
  name: "",
  email: "",
  phone: "",
};
