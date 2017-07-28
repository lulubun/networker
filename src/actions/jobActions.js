import { hashHistory } from 'react-router';

const SER_URL = 'https://warm-harbor-59021.herokuapp.com';
const APP_URL = 'https://be-a-networker.herokuapp.com';

// const SER_URL = 'http://localhost:8080';
// const APP_URL = 'http://localhost:3000';

//open a job just created
export const SET_NEW_JOB = 'SET_NEW_JOB';
export const setNewJob = (newCompany, newJobTitle, newDateNext, newImportant, newStage, newContactName, newResearch, newJobNotes, newWebsite, newPost) => ({
  type: SET_NEW_JOB,
  newCompany,
  newJobTitle,
  newDateNext,
  newImportant,
  newStage,
  newContactName,
  newResearch,
  newJobNotes,
  newWebsite,
  newPost
});

//open one job with full past
export const SET_ONE_JOB = 'SET_ONE_JOB';
export const setOneJob = (id, newCompany, newJobTitle, newFoundJob, newDateNext, newImportant, newStage, newContactName, newResearch, newJobNotes, newWebsite, newPost, newPastArray) => ({
  type: SET_ONE_JOB,
  id,
  newCompany,
  newJobTitle,
  newFoundJob,
  newDateNext,
  newImportant,
  newStage,
  newContactName,
  newResearch,
  newJobNotes,
  newWebsite,
  newPost,
  newPastArray
});

export const UPDATE_JOB = 'UPDATE_JOB';
export const updateJob = (newCompany, newJobTitle, newDateNext, newImportant, newStage, newContactName, newResearch, newJobNotes, newWebsite, newPost) => ({
  type: UPDATE_JOB,
  newCompany,
  newJobTitle,
  newDateNext,
  newImportant,
  newStage,
  newContactName,
  newResearch,
  newJobNotes,
  newWebsite,
  newPost
});

export const UPDATE_DATE_NEXT_JOB = 'UPDATE_DATE_NEXT';
export const updateDateNextJob = (newDateNext) => ({
  type: UPDATE_DATE_NEXT_JOB,
  newDateNext
});

export const UPDATE_JOB_PAST = 'UPDATE_JOB_PAST';
export const updateJobPast = (updatedJob) =>  ({
  type: UPDATE_JOB_PAST,
  updatedJob
})

export const UPDATE_HEART = 'UPDATE_HEART';
export const updateHeart = (updatedHeart) => ({
  type: UPDATE_HEART,
  updatedHeart
})


export function fetchWholeJob(id, user) {
  return dispatch => {
    const urlWhole = (SER_URL + '/' + user + '/one_job/' + id)
    fetch(urlWhole)
    .then(response => response.json())
    .then(data => {
      let id = data._id;
      let newCompany = data.serCompany;
      let newJobTitle = data.serJobTitle;
      let newFoundJob = data.serFoundJob;
      let newDateNext = data.serNextDate;
      let newImportant = data.serImportant;
      let newStage = data.serStage;
      let newContactName = data.serContactName;
      let newResearch = data.serResearch;
      let newJobNotes = data.serJobNotes;
      let newWebsite = data.serWebsite;
      let newPost = data.serPost;
      let newPastArray = data.serPastJobs;
      dispatch(setOneJob(id,
        newCompany,
        newJobTitle,
        newFoundJob,
        newDateNext,
        newImportant,
        newStage,
        newContactName,
        newResearch,
        newJobNotes,
        newWebsite,
        newPost,
        newPastArray))})
    .catch(ex => console.log(ex))
  }
}

export function sendNewJob(user, companyInput, jobTitleInput, foundJobInput, dateNextInput, importantInput, stageInput, contactNameInput, researchInput, jobNotesInput, websiteInput, postInput) {
  return dispatch => {
    const serUser = user;
    const url = SER_URL + '/' + serUser + '/new_job';
    let serNextDate = dateNextInput;
    let serImportant = importantInput;
    let serStage = stageInput;
    let serCompany = companyInput;
    let serJobTitle = jobTitleInput;
    let serResearch = researchInput;
    let serJobNotes = jobNotesInput;
    let serContactName = contactNameInput;
    let serFoundJob = foundJobInput;
    let serWebsite = websiteInput;
    let serPost = postInput;
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        serUser,
        serCompany,
        serJobTitle,
        serFoundJob,
        serNextDate,
        serImportant,
        serStage,
        serContactName,
        serResearch,
        serJobNotes,
        serWebsite,
        serPost
      })
    })
    .then(response => response.json())
    .then(hashHistory.push('/' + user + '/jobs'))
  }
};

export function fetchUpdate(editUser, editId, companyInput, jobTitleInput, foundJobInput, dateNextInput, stageInput, contactNameInput, researchInput, notesInput, websiteInput, postInput) {
  return dispatch => {
    const user = editUser;
    let _id = editId;
    const url = SER_URL + '/' + user + '/edit_job/' + _id;
    let serCompany = companyInput;
    let serJobTitle = jobTitleInput;
    let serDateNext = dateNextInput;
    let serStage = stageInput;
    let serContactName = contactNameInput;
    let serResearch = researchInput
    let serJobNotes = notesInput;
    let serFoundJob = foundJobInput;
    let serWebsite = websiteInput;
    let serPost = postInput;
    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        _id,
        user,
        serCompany,
        serJobTitle,
        serFoundJob,
        serDateNext,
        serStage,
        serContactName,
        serResearch,
        serJobNotes,
        serWebsite,
        serPost
      })
    })
    .then(response => response.json())
    .then(data => {
      dispatch(setOneJob(data))
    })
    .then(hashHistory.push('/' + user + '/one_job/' + _id))
    .catch(ex => console.log(ex))
  }
};

export const SET_ALL_JOBS = 'SET_ALL_JOBS';
export const setAllJobs = (allJobs) => ({
  type: SET_ALL_JOBS,
  allJobs
});

export function fetchAllJobs(user) {
  return dispatch => {
    const url = SER_URL + '/' + user + '/jobs';
    let sortedArray = [];
    fetch(url, {
      headers : {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        sortedArray = data.sort(function(a, b) {return Date.parse(a.serNextDate) - Date.parse(b.serNextDate)});
        dispatch(setAllJobs(sortedArray))
    })
    .catch(ex => console.log(ex))
  }
};

export function fetchDeleteJob(editId, editUser) {
  let _id = editId;
  const user = editUser;
  return dispatch => {
    const urlDel = SER_URL + '/' + user + '/one_job/' + _id;
    fetch(urlDel, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        _id
      })
    })
    .then(response => response.json())
    .then(hashHistory.push('/' + user + '/jobs'))
    .catch(ex => console.log(ex))
  }
};

export function fetchHeartDateUpdate(user, jobId, isInputChecked, appDate) {
  const serUser = user;
  let serImportant = isInputChecked;
  let _id = jobId;
  const serNextDate = appDate;
  return dispatch => {
    const urlHeart = SER_URL + '/' + serUser + '/one_job/' + _id;
    fetch(urlHeart, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        _id,
        serUser,
        serImportant,
        serNextDate
      })
    })
    .then(response => response.json())
    .then(res => {
      let id = res._id;
      let newCompany = res.serCompany;
      let newJobTitle = res.serJobTitle;
      let newFoundJob = res.serFoundJob;
      let newDateNext = res.serNextDate;
      let newImportant = res.serImportant;
      console.log(newImportant, res.serImportant);
      let newStage = res.serStage;
      let newContactName = res.serContactName;
      let newResearch = res.serResearch;
      let newJobNotes = res.serJobNotes;
      let newWebsite = res.serWebsite;
      let newPost = res.serPost;
      let newPastArray = res.serPastJobs;
      // console.log(id,
      // newCompany,
      // newJobTitle,
      // newFoundJob,
      // newDateNext,
      // newImportant,
      // newStage,
      // newContactName,
      // newResearch,
      // newJobNotes,
      // newWebsite,
      // newPost,
      // newPastArray);
      dispatch(setOneJob(
        id,
        newCompany,
        newJobTitle,
        newFoundJob,
        newDateNext,
        newImportant,
        newStage,
        newContactName,
        newResearch,
        newJobNotes,
        newWebsite,
        newPost,
        newPastArray
    ))})
    .catch(ex => console.log(ex))
  }
};

export function sendNewJobPast(user, jobId, pastid, dateInput, typeInput, jobNotesInput) {
  return dispatch => {
    let serUser = user;
    let id = jobId;
    let pastId = pastid;
    const pastUrl = SER_URL + '/' + user + '/newJobPast/' + id;
    let serDateNext = dateInput;
    let serTypeJob = typeInput;
    let serNotesJob = jobNotesInput;
    fetch(pastUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        serUser,
        id,
        pastId,
        serDateNext,
        serTypeJob,
        serNotesJob
      })
    })
    .then(response => response.json())
    .then(res => {
      dispatch(setOneJob(
        res.id,
        res.serCompany,
        res.serJobTitle,
        res.serFoundJob,
        res.serDateNext,
        res.serImportant,
        res.serStage,
        res.serContactName,
        res.serResearch,
        res.serJobNotes,
        res.serWebsite,
        res.serPost,
        res.serPastJobs
      ))
    })
  }
}

export function fetchDeletePast(userOne, jobId, oneId) {
  let _id = jobId;
  const user = userOne;
  const pastId = oneId;
  return dispatch => {
    const urlDel = SER_URL + '/' + user + '/one_job/' + _id + '/' + pastId;
    fetch(urlDel, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        _id,
        user,
        pastId
      })
    })
    .then(response => response.json())
    .then(updated => {
      dispatch(fetchWholeJob(_id, user))


    })
    .catch(ex => console.log(ex))
  }
}
