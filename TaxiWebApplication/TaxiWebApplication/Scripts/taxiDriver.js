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
});