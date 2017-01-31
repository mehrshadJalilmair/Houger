$(document).ready(function() {

    var IP = "http://localhost";
    var PORT = ":3000/";

    var AddUserURL = "api/v1/users";

    $("#addUser").on("submit", function () {
        if ($("#phone").val() == '') {
            $("#phone").addClass("animated shake");
            $("#phone").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                $("#phone").removeClass("animated shake");
            });
            return false;
        }
        if ($("#email").val() == '') {
            $("#email").addClass("animated shake");
            $("#email").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                $("#email").removeClass("animated shake");
            });
            return false;
        }
        if ($("#password").val() == '') {
            $("#password").addClass("animated shake");
            $("#password").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                $("#password").removeClass("animated shake");
            });
            return false;
        }
        if ($("#password_repeat").val() == '') {
            $("#password_repeat").addClass("animated shake");
            $("#password_repeat").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                $("#password_repeat").removeClass("animated shake");
            });
            return false;
        }
        if ($("#password").val() != $("#password_repeat").val()) {
            $("#error").text("کلمه عبور و تکرار آن یکسان نیستند...").css("display", "block");
            return false;
        }
        $("#signup-error").text("").css("display", "none");

        var firstname = $("#first_name").val();
        console.log(firstname);
        var lastname = $("#last_name").val();
        console.log(lastname);
        var email = $("#email").val();
        console.log(email);
        var password = $("#password").val();
        console.log(password);
        var username = $("#username").val();
        console.log(username);
        var phone = $("#phone").val();
        console.log(phone);

        var query = "";

        $.ajax({
            type: "POST",
            url: IP + PORT + AddUserURL + query,
            data: {
                firstname: firstname,
                lastname: lastname,
                email: email,
                password: password,
                username: username,
                phone: phone
            },
            contentType: 'application/x-www-form-urlencoded',
            dataType: 'json',
            success: function (res) {
                console.log(res);
                if(res.status == 400) {
                    $("#error").text("این کاربر قبلا ثبت نام کرده است...").css("display", "initial");
                } else if(res.status == 200) {
                    window.location.href = res.content.redirect;
                }
            },
            error: function () {
                alert("عدم ارتباط با سرور!");
                window.location.href = "/admin/users/add";
            }
        });

        return false;
    });

});