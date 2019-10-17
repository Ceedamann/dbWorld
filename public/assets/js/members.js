
$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function(data) {
    $(".member-name").text(data.email);
  });

  $("#searchGameBtn").on("click", function (event){
    event.preventDefault();
    var dataObject = {
      name: $("#searchGame").val()
    }
    console.log(dataObject.name);
    
    $.ajax({
      url: "/api/games",
      type: "POST",
      data: dataObject
    }).then(function(data){

    console.log(data);
    var p = $("<p>").text(data[0].name)
    $("#gamesSearched").append(p)
    })
    
  })

  // $.get("/api/games").then(function(data){
  //   
  // })
});
