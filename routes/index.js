var express = require('express');
var router = express.Router();
var app = express();
var path = require("path");
var request = require("request");

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/routes')));

var mysql = require('mysql');
var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "xie1996129",
	database: "test"
});

router.post('/note', function (req, res) {
	const res_data = req.body;
	const event = res_data.event;
	const note = res_data.note;

	con.query("SELECT * FROM wdc where eventname=?", event, function (err, result) {

		if (result && result[0]) {
			// update
			console.log(`record found : ${result}, update ...`);
			con.query("update wdc set eventnote=? where eventname=?", [note, event], function (err, result) {
				console.log("record updated");
			});
		} else {
			// insert
			console.log("record not found, insert new");
			con.query("INSERT INTO wdc (eventname, eventnote) VALUES (?,?)", [event, note], function (err, result) {
				console.log("record inserted");
			});
		}
	});
	res.send("OK");

});

router.post('/token', function (req, res) {
	console.log("********* token received.");
	const data = req.body;
	const idtoken = data.idtoken;
	console.log("tokenid received:--------------------------- " + idtoken);
	request("https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=" + idtoken, function (error, response, body) {
		console.log(body);

	});
});

router.get('/note/:sb', function (req, res) {
	const event = req.params.sb;
	console.log("event: " + event);
	var storedNote = "";

	con.query("SELECT eventnote FROM wdc where eventname=?", event, function (err, result) {
		if (result && result[0]) {
			storedNote = result[0].eventnote;
		}
		res.json({ note: storedNote });
	});
});


/* GET home page. */
router.get('/', function (req, res) {
	res.sendFile('openpage.html', { root: path.join(__dirname, '../public') });
});




module.exports = router;
