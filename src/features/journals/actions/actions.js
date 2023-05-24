import { getJournals, getTrips } from '@/api';
import * as actionTypes from '../types/actionTypes';

const fetchJournalsStart = () => {
  return {
    type: actionTypes.FETCH_JOURNALS_START,
  };
};

const fetchJournalsSuccess = (journals) => {
  return {
    type: actionTypes.FETCH_JOURNALS_SUCCESS,
    journals,
  };
};

const fetchJournalsFail = (error) => {
  return {
    type: actionTypes.FETCH_JOURNALS_FAIL,
    error,
  };
};

export const fetchJournals = (tripId) => {
  return async (dispatch) => {
    dispatch(fetchJournalsStart());

    try {
      const journals = await getJournals(tripId);
      dispatch(fetchJournalsSuccess(journals));
    } catch (e) {
      dispatch(fetchJournalsFail(e));
    }
  };
};

const fetchTripsStart = () => {
  return {
    type: actionTypes.FETCH_TRIPS_START,
  };
};

const fetchTripsSuccess = (trips) => {
  return {
    type: actionTypes.FETCH_TRIPS_SUCCESS,
    trips,
  };
};

const fetchTripsFail = (error) => {
  return {
    type: actionTypes.FETCH_TRIPS_FAIL,
    error,
  };
};

export const fetchTrips = () => {
  return async (dispatch) => {
    dispatch(fetchTripsStart());

    try {
      const trips = await getTrips(true);
      dispatch(fetchTripsSuccess(trips));
    } catch (e) {
      dispatch(fetchTripsFail(e));
    }
  };
};
