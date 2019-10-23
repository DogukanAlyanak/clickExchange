import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import NotFound from './pages/NotFound'
import Navbar from './components/navbar'
import './css/App.css'
import home from './pages/home'

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
      <Switch>
        <Route exact path="/" component={home} />
        <Route component={NotFound} />
      </Switch>
      </div>
    </Router>
  );
}

export default App;
