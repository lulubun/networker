import { hashHistory } from 'react-router';
import * as constants from './constants';
import { fetchAllContacts } from './contactActions';


//open a job just created
export const setNewJob = (job) => ({
  type: constants.SET_NEW_JOB,
  job
});

//open one job with full past
export const setOneJob = (job) => ({
  type: constants.SET_ONE_JOB,
  job
});

export const updateJob = (job) => ({
  type: constants.UPDATE_JOB,
  job
});

export const individualUpdate = (kind, update) => ({
  type: constants.INDI_UPDATE,
  payload: {
    kind,
    update
  }
});

export const updateDateNextJob = (nextDate) => ({
  type: constants.UPDATE_DATE_NEXT,
  nextDate
});

export const updateJobPast = (updatedJob) =>  ({
  type: constants.UPDATE_JOB_PAST,
  updatedJob
})

export const updateHeart = (updatedHeart) => ({
  type: constants.UPDATE_HEART,
  updatedHeart
})


export function fetchWholeJob(_id, user) {
  return dispatch => {
    const urlWhole = (constants.SER_URL + '/' + user + '/one_job/' + _id)
    fetch(urlWhole)
    .then(response => response.json())
    .then(data => {
      dispatch(setOneJob(data))})
    .catch(e => console.log(e))
  }
}

export function sendNewJob(user, job) {
  return () => {
    const url = constants.SER_URL + '/' + user + '/new_Job';
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(job)
    })
    .then(response => response.json())
    .then(hashHistory.push('/' + user + '/jobs'))
  }
};

export function fetchUpdate(user, job) {
  return dispatch => {
    const url = constants.SER_URL + '/' + user + '/edit_job/' + job._id;
    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(job)
    })
    .then(response => response.json())
    .then(data => {
      dispatch(setOneJob(data))
    })
    .then(hashHistory.push('/' + user + '/one_job/' + job._id))
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
      console.log('data: ', data);
      sortedArray = data.sort(function(a, b) {return Date.parse(a.nextDate) - Date.parse(b.nextDate)});
      dispatch(setAllJobs(sortedArray))
    })
    .catch(ex => console.log(ex))
  }
};

export function fetchDeleteJob(_id, user) {
  return () => {
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

export function fetchHeartDateUpdate(user, jobId, isInputChecked, nextDate) {
  return dispatch => {
    const urlHeart = constants.SER_URL + '/' + user + '/one_job/' + jobId;
    fetch(urlHeart, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        jobId,
        user,
        isInputChecked,
        nextDate
      })
    })
    .then(response => response.json())
    .then(res => {
      dispatch(setOneJob(
        res._id,
        res.company,
        res.jobTitle,
        res.foundDate,
        res.nextDate,
        res.important,
        res.stage,
        res.contact,
        res.research,
        res.notes,
        res.website,
        res.post,
        res.pastJobs
    ))})
    .catch(ex => console.log(ex))
  }
};

export function sendNewJobPast(user, jobId, pastId, foundDate, type, notes, nextDate) {
  return dispatch => {
    const pastUrl = constants.SER_URL + '/' + user + '/newJobPast/' + jobId;
    fetch(pastUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user,
        jobId,
        pastId,
        foundDate,
        type,
        nextDate,
        notes,
      })
    })
    .then(response => response.json())
    .then(res => {
      dispatch(setOneJob(res))
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
