import React, { Component } from 'react';
import TodoTask from './TodoTask';
import { Link } from 'react-router-dom';
import TodoAddTask from './TodoAddTask';
import firebase from './firebase.js';
import './TodoList.css';

class TodoList extends Component {
  constructor(props) {
    super(props)
    const taskDate = this.getDate();
    this.state = {
      taskDate: taskDate,
      tasks: [],
      lastPosition: 0
    }
  }
  getDate = () => {
    if (this.props.match.params.dateTask) {
			return this.props.match.params.dateTask
		} else {
			return '2018-10-19'
		}
  }
  componentDidMount() {
    const taskRefFirebase = firebase.database().ref(`/tasks/${this.state.taskDate}`);     
    taskRefFirebase.on( 'value', (snapshot) => {   
      let newStateTask = [];
      let fTasks = snapshot.val();
      if( fTasks ) {
        for( let ftask in fTasks ) {
          newStateTask.push({
            id: ftask,
            date: fTasks[ftask].date,
            task: fTasks[ftask].task,
            isDone: fTasks[ftask].isDone,
            position: fTasks[ftask].position
          });
        }
        
        if( newStateTask.length > 0 )
          this.reloadTask(newStateTask); 
      }
    });  
  }
  reloadTask =  newTasks => {
    this.setState( {tasks: newTasks} );
    this.setState({
      tasks: this.orderTasks( newTasks ),
      lastPosition : this.getLastTaskPosition( newTasks )
    })
  }

  addTask = newTask => { 
    const taskRefFirebase = firebase.database().ref(`/tasks/${this.state.taskDate}`); 
    const taskFirebase = {
      date: newTask.date,
      task: newTask.task,
      isDone: newTask.isDone,
      position: newTask.position
    }
    taskRefFirebase.push( taskFirebase );
  }
  removeTask = taskToRemove => { 
    const taskRefFirebase = firebase.database().ref( `/tasks/${this.state.taskDate}/${taskToRemove.id}` );
    taskRefFirebase.remove();
  }

  updateTask = values => {
    const taskRefFirebase = firebase.database().ref( `/tasks/${this.state.taskDate}/${values.id}/${values.var}` );
    taskRefFirebase.set( values.val );
  }
  upTask = position => {
    var taskBefore = [];
    var allTasks = this.state.tasks;
    
    for( let task in  allTasks ) {
      if( allTasks[task].position === position && Object.keys(taskBefore).length > 0 ) {
        this.updateTask( {id: allTasks[task].id, var:'position', val: taskBefore.position} );
        this.updateTask( {id: taskBefore.id, var:'position', val: position} );
      }
      taskBefore = allTasks[task];
    }
  }
  getLastTaskPosition = arrayToGetLastTask => {
    return arrayToGetLastTask.reduce((max, b) => Math.max(max, b.position), arrayToGetLastTask[0].position);
  }

  orderTasks = arrayToOrder => {
    var orderedTask = arrayToOrder.sort((a, b) => parseFloat(a.position) - parseFloat(b.position));
    return orderedTask;
  }
  render() {
    console.log("rendering ",this.state.taskDate);
    return( 
      <section>
        <Link  to = {`/`} className="back-link"  > <img src="../left-arrow.png" alt="Go Back"/> Go to dates list</Link>
        <h1> To-do List </h1>
        <p> {this.state.taskDate} </p>
        { this.state.tasks.map( task => <TodoTask key={task.id} task={task} deleteFunction={this.removeTask} updateFunction={this.updateTask} upFunction={this.upTask} /> )}    
        <TodoAddTask addTask={this.addTask} lastPosition={this.state.lastPosition} taskDate={this.state.taskDate} />
      </section>
    )
  }
}

export default TodoList;