$(document).ready(function() {

    var IP = "http://localhost";
    var PORT = ":3000/";

    var changePasswordURL = "api/v1/changePassword";

    $("#changePassword").on("submit", function () {
        if ($("#oldPassword").val() == '') {
            $("#oldPassword").addClass("animated shake");
            $("#oldPassword").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                $("#oldPassword").removeClass("animated shake");
            });
            return false;
        }
        if ($("#newPassword").val() == '') {
            $("#newPassword").addClass("animated shake");
            $("#newPassword").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                $("#newPassword").removeClass("animated shake");
            });
            return false;
        }
        if ($("#repeatPassword").val() == '') {
            $("#repeatPassword").addClass("animated shake");
            $("#repeatPassword").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                $("#repeatPassword").removeClass("animated shake");
            });
            return false;
        }
        if ($("#newPassword").val() != $("#repeatPassword").val()) {
            $("#error").text("کلمه عبور و تکرار آن یکسان نیستند...").css("display", "block");
            return false;
        }
        $("#signup-error").text("").css("display", "none");

        var oldPassword = $("#oldPassword").val();
        var newPassword = $("#newPassword").val();

        var query = "";

        $.ajax({
            type: "POST",
            url: IP + PORT + changePasswordURL + query,
            data: {
                oldPassword: oldPassword,
                newPassword: newPassword
            },
            contentType: 'application/x-www-form-urlencoded',
            dataType: 'json',
            success: function (res) {
                console.log(res);
                if(res.status == 400) {
                    $("#error").text("کاربر یافت نشد.").css("display", "initial");
                } else if(res.status == 200) {
                    window.location.href = "/admin";
                }
            },
            error: function () {
                alert("عدم ارتباط با سرور!");
                window.location.href = "/admin/changePassword";
            }
        });

        return false;
    });

});