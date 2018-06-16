$(document).ready(function () {
    $("#loginButton").click(function() {
        $("#myAccountButton").show();
        $("#loginPage").show();
        $("#loginButton").text("Logout");
    });
    $("#myAccountButton").click(function () {
        $("#userBox").show();
        $("#imgTriangle").show();
        $("#homeText").hide();
    });
    $("#imgX").click(function () {
        $("#loginPage").hide();
    });
    $("#homeButton").click(function () {
        $("#userBox").hide();
        $("#imgTriangle").hide();
        $("#homeText").show();
    });
    var pos = 46;
    $("#imgTriangle").click(function () {
        if (pos === 46) {
            $("#imgTriangle").animate({
                top: '73vh'
            });
            pos = 73;
        }
        else {
            $("#imgTriangle").animate({
                top: '46vh'
            });
            pos = 46;
        }
        $("#userMenu").slideToggle();
    });
    $("#imgTriangleDown").click(function () {
        $("#userMenu").slideUp();
        $("#imgTriangle").show();
    });
});