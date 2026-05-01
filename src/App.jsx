import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Timeline from './pages/Timeline';
import EligibilityChecker from './pages/EligibilityChecker';
import Quiz from './pages/Quiz';
import Simulator from './pages/Simulator';
import Guide from './pages/Guide';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="guide" element={<Guide />} />
          <Route path="timeline" element={<Timeline />} />
          <Route path="eligibility" element={<EligibilityChecker />} />
          <Route path="quiz" element={<Quiz />} />
          <Route path="simulator" element={<Simulator />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
