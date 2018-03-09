
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Deck = require('./models/deck');
var cors = require('cors');
//added for deployment:
const path = require('path');

require('dotenv').config();

//configure bodyparser, grabs data from body of post
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//things added for deployment
app.use(express.static(path.join(__dirname, "client", "build")));



//set up port for server to listen on
var port = process.env.PORT || 5000;

//connet to DB
var dbConnection = process.env.MONGODB_URI || 'mongodb://localhost:27017/test_api_chrono';
mongoose.connect(dbConnection);

var router = express.Router();

//routes will all be prefixed with /api
app.use('/api', router);


//middleware
//middleware is useful for validations, we can log
//things from here or stop the request from continuing
//in the even that the request is not safe.
//middleware to use for all requests

router.use(function(req, res, next) {
	console.log("there is some processing currently happening");
	next();
});

//test route
router.get('/', function(req, res) {
	res.json({message: 'Welcome to our API!'});
});


//create new deck
router.route('/newdeck')
	.post(function(req, res) {
		Deck.count({}, function(err, count){
			if(count > 10) {
				return 'err'
			} else {
			var deck = new Deck(); //new instance of a vehicle
			deck.deckname = req.body.deckname;
			deck.author = req.body.author;
			deck.subject = req.body.subject;
			deck.cards = req.body.cards;


			deck.save(function(err){
				if(err){
					res.send(err);
				}
				res.json(deck);
			});
			console.log('deck added to db');
			console.log(count);
			}
		})
		
	});

//update cards array with new card
router.route('/:deck_id/cards')
	.put(function(req, res) {
		Deck.findById(req.params.deck_id, function(err, deck) {
			if(err) {
				res.send(err);
			} else {
				deck.cards.push({fact: req.body.fact, date: req.body.date});

			deck.save(function(err){
			if(err){
					res.send(err);
				}
				res.json({message: 'Card was sucessfully created and inserted'});
			});
		}
		})
	});

//get deck by deckname
router.route('/decks/deckname/:deckname')
	.get(function(req, res) {
		Deck.findOne({'deckname':req.params.deckname}, function(err, deck) {
			if(err) {
				res.send(err);
			}
			console.log(deck);
			res.json(deck);
		});
	});

//get all decks
router.route('/decks')
	.get(function(req, res) {
		Deck.find(function(err, deck) {
			if(err) {
				res.send(err);
			}
			res.json(deck);
		});
	});

//get deck by id
router.route('/decks/:deck_id')
	.get(function(req, res){
		Deck.findById(req.params.deck_id, function(err, deck) {
			if(err) {
				res.send(err);
			}
			res.json(deck);
		});
	});

router.route('/decks/author/:author')
	.get(function(req, res) {
		Deck.find({author:req.params.author}, function(err, deck) {
			if (err) {
				res.send(err);
			}
			res.json(deck);
		});
	});

router.route('/decks/subject/:subject')
	.get(function(req, res) {
		Deck.find({subject:req.params.subject}, function(err, deck) {
			if (err) {
				res.send(err);
			}
			res.json(deck);
		});
	});

router.route('/decks/:deck_id')
	.delete(function(req, res) {
		Deck.findById(req.params.deck_id, function(err, deck) {
			if (err) {
				res.send(err);
			}
			deck.remove(function(err, deck) {
				if(err) {
					res.send(err);
				}
				res.json(req.params.deck_id);
			})
		});
	});


//added for deployment
app.get("*", (req, res) => {  
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});


//sneaking suspicion this should be changed for deployment
app.listen(port);

console.log('server listening on port ' + port);
