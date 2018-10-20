import React, { Component } from 'react';
import TodoList from './TodoList';
import Dates from './Dates';
import './App.css';
import { BrowserRouter, Route, Link } from 'react-router-dom';

const Navigation = (props)  => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to = {`/`}>
            Dates </Link>
          </li>
          <li>
            <Link to = {`/todolist`}>
            To do list </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }
  render() {
    return (
      <div className="main">
        <BrowserRouter>
          <div>
            <Navigation/>
            <Route exact path="/" component={Dates}/>
            <Route exact path="/todolist" component={TodoList} />
          </div>
        </BrowserRouter>
      </div>
    );
  } 
}
export default App;