import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Fade from 'react-reveal/Fade';
import Pulse from 'react-reveal/Pulse'

import { InfiniteLoader, List } from 'react-virtualized';
import 'react-virtualized/styles.css'; // only needs to be imported once

import fire from "./fire";
import firebase from 'firebase';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0, reasons: [], reason_provided: 0, isHovering: false};

    this.optionText = this.optionText.bind(this); // testing phase
    this.hoverButton = this.hoverButton.bind(this); // working phase
  }
    
  componentWillMount(){

    // This links Database response to UI
    let responseRef = fire.database().ref('user_response').orderByKey().limitToLast(5);
    responseRef.on('child_added', snapshot => {
      let response = { reason: snapshot.val().opinion, id: snapshot.key, row_num: snapshot.val().id };   
      this.setState({ reasons: [response].concat(this.state.reasons), counter: (snapshot.val().id + 1) });
      console.log("componentwillmount() here... ");
    })

    // Next, check if there are more than 100 posts. If so, delete the oldest. 

  }
  
  addResponse(e){
    e.preventDefault();

    // Fetch the data in the input textbox and load it the database with the inserted_time
    var inputValue = this.inputEl.value;
    fire.database().ref('user_response').push( {opinion: inputValue, response_time: firebase.database.ServerValue.TIMESTAMP, answer: 1, id: this.state.counter});

    // Reset the input textbox  
    this.inputEl.value = "";    
  }

  // Bind this function to the textbox. 
  optionText(e){
    e.preventDefault();
    /*
    var inputValue = this.inputEl.value;
    console.log("Wtf yo: " + inputValue);
    // If the textbox is active/selected AND it's set to Default, then blank it
    if (inputValue == "(Optional) Please Share What Caused Your Ordeal!"){
      this.inputEl.value = "";
    } 
    else if(inputValue == "" || inputValue == null){
      this.inputEl.value = "(Optional) Please Share What Caused Your Ordeal!";
    }   
    */
  }

  // Everytime an user hovers over the button, it does 'Pulse' animation.
  hoverButton(){
      //e.preventDefault();
      this.setState(prevState  => ({
        isHovering: !prevState.isHovering
      }));
  }


  render() {
    const btnClass = this.state.isHovering ? "pulse animated" : ""; // we don't need this since 'spy' 

    return (
    
      <form onSubmit={this.addResponse.bind(this)}>
        <Fade>    
        <h1>Is your Day Ruined?</h1>
        </Fade>
        
        <Pulse spy={this.state.isHovering} >   
          <input type="submit" className={btnClass}  value="Yes, it is" onMouseEnter={this.hoverButton} onMouseLeave={this.hoverButton} />
        </Pulse>
        <input type="text" ref={ el => this.inputEl = el } onClick={this.optionText}/>
        
        <div>
          <p>Number of ruined people today and their reasons below: {this.state.counter}</p>        
          <ul>
          {
            this.state.reasons.map( response => <li key={response.id}>{response.reason}</li> )
          }
          </ul>
        </div>

        <InfiniteLoader>

        </InfiniteLoader>

      </form>


  );}
 
}

export default App;

