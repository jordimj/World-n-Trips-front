import { getStats, getYearStats } from '@/api';
import * as actionTypes from '../types/actionTypes';

const fetchStatisticsStart = () => {
  return {
    type: actionTypes.FETCH_STATS_START,
  };
};

const fetchStatisticsSuccess = (statistics) => {
  return {
    type: actionTypes.FETCH_STATS_SUCCESS,
    statistics,
  };
};

const fetchStatisticsFail = (error) => {
  return {
    type: actionTypes.FETCH_STATS_FAIL,
    error,
  };
};

export const fetchStatistics = (year = null) => {
  return async (dispatch) => {
    dispatch(fetchStatisticsStart());

    try {
      const stats = await (year ? getYearStats(year) : getStats());
      dispatch(fetchStatisticsSuccess(stats));
    } catch (e) {
      dispatch(fetchStatisticsFail(e));
    }
  };
};
