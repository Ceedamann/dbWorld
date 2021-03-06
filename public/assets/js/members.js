$(document).ready(function () {


  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function (data) {
    $(".member-name").text(data.name);

  });

  $.post("/api/owned_games").then(function (data) {
    console.log(data);
    for (let i = 0; i < data.length; i++) {

      var game = data[i].game;

      axiosCall(function (data3) {
        var id = data[i].id;
        var game = data[i].game;
        var platform = data[i].platform;
        console.log(data3 + "========clear");
        var div = `<div class="col" attr="${id}"><img src="https:${data3}" class="gameImg"><p attr="${id}" class="gamesOwned">${game} <span class="platform">Platform: ${platform}</span><button class="btn btn-white btn-sm deleteGame" data-id="${id}"><i class="fas fa-backspace deleteBtn"></i></button></p></div>`;
        $("#ownedGames").append(div)
      }, game)
    }

  });

  $(document).on("click", ".deleteGame", function (e) {
    e.preventDefault();
    var thisId = $(this).data("id")
    $.ajax({
      method: "DELETE",
      url: "/api/owneds_delete/" + thisId
    }).then(function () {
      location.reload();
    })
  })

  $(".refreshBtn").on("click", function (e) {
    e.preventDefault();
    location.reload();
  })

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

        var name = data[i].name;

        axiosCall(function (data3) {
          var id = data[i].id;
          var name = data[i].name;
          var platform = data[i].platform;
          console.log(data3 + "========clear");
          var div = `<div class="searchedDiv col" data-id="${id}"><img src="https:${data3}" class="gameImg"><p data-id="${id}" class="gamesOwned"><span class="searchedGames" data-id="${id}">${name}</span> <span class="platform" data-platform="${platform}">Platform: ${platform}</span><button class="btn btn-white btn-sm addGame" data-id="${id}"><i class="fas fa-plus-square addBtn"></i></button></p></div>`;
          $("#gamesSearched").append(div)
        }, name)
      }

    })

  })

  $(document).on("click", ".addGame", function (e) {
    console.log("DOES THIS DO SOMETHING??");
    e.preventDefault();

    var thisId = $(this).data("id")
    var searchedGame = $(".searchedGames[data-id='" + thisId + "']").text()
    var platform = $(".platform").attr("data-platform")
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
    // console.log(dataObject);

    $.ajax({
      url: "/api/trades",
      type: "POST",
      data: dataObject
    }).then(function (data) {

      // console.log(data);
      for (let i = 0; i < data.length; i++) {

        var game = data[i].game;

        axiosCall(function (data3) {
          console.log(data3 + "========clear");
          var id = data[i].id;
          var game = data[i].game;
          var platform = data[i].platform;
          var name = data[i].User.name;
          var email = data[i].User.email;
          var div = `<div class="col"><img src="https:${data3}" class="gameImg"><p class="searchedGamesTrade" data-id="${id}"><span class="gamesOwned">${game}</span> <span class="platform">Platform: ${platform}</span> Name: ${name} Contact: <a href="mailto:${email}">Email</a></p></div>`;
          $("#gamesSearchedTrade").append(div)
        }, game)
      }
    })
  })

  function axiosCall(func, input) {
    $.ajax({
      type: "POST",
      url: "/api/game/" + input
    }).then(function (data2) {
      var data3 = data2.resu[0].url;
      func(data3);
      // console.log(data3);

    })
  }





});
