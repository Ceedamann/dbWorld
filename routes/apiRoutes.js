// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");
var Sequelize = require("sequelize");
var Op = Sequelize.Op;
require("dotenv").config();
var axios = require("axios");


module.exports = function (app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    res.json(req.user);
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function (req, res) {
    db.User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    })
      .then(function () {
        res.redirect(307, "/api/login");
      })
      .catch(function (err) {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        name: req.user.name,
        email: req.user.email,
        id: req.user.id
      });
      
    }
  });
  
  app.post("/api/game/:cover", function (req, res){
    var input = req.params.cover
    axios({
      url: "https://api-v3.igdb.com/search",
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'user-key': process.env.API_KEY
      },
      data: `'fields *; search \"${input}\"; limit 2;'`
    })
      .then(response => {
          // console.log(response.data);
          var id = response.data[1].game;
          axios({
            url: "https://api-v3.igdb.com/covers",
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'user-key': process.env.API_KEY
            },
            data: `'fields alpha_channel,animated,game,height,image_id,url,width; where game = ${id};'`
          })
            .then(response => {
                // console.log(response.data[0].url);
                var resu = response.data[0].url;
                return res.json({
                  url: resu
                });
            })
            .catch(err => {
                console.error(err);
            });
      })
      .catch(err => {
          console.error(err);
      });
    
      
  })

  app.post("/api/owned_games", function (req, res) {

    db.Owned.findAll({
        where: {
          userId: req.user.id
        }
    }).then(function (data) {
      return res.json(data);
    }).catch(function (error) {
      console.log(error);
    });

  });

  app.post("/api/games", function (req, res) {

    db.Game.findAll({
      limit: 10,
      where: {
        name: {
          [Op.like]: '%' + req.body.name + '%'
        }
      }
    }).then(function (data) {
      return res.json(data);
    }).catch(function (error) {
      console.log(error);
    });
  });

  app.post("/api/owneds", function (req, res) {
        console.log(req.body);
        

    db.Owned.create({
      game: req.body.game,
      platform: req.body.platform,
      UserId: req.user.id,
      GameId: req.body.GameId
    }).then(function (data) {
      return res.json(data);
    }).catch(function (error) {
      console.log(error);
    });
  });

  app.post("/api/trades", function (req, res) {
        console.log(req.body);
        

    db.Owned.findAll({
        where: {
          game: {
            [Op.like]: '%' + req.body.game + '%'
          }
        },
        include: [db.User]
    }).then(function (data) {
      console.log(data);
      
      return res.json(data);
    }).catch(function (error) {
      console.log(error);
    });
  });

  app.delete("/api/owneds_delete/:id", function(req, res) {
    // Delete the Author with the id available to us in req.params.id
    db.Owned.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(data) {
      res.json(data);
    });
  });


};
