// External dependencies
const express = require('express');
const router = express.Router();

// Add your routes here - above the module.exports line

// First screener page routing
router.post('/*/screener-question/answer', function (req, res) {
  // Set a variable to the answer
  var answer = req.session.data['self-isolate']
  // Set prototype version
  var version = req.params[0];

  // Check whether the answer is yes
  if (answer == "Yes") {
    // If the answer is yes send to the next question
    res.redirect(`/${version}/screener-question-why`);
  } else {
    if (answer == "No"){
      // If the answer is no send to the no screen 
      res.redirect(`/${version}/screener-question-no`);
    }
    else {
      res.render(`${version}/screener-question`, {error: 1, noAnswer: 1})
    }
  }
})

// Why screener page routing
router.post('/*/screener-question-why/answer', function (req, res) {
  // Set a variable to the answer
  var answer = req.session.data['isolation-why'];
  // Set prototype version
  var version = req.params[0];

  if (answer == "I am at higher risk from coronavirus"){
    res.redirect(`/${version}/screener-question-why-no`)
  }
  else {
    res.redirect(`/${version}/screener-question-date`)
  }

})

// Date screener page routing
router.post('/*/screener-question-date/answer', function (req, res) {
  // Set a variable to the answer
  var answer = req.session.data['self-isolate-date'];
  // Set prototype version
  var version = req.params[0];

  // Check whether the answer is yes
  if (answer == "today") {
    // Send user to next page
    res.redirect(`/${version}/what-is-your-name`)
  } else {
    if (answer == "last-2-weeks"){
    // Send user to enter a custom date page
    res.redirect(`/${version}/screener-question-date-no`)
    }
    else {
      res.render(`${version}/screener-question-date`, {error: 1, noDate: 1})
    }
  }
})

// Date screener page routing
router.post('/*/screener-question-date/answer', function (req, res) {
  // Set a variable to the answer
  var answer = req.session.data['self-isolate-date'];
  // Set prototype version
  var version = req.params[0];

  // Check whether the answer is yes
  if (answer == "today") {
    // Send user to next page
    res.redirect(`/${version}/what-is-your-name`)
  } else {
    if (answer == "last-2-weeks"){
    // Send user to enter a custom date page
    res.redirect(`/${version}/screener-question-date-no`)
    }
    else {
      res.render(`${version}/screener-question-date`, {error: 1, noDate: 1})
    }
  }
})

router.post('/*/screener-question-date-no', function (req, res) {
  // Set a variable to the answer
  var day = req.session.data['isolation-day'];
  var month = req.session.data['isolation-month'];
  var year = req.session.data['isolation-year'];
  // Set prototype version
  var version = req.params[0];

  // Check whether the answer is yes
  if (day == "") {
    res.render(`${version}/screener-question-date-no`, {error: 1, noIsolationDay: 1})
  } else if (month == "") {
    res.render(`${version}/screener-question-date-no`, {error: 1, noIsolationMonth: 1})
  } else if (year == "") {
    res.render(`${version}/screener-question-date-no`, {error: 1, noIsolationYear: 1})
  } else {
    res.redirect(`/${version}/what-is-your-name`)
  }
})

// Version 5 routing
const routesV5 = require('./views/v5/_routes');
router.use('/', routesV5);

module.exports = router;

