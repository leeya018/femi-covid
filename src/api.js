import { getRoles } from "@testing-library/dom";
import axios from "axios";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI3ODBkMTlkYS1iNGUyLTRlZmUtYmM0Ni0yY2M5MWFiMGViODciLCJ1bmlxdWVfbmFtZSI6Itec15kg15nXlNeRIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbW9iaWxlcGhvbmUiOiIwNTQyMjI2OTU4Iiwicm9sZSI6IlRlc3RlciIsIm5iZiI6MTYzMzE2NTcyNywiZXhwIjoxNjMzMTcyOTI3LCJpYXQiOjE2MzMxNjU3Mjd9.G0KjS29eTfqs5VJWGeuQkhpOeM_aPcAaFhiFLNzoGbs"
const api = axios.create({
  baseURL: "https://magenavot-be-prd.femimoh.co.il/femiCovidSampellingForNursingHome/1.0.0",
});

const config = {
  headers: {
    "content-type": "application/json",
    Authorization: "Bearer " + token
  }
};



export const otp = () => {
  return api.post(`/OTPRquest`,
    {
      idNum: "300628583",
      phone: "0542226958"

    });
};


export const login = () => {
  return api.post(`/logIn`,
    {
      idNum: "300628583",
      otp: "128956", // have to be get from the otp
      phone: "0542226958"
    });
};

//localStorage.getItem('jwtToken')
//  localStorage.setItem("jwtToken", 'Bearer ' + token);

// 749cfc59-5312-48c6-90ee-f422e692230f
export const openTium = () => { //AKA plus button 
  return api.get(`/coordination/749cfc59-5312-48c6-90ee-f422e692230f`, config);

};
//300628583  the id of patient
export const findData = () => {
  return api.get(`/patient/recurent/1/300628583`, config);

};
const getPatientRoles = () => {
  return api.get(`/lookup/patientRoles`, config);
};
const getKupas = () => {
  return api.get(`/lookup/kupas`, config);
};


const getTaskById = () => {// should get a task id
  return api.get(`/tasks/5a5ffb39-f464-4efb-99a9-d72dc7f8c934`, config);
};

const validateTube = () => {
  return api.get(`/validations/barcodes/test-tube/300021313`, config);
};

const validateCooler = () => {
  return api.post(`/delivery/coolerBarcode?secondOnly=true`, config,{
    barcode: "1231321321"
});
};

const addRec = () => {
  let payload = {
    source: "365e31b3-299f-4145-aa3d-a7f3a0532d0f",
    exposeAbroad: false,
    closeContact: false,
    otherReason: true,
    cough: false,
    fever: false,
    otherBreathingSympt: false,
    symptStart: "1900-01-01",
    exposerCountry: "",
    leavingDate: "1900-01-01",
    otherReasonNotes: "ג",
    otherBreathingSymptNotes: "",
    testTubeBarCode: "304397102",
    containerBarCode: "1000205545",
    poolingType: 2,
    poolingComplete: 1,
    tubeBarcode: "304397102",
    CoolerBarcode: "1000205545",
    poolingSampleBarcode: "309140723"
  }
  return api.post(`/test/365e31b3-299f-4145-aa3d-a7f3a0532d0f?isDraft=false`, config,payload);
};








function getClient() {

  const clientData ={
    completedTime: "1899-12-31T21:39:20",
    coordinationDate: "2021-09-25T00:00:00",
    createdBy: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    createdDate: "2021-09-25T11:35:27.123",
    id: "749cfc59-5312-48c6-90ee-f422e692230f",
    institute: {
      address: "רח' אילת 11, בת ים",
      city: "בת ים",
      code: "8301100151",
      contactName: "עינת קורן",
      contactPhone: "050-4175066",
      coordinationType: 1,
      district: {
        id: 1001,
        title: "פמי"
      },
      houseNumber: "11",
      id: 25,
      name: "אקים בת ים - רחוב אילת",
      requestID: "1024872",
      street: "רח' אילת",
      type: {
        id: 101,
        title: "מוסד גריאטרי"
      }
    },
    notes: "בדיקה",
    status: false,
    tester: "780d19da-b4e2-4efe-bc46-2cc91ab0eb87",
    type: 1
  }
  return clientData
}

async function getRole(roleNum) {
  let roles = (await getPatientRoles()).data
  for (const role of roles) {
    if (role.id === roleNum) {
      return role
    }
  }
  return null
}

// this datat shoylud come from " openTium"
function getTium() {
  return {
    id: "749cfc59-5312-48c6-90ee-f422e692230f",
    tester: "780d19da-b4e2-4efe-bc46-2cc91ab0eb87",
    institute: {
      id: 25,
      name: "אקים בת ים - רחוב אילת",
      code: "8301100151",
      type: {
        id: 101,
        title: "מוסד גריאטרי"
      },
      address: "רח' אילת 11, בת ים",
      contactName: "עינת קורן",
      contactPhone: "050-4175066",
      city: "בת ים",
      street: "רח' אילת",
      houseNumber: "11",
      requestID: "1024872",
      district: {
        id: 1001,
        title: "פמי"
      },
      coordinationType: 1
    },
    status: false,
    coordinationDate: "2021-09-25T00:00:00",
    completedTime: "1899-12-31T21:39:20",
    notes: "בדיקה",
    createdBy: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    createdDate: "2021-09-25T11:35:27.123",
    type: 1
  }
}

function getInst() {
  return getTium().institute
}

async function getKupa(kupaId){
  let kupas = (await getKupas()).data
  for (const kupa of kupas) {
    if (kupa.id === kupaId) {
      return kupa
    }
  }
  return null
}

function addExtraFields() {
  return {
    antigenStatus: null,
    assignedTester: "780d19da-b4e2-4efe-bc46-2cc91ab0eb87",
    femiCode: "",
    isUrgent: false,
    kupaReferenceId: "",
    orderItemIds: null,
    receptionEnteredBy: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    receptionEnteredTime: "2021-10-01T23:08:38.7666667",
    requestTime: "2021-10-01T23:08:32.893Z",
    rowVersion: null,
    serologyStatus: null,
    source: "5a5ffb39-f464-4efb-99a9-d72dc7f8c934",
    status: 0,
    supplierCode: "",
    supplierDesc: "",
    unacurateInformationFeedback: null
  }
}

function addCoordination() {
  let coordExtra = {
    completedTime: "1899-12-31T21:39:20",
    coordinationDate: "2021-09-25T00:00:00",
    createdBy: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    createdDate: "2021-09-25T11:35:27.123",
    id: "749cfc59-5312-48c6-90ee-f422e692230f",
    notes: "בדיקה",
    status: false,
    tester: "780d19da-b4e2-4efe-bc46-2cc91ab0eb87",
    type: 1
  }
  return Object.assign({institute:getInst()}, coordExtra);
}

// still need to fix it with data that inisd  
async function creatTaskJson() {
  let baseClient = getClient() // this come from "find data"
  let roleData = await getRole(baseClient.role)
  baseClient.role = roleData
  baseClient.kupa = await getKupa(baseClient.kupa)
  // let institute = getInst()
  // baseClient.institute = institute
  baseClient.coordination = addCoordination()
  baseClient = Object.assign(baseClient, addExtraFields());
  delete baseClient.lastUpdated
  console.log(baseClient)
  return baseClient
}
creatTaskJson()


export const createTask = (payload) => {
  // return creatTaskJson()
  // return api.post(`/tasks`, config, payload);

};




const apis = {
  otp,
  login,
  openTium,
  findData,
  createTask,
  getTaskById,
  validateTube,
  validateCooler,
  addRec
};

export default apis;
