// import "./App.css";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import LoginForm from "./login";
// import Table from "./table";
// import HomePage  from "./home";
// import Counter from "./counter";
// import Register from "./register";
// import Exam from "./exam";


// const App = () => {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/home" element={<HomePage test ="This is a sample home page."/>} />
//         <Route path="/login" element={<LoginForm />} />
//         <Route path="/counter" element={<Counter />} />
//         <Route path="/table" element={<Table />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/exam" element={<Exam />} />
//       </Routes>
//     </BrowserRouter>
//   );
// };

// export default App;
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