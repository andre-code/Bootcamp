import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      all: [],
      favorites: []
    }
    this.addFavorites = this.addFavorites.bind(this);
  }
  componentDidMount() {
    fetch("https://randomuser.me/api/?results=10")
      .then(results => results.json())
      .then( data => {
        console.log(data.results);
        this.setState({
          all: data.results
        })
        console.log(this.state);
      })    
  }

  addFavorites ( contact ) {
    console.log( "add favorites" );
    console.log( contact );
    this.setState(previousState => ({
      favorites: [...previousState.favorites, contact ]
    }));
    console.log( this.favorites );

  }
  render() {
    console.log (this.state);
    return (
      <div className="App">
        <ContactList contacts = {this.state.all} title="All" />
        <ContactList contacts= {this.state.favorites} title="Favorites" />
      </div>
    );
  }
}

const ContactList = (props) => {
  console.log(props);
  return (
    <section>
      <h2>{props.title}</h2>
      { props.contacts.map( contact => <ContactCard key={contact.name.first} contact={contact} /> )}    
    </section>
    
  )
}

class ContactCard extends Component {
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
        <button onClick={this.props.addFavorites}>Favorite</button>
        <button onClick={this.props.addFavorites}>Delete</button>
      </div>
    )
  }
}

export default App;