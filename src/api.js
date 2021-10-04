import { getRoles } from "@testing-library/dom";
import axios from "axios";
const token1 = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI3ODBkMTlkYS1iNGUyLTRlZmUtYmM0Ni0yY2M5MWFiMGViODciLCJ1bmlxdWVfbmFtZSI6Itec15kg15nXlNeRIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbW9iaWxlcGhvbmUiOiIwNTQyMjI2OTU4Iiwicm9sZSI6IlRlc3RlciIsIm5iZiI6MTYzMzM0MzE5OSwiZXhwIjoxNjMzMzUwMzk5LCJpYXQiOjE2MzMzNDMxOTl9.LA6w_sRyLG3Hc1d7MLPibqhFTcDV-SMixDj08t-17iE"
const coords = "bd8a3d31-dbd8-4685-9d6a-a9780f49b3d6"
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI3ODBkMTlkYS1iNGUyLTRlZmUtYmM0Ni0yY2M5MWFiMGViODciLCJ1bmlxdWVfbmFtZSI6Itec15kg15nXlNeRIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbW9iaWxlcGhvbmUiOiIwNTQyMjI2OTU4Iiwicm9sZSI6IlRlc3RlciIsIm5iZiI6MTYzMzM0MzE5OSwiZXhwIjoxNjMzMzUwMzk5LCJpYXQiOjE2MzMzNDMxOTl9.LA6w_sRyLG3Hc1d7MLPibqhFTcDV-SMixDj08t-17iE"
const api = axios.create({
  baseURL: "https://magenavot-be-prd.femimoh.co.il/femiCovidSampellingForNursingHome/1.0.0",
});


const config = {
  headers: {
    "content-type": "application/json",
    Authorization: "Bearer " + token
  }
};



export const otp = (payload) => {
  return api.post(`/OTPRquest`,payload);
};


export const login = (payload) => {
  return api.post(`/logIn`,payload)
};

//localStorage.getItem('jwtToken')
//  localStorage.setItem("jwtToken", 'Bearer ' + token);

// 749cfc59-5312-48c6-90ee-f422e692230f
export const openTium = () => { //AKA plus button 
  return api.get(`/coordination/749cfc59-5312-48c6-90ee-f422e692230f`, config);

};
//300628583  the id of patient
export const findClient = (id) => {
  return api.get(`/patient/recurent/1/${id}/`, config);

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

const addRec = (data) => {
  let payload = {
    source:data.source,
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
    testTubeBarCode: data.tubeId,
    containerBarCode: data.coolerId,
    poolingType: 2,
    poolingComplete: 1,
    tubeBarcode: data.tubeId,
    CoolerBarcode: data.coolerId,
    poolingSampleBarcode: data.igumId
  }
  return api.post(`/test/${data.source}?isDraft=false`, config,payload);
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


// function getInst() {
//   return getTium().institute
// }

async function getKupa(kupaId){
  let kupas = (await getKupas()).data
  for (const kupa of kupas) {
    if (kupa.id === kupaId) {
      return kupa
    }
  }
  return null
}

//bd8a3d31-dbd8-4685-9d6a-a9780f49b3d6
function getCoordination(coordsId) {
  return api.get(`/coordination/${coordsId}`,config);

  
}

 function createTask(payload) {
  return api.post(`/tasks`,payload, config );

};


function getClients(coordsId) {
  return api.get(`/tasks/coordination/${coordsId}`, config );

};



const apis = {
  otp,
  login,
  openTium,
  findClient,
  createTask,
  getTaskById,
  validateTube,
  validateCooler,
  addRec,
  getCoordination,
  getRole,
  getKupa,
  getClients
};

export default apis;
