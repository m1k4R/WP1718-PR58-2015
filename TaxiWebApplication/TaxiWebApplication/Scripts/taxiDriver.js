$(document).ready(function () {

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

    var isDriverLocationValidate = false;

    $("#changeLocationDriverClick").click(function () {
        DriverLocationValidate();
        if (isDriverLocationValidate) {
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
        }
    });

    function DriverLocationValidate() {

        if ($("#changeAddressIdDriver").val()) {
            isDriverLocationValidate = true;
        }
        else {
            $("#changeAddressIdDriver").attr("placeholder", "Enter your address").placeholder;
            isDriverLocationValidate = false;
        }
        if ($("#changeXIdDriver").val()) {
            isDriverLocationValidate = true;
            let x = $("#changeXIdDriver").val();
            if (isNaN(x)) {  // vraca true ako nije broj
                $("#changeXIdDriver").val("");
                $("#changeXIdDriver").attr("placeholder", "Must be a number").placeholder;
                isDriverLocationValidate = false;
            }
        }
        else {
            $("#changeXIdDriver").attr("placeholder", "Enter your x coordinate").placeholder;
            isDriverLocationValidate = false;
        }
        if ($("#changeYIdDriver").val()) {
            isDriverLocationValidate = true;
            let y = $("#changeYIdDriver").val();
            if (isNaN(y)) {  // vraca true ako nije broj
                $("#changeYIdDriver").val("");
                $("#changeYIdDriver").attr("placeholder", "Must be a number").placeholder;
                isDriverLocationValidate = false;
            }
        }
        else {
            $("#changeYIdDriver").attr("placeholder", "Enter your y coordinate").placeholder;
            isDriverLocationValidate = false;
        }
        if ($("#changeAddressIdDriver").val() && $("#changeXIdDriver").val() && $("#changeYIdDriver").val()) {
            isDriverLocationValidate = true;
        }
        else {
            isDriverLocationValidate = false;
        }

    }
});