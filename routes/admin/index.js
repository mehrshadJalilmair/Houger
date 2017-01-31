var express = require('express');
var router = express.Router();
var Houger = require('../../Houger_module');


router.get('/', /*Houger.Functions.isAdmin,*/
    function(req, res, next) {

        var content = {};
        content.title = "";
        content.flash = Houger.Functions.getFlash(req.session);
        // content.user = req.user.fullName;

        console.log(content);

        res.render('admin/pages/index', content);
    });


/* GET profile page. */
router.get('/profile', /*Houger.Functions.isAdmin,*/
    //Houger.Users.get,
    function(req, res, next) {
            var content = {} /* req.result.content */;
            content.title = "هوگر | مدیریت | پروفایل";
            // content.user = req.session.user.email;

            console.log(content);

            res.render('admin/pages/profile', content);
    });

/* GET changePassword page. */
router.get('/changePassword', function(req, res, next) {

        var content = {};
        content.title = "هوگر | مدیریت | تغییر کلمه عبور";
        // content.user = req.session.user.email;

        console.log(content);

        res.render('admin/pages/changePassword', content);
});

module.exports = router;
