import React, { Component } from 'react';
import './TodoTask.css';

class TodoTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  callRemoveFunction = () => {
    this.props.deleteFunction( this.props.task );
  }
  callUpFunction = () => {
    this.props.upFunction( this.props.task.position );
  }
  callTaskDone = e => {
    const values = {
      id: this.props.task.id,
      var: "isDone",
      val: e.target.checked
    }
    this.props.updateFunction( values );
  }
  render() {
    return (
      <div className="task">
        <div>
            <input type="checkbox" name="isDone" checked={this.props.task.isDone} onChange={this.callTaskDone} className="styledCheckbox" />
       </div>
        <div>{this.props.task.task}</div>
        <div>
          <button onClick={this.callRemoveFunction}>
            <img src="../dustbin.png" alt="Delete" />
          </button>
          <button onClick={this.callUpFunction}>
            <img src="../upload.png" alt="Up" />
          </button>
        </div>
      </div>
    );
  }
}

export default TodoTask;