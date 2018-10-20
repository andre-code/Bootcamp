import React, { Component } from 'react';
import TodoList from './TodoList';
import './App.css';
import { BrowserRouter, Route, Link } from 'react-router-dom';

const ListDates = ()  => {

  const dates = ['2018-10-17','2018-10-18','2018-10-19', '2018-10-20'];
  return (
    <div>
      <h1> Dates To-do List </h1>
      <nav>
        <ul>
          { dates.map( date => <Link  key={date} to = {`/todolist/${date}`}> {date} </Link>)} 
          
        </ul>
      </nav>
    </div>
  )
}
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
              <Route exact path="/" component={ListDates}/>
              <Route path="/todolist/:dateTask" component={TodoList}/>
            </div>
          </BrowserRouter>
        </section>
      </div>
    );
  } 
}
export default App;