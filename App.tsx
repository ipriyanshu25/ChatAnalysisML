import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ChatAnalysisDashboard from './chatanalysisdashboard';
import './App.css';
const Home = () => <h1>Welcome to the Home Page</h1>;

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/chatanalysisdashboard">ChatanalysisDashboard</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chatAnalysisdashboard" element={<ChatAnalysisDashboard/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;






























// test = "Welcome to My Home Page"
