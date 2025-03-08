import React from 'react';
import { Link, Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/create">Create Campaign</Link>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;