import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Main from './Pages/Main';
import SinlgePage from './Pages/SinlgePage';
import Error from './Pages/Error'; // Make sure to import the Error component

const App = () => {
  return (
    <Routes>
      {/* Main route */}
      <Route path="/" element={<Main />}>
        <Route index element={<Home />} /> {/* Use "index" for the default path */}
        <Route path="coin/:id" element={<SinlgePage />} />
      </Route>

      {/* Catch-all route for unknown paths */}
      <Route path="*" element={<Error />} />
    </Routes>
  );
};

export default App;
