import { useDispatch } from 'react-redux';
import { SelectChangeEvent } from '@mui/material/Select';
import * as actions from '../slice';

function useMapFilters() {
  const dispatch = useDispatch();

  const toggleColoring = () => dispatch(actions.toggleGradualColoring());

  const continentSelectedHandler = (e: SelectChangeEvent<string>) =>
    dispatch(actions.setSelectedContinent(e.target.value));

  const regionSelectedHandler = (e: SelectChangeEvent<string>) =>
    dispatch(actions.setSelectedRegion(e.target.value));

  return {
    toggleColoring,
    continentSelectedHandler,
    regionSelectedHandler,
  };
}

export default useMapFilters;
