/**
 * User Controller
 */

var Users = require('mongoose').model('User');

var Functions = require('../functions.js');

module.exports = {

    getSpecial : function (req, res, next) {

        Users
            .findOne({_id: req.params._id})
            .where('deleted', false)
            .exec(function (err, user) {
                if (err) {
                    console.error(err);
                    Functions.setFlash(req.session, "error", "errorPage", "خطا در سرور..." + "/n/n" + err , {});
                    return res.redirect('/error');
                }

                if (!user) {
                    // if no user find
                    console.log('No user found!');
                    Functions.setResult(req, 200, 'No user found!', "specialUser", {});
                    return next();

                } else {

                    console.log('Done! User Returned.');
                    Functions.setResult(req, 200, 'Done! User Returned.', "specialUser", user);
                    return next();
                }
            });
    },

    get : function (req, res, next) {
        var currentUser = req.user;
        var userList = [];

        Users
            .find()
            .where('deleted', false)
            .exec(function (err, users) {
                if (err) {
                    console.error(err);
                    return res.json({ status: 500, message: 'Failed. Something bad happened./n/n' + err, content: {} });
                }

                if (Functions.isEmptyObject(users)) {
                    // if no user find
                    console.log('No user found!');
                    Functions.setResult(req, 400, 'No user found!', "users", []);
                    return next();

                } else {

                    users.forEach(function (user) {
                        if(currentUser._id.toString() != user._id.toString()) {
                            userList.push(user);   //Todo: push what be needed
                        }
                    });

                    console.log('Done! user List Returned.');
                    Functions.setResult(req, 200, 'Done! unit List Returned.', "users", userList);
                    return next();
                }
            });
    },

    add : function (req, res, next) {

        if (Functions.isEmpty(req.body.firstname) ||
            Functions.isEmpty(req.body.lastname) ||
            Functions.isEmpty(req.body.email) ||
            Functions.isEmpty(req.body.password) ||
            Functions.isEmpty(req.body.role)
        ) {
            console.log('Complete All Field!');
            Functions.setFlash(req.session, "error", "خطا! ", 'همه موارد را پر کنید.', {});
            return res.redirect('/admin/users/add');
        }

        if(req.files.avatar) {
            if(req.files.avatar[0].mimetype.indexOf("image") == -1) {
                console.log("File is Not image!!");
                Functions.setFlash(req.session, "error", "خطا!", 'فایل انتخاب شده "تصویر" نیست');
                return res.redirect('/admin/users/add');
            }
        }

        Users
            .findOne({ 'local.email': req.body.email })
            .where('deleted', false)
            .exec(function (err, user) {
                if (err) {
                    console.error(err);
                    Functions.setFlash(req.session, "error", "errorPage", "خطا در سرور..." + "/n/n" + err , {});
                    return res.redirect('/error');
                }

                if (user) {
                    console.log('Username Already Exists.');
                    Functions.setFlash(req.session, "error", "خطا! ", 'کاربر قبلا ثبت نام کرده است.', {});
                    return res.redirect('/admin/users/add');
                }

                var newUser = new Users({
                    'profile.firstname': req.body.firstname,
                    'profile.lastname': req.body.lastname,
                    name: req.body.firstname + ' ' + req.body.lastname,
                    password: req.body.password,
                    role: req.body.role,
                    email: req.body.email
                });

                if(req.files.avatar) {
                    var avatar = '/images/avatars/' + req.files.avatar[0].filename;
                    newUser.profile.avatar = avatar;
                }

                if (req.body.premium == 'on') { newUser.premium = true; }

                newUser.save(function (err, user) {
                    if (err) {
                        console.error(err);
                        Functions.setFlash(req.session, "error", "errorPage", "خطا در سرور..." + "/n/n" + err , {});
                        return res.redirect('/error');
                    }

                    console.log('New user added successfully.');
                    Functions.setFlash(req.session, "success", "", 'کاربر جدید اضافه شد.', {});
                    return res.redirect('/admin/users/add');

                });

            });
    },

    edit : function (req, res, next) {

        if (Functions.isEmpty(req.body.firstname) ||
            Functions.isEmpty(req.body.lastname) ||
            Functions.isEmpty(req.body.email) ||
            Functions.isEmpty(req.body.role)
        ) {
            console.log('Complete All Field!');
            Functions.setFlash(req.session, "error", "خطا! ", 'همه موارد را پر کنید.', {});
            return res.redirect('/admin/users/edit' + req.params._id);
        }

        if(req.files.avatar) {
            if(req.files.avatar[0].mimetype.indexOf("image") == -1) {
                console.log("File is Not image!!");
                Functions.setFlash(req.session, "error", "خطا!", 'فایل انتخاب شده "تصویر" نیست');
                return res.redirect('/admin/users/edit' + req.params._id);
            }
        }



        Users.findOneAndUpdate({_id: req.params._id, deleted: false}, {
            'profile.firstname': req.body.firstname,
            'profile.lastname': req.body.lastname,
            role: req.body.role
        }, function (err, user) {
            if (err) {
                console.error(err);
                Functions.setFlash(req.session, "error", "errorPage", "خطا در سرور..." + "/n/n" + err , {});
                return res.redirect('/error');
            }

            if (!user) {
                // if no user find
                console.log('Delete user failed. User not found.');
                Functions.setFlash(req.session, "error", "خطا! ", 'کاربر مورد نظر یافت نشد.', {});
                return res.redirect('/admin/users');

            } else {

                if(req.files.avatar) {
                    var avatar = '/images/avatars/' + req.files.avatar[0].filename;
                    user.profile.avatar = avatar;
                }

                if (req.body.premium == 'on') { user.premium = true; }
                if (user.local) {
                    user.local.email = req.body.email;
                    user.local.name = req.body.firstname + ' ' + req.body.lastname;
                }

                user.save();

                console.log('User Edited!');
                Functions.setFlash(req.session, "success", "", 'کاربر مورد نظر ویرایش شد.', {});
                return res.redirect('/admin/users');

            }
        });
    },

    delete : function (req, res, next) {
        var currentUser = req.user;

        if(currentUser._id === req.body._id) {
            console.log('You are deleting yourself!!!');
            Functions.setFlash(req.session, "error", "خطا! ", 'شما میخواهید خود را حذف کنید!', {});
            return res.redirect('/admin/users');
        }

        Users.findOneAndUpdate({ _id: req.body._id, deleted: false }, {
            deleted: true
        }, function (err, user) {
            if (err) {
                console.error(err);
                Functions.setFlash(req.session, "error", "errorPage", 'خطای نا شناخته...' + '/n/n' + err, {});
                return res.redirect('/error');
            }

            if (!user) {
                // if no user find
                console.log('Delete user failed. User not found.');
                Functions.setFlash(req.session, "error", "خطا! ", 'کاربر مورد نظر یافت نشد.', {});
                return res.redirect('/admin/users');

            } else {

                console.log('User Deleted!');
                Functions.setFlash(req.session, "success", "", 'کاربر مورد نظر حذف شد.', {});
                return res.redirect('/admin/users');
            }
        });
    },

    changePassword : function (req, res, next) {
        var currentUser = req.user;

        if (Functions.isEmpty(currentUser.local.password)) {
            Functions.setFlash(req.session, "error", "خطا!", "شما با گوگل وارد شده اید");
            return res.redirect('/settings/changePassword');
        } else if (currentUser.authenticate(req.body.oldPassword)) {

            currentUser.password = req.body.newPassword;

            currentUser.save(function (err, user) {
                if (err) {
                    Functions.setFlash(req.session, "error", "خطا!", err);
                    return res.redirect('/error');
                }

                Functions.setFlash(req.session, "success", "اطلاعات پروفایل بروزرسانی شد", err);
                res.redirect('/settings/changePassword');
            });

        } else {
            Functions.setFlash(req.session, "error", "خطا!", "کلمه عبور فعلی را نادرست وارد کرده اید");
            return res.redirect('/settings/changePassword');
        }
    }
};