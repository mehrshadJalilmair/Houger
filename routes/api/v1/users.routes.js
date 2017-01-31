var express = require('express');
var multer = require('multer');
var router = express.Router();
var Zirdasti = require('../../../Zirdasti_module');
var storage =   multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + '../../../../public/images/avatars');
    },
    filename: function (req, file, callback) {
        var temp = file.originalname.split('.');
        var ex = '.' + temp[(temp.length - 1)];
        callback(null, file.fieldname + '-' + Date.now() + ex);
    }
});

var upload = multer({ storage: storage});
var cpUpload = upload.fields([{ name: 'avatar', maxCount: 1 }]);
router.post('/editProfile', Zirdasti.Functions.isLoggedIn, cpUpload, Zirdasti.Users.editProfile);

router.post('/editAccount', Zirdasti.Functions.isLoggedIn, Zirdasti.Users.editAccount);
router.post('/changePassword', Zirdasti.Functions.isLoggedIn, Zirdasti.Users.changePassword);
router.post('/editEmail-notifications', Zirdasti.Functions.isLoggedIn, Zirdasti.Users.editEmailNotifications);

router.post('/add', Zirdasti.Functions.isAdmin, cpUpload, Zirdasti.Users.add);
router.post('/edit/:_id', Zirdasti.Functions.isAdmin, cpUpload, Zirdasti.Users.edit);
router.post('/delete', Zirdasti.Functions.isAdmin, Zirdasti.Users.delete);



module.exports = router;