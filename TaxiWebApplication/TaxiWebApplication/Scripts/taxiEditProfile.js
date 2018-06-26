$(document).ready(function () {

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

        if ($("#nameChangeId").val().trim() != "") {
            isUpdateValidate = true;
        }
        else {
            $("#nameChangeId").val("");
            $("#nameChangeId").attr("placeholder", "Enter your name").placeholder;
            isUpdateValidate = false;
        }
        if ($("#surnameChangeId").val().trim() != "") {
            isUpdateValidate = true;
        }
        else {
            $("#surnameChangeId").val("");
            $("#surnameChangeId").attr("placeholder", "Enter your surname").placeholder;
            isUpdateValidate = false;
        }
        if ($("#usernameChangeId").val().trim() != "") {
            isUpdateValidate = true;
            let username = $("#usernameChangeId").val();
            if (username.length < 4) {
                $("#usernameChangeId").val("");
                $("#usernameChangeId").attr("placeholder", "4 characters at a minimum").placeholder;
                isUpdateValidate = false;
            }
        }
        else {
            $("#usernameChangeId").val("");
            $("#usernameChangeId").attr("placeholder", "Enter your username").placeholder;
            isUpdateValidate = false;
        }
        if ($("#passwordChangeId").val().trim() != "") {
            isUpdateValidate = true;
            let password = $("#passwordChangeId").val();
            if (password.length < 4) {
                $("#passwordChangeId").val("");
                $("#passwordChangeId").attr("placeholder", "4 characters at a minimum").placeholder;
                isUpdateValidate = false;
            }
        }
        else {
            $("#passwordChangeId").val("");
            $("#passwordChangeId").attr("placeholder", "Enter your password").placeholder;
            isUpdateValidate = false;
        }
        if ($("#jmbgChangeId").val().trim() != "") {
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
            $("#jmbgChangeId").val("");
            $("#jmbgChangeId").attr("placeholder", "Enter your jmbg").placeholder;
            isUpdateValidate = false;
        }
        if ($("#phoneChangeId").val().trim() != "") {
            isUpdateValidate = true;
            let phone = $("#phoneChangeId").val();
            if (isNaN(phone)) {  // vraca true ako nije broj
                $("#phoneChangeId").val("");
                $("#phoneChangeId").attr("placeholder", "Must be numeric characters").placeholder;
                isUpdateValidate = false;
            }
        }
        else {
            $("#phoneChangeId").val("");
            $("#phoneChangeId").attr("placeholder", "Enter your phone number").placeholder;
            isUpdateValidate = false;
        }
        if ($("#emailChangeId").val().trim() != "") {
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
            $("#emailChangeId").val("");
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
});