import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../actions/actions';

function useMapSidebar() {
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useDispatch();

  const worldMapConf = useSelector((state) => state.countries.worldMapConf);

  const toggleSidebar = () => setIsVisible((isVisible) => !isVisible);
  const toggleColoring = () => dispatch(actions.toggleGradualColoring());

  const continentSelectedHandler = (e) =>
    dispatch(actions.setSelectedContinent(e.target.value));

  const regionSelectedHandler = (e) =>
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
