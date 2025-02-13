import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Search from './pages/Search';
import History from './pages/History';
import { Provider } from 'react-redux';
import { store } from './store/store';

function App() {
  return (
    <Provider store={store} children={
      <Router>
        <div className="min-h-screen bg-page-bg">
          <Header />
          <div className="container mx-auto py-8">
            <Routes>
              <Route path="/" element={<Search />} />
              <Route path="/history" element={<History />} />
            </Routes>
          </div>
        </div>
      </Router>
    } />
  );
}

export default App;
