import React, { Component } from 'react';
import ContactListSection from './ContactListSection';
import './App.css';
import { BrowserRouter, Route, Link } from 'react-router-dom';

const Home = (props) => {
  return (
    <div className="box-home">
        Welcome!!!
    </div>
  )
}
const Navigation = (props)  => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to = {`/`}> 
            <img src="home.png" alt="Home" />
            Home </Link>
          </li>
          <li>
            <Link to = {`/contact-list`}> 
            <img src="./phone-book.png" alt="Contact Book" />
            Contact List </Link>
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
            <Route exact path="/" component={Home}/>
            <Route exact path="/contact-list" component={ContactListSection}/>
          </div>
        </BrowserRouter>
      </div>
    );
  } 
}
export default App;