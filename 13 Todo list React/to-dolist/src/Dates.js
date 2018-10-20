import React, { Component } from 'react';
import './Dates.css';
import TodoList from './TodoList';
import { BrowserRouter, Route, Link } from 'react-router-dom';

const NavigationDate = ()  => {
  const dates = ['2018-10-17','2018-10-18','2018-10-19'];
  return (
    <div >
      <nav>
        <ul>
          { dates.map( date => <Link className="div-dates-list" key={date} to = {`/todolist/${date}`}> {date} </Link>)}   
        </ul>
      </nav>
    </div>
  )
}

class Dates extends Component {
  constructor(props) {
    super(props);
    this.state = {     
    }
  }
  render() {
    return (
      <section>
      <h1> Dates To-do List </h1>
      <BrowserRouter>
        <div>
          <NavigationDate/>
          <Route exact path="/todolist/:dateTask" component={TodoList}/>
        </div>
      </BrowserRouter>
    </section>
    );
  } 
}
export default Dates;