const express = require('express');
const router = express.Router();

//get a list of ninajs
router.get('/stream', function(req, res) {
    res.send({ 'type': 'GET' });

});

//add a new ninjas to db
router.post('/stream', function(req, res) {
    console.log(req.body);
    res.send({ 'type': 'POST' });

});

//update new ninjas to db
router.put('/stream/:id', function(req, res) {
    res.send({ 'type': 'PUT' });

});

//delete a ninajs from db
router.delete('/stream/:id', function(req, res) {
    res.send({ 'type': 'DELETE' });

});


module.exports = router;