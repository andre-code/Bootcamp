import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      all: [],
      favorites: []
    }
    //this.addFavorites = this.addFavorites.bind(this);
  }
  componentDidMount() {
    fetch("https://randomuser.me/api/?results=10")
      .then(results => results.json())
      .then( data => {
        this.setState({
          all: data.results
        })
      })    
  }

  addFavorites = card  => {
    console.log( "add favorites" );
    this.setState(previousState => ({
      favorites: [...previousState.favorites, card ]
    })); 
    this.deleteAll( card )
  }

  addAll = card  => {
    console.log( card );
    this.setState(previousState => ({
      all: [...previousState.all, card ]
    })); 
    this.deleteFavorites( card )
  }

  deleteAll = card  => {
    console.log( "delete all" );
    var newContactArray = this.state.all.filter(function(contactItem){
      return contactItem !== card
    });
    this.setState({
      all: newContactArray
    });
  }

  deleteFavorites = card  => {
    console.log( "delete favorites" );
    var newContactArray = this.state.favorites.filter(function(contactItem){
      return contactItem !== card
    });
    this.setState({
      favorites: newContactArray
    });
  }
  render() {
    return (
      <div className="App">
        <ContactList contacts = {this.state.all} title="All" titlebutton="Favorites" addFunction = {this.addFavorites} deleteFunction = {this.deleteAll} />
        <ContactList contacts= {this.state.favorites} title="Favorites" titlebutton="All" addFunction = {this.addAll}  deleteFunction = {this.deleteFavorites}/>
      </div>
    );
  }
}

const ContactList = (props) => {
  return (
    <section>
      <h2>{props.title}</h2>
      { props.contacts.map( contact => <ContactCard key={contact.email} contact={contact} addFunction={props.addFunction} deleteFunction={props.deleteFunction} title = {props.titlebutton}  /> )}    
    </section>
    
  )
}

class ContactCard extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }
    this.callAddFunction = this.callAddFunction.bind(this);
    this.callDeleteFunction = this.callDeleteFunction.bind(this);
  }

  callAddFunction() {
    this.props.addFunction( this.props.contact );
  }
  callDeleteFunction() {
    this.props.deleteFunction( this.props.contact );
  }
  render() {
    return (
      <div className="contact-card">
        <figure>
          <img src={this.props.contact.picture.large} alt="Author" />
          <figcaption>
            <span>{this.props.contact.name.first}</span>
            <p>
            {this.props.contact.email} <br/>
            {this.props.contact.phone}
            </p>
          </figcaption>
        </figure>
        <button onClick={this.callAddFunction}>Add {this.props.title}</button>
        <button onClick={this.callDeleteFunction}>Delete</button>
      </div>
    )
  }
}

export default App;