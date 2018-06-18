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
        $("#userMenu").hide();
        $("#imgTriangle").animate({
            top: '46vh'
        });
        pos = 46;
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
    $("#goRegister").click(function () {
        $("#login").hide();
        $("#register").show();
    });
    $("#imgXReg").click(function () {
        $("#loginPage").hide();
    });

    $("#registration").click(function () {
        $.ajax({
            url: "/api/Register/RegisterUser",
            method: "POST",
            data: {
                Name: $("#nameId").val(),
                Surname: $("#surnameId").val(),
                Username: $("#usernameId").val(),
                Password: $("#passwordId").val(),
                Jmbg: $("#jmbgId").val(),
                Gender: $("#genderId").val(),
                Phone: $("#phoneId").val(),
                Email: $("#emailId").val(),
            },
            success: function () {
                alert("Uspjesno ste se registrovali");
                $("#loginPage").hide();
            },
            error: function (jqXHR) {
                alert("Greska");
            }
        });
    });
});