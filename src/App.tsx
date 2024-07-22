import { MantineProvider } from '@mantine/core';
import React from 'react';
import CropTables from './Components/Tables';

const App: React.FC = () => {
  return (
    <MantineProvider >
      <CropTables />
    </MantineProvider>
  );
};

export default App;
