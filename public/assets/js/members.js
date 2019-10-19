
$(document).ready(function () {

  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function (data) {
    $(".member-name").text(data.name);
  });

  $.post("/api/owned_games").then(function (data) {
    console.log(data);

    for (let i = 0; i < data.length; i++) {
      var id = data[i].id;
      var game = data[i].game;
      var platform = data[i].platform;
      var div = `<div attr="${id}"><p attr="${id}" class="gamesOwned">Game: ${game} <span class="platform">Platform: ${platform}</span></p></div>`;
      $("#ownedGames").append(div)
    }
  });

  $("#searchGameBtn").on("click", function (event) {
    event.preventDefault();
    $('#gamesSearched').empty();
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
        // var id = data[i].id;
        // var name = data[i].name;
        // var platform = data[i].platform;
        // var div = `<div attr="${id}" class="searchedDiv"><p attr="${id}" class="gamesOwned searchedGames" data-platform="${platform}">Game: ${name} <span class="platform">Platform: ${platform}</span></p><button class="btn btn-primary btn-sm addGame" data-id="${id}">Add</button></div>`;
        var div = $("<div>").attr("class", "searchedDiv").attr("data-id", data[i].id);
        var p = $("<p>").attr("class", "searchedGames gamesOwned").text(data[i].name + " Platform: " + data[i].platform).attr("data-id", data[i].id).attr("data-platform", data[i].platform)
        b = $("<button>").attr("class", "btn btn-primary addGame").text("add").attr("data-id", data[i].id)
        div.append(p, b)
        $("#gamesSearched").append(div)

      }

    })

  })

  $(document).on("click", ".addGame", function (e) {
    console.log("DOES THIS DO SOMETHING??");
    e.preventDefault();

    var thisId = $(this).data("id")
    var searchedGame = $(".searchedGames[data-id='" + thisId + "']").text()
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
      // $('#gamesSearched').empty();
      // location.reload();
    })


    $(".searchedDiv[data-id='" + thisId + "']").empty()
  });

  $("#searchGameTradeBtn").on("click", function (event) {
    event.preventDefault();
    $("#gamesSearchedTrade").empty();
    var dataObject = {
      game: $("#searchGameTrade").val()
    }
    console.log(dataObject);

    $.ajax({
      url: "/api/trades",
      type: "POST",
      data: dataObject
    }).then(function (data) {

      console.log(data);
      for (let i = 0; i < data.length; i++) {
        var p = $("<p>").attr("class", "searchedGamesTrade").text(data[i].game + " Platform: " + data[i].platform + " Name: " + data[i].User.name + " Contact: " + data[i].User.email).attr("data-id", data[i].id)
        $("#gamesSearchedTrade").append(p)

      }

    })

  })


});
