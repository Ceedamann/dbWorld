
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
    for (let i = 0; i < data.length; i++) {
      var p = $("<p>").text(data[i].name) 
      b = $("<button>").attr("class", "btn btn-primary").text("add").attr("data-id",data[i].id)
      p.append(b)
    $("#gamesSearched").append(p)
      
    }
    
    })
    
  })

  // $.get("/api/games").then(function(data){
  //   
  // })
});
