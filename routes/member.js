const router = require('express').Router()
const VaccineType = require('../models/VaccineType');
const Vaccine = require('../models/Vaccine');
const UserQuiz = require('../models/UserQuize');
const userService = require('../services/userService');

router.get('/', function (req, res, next) {
  if (req.isAuthenticated() && userService.isMember(req.user)) {
    res.render('member/index')
  }
  else {
    res.sendStatus(403);
  }

});

// get Vaccine List
router.get('/vaccines', function (req, res) {
  if (req.isAuthenticated() && userService.isMember(req.user)) {
    Vaccine.find({}).populate(['vaccineType', 'Owner']).exec((function (err, vaccines) {
      VaccineType.find({}).then(vaccineType => {
        res.render('member/vaccines', { vaccines, vaccineType })
    });
    }));
  }
  else {
    res.sendStatus(403);
  }
});


// get all quizzes from userQuiz
router.get('/quizzes', function (req, res, next) {
  if (req.isAuthenticated() && userService.isMember(req.user)) {
    UserQuiz.find({}).populate({
      path: 'quiz',
      populate: {
        path: 'category'
      }
    }).populate({
      path: 'quiz',
      populate: {
        path: 'subCategory'
      }
    }).exec(function (err, quizzes) {

      res.render('member/quizzes', { quizList: quizzes })
    });
  } else {
    res.sendStatus(403);
  }
});

module.exports = router;