﻿$(document).ready(function () {

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
});