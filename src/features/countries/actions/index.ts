import * as actionTypes from '../types/actionTypes';

export interface ToggleGradualColoringAction {
  type: 'TOGGLE_GRADUAL_COLORING';
}

export interface SetSelectedContinentAction {
  type: 'SET_SELECTED_CONTINENT';
  continent: string;
}

export interface SetSelectedRegionAction {
  type: 'SET_SELECTED_REGION';
  region: string;
}

export type MapAction =
  | ToggleGradualColoringAction
  | SetSelectedContinentAction
  | SetSelectedRegionAction;

export const toggleGradualColoring = (): ToggleGradualColoringAction => ({
  type: actionTypes.TOGGLE_GRADUAL_COLORING,
});

export const setSelectedContinent = (continent: string): SetSelectedContinentAction => ({
  type: actionTypes.SET_SELECTED_CONTINENT,
  continent,
});

export const setSelectedRegion = (region: string): SetSelectedRegionAction => ({
  type: actionTypes.SET_SELECTED_REGION,
  region,
});
