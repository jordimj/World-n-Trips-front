import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import countriesReducer from '@/features/countries/reducers/reducer';
import journalsReducer from '@/features/journals/reducers/reducer';

const composeEnhancers =
  (window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose) || compose;

const rootReducer = combineReducers({
  countries: countriesReducer,
  journals: journalsReducer,
});

// todo: remove deprecated createStore
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export type RootState = ReturnType<typeof rootReducer>;
