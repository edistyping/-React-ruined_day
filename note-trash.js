



// Outputting child 
fire.database().ref("user_response").limitToLast(1).on("value", function(childSnapshot){
          for(var key in childSnapshot.val()){
            console.log("key:  -> " + key); // actually give me key
            console.log("love: " + childSnapshot.val()[key].id);
            //lastValue = childSnapshot.val()[key].id;
          }
      });













  addResponse(e){
    e.preventDefault();

    // get id first 

    // then just push(). No need for child_added

    console.log("This should be called first mang");
    var inputValue = this.inputEl.value;

    // Need a way to increment id correctly (first time and rest)
    console.log("test0");
    var lastValue; 

    var data = fire.database().ref('user_response');

//    var data2 = fire.database().ref('user_response').child('');

    // remember this occurs ONCE a data is LOADED onto the db
    // THEREFORE, we might have to create a function to find last ID and put it inside here i guess
      // ?? but after we do above and load the value from here data{}, it will LOOP. So what's another function? 

    data.on("child_added", function(snapshot){  // (tip) value: Read and listen for changes to the entire contents of a path.
      console.log("test1");


      if(snapshot.hasChildren() == true){ // has data. 
        console.log("Child Exists...");
     //   fire.database().ref('user_response').push( {opinion: inputValue, response_time: firebase.database.ServerValue.TIMESTAMP, answer: 1, id:2 } );
        
      } 
      else if(snapshot.hasChilden() == false){
        console.log("NO Child Found. Creating new...");
   //     fire.database().ref('user_response').push( {opinion: inputValue, response_time: firebase.database.ServerValue.TIMESTAMP, answer: 1, id: 1} );
      }

    });

        fire.database().ref('user_response').push( {opinion: inputValue, response_time: firebase.database.ServerValue.TIMESTAMP, answer: 1, id: 1} );


/*    
    if(itsEmpty == true && ready == true){
      console.log("It's initially empty");
      fire.database().ref('user_response').push( {opinion: inputValue, response_time: firebase.database.ServerValue.TIMESTAMP, answer: 1, id: 0} );
      
    }else if(itsEmpty == false && ready == true ) {
      console.log("It's not empty");      
      fire.database().ref("user_response").limitToLast(1).on("value", function(childSnapshot){
          for(var key in childSnapshot.val()){
            //console.log("love: " + childSnapshot.val()[key].opinion);
            lastValue = childSnapshot.val()[key].id + 1;
          }
      });
      console.log("lastValue: " + lastValue); 
      fire.database().ref('user_response').push( {opinion: inputValue, response_time: firebase.database.ServerValue.TIMESTAMP, answer: 1, id: lastValue} );
    
    }
  */  
    console.log("end of addOpinion()...");

    this.inputEl.value = ''; // Reset the input value
    inputValue = this.inputEl.value;
    
  }