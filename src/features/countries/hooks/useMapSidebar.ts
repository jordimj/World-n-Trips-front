import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SelectChangeEvent } from '@mui/material';
import { RootState } from '@/store';
import * as actions from '../slice';

function useMapSidebar() {
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useDispatch();

  const worldMapConf = useSelector((state: RootState) => state.countries.worldMapConf);

  const toggleSidebar = () => setIsVisible((isVisible) => !isVisible);
  const toggleColoring = () => dispatch(actions.toggleGradualColoring());

  const continentSelectedHandler = (e: SelectChangeEvent) =>
    dispatch(actions.setSelectedContinent(e.target.value));

  const regionSelectedHandler = (e: SelectChangeEvent) =>
    dispatch(actions.setSelectedRegion(e.target.value));

  return {
    isVisible,
    worldMapConf,
    toggleSidebar,
    toggleColoring,
    continentSelectedHandler,
    regionSelectedHandler,
  };
}

export default useMapSidebar;
