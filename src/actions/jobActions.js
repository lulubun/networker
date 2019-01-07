import { hashHistory } from 'react-router';
import * as constants from './constants';

//open a job just created
export const setNewJob = (newCompany, newJobTitle, newDateNext, newImportant, newStage, newContactName, newResearch, newJobNotes, newWebsite, newPost) => ({
  type: constants.SET_NEW_JOB,
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
export const setOneJob = (id, newCompany, newJobTitle, newFoundJob, newDateNext, newImportant, newStage, newContactName, newResearch, newJobNotes, newWebsite, newPost, newPastArray) => ({
  type: constants.SET_ONE_JOB,
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

export const updateJob = (newCompany, newJobTitle, newDateNext, newImportant, newStage, newContactName, newResearch, newJobNotes, newWebsite, newPost) => ({
  type: constants.UPDATE_JOB,
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

export const individualUpdate = (kind, update) => ({
  type: constants.INDI_UPDATE,
  payload: {
    kind,
    update
  }
});

export const updateDateNextJob = (newDateNext) => ({
  type: constants.UPDATE_DATE_NEXT_JOB,
  newDateNext
});

export const updateJobPast = (updatedJob) =>  ({
  type: constants.UPDATE_JOB_PAST,
  updatedJob
})

export const updateHeart = (updatedHeart) => ({
  type: constants.UPDATE_HEART,
  updatedHeart
})


export function fetchWholeJob(id, user) {
  return dispatch => {
    const urlWhole = (constants.SER_URL + '/' + user + '/one_job/' + id)
    fetch(urlWhole)
    .then(response => response.json())
    .then(data => dispatch(setOneJob(data._id,
      data.serCompany,
      data.serJobTitle,
      data.serFoundJob,
      data.serNextDate,
      data.serImportant,
      data.serStage,
      data.serContactName,
      data.serResearch,
      data.serJobNotes,
      data.serWebsite,
      data.serPost,
      data.serPastJobs)))
    .catch(ex => console.log(ex))
  }
}

export function sendNewJob(user, companyInput, jobTitleInput, foundJobInput, dateNextInput, importantInput, stageInput, contactNameInput, researchInput, jobNotesInput, websiteInput, postInput) {
  return dispatch => {
    const serUser = user;
    const url = constants.SER_URL + '/' + serUser + '/new_job';
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

export function fetchUpdate(editUser, editId, editCo, editTitle, editFound, editFollowUp, editStage, editContact, editResearch, editNotes, editWeb, editPost) {
  return dispatch => {
    const user = editUser;
    let _id = editId;
    const url = constants.SER_URL + '/' + user + '/edit_job/' + _id;
    let serCompany = editCo;
    let serJobTitle = editTitle;
    let serDateNext = editFollowUp;
    let serStage = editStage;
    let serContactName = editContact;
    let serResearch = editResearch
    let serJobNotes = editNotes;
    let serFoundJob = editFound;
    let serWebsite = editWeb;
    let serPost = editPost;
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

export const setAllJobs = (allJobs) => ({
  type: constants.SET_ALL_JOBS,
  allJobs
});

export function fetchAllJobs(user) {
  return dispatch => {
    const url = constants.SER_URL + '/' + user + '/jobs';
    let sortedArray = [];
    fetch(url, {
      headers : {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    })
    .then(response => response.json())
    .then(data => {
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
    const urlDel = constants.SER_URL + '/' + user + '/one_job/' + _id;
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
    const urlHeart = constants.SER_URL + '/' + serUser + '/one_job/' + _id;
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
    const pastUrl = constants.SER_URL + '/' + user + '/newJobPast/' + id;
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
    const urlDel = constants.SER_URL + '/' + user + '/one_job/' + _id + '/' + pastId;
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
