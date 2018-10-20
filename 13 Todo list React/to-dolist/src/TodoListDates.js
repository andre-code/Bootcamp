import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from './firebase.js';
import './TodoListDates.css';

class TodoListDates extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dates: []
    }
  }
  getToday = () => {
    let d = new Date(),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }
  componentDidMount() {
    const taskRefFirebase = firebase.database().ref(`/tasks`);     
    taskRefFirebase.on( 'value', (snapshot) => {
      let fTasks = snapshot.val();
      if( fTasks ) {
        const datesFirebase = Object.keys(fTasks);
        const today = this.getToday();        
        if( datesFirebase.indexOf(today) === -1 ) {
          datesFirebase.push(today);
        }         

        this.setState({
          dates: datesFirebase
        });      
      } else {
        this.setState({
          dates: []
        });
      }
    });  
  }
  render() {
    return( 
      <div>
      <h1> Dates To-do List </h1>
      <nav>
        <ul>
          { this.state.dates.map( date => <Link  key={date} to = {`/todolist/${date}`}> {date} </Link>)}          
        </ul>
      </nav>
    </div>
    )
  }
}

export default TodoListDates;