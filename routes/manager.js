const router = require('express').Router()


const UsersModel = require('../models/user');

const VaccineType = require('../models/VaccineType');
const Vaccine = require('../models/Vaccine');

const userService = require('../services/userService')

// Static Pages ================================================================
router.get('/', function (req, res, next) {
    if (req.isAuthenticated() && userService.isManager(req.user)){
        res.render('manager/index')
    }
    else{
        res.sendStatus(403)
    }
})

// get Vaccines
router.get('/vaccine', function (req, res) {
    if (req.isAuthenticated() && userService.isManager(req.user)){
        Vaccine.find({Owner: req.user._id}).populate(['vaccineType']).exec((function(err, vaccines){
            res.render('manager/vaccine', {vaccines})
        }));
    }
    else{
        res.sendStatus(403)
    }
})

// add vaccine
router.get('/addvaccine', function (req, res) {
    if (req.isAuthenticated() && userService.isManager(req.user)){
        VaccineType.find({}).then(vaccineType => {
            res.render('manager/addvaccine', {vaccineType});
        });
        
    }
    else{
        res.sendStatus(403)
    }
})


router.post('/addvaccine', function (req, res) {
    if (req.isAuthenticated() && userService.isManager(req.user)){
        const userId = req.user._id;
        const vaccineType = req.body.vaccineType;
        const count = req.body.count;
        const expireDate = req.body.expireDate;
        let vaccine = new Vaccine({
            vaccineType,
            count,
            expireDate,
            Owner: userId
        }).save(function(err, addedVaccine){
            if(err) console.log(err)
            return res.redirect('vaccine')
        });
    }
    else{
        res.sendStatus(403)
    }
})

module.exports = router;