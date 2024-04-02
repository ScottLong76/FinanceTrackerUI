import React from 'react';
import { Nav } from 'react-bootstrap';

const Topbar: React.FC = () => {
    return (
        <div className="topbar">
            <img src="/logo.webp" alt="Logo" className="topbar-logo" />
            <Nav defaultActiveKey="/home" className="topbar-menu">
                <Nav.Item>
                    <Nav.Link href="/home">Home</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/manageData">Manage Data</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/rules">Rules</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/uploadData">Upload Data</Nav.Link>
                </Nav.Item>
            </Nav>
        </div>
    );
};

export default Topbar;
