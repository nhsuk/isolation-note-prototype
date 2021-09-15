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
  if (answer == "yes"){
    // If the answer is yes send to the next question
    res.redirect(`/${version}/screener-question-why`);
  }
  else {
    // If the answer is no send to the no screen 
    res.redirect(`/${version}/screener-question-no`);
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
  if (answer == "today"){
    // Send user to next page
    res.redirect(`/${version}/what-is-your-name`)
  }
  else {
    // Send user to enter a custom date page
    res.redirect(`/${version}/screener-question-date-no`)
  }

})


module.exports = router;

