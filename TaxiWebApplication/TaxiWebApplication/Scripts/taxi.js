$(document).ready(function () {
    $("#loginButton").click(function() {
       // $("#myAccountButton").show();
        $("#loginPage").show();
       // $("#loginButton").text("Logout");
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

    // Registration

    var isValidate = false;

    $("#registration").click(function () {
        Validate();
        if (isValidate) {
            $.ajax({
                url: "/api/Register/RegisterUser",
                method: "POST",
                dataType: "json",
                data: {
                    Name: $("#nameId").val(),
                    Surname: $("#surnameId").val(),
                    Username: $("#usernameId").val(),
                    Password: $("#passwordId").val(),
                    Jmbg: $("#jmbgId").val(),
                    Gender: $("input[name=gender]").filter(":checked").val(),
                    Phone: $("#phoneId").val(),
                    Email: $("#emailId").val(),
                },
                success: function (data) {
                    sessionStorage.setItem("currentUser", JSON.stringify(data));
                    let user = JSON.parse(sessionStorage.getItem("currentUser"));
                    alert("Uspjesno ste se registrovali");
                    $("#loginPage").hide();
                    $("#myAccountButton").text(user.Username);
                    $("#myAccountButton").show();
                    $("#loginButton").text("Logout");
                    $("#userBox").show();
                    $("#imgTriangle").show();
                },
                error: function () {
                    alert("Greska");
                }
                });
        }
    });

    function Validate() {

        if ($("#nameId").val()) {
            isValidate = true;
        }
        else {
            $("#nameId").attr("placeholder", "Enter your name").placeholder;
            isValidate = false;
        }
        if ($("#surnameId").val()) {
            isValidate = true;
        }
        else {
            $("#surnameId").attr("placeholder", "Enter your surname").placeholder;
            isValidate = false;
        }
        if ($("#usernameId").val()) {
            isValidate = true;
            let username = $("#usernameId").val();
            if (username.length < 4) {
                $("#usernameId").val("");
                $("#usernameId").attr("placeholder", "4 characters at a minimum").placeholder;
                isValidate = false;
            }
        }
        else {
            $("#usernameId").attr("placeholder", "Enter your username").placeholder;
            isValidate = false;
        }
        if ($("#passwordId").val()) {
            isValidate = true;
            let password = $("#passwordId").val();
            if (password.length < 4) {
                $("#passwordId").val("");
                $("#passwordId").attr("placeholder", "4 characters at a minimum").placeholder;
                isValidate = false;
            }
        }
        else {
            $("#passwordId").attr("placeholder", "Enter your password").placeholder;
            isValidate = false;
        }
        if ($("#jmbgId").val()) {
            isValidate = true;
            let jmbg = $("#jmbgId").val();
            if (isNaN(jmbg)) {  // vraca true ako nije broj
                $("#jmbgId").val("");
                $("#jmbgId").attr("placeholder", "Must be numeric characters").placeholder;
                isValidate = false;
            }
            else if (jmbg.length != 13) {
                $("#jmbgId").val("");
                $("#jmbgId").attr("placeholder", "Must have 13 characters").placeholder;
                isValidate = false;
            }
        }
        else {
            $("#jmbgId").attr("placeholder", "Enter your jmbg").placeholder;
            isValidate = false;
        }
        if ($("#phoneId").val()) {
            isValidate = true;
            let phone = $("#phoneId").val();
            if (isNaN(phone)) {  // vraca true ako nije broj
                $("#phoneId").val("");
                $("#phoneId").attr("placeholder", "Must be numeric characters").placeholder;
                isValidate = false;
            }
        }
        else {
            $("#phoneId").attr("placeholder", "Enter your phone number").placeholder;
            isValidate = false;
        }
        if ($("#emailId").val()) {
            isValidate = true;
            let email = $("#emailId").val();
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            if (!email.match(re)) { 
                $("#emailId").val("");
                $("#emailId").attr("placeholder", "Invalid e-mail").placeholder;
                isValidate = false;
            }
        }
        else {
            $("#emailId").attr("placeholder", "Enter your e-mail").placeholder;
            isValidate = false;
        }
        if ($("#nameId").val() && $("#surnameId").val() && $("#usernameId").val() && $("#passwordId").val() && $("#jmbgId").val() && $("#phoneId").val() && $("#emailId").val()) {
            isValidate = true;
        }
        else {
            isValidate = false;
        }

    }
});