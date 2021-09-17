const e = require('express')
const express = require('express')
const router = express.Router()

// Clear any session data on start
router.get('/v7/', function (req, res) {
  req.session.data = {}
  res.redirect('/v7/start')
})


// Do you know your NHS number?
router.post('/v7/do-you-know-nhs-number', function (req, res) {

  let know = req.session.data['know-nhs']
  let nhsNumber = req.session.data['nhs-number']

  if (know == "Yes"){
    if (nhsNumber != "") {
      res.redirect('/v7/what-is-your-dob')
    } else {
      res.render('v7/do-you-know-nhs-number', {error: 1, noNhsNumber: 1})
    }
  }
  else {
    if (know == "No"){
      // reset NHS number value from any previous session
      req.session.data['nhs-number'] = ""
      res.redirect('/v7/what-is-your-name')
    } else {
      res.render('v7/do-you-know-nhs-number', {error: 1, noAnswer: 1})
    }
  }

})

// What is your name?
router.post('/v5/what-is-your-name', function (req, res) {

  let firstName = req.session.data['first-name']
  let lastName = req.session.data['last-name']

  if (firstName == ""){
    if (lastName == ""){
      res.render('v5/what-is-your-name', {error: 1, noFirstName: 1, noLastName: 1})
    } else {
      res.render('v5/what-is-your-name', {error: 1, noFirstName: 1})
    }
  } else {
    if (lastName == ""){
      res.render('v5/what-is-your-name', {error: 1, noLastName: 1})
    } else {
      res.redirect('/v5/what-is-your-dob')
    }
  }
})

// What is your date of birth?
router.post('/v5/what-is-your-dob', function (req, res) {

  let day = req.session.data['dob-day']
  let month = req.session.data['dob-month']
  let year = req.session.data['dob-year']

  if (day == ""){
    if (month == ""){
      if (year == ""){
        res.render('v5/what-is-your-dob', {error: 1, noDay: 1, noMonth: 1, noYear: 1})
      } else {
        res.render('v5/what-is-your-dob', {error: 1, noDay: 1, noMonth: 1})
      }
    } else {
      if (year == ""){
        res.render('v5/what-is-your-dob', {error: 1, noDay: 1, noYear: 1})
      } else {
        res.render('v5/what-is-your-dob', {error: 1, noDay: 1})
      }
    }
  } else {
    if (month == ""){
      if (year == ""){
        res.render('v5/what-is-your-dob', {error: 1, noMonth: 1, noYear: 1})
      } else {
        res.render('v5/what-is-your-dob', {error: 1, noMonth: 1})
      }
    } else {
      if (year == ""){
        res.render('v5/what-is-your-dob', {error: 1, noYear: 1})
      } else {

        // quick hack to check for under 16 - just checks the year so not accurate
        const dateRegex = /^(19|20)\d{2}$/

        if (!(dateRegex.test(year))) {
          // not a real date, just carry on
          res.redirect('/v5/what-is-your-email')
        } else {
          // is a valid date so do check
          let currentYear = new Date().getFullYear()
          let currentYearMinusSixteen = currentYear - 16

          if (year > currentYearMinusSixteen) {
            // less than sixteen
            res.render('v5/what-is-your-dob', {error: 1, lessThanSixteen: 1})
          } else {
            res.redirect('/v5/what-is-your-email')
          }
        }

      }
    }
  }

})

// What is your email?
router.post('/v5/what-is-your-email', function (req, res) {

  let email = req.session.data['email']

  if (email == ""){
    res.render('v5/what-is-your-email', {error: 1, noEmail: 1})
  } else {
    res.redirect('/v5/check-your-answers')
  }

})

// What date do you need this note to start from?
router.post('/v5/what-is-your-email', function (req, res) {

  let email = req.session.data['email']

  if (email == ""){
    res.render('v5/what-is-your-email', {error: 1, noEmail: 1})
  } else {
    res.redirect('/v5/check-your-answers')
  }

})

// Check your answers
router.post('/v5/check-your-answers', function (req, res) {

  // reset some session variables so doesn't remember previous data
  if (req.session.data['know-nhs'] == "No") {
    req.session.data['nhs-number'] = ""
  }
  if (req.session.data['another-language'] == "No") {
    req.session.data['language'] = ""
  }
  if (req.session.data['format'] !== "Not requested") {
    req.session.data['another-language'] = ""
    req.session.data['language'] = ""
  }

  res.render('v5/check-your-answers')
})


// How would you like to be contacted if your letter request is not successful?
router.post('/v5/how-would-you-like-to-be-contacted', function (req, res) {

  let contacted = req.session.data['contacted']

  if ((typeof contacted == "undefined") || (contacted == "")){
    res.render('v5/how-would-you-like-to-be-contacted', {error: 1, noContact: 1})
  } else {
    res.redirect('/v5/details-submitted')
  }
})

module.exports = router