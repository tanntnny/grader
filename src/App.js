import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopBar from './components/TopBar';
import ProblemSpace from './components/ProblemSpace';
import Home from './components/Home';
import ProblemView from './components/ProblemView';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex justify-center">
        <div className="flex flex-col items-center w-[1440px] text-center p-8">
          <nav>
            <TopBar />
          </nav>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tasks" element={<ProblemSpace />} />
            <Route path="/view/:props" element={<ProblemView />} />
          </Routes>

        </div>
      </div>
    </Router>
  );
}

export default App;