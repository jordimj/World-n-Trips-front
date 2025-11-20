import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ALL_REGIONS, WORLD_MAP } from '@/constants';

export type HomeState = {
  worldMapConf: {
    graduallyColored: boolean;
    selectedContinent: string;
    selectedRegion: string;
  };
};

const initialState: HomeState = {
  worldMapConf: {
    graduallyColored: false,
    selectedContinent: WORLD_MAP,
    selectedRegion: ALL_REGIONS,
  },
};

const homeSlice = createSlice({
  name: 'home',
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

export const { toggleGradualColoring, setSelectedContinent, setSelectedRegion } = homeSlice.actions;

export default homeSlice.reducer;
