import { getRoles } from "@testing-library/dom";
import axios from "axios";
const api = axios.create({
  baseURL: "https://magenavot-be-prd.femimoh.co.il/femiCovidSampellingForNursingHome/1.0.0",
});

const createHeaders = (token) => {
  return {
    headers: {
      "content-type": "application/json",
      Authorization: "Bearer " + token
    }

  }
};



export const otp = (payload) => {
  return api.post(`/OTPRquest`, payload);
};


export const login = (payload) => {
  return api.post(`/logIn`, payload)
};

// localStorage.getItem('jwtToken')
//  localStorage.setItem("jwtToken", 'Bearer ' + token);

// 749cfc59-5312-48c6-90ee-f422e692230f
// export const openTium = () => { //AKA plus button 
//   let currUser = JSON.parse(localStorage.getItem("currUser"))
//   let token = currUser.token
//   return api.get(`/coordination/749cfc59-5312-48c6-90ee-f422e692230f`, createHeaders(token));

// };
export const createTium = (paylod) => { //AKA plus button 
  let currUser = JSON.parse(localStorage.getItem("currUser"))
  let token = currUser.token

  return api.post(`/coordination`, paylod, createHeaders(token));

};
//300628583  the id of patient
export const findClient = (id,idType) => {
  let currUser = JSON.parse(localStorage.getItem("currUser"))
  let token = currUser.token
  return api.get(`/patient/recurent/${idType}/${id}/`, createHeaders(token));

};
const getPatientRoles = () => {
  let currUser = JSON.parse(localStorage.getItem("currUser"))
  let token = currUser.token
  return api.get(`/lookup/patientRoles`, createHeaders(token));
};
const getKupas = () => {
  let currUser = JSON.parse(localStorage.getItem("currUser"))
  let token = currUser.token
  return api.get(`/lookup/kupas`, createHeaders(token));
};


const getTaskById = () => {// should get a task id
  let currUser = JSON.parse(localStorage.getItem("currUser"))
  let token = currUser.token
  return api.get(`/tasks/5a5ffb39-f464-4efb-99a9-d72dc7f8c934`, createHeaders(token));
};

const validateTube = (tubeNum) => {
  let currUser = JSON.parse(localStorage.getItem("currUser"))
  let token = currUser.token
  return api.get(`/validations/barcodes/test-tube/${tubeNum}`, createHeaders(token));
};

const validateCooler = (coolerId) => {
  let currUser = JSON.parse(localStorage.getItem("currUser"))
  let token = currUser.token
  return api.post(`/delivery/coolerBarcode?secondOnly=true`, {
    barcode: coolerId
  }, createHeaders(token));
};
const validateIgum = (igumCode,coolerId) => {
  let WhatIsThat = "e395d04b-41d3-441d-849a-c4f091b64019"
  let currUser = JSON.parse(localStorage.getItem("currUser"))
  let token = currUser.token
  return api.get(`/validations/barcodes/pooling/${igumCode}?coolerBarcode=${coolerId}&excludeTestId=${WhatIsThat}`, createHeaders(token));
};


const addRec = (data) => {
  let payload = {
    source: data.source,
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
  let currUser = JSON.parse(localStorage.getItem("currUser"))
  let token = currUser.token
  return api.post(`/test/${data.source}?isDraft=false`, payload,createHeaders(token));
};



async function getRole(roleNum) {
  let roles = (await getPatientRoles()).data
  for (const role of roles) {
    if (role.id === roleNum) {
      return role
    }
  }
  return null
}


function getInstitutions() {
  let currUser = JSON.parse(localStorage.getItem("currUser"))
  let token = currUser.token
  return api.get(`/lookup/institutes`, createHeaders(token))
}

async function getKupa(kupaId) {
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
  let currUser = JSON.parse(localStorage.getItem("currUser"))
  let token = currUser.token
  return api.get(`/coordination/${coordsId}`, createHeaders(token));


}

function createTask(payload) {
  let currUser = JSON.parse(localStorage.getItem("currUser"))
  let token = currUser.token
  return api.post(`/tasks`, payload, createHeaders(token));

};


function getClients(coordsId) {
  let currUser = JSON.parse(localStorage.getItem("currUser"))
  let token = currUser.token 
  return api.get(`/tasks/coordination/${coordsId}`, createHeaders(token));

};
const coordsId = "0cc1fec0-4fcd-4255-9b70-23dc97dc0c6a"  //or ehad


const apis = {
  coordsId,
  otp,
  login,
  createTium,
  findClient,
  createTask,
  getTaskById,
  validateTube,
  validateCooler,
  addRec,
  getCoordination,
  getRole,
  getKupa,
  getClients,
  getInstitutions,
  validateIgum
};

export default apis;


