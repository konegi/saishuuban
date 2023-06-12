$(document).ready(function() {
    $("#myButton").click(function() {
        $("#overlay").fadeIn(300);
        $.ajax({
            type: "POST",
            url: "/query",
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify({myData: request.form["prompt_text"]}),
            dataType: "json",
            success: function(response) {
                alert(response.result);
            },
            error: function() {
                alert("エラーが発生しました");
            }
        });
    });
});