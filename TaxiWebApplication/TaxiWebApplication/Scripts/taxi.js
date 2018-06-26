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

        ClearDisplay();

        $("#customerCurrentDriveDivStartLocation").text("");
        $("#customerCurrentDriveDivStartLocationX").text("");
        $("#customerCurrentDriveDivStartLocationY").text("");
        $("#customerCurrentDriveDivDestination").text("");
        $("#customerDriverDivName").text("");
        $("#customerDriverDivPhone").text("");
        $("#customerDriverDivCar").text("");
        $("#customerAllDrivesDiv").html("");

        ClearFields();
    }); 
    
    $("#imgX").click(function () {
        ClearFields();
    });

    var isUserActive = false;

    $("#homeButton").click(function () {

        ClearDisplay();

        $("#driverMapsDriveDiv").show();
        $("#driverMapsDriveDivBlack").show();
        $("#driverChangeLocation").show();
        $("#driverAllDrivesDiv").show();
        $("#onHoldDrivesDriver").show();
        
        $("#customerCreateDrive").show();
        $("#customerAllDrivesDiv").show();
        
        $("#dispatcherCreateDrive").show();
        $("#dispatcherAllDrivesDiv").show();
        $("#onHoldDrivesDispacher").show();

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

        ClearFields();
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
                    alert("Success registration");
                    isUserActive = true;
                    $("#loginPage").hide();
                    $("#homeText").hide();
                    $("#myAccountButton").text(user.Username);
                    $("#myAccountButton").show();
                    $("#loginButton").hide();
                    $("#logoutButton").show();

                    $("#dispatcherActionAddDriver").hide();
                    $("#dispatcherActionCreateDrive").hide();
                    $("#driverActionChangeLocation").hide();
                    $("#customerActionCreateDrive").show();
                    $("#userBox").show();
                    $("#imgTriangle").show();
                    $("#customerDiv").show();
                },
                error: function () {
                    alert("Error registration");
                }
            });
        }
    });

    function Validate() {

        if ($("#nameId").val().trim() != "") {
            isValidate = true;
        }
        else {
            $("#nameId").val("");
            $("#nameId").attr("placeholder", "Enter your name").placeholder;
            isValidate = false;
        }
        if ($("#surnameId").val().trim() != "") {
            isValidate = true;
        }
        else {
            $("#surnameId").val("");
            $("#surnameId").attr("placeholder", "Enter your surname").placeholder;
            isValidate = false;
        }
        if ($("#usernameId").val().trim() != "") {
            isValidate = true;
            let username = $("#usernameId").val();
            if (username.length < 4) {
                $("#usernameId").val("");
                $("#usernameId").attr("placeholder", "4 characters at a minimum").placeholder;
                isValidate = false;
            }
        }
        else {
            $("#usernameId").val("");
            $("#usernameId").attr("placeholder", "Enter your username").placeholder;
            isValidate = false;
        }
        if ($("#passwordId").val().trim() != "") {
            isValidate = true;
            let password = $("#passwordId").val();
            if (password.length < 4) {
                $("#passwordId").val("");
                $("#passwordId").attr("placeholder", "4 characters at a minimum").placeholder;
                isValidate = false;
            }
        }
        else {
            $("#passwordId").val("");
            $("#passwordId").attr("placeholder", "Enter your password").placeholder;
            isValidate = false;
        }
        if ($("#jmbgId").val().trim() != "") {
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
            $("#jmbgId").val("");
            $("#jmbgId").attr("placeholder", "Enter your jmbg").placeholder;
            isValidate = false;
        }
        if ($("#phoneId").val().trim() != "") {
            isValidate = true;
            let phone = $("#phoneId").val();
            if (isNaN(phone)) {  // vraca true ako nije broj
                $("#phoneId").val("");
                $("#phoneId").attr("placeholder", "Must be numeric characters").placeholder;
                isValidate = false;
            }
        }
        else {
            $("#phoneId").val("");
            $("#phoneId").attr("placeholder", "Enter your phone number").placeholder;
            isValidate = false;
        }
        if ($("#emailId").val().trim() != "") {
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
            $("#emailId").val("");
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
                    alert("Success loging");
                    isUserActive = true;
                    $("#loginPage").hide();
                    $("#homeText").hide();
                    $("#myAccountButton").text(user.Username);
                    $("#myAccountButton").show();
                    $("#loginButton").hide();
                    $("#logoutButton").show();
                    if (user.Role == "Customer") {
                        $("#dispatcherActionAddDriver").hide();
                        $("#dispatcherActionCreateDrive").hide();
                        $("#driverActionChangeLocation").hide();
                        $("#customerActionCreateDrive").show();
                        //$("#customerDiv").show();
                        $("#homeButton").click();
                    }
                    else if (user.Role == "Dispatcher") {
                        $("#dispatcherActionAddDriver").show();
                        $("#dispatcherActionCreateDrive").show();
                        $("#driverActionChangeLocation").hide();
                        $("#customerActionCreateDrive").hide();
                        //$("#dispatcherDiv").show();
                        $("#homeButton").click();
                    }
                    else if (user.Role == "Driver") {
                        $("#dispatcherActionAddDriver").hide();
                        $("#dispatcherActionCreateDrive").hide();
                        $("#driverActionChangeLocation").show();
                        $("#customerActionCreateDrive").hide();
                        //$("#driverDiv").show();
                        $("#homeButton").click();
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

        if ($("#usernameIdLog").val().trim() != "") {
            isLoginValidate = true;
        }
        else {
            $("#usernameIdLog").val("");
            $("#usernameIdLog").attr("placeholder", "Enter your username").placeholder;
            isLoginValidate = false;
        }
        if ($("#passwordIdLog").val().trim() != "") {
            isLoginValidate = true;
        }
        else {
            $("#passwordIdLog").val("");
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

    function ClearFields() {

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
    }

    function ClearDisplay() {
        $("#accountDiv").hide();

        $("#driverChangeLocationDiv").hide();
        $("#driverCurrentDriveDiv").hide();
        $("#driverCustomerDiv").hide();
        $("#successfulImgDriver").hide();
        $("#unsuccessfulImgDriver").hide();
        $("#acceptedImgDriver").hide();
        $("#canceledImgDriver").hide();
        $("#pleaseWaitImgDriver").hide();
        $("#processImgDriver").hide();
        $("#driverEditDriveImg").hide();
        $("#driverState").hide();
        $("#driverStateMessage").hide();
        $("#driverAcceptDrive").hide();
        $("#driverYesDrive").hide();
        $("#driverNoDrive").hide();
        $("#driverMessage").hide();

        $("#customerCreateDriveDiv").hide();
        $("#customerCurrentDriveDiv").hide();
        $("#customerDriverDiv").hide();
        $("#customerMapsDriveDiv").hide();
        $("#customerMapsDriveDivBlack").hide();

        $("#addDriver").hide();
        $("#dispatcherCurrentDriveDiv").hide();
        $("#dispatcherDriverDiv").hide();
        $("#dispatcherMapsDriveDiv").hide();
        $("#dispatcherMapsDriveDivBlack").hide();
        $("#dispatcherCreateDriveDiv").hide();
        $("#freeDriversDivCreateDrive").hide();
    }
    
});