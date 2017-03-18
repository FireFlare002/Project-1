var config = {
    apiKey: "AIzaSyD2O0mFIFPWg0ujWbqwyk20dbpnHA77-Pc",
    authDomain: "my-virtual-fridge.firebaseapp.com",
    databaseURL: "https://my-virtual-fridge.firebaseio.com",
    storageBucket: "my-virtual-fridge.appspot.com",
    messagingSenderId: "639848607205"
};

firebase.initializeApp(config);
var database = firebase.database();
var firstArray = [];

$(document).on("click"  , ".delete" , function (snapshot) {
var selectedItem = $(this).attr('data-buttons');
database.ref().orderByChild("Input").equalTo(selectedItem).once('value', function(snapshot){
        snapshot.forEach(function(data) {
        database.ref(data.key).remove();
  });
});

});

$("#clear-button").on("click" , function () {

$("#flex-box").remove();

 database.ref().remove();

  });

database.ref().on("child_added", function(snapshot) {
    firstArray.push(snapshot.val().Input);
    $("#flex-box").empty();
    for (i = 0; i < firstArray.length; i++) {
        var container = $('<div class="button-item">');
        container.addClass(firstArray[i]);
        var items = $('<div class="item">');
        items.text(firstArray[i]);
        var del = $('<p class="delete">' + "X" + '</p>');
        del.attr('data-buttons', firstArray[i]);
        container.append(del);
        container.append(items);

        $("#flex-box").prepend(container);
    }



    $('.button-item').on('click', function(event) {
        $(this).toggleClass('button-item-selected');
    });
    $(document).on("click", ".delete", function() {
        var itemID = $(this).attr('data-buttons');
        $("." + itemID).empty();
    });
});

$("#mainInput").on(function(e) {
    if (e.keyCode === 13) {
        e.preventDefault();
        var input = $("#mainInput").val().trim();
        $("#mainInput").val("");
        database.ref().push({
            Input: input,
        });
    }
});

$("#add-button").on("click", function() {
    event.preventDefault();
    if ($("#mainInput").val() != "") {
        var input = $("#mainInput").val().trim();
        $("#mainInput").val("");
        database.ref().push({
            Input: input,

        });
    } else {

        $(document.body).append("<div class='shadow' id='shadow' style='position:fixed;left:0px;top:0px;width:100%; height:100%; background:gainsboro; opacity: 0.4;'></div>");
        $(".windows-popup").show(100);
        $("#pop-button").on("click", function() {
            $(".windows-popup").hide();
            $("#shadow").remove();
        });
    }
});

$("#login-icon").click(function () { 
    firebase.auth().onAuthStateChanged(firebaseUser => {
     if (firebaseUser) {
     console.log("Your not allowed in (you're already logged in)!");
    } 
    else {
    formRedux();
}
});

});

function formRedux() {
    $(document.body).append("<div id='shadow' class='shadow' style='position:fixed;left:0px;top:0px;width:100%; height:100%; background:gainsboro; opacity: 0.4;'></div>");

    $("#popupContact").show(100);
    //Login Users 
    const auth = firebase.auth()
    $("#submit-signUp").click(
        function() {
            var email = $("#email-input").val();
            var pass = $('input:password').val();
            const promise = auth.createUserWithEmailAndPassword(email, pass).then(function() {
                 if  ( window.console) {
                        $(".shadow").remove();
                        $("#popupContact").hide();
                        $("#email-input").val("");
                        $('input:password').val("");
                      }     

                    });
        });

    $("#submit-login").click(
        function() {
            var email = $("#email-input").val();
            const pass = $('input:password').val();
            const promise = auth.signInWithEmailAndPassword(email, pass).then(function (firebaseUser) {       
              if (window.console ) {
                // promise.catch(e => console.log(e.message));
                $("#shadow").remove();
                $("#popupContact").hide();
                $("#email-input").val("");
                $('input:password').val("");
              }
              else {
                $('<div class="alert"> There seems to be a problem </div>')
              }
            });
        });

    $("#submit-logout").on("click", function() {
        auth.signOut().then(function() {
            $("#shadow").remove();
            $("#popupContact").hide();
            $("#email-input").val("");
            $('input:password').val("");
             window.close();
              $(document.body).append("<div id='shadow' class='shadow' style='position:fixed;left:0px;top:0px;width:100%; height:100%; background:gainsboro; opacity: 0.4;'></div>");
          
        });


    });


};

firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
     // console.log(firebaseUser);
    } else {
        formRedux();
    }

});

//stringify the ingredients array(getting [])
// var ingredients = JSON.stringify(firstArray);
// document.getElementById("demo").innerHTML = ingredients;
// console.log(ingredients)

//stringify using test array for functionality
var testarray = ["eggs", "milk", "butter"];
var ingredients = JSON.stringify(testarray);
//document.getElementById("demo").innerHTML = ingredients;//test display
// console.log(ingredients)
// console.log(testarray)

function doIt() { 
 var output = $.ajax({
    url: 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients' + testarray, // The URL to the API. 
    type: 'GET', // The HTTP Method, can be GET POST PUT DELETE etc
    data: {}, // Additional parameters here
    dataType: 'json',
    success: function(data) {
        //
        //Change data.source to data.something , where something is whichever part of the object you want returned.
        //To see the whole object you can output it to your browser console using:
        //console.log(data);
        console.log(data);
        document.getElementById("demo").innerHTML = data.source; 
        },
    error: function(err) { alert(err); },
    beforeSend: function(xhr) {
    xhr.setRequestHeader("X-Mashape-Authorization", "OeA9zYKXGCmshtbXfBTFYCxry6BWp1HRLTzjsn8QLMm8dbmC0H"); // Enter here your Mashape key
    }
})
};