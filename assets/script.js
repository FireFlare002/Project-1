var config = {
    apiKey: "AIzaSyD2O0mFIFPWg0ujWbqwyk20dbpnHA77-Pc",
    authDomain: "my-virtual-fridge.firebaseapp.com",
    databaseURL: "https://my-virtual-fridge.firebaseio.com",
    storageBucket: "my-virtual-fridge.appspot.com",
    messagingSenderId: "639848607205"
  };

  firebase.initializeApp(config);

var database = firebase.database();

var firstArray =[];



database.ref().on("child_added", function(snapshot) {

  
  firstArray.push(snapshot.val().Input);

  console.log(firstArray);

  $("#flex-box").empty();

   for (i=0 ; i < firstArray.length ; i++) {

    var container =$('<div class="button-item">');
    var items = $('<div>');
    items.attr( 'data-buttons' , firstArray[i]);
    items.text(firstArray[i]);
    var del = $('<p class="delete">' + "X" + '</p>');
    container.append(del);
    container.append(items);

    

  $("#flex-box").prepend(container);
  
  }

  

});




$("#add-button").on("click" , function() {

event.preventDefault();

var input = $(".form-control").val();

$(".form-control").val("");

database.ref().push({


Input: input,



}); 





});

