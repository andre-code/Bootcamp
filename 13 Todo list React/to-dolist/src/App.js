import React, { Component } from 'react';
import TodoList from './TodoList';
import TodoListDates from './TodoListDates';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { }
  }
  render() {
    return (
      <div className="main">
        <section>
          <BrowserRouter>
            <div>
              <Route exact path="/" component={TodoListDates}/>
              <Route path="/todolist/:dateTask" component={TodoList}/>
            </div>
          </BrowserRouter>
        </section>
      </div>
    );
  } 
}
export default App;