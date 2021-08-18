const router = require('express').Router()
const VaccineType = require('../models/VaccineType');
const Vaccine = require('../models/Vaccine');

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


module.exports = router;