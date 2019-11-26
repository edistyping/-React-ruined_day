import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import fire from "./fire";
import firebase from 'firebase';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0, opinions: [] };
  }
    
  componentWillMount(){

    // This links Database response to UI
    let responseRef = fire.database().ref('user_response').orderByKey().limitToLast(3);
    responseRef.on('child_added', snapshot => {
      let opinion = { text: snapshot.val().opinion, id: snapshot.key, row_num: snapshot.val().id };   
      
    
      this.setState({ opinions: [opinion].concat(this.state.opinions)});
      console.log("componentwillmount() here... ");
    })

    // then callback to add the State variable
    fire.database().ref('user_response').on("child_added", (snapshot) => {
      
      
      console.log("callback()...    Current counter: " + this.state.counter );
      this.setState({counter: this.state.counter + 1}); // sync it with lastID 
    });
    

  }
  
  addResponse(e){
    e.preventDefault();

    var inputValue = this.inputEl.value;
    fire.database().ref('user_response').push( {opinion: inputValue, response_time: firebase.database.ServerValue.TIMESTAMP, answer: 1, id: this.state.counter});

    this.inputEl.value = ''; // Reset the input value
    inputValue = this.inputEl.value;    
  }

  render() {
    return (
      
      <form onSubmit={this.addResponse.bind(this)}>
        
        <h1>Is your Day Ruined?</h1>
        <input type="submit" value="Yes, it is" />
        <input type="text" ref={ el => this.inputEl = el }   />
        
        <div>
          <p>Number of ruined people today: {this.state.counter}</p>        
          <ul>
          {
            this.state.opinions.map( opinion => <li key={opinion.id}>{opinion.row_num}: {opinion.text}</li> )
          }
          </ul>
        </div>

      </form>
    

  );}
 
}

export default App;


