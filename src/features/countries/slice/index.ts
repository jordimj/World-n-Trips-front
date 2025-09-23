import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ALL_REGIONS, WORLD_MAP } from '@/constants';

export type CountriesState = {
  worldMapConf: {
    graduallyColored: boolean;
    selectedContinent: string;
    selectedRegion: string;
  };
};

const initialState: CountriesState = {
  worldMapConf: {
    graduallyColored: false,
    selectedContinent: WORLD_MAP,
    selectedRegion: ALL_REGIONS,
  },
};

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    toggleGradualColoring(state) {
      state.worldMapConf.graduallyColored = !state.worldMapConf.graduallyColored;
    },
    setSelectedContinent(state, action: PayloadAction<string>) {
      state.worldMapConf.selectedContinent = action.payload;
      state.worldMapConf.selectedRegion = ALL_REGIONS;
    },
    setSelectedRegion(state, action: PayloadAction<string>) {
      state.worldMapConf.selectedRegion = action.payload;
    },
  },
});

export const { toggleGradualColoring, setSelectedContinent, setSelectedRegion } =
  countriesSlice.actions;

export default countriesSlice.reducer;
