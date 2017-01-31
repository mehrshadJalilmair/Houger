$(document).ready(function() {

    var IP = "http://localhost";
    var PORT = ":3000/";

    var editUserURL = "api/v1/users";

    $("#editUser").on("submit", function () {
        if ($("#phone").val() == '') {
            $("#phone").addClass("animated shake");
            $("#phone").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                $("#phone").removeClass("animated shake");
            });
            return false;
        }
        $("#signup-error").text("").css("display", "none");

        var id = $("#id").val();
        var firstname = $("#firstname").val();
        var lastname = $("#lastname").val();
        var username = $("#username").val();
        var phone = $("#phone").val();

        var query = "?_id=" + id;

        $.ajax({
            type: "PUT",
            url: IP + PORT + editUserURL + query,
            data: {
                firstname: firstname,
                lastname: lastname,
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
                    window.location.href = "/admin";
                }
            },
            error: function () {
                alert("عدم ارتباط با سرور!");
                window.location.href = "/admin";
            }
        });

        return false;
    });

});