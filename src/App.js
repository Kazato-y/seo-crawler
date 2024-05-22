import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import DomainList from './components/DomainList';
import DomainDetail from './components/DomainDetail';
import StatusCodeList from './components/StatusCodeList';
import NonCanonicalList from './components/NonCanonicalList';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/domains" element={<DomainList />} />
                <Route path="/domains/:domainId" element={<DomainDetail />} />
                <Route path="/domains/:domainId/status-codes" element={<StatusCodeList />} />
                <Route path="/domains/:domainId/non-canonical" element={<NonCanonicalList />} />
                <Route path="/" element={<Login />} />
            </Routes>
        </Router>
    );
}

export default App;
