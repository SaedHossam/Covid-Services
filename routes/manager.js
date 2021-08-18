const router = require('express').Router()

const Category = require('../models/Category');
const sub = require('../models/SubCategory');
const Question = require('../models/Question')
const Quiz = require('../models/Quiz');
const UsersModel = require('../models/user');
const UserQuiz = require('../models/UserQuize');
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




router.get('/quizzes', function (req, res, next) {
    if (req.isAuthenticated() && userService.isManager(req.user)) {
        Quiz.find({}).populate(['category', 'subCategory']).exec(function(err, quizzes){
            res.render('manager/quizzes', {quizList : quizzes})
        });
    } else {
        res.sendStatus(403) // Forbidden
    }
})

// return addquiz page with all categories and sub categories from database
router.get('/addquiz', function (req, res, next) {
    if (req.isAuthenticated() && userService.isManager(req.user)) {
        Category.find({}).then(categories => {
            sub.find({}).then(subCategories => {
                res.render('manager/addquiz', { allCategories: categories, allSubCategories: subCategories });
            })
        });

    } else {
        res.sendStatus(403) // Forbidden
    }
})

router.post('/addquiz', function (req, res, next) {
    if (req.isAuthenticated() && userService.isManager(req.user)) {
        let quizName = req.body.name;
        let quizDesc = req.body.description;
        let quizCategoryId = req.body.category;
        let quizSubCatId = req.body.subCategory;
        var quizQuestions = [];
                for (let i = 0; i < 10; i++) {
                    var q = new Question({
                    statment : req.body.Statement[i],
                    type : req.body.type[i],
                    options : [
                        req.body.optionA[i],
                        req.body.optionB[i],
                        req.body.optionC[i],
                        req.body.optionD[i]
                    ],
                    answer : req.body.answer[i]
                    })
                    quizQuestions.push(q);
                }
        // create new quiz on database
        new Quiz({
            name: quizName,
            description : quizDesc,
            subCategory : quizSubCatId,
            category : quizCategoryId,
            questions : quizQuestions
        }).save(function(err, addedQuiz){
            UsersModel.find({role:"member"}).then(function(list){
                if(list.length > 0){
                    list.forEach(emp => {
                        new UserQuiz({
                            user: emp,
                            quiz : addedQuiz,
                            visiable: true,
                            solved: false
                        }).save().then(()=>{
                            // populate get all category data not only _id
                            // return to quizzes page with new list
                            Quiz.find({}).populate(['category', 'subCategory']).exec(function(err, quizzes){
                                res.render('manager/quizzes', {quizList : quizzes})
                            });
                        });   
                    });
                }
                else{
                    Quiz.find({}).populate(['category', 'subCategory']).exec(function(err, quizzes){
                        res.render('manager/quizzes', {quizList : quizzes})
                    });
                }
                
            });
            
        }); 
        
    } else {
        res.sendStatus(403) // Forbidden
    }
})

module.exports = router;