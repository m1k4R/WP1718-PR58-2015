$(document).ready(function () {
    $("#loginButton").click(function () {
        $("#loginPage").show();
    }); 
    $("#logoutButton").click(function () {
        sessionStorage.removeItem("currentUser");
        isUserActive = false;
        $("#logoutButton").hide();
        $("#loginButton").show();
        $("#homeText").show();
        $("#userBox").hide();
        $("#imgTriangle").hide();
        $("#userMenu").hide();
        $("#myAccountButton").hide();
        $("#imgTriangle").animate({
            top: '46vh'
        });
        pos = 46;

        $("#customerDiv").hide();
        $("#dispatcherDiv").hide();
        $("#driverDiv").hide();

        $("#customerCreateDriveDiv").hide();
        $("#customerCurrentDriveDiv").hide();
        $("#customerDriverDiv").hide();
        $("#customerMapsDriveDiv").hide();
        $("#customerMapsDriveDivBlack").hide();
        $("#customerCurrentDriveDivStartLocation").text("");
        $("#customerCurrentDriveDivStartLocationX").text("");
        $("#customerCurrentDriveDivStartLocationY").text("");
        $("#customerCurrentDriveDivDestination").text("");
        $("#customerDriverDivName").text("");
        $("#customerDriverDivPhone").text("");
        $("#customerDriverDivCar").text("");
        $("#customerAllDrivesDiv").html("");

        $("#nameId").val("");
        $("#surnameId").val("");
        $("#usernameId").val("");
        $("#passwordId").val("");
        $("#jmbgId").val("");
        $("#phoneId").val("");
        $("#emailId").val("");
        $("#usernameIdLog").val("");
        $("#passwordIdLog").val("");

        $("#nameId").attr("placeholder", "").placeholder;
        $("#surnameId").attr("placeholder", "").placeholder;
        $("#usernameId").attr("placeholder", "").placeholder;
        $("#passwordId").attr("placeholder", "").placeholder;
        $("#jmbgId").attr("placeholder", "").placeholder;
        $("#phoneId").attr("placeholder", "").placeholder;
        $("#emailId").attr("placeholder", "").placeholder;
        $("#usernameIdLog").attr("placeholder", "").placeholder;
        $("#passwordIdLog").attr("placeholder", "").placeholder;

        $("#accountDiv").hide();
    }); 

    //MyAccountButton.click

    $("#imgX").click(function () {
        $("#loginPage").hide();
        $("#nameId").val("");
        $("#surnameId").val("");
        $("#usernameId").val("");
        $("#passwordId").val("");
        $("#jmbgId").val("");
        $("#phoneId").val("");
        $("#emailId").val("");
        $("#usernameIdLog").val("");
        $("#passwordIdLog").val("");

        $("#nameId").attr("placeholder", "").placeholder;
        $("#surnameId").attr("placeholder", "").placeholder;
        $("#usernameId").attr("placeholder", "").placeholder;
        $("#passwordId").attr("placeholder", "").placeholder;
        $("#jmbgId").attr("placeholder", "").placeholder;
        $("#phoneId").attr("placeholder", "").placeholder;
        $("#emailId").attr("placeholder", "").placeholder;
        $("#usernameIdLog").attr("placeholder", "").placeholder;
        $("#passwordIdLog").attr("placeholder", "").placeholder;
    });

    var isUserActive = false;

    $("#homeButton").click(function () {
        $("#accountDiv").hide();
        $("#driverChangeLocationDiv").hide();
        $("#customerCreateDriveDiv").hide();
        $("#customerCurrentDriveDiv").hide();
        $("#customerDriverDiv").hide();
        $("#customerMapsDriveDiv").hide();
        $("#customerMapsDriveDivBlack").hide();
        $("#customerCreateDrive").show();
        $("#userMenu").hide();
        $("#imgTriangle").animate({
            top: '46vh'
        });
        pos = 46;

        if (isUserActive) {
            let user = JSON.parse(sessionStorage.getItem("currentUser"));
            if (user.Role == "Dispatcher") {
                $("#dispatcherDiv").show();
            }
            else if (user.Role == "Customer") {
                $("#customerDiv").show();
            }
            else if (user.Role == "Driver") {
                $("#driverDiv").show();
            }
        }
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
        $("#login").show();
        $("#register").hide();
        $("#nameId").val("");
        $("#surnameId").val("");
        $("#usernameId").val("");
        $("#passwordId").val("");
        $("#jmbgId").val("");
        $("#phoneId").val("");
        $("#emailId").val("");
        $("#usernameIdLog").val("");
        $("#passwordIdLog").val("");

        $("#nameId").attr("placeholder", "").placeholder;
        $("#surnameId").attr("placeholder", "").placeholder;
        $("#usernameId").attr("placeholder", "").placeholder;
        $("#passwordId").attr("placeholder", "").placeholder;
        $("#jmbgId").attr("placeholder", "").placeholder;
        $("#phoneId").attr("placeholder", "").placeholder;
        $("#emailId").attr("placeholder", "").placeholder;
        $("#usernameIdLog").attr("placeholder", "").placeholder;
        $("#passwordIdLog").attr("placeholder", "").placeholder;
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
                    Email: $("#emailId").val()
                },
                success: function (data) {
                    sessionStorage.setItem("currentUser", JSON.stringify(data));
                    let user = JSON.parse(sessionStorage.getItem("currentUser"));
                    alert("Uspjesno ste se registrovali");
                    isUserActive = true;
                    $("#loginPage").hide();
                    $("#homeText").hide();
                    $("#myAccountButton").text(user.Username);
                    $("#myAccountButton").show();
                    $("#loginButton").hide();
                    $("#logoutButton").show();
                    $("#dispatcherActionAddDriver").hide();
                    $("#driverActionChangeLocation").hide();
                    $("#customerActionCreateDrive").show();
                    $("#userBox").show();
                    $("#imgTriangle").show();
                    $("#customerDiv").show();
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
            else if (jmbg.length !== 13) {
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
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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

    // Login

    var isLoginValidate = false;

    $("#logging").click(function () {
        LoginValidate();
        if (isLoginValidate) {
            $.ajax({
                url: "/api/Login/SignIn",
                method: "POST",
                dataType: "json",
                data: {
                    Username: $("#usernameIdLog").val(),
                    Password: $("#passwordIdLog").val()
                },
                success: function (data) {
                    sessionStorage.setItem("currentUser", JSON.stringify(data));
                    let user = JSON.parse(sessionStorage.getItem("currentUser"));
                    alert("Uspjesno ste se ulogovali");
                    isUserActive = true;
                    $("#loginPage").hide();
                    $("#homeText").hide();
                    $("#myAccountButton").text(user.Username);
                    $("#myAccountButton").show();
                    $("#loginButton").hide();
                    $("#logoutButton").show();
                    if (user.Role == "Customer") {
                        $("#dispatcherActionAddDriver").hide();
                        $("#driverActionChangeLocation").hide();
                        $("#customerActionCreateDrive").show();
                        $("#customerDiv").show();
                    }
                    else if (user.Role == "Dispatcher") {
                        $("#dispatcherActionAddDriver").show();
                        $("#driverActionChangeLocation").hide();
                        $("#customerActionCreateDrive").hide();
                        $("#dispatcherDiv").show();
                    }
                    else if (user.Role == "Driver") {
                        $("#dispatcherActionAddDriver").hide();
                        $("#driverActionChangeLocation").show();
                        $("#customerActionCreateDrive").hide();
                        $("#driverDiv").show();
                    }


                    $("#userBox").show();
                    $("#imgTriangle").show();
                },
                error: function () {
                    alert("Incorrect username or password");
                }
            });
        }
    });

    function LoginValidate() {

        if ($("#usernameIdLog").val()) {
            isLoginValidate = true;
        }
        else {
            $("#usernameIdLog").attr("placeholder", "Enter your username").placeholder;
            isLoginValidate = false;
        }
        if ($("#passwordIdLog").val()) {
            isLoginValidate = true;
        }
        else {
            $("#passwordIdLog").attr("placeholder", "Enter your password").placeholder;
            isLoginValidate = false;
        }
        if ($("#usernameIdLog").val() && $("#passwordIdLog").val()) {
            isLoginValidate = true;
        }
        else {
            isLoginValidate = false;
        }
    }

    //Dispatcher.js create driver

   

    // Change profile
  
    

    // Driver.js - change location
    
   

    // Customer.js - create a drive

   

});