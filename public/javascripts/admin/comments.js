var selectedComment;

$(document).ready(function() {

    var IP = "http://localhost";
    var PORT = ":3000/";

    var deleteCommentURL = "api/v1/comments";


    $('.modal-trigger').leanModal();

    $("#commentSearch").keyup( search );

    $("#deleteComment-btn").on("click", function () {
        var query = "?_id=" + selectedComment;

        $.ajax({
            type: "DELETE",
            url: IP + PORT + deleteCommentURL + query,
            success: function (res) {
                console.log(res);
                if(res.status == 200) {
                    window.location.href = "/admin/comments";
                } else {
                    alert("کاربر حذف نشد.");
                }
            },
            error: function () {
                alert("عدم ارتباط با سرور!");
                window.location.href = "/admin/comments";
            }
        });
    });

});

function search() {

    // Retrieve the input field text and reset the count to zero
    var filter = $(this).val();

    // Loop through the comment list
    $(".firstname").each(function(){

        // If the list item does not contain the text phrase fade it out
        if ($(this).parent().text().search(new RegExp(filter, "i")) < 0) {
            $(this).parent().fadeOut();

            // Show the list item if the phrase matches and increase the count by 1
        } else {
            $(this).parent().show();
        }
    });
}

function chooseComment(Node, tag) {

    selectedComment = $(Node).parent().parent().find("td:nth-child(1)").text();
    if(tag == "Edit") {
        window.location.href = "/admin/comments/edit?_id=" + selectedComment;
    }

}
