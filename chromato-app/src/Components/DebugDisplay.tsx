import React, { useContext } from 'react';
import { AppContext } from '../Store/AppContext';

export const DebugDisplay: React.FC = () => {
  const { state ,dispatch } = useContext(AppContext);
  return (<pre>{ JSON.stringify(state, undefined, 2)}</pre>)
};
