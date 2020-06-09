import React  from 'react';
import List from './Components/List';
import { AppProvider } from './Store/AppProvider';

const App: React.FC = () => {
  return (
    <AppProvider>
      <List />
    </AppProvider>
  );
}

export default App;
