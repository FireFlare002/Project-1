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




$("#login-icon").click(function () { formRedux();

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


     console.log(firebaseUser);


    } else {

        formRedux();


    }

});

//Ajax calls

// $.ajax({
//     url: 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients', // The URL to the API. You can get this in the API page of the API you intend to consume
//     type: 'GET', // The HTTP Method, can be GET POST PUT DELETE etc
//     data: {}, // Additional parameters here
//     dataType: 'json',
//     success: function(data) { console.dir((data.source)); },
//     error: function(err) { alert(err); },
//     beforeSend: function(xhr) {
//     xhr.setRequestHeader("X-Mashape-Authorization", "OeA9zYKXGCmshtbXfBTFYCxry6BWp1HRLTzjsn8QLMm8dbmC0H"); // Enter here your Mashape key
//     }
// });

function getRecipes(){
    var inputVal = document.getElementById('ingredientsInput').value;
    var upToIngredients = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?ingredients=';
    var maxNumMissing = document.getElementById('maxNumMissing').value;

    var afterIngredients = '&number=200&mashape-key=OeA9zYKXGCmshtbXfBTFYCxry6BWp1HRLTzjsn8QLMm8dbmC0H'

    var frigde = new XMLHttpRequest(); //note to self, swtich to normal js ajax call, throwing error
    frigde.open("GET", upToIngredients + inputVal + afterIngredients, false);
    frigde.send();

    var recipes = JSON.parse(frigde.response);

    function createHTML() {
        
        var recipeDiv = [];
        var title = [];
        var ingredientsMissing = [];
        var nameSpan = [];
        var ingredientsMissingSpan = [];
        var img = [];

        recipeContainer = document.createElement("div");
        recipeContainer.setAttribute("id", "recipeContainer");

        for (var i = 0; i < recipes.length; i++) {
            //Create a new div in each loop with an id of recipeDiv0, recipeDiv1... so you get a div for each recipe
            recipeDiv[i] = document.createElement("div");
            recipeDiv[i].setAttribute("id", "recipeDiv" + i);

            
            //Create span with id of nameSpan0, nameSpan1... to contain name of dish; and create and append the actual name of dish to said span
            nameSpan[i] = document.createElement("span");
            nameSpan[i].setAttribute("id", "nameSpan" + i);
            title[i] = document.createTextNode(recipes[i].title);
            nameSpan[i].appendChild(title[i]);



            //Create img tag with id of img0, im1... to contain image;
            img[i] = document.createElement("img");
            img[i].setAttribute("id", "img" + i);
            img[i].setAttribute("src", recipes[i].image);

            
            //Create span with id of ingredientsMissingSpan0, ingredientsMissingSpan1... to contain number of missing ingredients; and create and append textNode containing the actual number of missing ingredients to said span
            ingredientsMissingSpan[i] = document.createElement("span");
            ingredientsMissingSpan[i].setAttribute("id", "ingredientsMissingSpan" + i);
            ingredientsMissing[i] = document.createTextNode("Number of missing ingredients: " + recipes[i].missedIngredientCount);
            ingredientsMissingSpan[i].appendChild(ingredientsMissing[i]);


            if (maxNumMissing <= recipes[i].missedIngredientCount) {
                //Append title and number of missing ingredients spans to main div separated by a linebreak
                recipeDiv[i].appendChild(nameSpan[i]);
                recipeDiv[i].appendChild(img[i]);
                recipeDiv[i].appendChild(ingredientsMissingSpan[i])

                recipeContainer.appendChild(recipeDiv[i]);
            } else {

            }
        }

        document.body.appendChild(recipeContainer);

        console.log(recipes.length)

    }

    createHTML();

}

