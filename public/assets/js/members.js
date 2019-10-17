
$(document).ready(function () {

  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function (data) {
    $(".member-name").text(data.email);
  });

  $("#searchGameBtn").on("click", function (event) {
    event.preventDefault();
    var dataObject = {
      name: $("#searchGame").val()
    }
    console.log(dataObject.name);

    $.ajax({
      url: "/api/games",
      type: "POST",
      data: dataObject
      }).then(function (data) {

      console.log(data);
      for (let i = 0; i < data.length; i++) {
        var p = $("<p>").attr("class", "searchedGames").text(data[i].name).attr("data-id", data[i].id).attr("data-platform", data[i].platform)
        b = $("<button>").attr("class", "btn btn-primary addGame").text("add").attr("data-id", data[i].id)
        $("#gamesSearched").append(p,b)

      }

    })

  })

  $(document).on("click", ".addGame", function () {
    console.log("DOES THIS DO SOMETHING??");


    var thisId = $(this).data("id")
    var searchedGame = $(".searchedGames[data-id='"+thisId+"']").text()
    var platform = $(".searchedGames").attr("data-platform")
    var GameId = $(this).attr("data-id")
    console.log(searchedGame);
    console.log(platform);
    console.log(GameId);
    
    var dataObject = {
      game: searchedGame,
      platform: platform,
      GameId: GameId

    }
    console.log(searchedGame + "===========");
    
    $.ajax({
      url: "/api/owneds",
      type: "POST",
      data: dataObject
    }).then(function (res) {
      console.log(res);
      // location.reload();
    })

  });

});
