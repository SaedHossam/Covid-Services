const router = require('express').Router()
const passport = require('passport');
const userService = require('../services/userService')

//  Signup ====================================================================
router.get('/signup', function (req, res) {
	res.render('signup');
});

router.post('/signup', passport.authenticate('local-signup', {
	failureRedirect: '/auth/signup',
	failureFlash: false // allow flash messages
}), function (req, res, next) {
	// TODO: redirect to /manager or /member
	if (userService.isMember(req.user)) return res.redirect('/member/')
	if (userService.isManager(req.user)) return res.redirect('/manager/')
	return res.redirect('/')
});

// Login ====================================================================
router.get('/login', function (req, res, next) {
	// if user logged in
	if (req.user) {
		if (userService.isMember(req.user)) return res.redirect('/member/')
		if (userService.isManager(req.user)) return res.redirect('/manager/')
	} else {
		res.render('login')
	}
})

router.post('/login', passport.authenticate('local-login', {
	failureRedirect: '/auth/login',
	failureFlash: false // allow flash messages
}), function (req, res, next) {
	if (userService.isMember(req.user)) {
		res.redirect('/member/')
	}
	else if (userService.isManager(req.user)) {
		res.redirect('/manager/')
	}
	else res.redirect('/')
});
// LOGOUT ==============================
router.get('/logout', function (req, res, next) {
	req.logout();
	res.redirect('/');
});




module.exports = router;