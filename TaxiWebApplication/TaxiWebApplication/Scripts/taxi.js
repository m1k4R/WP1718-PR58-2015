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
    $("#myAccountButton").click(function () {
        $("#userBox").show();
        $("#imgTriangle").show();
        $("#homeText").hide();
        $("#dispatcherDiv").hide();
        $("#customerDiv").hide();
        $("#driverDiv").hide();

        let user = JSON.parse(sessionStorage.getItem("currentUser"));
        $("#nameChangeId").val(user.Name);
        $("#surnameChangeId").val(user.Surname);
        $("#usernameChangeId").val(user.Username);
        $("#passwordTextChangeId").val(user.Password);
        $("#jmbgChangeId").val(user.Jmbg);
        $("#genderTextChangeId").val(user.Gender);
        $("#phoneChangeId").val(user.Phone);
        $("#emailChangeId").val(user.Email);
        
        $("input[name=genderChange][value=" + user.Gender + "]").prop('checked', true);
        $("#passwordChangeId").val(user.Password);

        $("input[name=genderChange]").hide();
        $("input[name=genderChange]").siblings('label').hide();
        $("#passwordChangeId").hide();

        $("#changeAccountClick").hide();
        $("#cancelAccountClick").hide();
        $("#editProfile").show();
        $("#passwordTextChangeId").show();
        $("#genderTextChangeId").show();

        $("#nameChangeId").addClass("accountInput");
        $("#surnameChangeId").addClass("accountInput");
        $("#usernameChangeId").addClass("accountInput");
        $("#passwordChangeId").addClass("accountInput");
        $("#jmbgChangeId").addClass("accountInput");
        $("#phoneChangeId").addClass("accountInput");
        $("#emailChangeId").addClass("accountInput");

        $("#nameChangeId").prop("readonly", true);
        $("#surnameChangeId").prop("readonly", true);
        $("#usernameChangeId").prop("readonly", true);
        $("#passwordChangeId").prop("readonly", true);
        $("#jmbgChangeId").prop("readonly", true);
        $("#phoneChangeId").prop("readonly", true);
        $("#emailChangeId").prop("readonly", true);

        $("#accountDiv").show();
    });
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
      //  $("#homeText").hide();
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

    $("#dispatcherActionAddDriver").click(function () {
        $("#nameIdDriver").val("");
        $("#surnameIdDriver").val("");
        $("#usernameIdDriver").val("");
        $("#passwordIdDriver").val("");
        $("#jmbgIdDriver").val("");
        $("#phoneIdDriver").val("");
        $("#emailIdDriver").val("");
        $("#addressIdDriver").val("");
        $("#xIdDriver").val("");
        $("#yIdDriver").val("");
        $("#idCarIdDriver").val("");
        $("#carYearIdDriver").val("");
        $("#regNumberIdDriver").val("");
        $("select[name=car]").val("None"),

        $("#nameIdDriver").attr("placeholder", "").placeholder;
        $("#surnameIdDriver").attr("placeholder", "").placeholder;
        $("#usernameIdDriver").attr("placeholder", "").placeholder;
        $("#passwordIdDriver").attr("placeholder", "").placeholder;
        $("#jmbgIdDriver").attr("placeholder", "").placeholder;
        $("#phoneIdDriver").attr("placeholder", "").placeholder;
        $("#emailIdDriver").attr("placeholder", "").placeholder;

        $("#addDriver").show();
    }); 
    $("#imgXAddDriver").click(function () {
        $("#addDriver").hide();
    });

    var isAddDriverValidate = false;

    $("#buttonAddDriver").click(function () {
        AddDriverValidate();
        if (isAddDriverValidate) {
            $.ajax({
                url: "/api/Dispatcher/AddDriver",
                method: "POST",
                dataType: "json",
                data: {
                    Name: $("#nameIdDriver").val(),
                    Surname: $("#surnameIdDriver").val(),
                    Username: $("#usernameIdDriver").val(),
                    Password: $("#passwordIdDriver").val(),
                    Jmbg: $("#jmbgIdDriver").val(),
                    Gender: $("input[name=genderDriver]").filter(":checked").val(),
                    Phone: $("#phoneIdDriver").val(),
                    Email: $("#emailIdDriver").val(),
                    Location: {
                        Address: $("#addressIdDriver").val(),
                        X: $("#xIdDriver").val(),
                        Y: $("#yIdDriver").val()
                    },
                    Car: {
                        Type: $("select[name=car]").filter(":selected").val(),
                        Id: $("#idCarIdDriver").val(),
                        YearOfCar: $("#carYearIdDriver").val(),
                        RegNumber: $("#regNumberIdDriver").val()
                    }
                    
                },
                success: function (data) {
                    alert("Uspjesno dodavanje vozaca");
                    $("#addDriver").hide();
                },
                error: function () {
                    alert("Greska");
                }
            });
        }
    });

    function AddDriverValidate() {

        if ($("#nameIdDriver").val()) {
            isAddDriverValidate = true;
        }
        else {
            $("#nameIdDriver").attr("placeholder", "Enter your name").placeholder;
            isAddDriverValidate = false;
        }
        if ($("#surnameIdDriver").val()) {
            isAddDriverValidate = true;
        }
        else {
            $("#surnameIdDriver").attr("placeholder", "Enter your surname").placeholder;
            isAddDriverValidate = false;
        }
        if ($("#usernameIdDriver").val()) {
            isAddDriverValidate = true;
            let username = $("#usernameIdDriver").val();
            if (username.length < 4) {
                $("#usernameIdDriver").val("");
                $("#usernameIdDriver").attr("placeholder", "4 characters at a minimum").placeholder;
                isAddDriverValidate = false;
            }
        }
        else {
            $("#usernameIdDriver").attr("placeholder", "Enter your username").placeholder;
            isAddDriverValidate = false;
        }
        if ($("#passwordIdDriver").val()) {
            isAddDriverValidate = true;
            let password = $("#passwordIdDriver").val();
            if (password.length < 4) {
                $("#passwordIdDriver").val("");
                $("#passwordIdDriver").attr("placeholder", "4 characters at a minimum").placeholder;
                isAddDriverValidate = false;
            }
        }
        else {
            $("#passwordIdDriver").attr("placeholder", "Enter your password").placeholder;
            isAddDriverValidate = false;
        }
        if ($("#jmbgIdDriver").val()) {
            isAddDriverValidate = true;
            let jmbg = $("#jmbgIdDriver").val();
            if (isNaN(jmbg)) {  // vraca true ako nije broj
                $("#jmbgIdDriver").val("");
                $("#jmbgIdDriver").attr("placeholder", "Must be numeric characters").placeholder;
                isAddDriverValidate = false;
            }
            else if (jmbg.length !== 13) {
                $("#jmbgIdDriver").val("");
                $("#jmbgIdDriver").attr("placeholder", "Must have 13 characters").placeholder;
                isAddDriverValidate = false;
            }
        }
        else {
            $("#jmbgIdDriver").attr("placeholder", "Enter your jmbg").placeholder;
            isAddDriverValidate = false;
        }
        if ($("#phoneIdDriver").val()) {
            isAddDriverValidate = true;
            let phone = $("#phoneIdDriver").val();
            if (isNaN(phone)) {  // vraca true ako nije broj
                $("#phoneIdDriver").val("");
                $("#phoneIdDriver").attr("placeholder", "Must be numeric characters").placeholder;
                isAddDriverValidate = false;
            }
        }
        else {
            $("#phoneIdDriver").attr("placeholder", "Enter your phone number").placeholder;
            isAddDriverValidate = false;
        }
        if ($("#emailIdDriver").val()) {
            isAddDriverValidate = true;
            let email = $("#emailIdDriver").val();
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!email.match(re)) {
                $("#emailIdDriver").val("");
                $("#emailIdDriver").attr("placeholder", "Invalid e-mail").placeholder;
                isAddDriverValidate = false;
            }
        }
        else {
            $("#emailIdDriver").attr("placeholder", "Enter your e-mail").placeholder;
            isAddDriverValidate = false;
        }
        if ($("#nameIdDriver").val() && $("#surnameIdDriver").val() && $("#usernameIdDriver").val() && $("#passwordIdDriver").val() && $("#jmbgIdDriver").val() && $("#phoneIdDriver").val() && $("#emailIdDriver").val()) {
            isAddDriverValidate = true;
        }
        else {
            isAddDriverValidate = false;
        }

    }

    // Change profile
  
    $("#editProfile").click(function () {
        $("#changeAccountClick").show();
        $("#cancelAccountClick").show();
        $("#editProfile").hide();
        $("#passwordTextChangeId").hide();
        $("#passwordChangeId").show();
        $("#genderTextChangeId").hide();
        $("input[name=genderChange]").show();
        $("input[name=genderChange]").siblings('label').show();

        $("#nameChangeId").removeClass("accountInput");
        $("#surnameChangeId").removeClass("accountInput");
        $("#usernameChangeId").removeClass("accountInput");
        $("#passwordChangeId").removeClass("accountInput");
        $("#jmbgChangeId").removeClass("accountInput");
        $("#phoneChangeId").removeClass("accountInput");
        $("#emailChangeId").removeClass("accountInput");

        $("#nameChangeId").removeProp("readonly");
        $("#surnameChangeId").removeProp("readonly");
        $("#usernameChangeId").removeProp("readonly");
        $("#passwordChangeId").removeProp("readonly");
        $("#jmbgChangeId").removeProp("readonly");
        $("#phoneChangeId").removeProp("readonly");
        $("#emailChangeId").removeProp("readonly");
    });

    $("#cancelAccountClick").click(function () {
        $("#myAccountButton").click();
    });

    var isUpdateValidate = false;

    $("#changeAccountClick").click(function () {
        UpdateValidate();
        if (isUpdateValidate) {
            let currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
            let urlForUpdate = "";
            if (currentUser.Role == "Dispatcher") {
                urlForUpdate = "/api/Update/UpdateDispatcher";
            }
            else if (currentUser.Role == "Driver") {
                urlForUpdate = "/api/Update/UpdateDriver";
            }
            else if (currentUser.Role == "Customer") {
                urlForUpdate = "/api/Update/UpdateCustomer";
            }
            $.ajax({
                url: urlForUpdate,
                method: "POST",
                dataType: "json",
                data: {
                    Name: $("#nameChangeId").val(),
                    Surname: $("#surnameChangeId").val(),
                    Username: $("#usernameChangeId").val(),
                    Password: $("#passwordChangeId").val(),
                    Jmbg: $("#jmbgChangeId").val(),
                    Gender: $("input[name=genderChange]").filter(":checked").val(),
                    Phone: $("#phoneChangeId").val(),
                    Email: $("#emailChangeId").val(),
                    Id: currentUser.Id,
                    Role: currentUser.Role
                },
                success: function (data) {
                    sessionStorage.setItem("currentUser", JSON.stringify(data));
                    let user = JSON.parse(sessionStorage.getItem("currentUser"));
                    alert("Success update");
                    $("#myAccountButton").text(user.Username);
                    $("#myAccountButton").click();
                },
                error: function () {
                    alert("Error update");
                }
            });
        }
    });

    function UpdateValidate() {

        if ($("#nameChangeId").val()) {
            isUpdateValidate = true;
        }
        else {
            $("#nameChangeId").attr("placeholder", "Enter your name").placeholder;
            isUpdateValidate = false;
        }
        if ($("#surnameChangeId").val()) {
            isUpdateValidate = true;
        }
        else {
            $("#surnameChangeId").attr("placeholder", "Enter your surname").placeholder;
            isUpdateValidate = false;
        }
        if ($("#usernameChangeId").val()) {
            isUpdateValidate = true;
            let username = $("#usernameChangeId").val();
            if (username.length < 4) {
                $("#usernameChangeId").val("");
                $("#usernameChangeId").attr("placeholder", "4 characters at a minimum").placeholder;
                isUpdateValidate = false;
            }
        }
        else {
            $("#usernameChangeId").attr("placeholder", "Enter your username").placeholder;
            isUpdateValidate = false;
        }
        if ($("#passwordChangeId").val()) {
            isUpdateValidate = true;
            let password = $("#passwordChangeId").val();
            if (password.length < 4) {
                $("#passwordChangeId").val("");
                $("#passwordChangeId").attr("placeholder", "4 characters at a minimum").placeholder;
                isUpdateValidate = false;
            }
        }
        else {
            $("#passwordChangeId").attr("placeholder", "Enter your password").placeholder;
            isUpdateValidate = false;
        }
        if ($("#jmbgChangeId").val()) {
            isUpdateValidate = true;
            let jmbg = $("#jmbgChangeId").val();
            if (isNaN(jmbg)) {  // vraca true ako nije broj
                $("#jmbgChangeId").val("");
                $("#jmbgChangeId").attr("placeholder", "Must be numeric characters").placeholder;
                isUpdateValidate = false;
            }
            else if (jmbg.length !== 13) {
                $("#jmbgChangeId").val("");
                $("#jmbgChangeId").attr("placeholder", "Must have 13 characters").placeholder;
                isUpdateValidate = false;
            }
        }
        else {
            $("#jmbgChangeId").attr("placeholder", "Enter your jmbg").placeholder;
            isUpdateValidate = false;
        }
        if ($("#phoneChangeId").val()) {
            isUpdateValidate = true;
            let phone = $("#phoneChangeId").val();
            if (isNaN(phone)) {  // vraca true ako nije broj
                $("#phoneChangeId").val("");
                $("#phoneChangeId").attr("placeholder", "Must be numeric characters").placeholder;
                isUpdateValidate = false;
            }
        }
        else {
            $("#phoneChangeId").attr("placeholder", "Enter your phone number").placeholder;
            isUpdateValidate = false;
        }
        if ($("#emailChangeId").val()) {
            isUpdateValidate = true;
            let email = $("#emailChangeId").val();
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!email.match(re)) {
                $("#emailChangeId").val("");
                $("#emailChangeId").attr("placeholder", "Invalid e-mail").placeholder;
                isUpdateValidate = false;
            }
        }
        else {
            $("#emailChangeId").attr("placeholder", "Enter your e-mail").placeholder;
            isUpdateValidate = false;
        }
        if ($("#nameChangeId").val() && $("#surnameChangeId").val() && $("#usernameChangeId").val() && $("#passwordChangeId").val() && $("#jmbgChangeId").val() && $("#phoneChangeId").val() && $("#emailChangeId").val()) {
            isUpdateValidate = true;
        }
        else {
            isUpdateValidate = false;
        }

    }

    // Driver.js - change location
    
    $("#driverActionChangeLocation").click(function () {
        $("#driverChangeLocation").click();
    });
    $("#driverChangeLocation").click(function () {
        $("#changeAddressIdDriver").val("");
        $("#changeXIdDriver").val("");
        $("#changeYIdDriver").val("");
        $("#driverChangeLocationDiv").show(); 
    });
    $("#cancelLocationDriverClick").click(function () {
        $("#driverChangeLocationDiv").hide(); 
    });
    $("#changeLocationDriverClick").click(function () {
        let currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
        $.ajax({
            url: "/api/Driver/ChangeLocation",
            method: "POST",
            dataType: "json",
            data: {
                Name: currentUser.Name,
                Surname: currentUser.Surname,
                Username: currentUser.Username,
                Password: currentUser.Password,
                Jmbg: currentUser.Jmbg,
                Gender: currentUser.Gender,
                Phone: currentUser.Phone,
                Email: currentUser.Email,
                Id: currentUser.Id,
                Role: currentUser.Role,
                Location: {
                    Address: $("#changeAddressIdDriver").val(),
                    X: $("#changeXIdDriver").val(),
                    Y: $("#changeYIdDriver").val()
                }
            },
            success: function (data) {
                sessionStorage.setItem("currentUser", JSON.stringify(data));
                alert("Success");
                $("#cancelLocationDriverClick").click();
            },
            error: function () {
                alert("Error update location");
            }
        });
    });

    // Customer.js - create a drive

    $("#customerActionCreateDrive").click(function () {
        $("#customerCreateDrive").click();
    });
    $("#customerCreateDrive").click(function () {
        $("#startAddressIdCustomer").val("");
        $("#startAddressXIdCustomer").val("");
        $("#startAddressYIdCustomer").val("");
        $("#customerCreateDriveDiv").show();
    });
    $("#cancelCreateDriveCustomerClick").click(function () {
        $("#customerCreateDriveDiv").hide();
    });
    $("#createDriveCustomerClick").click(function () {
        let currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
        $.ajax({
            url: "/api/Customer/CreateDrive",
            method: "POST",
            dataType: "json",
            data: {
                Customer: {
                    Id: currentUser.Id
                },
                StartLocation: {
                    Address: $("#startAddressIdCustomer").val(),
                    X: $("#startAddressXIdCustomer").val(),
                    Y: $("#startAddressYIdCustomer").val()
                },
                Car: {
                    Type: $("select[name=carCustomer]").filter(":selected").val()
                }
            },
            success: function (data) {
                alert("Success");
                $("#cancelCreateDriveCustomerClick").click();
            },
            error: function () {
                alert("Error add drive");
            }
        });
    });

});