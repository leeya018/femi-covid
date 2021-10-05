import { getRoles } from "@testing-library/dom";
import axios from "axios";
// const coords = "de84c671-f59f-40d2-86f5-77dadd39d46a"
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

//localStorage.getItem('jwtToken')
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
    
    return api.post(`/coordination`, paylod,createHeaders(token));
  
  };
//300628583  the id of patient
export const findClient = (id) => {
  let currUser = JSON.parse(localStorage.getItem("currUser"))
  let token = currUser.token
  return api.get(`/patient/recurent/1/${id}/`, createHeaders(token));

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
  return api.post(`/delivery/coolerBarcode?secondOnly=true`, createHeaders(token), {
    barcode: coolerId
  });
};

// https://magenavot-be-prd.femimoh.co.il/femiCovidSampellingForNursingHome/1.0.0/validations/barcodes/pooling/309232322?coolerBarcode=1000123132&excludeTestId=e395d04b-41d3-441d-849a-c4f091b64019

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
  return api.post(`/test/${data.source}?isDraft=false`, createHeaders(token), payload);
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
  return api.get(`/lookup/institutes`,createHeaders(token))
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
const coordsId = "de84c671-f59f-40d2-86f5-77dadd39d46a"  //oleg


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
  getInstitutions
};

export default apis;



// {
//   "completedTime": "1899-12-31T21:39:20Z",
//   "coordinationDate": "2021-10-06T00:00:00",
//   "createdBy": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//   "createdDate": "2021-10-05T16:52:12.543",
//   "id": "de84c671-f59f-40d2-86f5-77dadd39d46a",
//   "institute": {
//       "address": "משה שרת 38, רמת גן",
//       "city": "רמת גן",
//       "code": "237M7",
//       "contactName": "אולג ארחרוב",
//       "contactPhone": "054-4907614",
//       "coordinationType": 1,
//       "district": {
//           "id": 1001,
//           "title": "פמי"
//       },
//       "houseNumber": "38",
//       "id": 287,
//       "name": "נוף חן",
//       "requestID": "1024726",
//       "street": "משה שרת",
//       "type": {
//           "id": 101,
//           "title": "מוסד גריאטרי"
//       }
//   },
//   "notes": "",
//   "status": true,
//   "tester": "780d19da-b4e2-4efe-bc46-2cc91ab0eb87",
//   "type": 1
// }