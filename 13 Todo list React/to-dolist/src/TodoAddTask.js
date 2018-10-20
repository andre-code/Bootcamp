import React, { Component } from 'react';
import './TodoAddTask.css';

class TodoAddTask extends Component {
  constructor( props ) {
    super(props);
    this.state = {
      taskText: ''
    }
  }
  callAddTask = e => {
    if( e.key === 'Enter' ) {
      let newTask = {
        date: this.props.taskDate,
        task: this.state.taskText,
        isDone: false,
        position: this.props.lastPosition + 1
      }
      this.props.addTask( newTask );
      document.getElementById( "taskfield" ).value = '';
    }
  }
  updateTextTask = e => {
    this.setState( {taskText: e.target.value} );
  }
  render() {
    return (
      <div className="addTask">
        <div>  
          <label htmlFor="taskfield">
            <input
              name="taksfield" 
              type="text" 
              className="taskfield" 
              id="taskfield" 
              onChange={this.updateTextTask} 
              onKeyPress={this.callAddTask} 
              placeholder="Write here your task and press Enter to save"/>
          </label> 
        </div>
      </div>
    );
  }
}

export default TodoAddTask;