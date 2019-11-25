import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import fire from "./fire";
import firebase from 'firebase';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0, reasons: [] };
  }
    
  componentWillMount(){

    // This links Database response to UI
    let responseRef = fire.database().ref('user_response').orderByKey().limitToLast(5);
    responseRef.on('child_added', snapshot => {
      let response = { reason: snapshot.val().opinion, id: snapshot.key, row_num: snapshot.val().id };   

      this.setState({ reasons: [response].concat(this.state.reasons), counter: (snapshot.val().id + 1) });
      console.log("componentwillmount() here... ");
      // - This 'child_added' callback will be called throughout  afafaf
    })

    // Next, check if there are more than 100 posts. If so, delete the oldest. 

  }
  
  addResponse(e){
    e.preventDefault();

    var inputValue = this.inputEl.value;
    fire.database().ref('user_response').push( {opinion: inputValue, response_time: firebase.database.ServerValue.TIMESTAMP, answer: 1, id: this.state.counter});
    
    inputValue = this.inputEl.value;
    
  }

  // Bind this function to the textbox. 
  optionText(e){
    var inputValue = this.inputEl.value;
    // If the textbox is active/selected AND it's set to Default, then blank it
    if (inputValue == "(Optional) Please Share What Caused Your Ordeal!"){
      this.inputEl.value = "";
    } 
    else if(inputValue == "" || inputValue == Null){
      this.inputEl.value = "(Optional) Please Share What Caused Your Ordeal!";
    }   
  }



  render() {
    return (
      <form onSubmit={this.addResponse.bind(this)}>
        
        <h1>Is your Day Ruined?</h1>
        <input type="submit" value="Yes, it is" />
        <input type="text" name="reason" ref={ el => this.inputEl = el } onClick=""/>
        
        <p>Number of ruined people today: {this.state.counter}</p>        
        <ul>
        {
          this.state.reasons.map( response => <li key={response.id}>{response.reason}</li> )
        }
        </ul>
      </form>


  );}
 
}

export default App;

