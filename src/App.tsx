import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Navbar from './components/Navbar';
import ContactForm from './components/ContactFrom';
import ChartsAndMaps from './components/ChartsAndMaps';


const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<ContactForm />} />
            <Route path="/charts-and-maps" element={<ChartsAndMaps />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
