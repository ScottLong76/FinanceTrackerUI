import React from 'react';
import { Nav } from 'react-bootstrap';

const FTSideBar: React.FC = () => {
  return (
    <Nav defaultActiveKey="/home" className="sidebar">
      <Nav.Item>
        <Nav.Link href="/home">Home</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/dashboard">Dashboard</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/data">Data</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/rules">Rules</Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default FTSideBar;


