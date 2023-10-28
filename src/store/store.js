import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import countriesReducer from '@/features/countries/reducers/reducer';
import journalsReducer from '@/features/journals/reducers/reducer';
import statisticsReducer from '@/features/statistics/reducers/reducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  countries: countriesReducer,
  statistics: statisticsReducer,
  journals: journalsReducer,
});

// todo: remove deprecated createStore
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
