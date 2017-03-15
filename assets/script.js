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

  $("#flex-box").empty();

   for (i=0 ; i < firstArray.length ; i++) {

    var container =$('<div class="button-item">');
    container.addClass(firstArray[i]);
    var items = $('<div class="item">');
    items.text(firstArray[i]);
    var del = $('<p class="delete">' + "X" + '</p>');
    del.attr( 'data-buttons' , firstArray[i]);
    container.append(del);
    container.append(items);


  $("#flex-box").prepend(container);
  
  }


 $(document).on("click" , ".delete" , function () {

  var itemID = $(this).attr('data-buttons');  

 $("." +itemID).empty();

 var removedItem = database.ref().child(input);

 removedItem.remove();

                            
 });  


});



$("#mainInput").on(function (e){

if(e.keyCode === 13) {

e.preventDefault();


var input = $("#mainInput").val().trim();

$("#mainInput").val("");


database.ref().push({


Input: input,



});


}
        
});




$("#add-button").on("click" , function() {

event.preventDefault();

if ($("#mainInput").val() !=  ""   ) {

var input = $("#mainInput").val().trim();

$("#mainInput").val("");


database.ref().push({

Input: input,

});

}

else {


$(document.body).append("<div id='shadow' style='position:fixed;left:0px;top:0px;width:100%; height:100%; background:gainsboro; opacity: 0.4;'></div>")

$(".windows-popup").show(100);

$("#pop-button").on("click" , function () {

$("#shadow").hide()
$(".windows-popup").hide();  

});

}


});


//Ajax calls

 $.ajax({
     url: 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients', // The URL to the API. You can get this in the API page of the API you intend to consume
     type: 'GET', // The HTTP Method, can be GET POST PUT DELETE etc
     data: {}, // Additional parameters here
     dataType: 'json',
     success: function(data) { console.dir((data.source)); },
     error: function(err) { alert(err); },
     beforeSend: function(xhr) {
     xhr.setRequestHeader("X-Mashape-Authorization", "OeA9zYKXGCmshtbXfBTFYCxry6BWp1HRLTzjsn8QLMm8dbmC0H"); // Enter here your Mashape key
     }
 });

