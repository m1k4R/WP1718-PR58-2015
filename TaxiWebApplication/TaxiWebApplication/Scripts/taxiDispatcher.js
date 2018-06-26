$(document).ready(function () {

    $("#dispatcherActionAddDriver").click(function () {
        $("#nameIdDriver").val("");
        $("#surnameIdDriver").val("");
        $("#usernameIdDriver").val("");
        $("#passwordIdDriver").val("");
        $("#jmbgIdDriver").val("");
        $("#phoneIdDriver").val("");
        $("#emailIdDriver").val("");
        $("#idCarIdDriver").val("");
        $("#carYearIdDriver").val("");
        $("#regNumberIdDriver").val("");
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
        $("#carYearIdDriver").attr("placeholder", "").placeholder;
        $("#regNumberIdDriver").attr("placeholder", "").placeholder;

        $("#freeDriversDivCreateDrive").hide();
        $("#dispatcherCurrentDriveDiv").hide();
        $("#dispatcherDriverDiv").hide();
        $("#dispatcherMapsDriveDiv").hide();
        $("#dispatcherMapsDriveDivBlack").hide();
        $("#dispatcherCreateDrive").hide();
        $("#dispatcherCreateDriveDiv").hide();
        $("#dispatcherAllDrivesDiv").hide();
        $("#onHoldDrivesDispacher").hide();

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
                        Address: "undefined",
                        X: 0,
                        Y: 0
                    },
                    Car: {
                        Type: $("#carIdDriver option:selected").text(),  //$("select[name=car]").filter(":selected").val(),
                        YearOfCar: $("#carYearIdDriver").val(),
                        RegNumber: $("#regNumberIdDriver").val()
                    }

                },
                success: function (data) {
                    alert("Success add driver");
                    $("#homeButton").click();
                },
                error: function () {
                    alert("Error add driver");
                }
            });
        }
    });

    function AddDriverValidate() {

        if ($("#nameIdDriver").val()) {
            isAddDriverValidate = true;
        }
        else {
            $("#nameIdDriver").attr("placeholder", "Enter driver name").placeholder;
            isAddDriverValidate = false;
        }
        if ($("#surnameIdDriver").val()) {
            isAddDriverValidate = true;
        }
        else {
            $("#surnameIdDriver").attr("placeholder", "Enter driver surname").placeholder;
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
            $("#usernameIdDriver").attr("placeholder", "Enter driver username").placeholder;
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
            $("#passwordIdDriver").attr("placeholder", "Enter driver password").placeholder;
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
            $("#jmbgIdDriver").attr("placeholder", "Enter driver jmbg").placeholder;
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
            $("#phoneIdDriver").attr("placeholder", "Enter driver phone number").placeholder;
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
            $("#emailIdDriver").attr("placeholder", "Enter driver e-mail").placeholder;
            isAddDriverValidate = false;
        }
        if ($("#carYearIdDriver").val()) {
            isAddDriverValidate = true;
            let carYear = $("#carYearIdDriver").val();
            if (isNaN(carYear)) {  // vraca true ako nije broj
                $("#carYearIdDriver").val("");
                $("#carYearIdDriver").attr("placeholder", "Must be a number").placeholder;
                isAddDriverValidate = false;
            }
        }
        else {
            $("#carYearIdDriver").attr("placeholder", "Enter car year").placeholder;
            isAddDriverValidate = false;
        }
        if ($("#regNumberIdDriver").val()) {
            isAddDriverValidate = true;
            let reg = $("#regNumberIdDriver").val();
            if (isNaN(reg)) {  // vraca true ako nije broj
                $("#regNumberIdDriver").val("");
                $("#regNumberIdDriver").attr("placeholder", "Must be numeric characters").placeholder;
                isAddDriverValidate = false;
            }
        }
        else {
            $("#regNumberIdDriver").attr("placeholder", "Enter registration number").placeholder;
            isAddDriverValidate = false;
        }
        if ($("#nameIdDriver").val() && $("#surnameIdDriver").val() && $("#usernameIdDriver").val() && $("#passwordIdDriver").val() && $("#jmbgIdDriver").val() && $("#phoneIdDriver").val() && $("#emailIdDriver").val() && $("#carYearIdDriver").val() && $("#regNumberIdDriver").val()) {
            isAddDriverValidate = true;
        }
        else {
            isAddDriverValidate = false;
        }
    }

    $("#dispatcherActionCreateDrive").click(function () {
        $("#accountDiv").hide();
        $("#dispatcherDiv").show();
        $("#dispatcherCreateDrive").click();
    });
    $("#dispatcherCreateDrive").click(function () {

        var selectedDriver = 0;
        $("#addDriver").hide();
        $("#freeDriversDivCreateDrive").hide();
        $("#onHoldDrivesDispacher").hide();
        $("#freeDriverSelected").hide();
        $("#dispatcherAllDrivesDiv").show();
        $("#dispatcherCreateDrive").hide();
        $("#dispatcherCurrentDriveDiv").hide();
        $("#dispatcherDriverDiv").hide();
        $("#dispatcherMapsDriveDiv").show();
        $("#dispatcherMapsDriveDivBlack").hide();
        $("#saveChangesDriveDispatcherClick").hide();
        $("#cancelChangesDriveDispatcherClick").hide();
        $("#createDriveDispatcherClick").show();
        $("#cancelCreateDriveDispatcherClick").show();

        $("#startAddressIdDispatcher").val("");
        $("#startAddressXIdDispatcher").val("");
        $("#startAddressYIdDispatcher").val("");
        $("#startAddressIdDispatcher").attr("placeholder", "").placeholder;
        $("#startAddressXIdDispatcher").attr("placeholder", "").placeholder;
        $("#startAddressYIdDispatcher").attr("placeholder", "").placeholder;
        $("#chooseDriverDispatcherClick").css('color', ' #ffcc00');
        $("#chooseDriverDispatcherClick").show();
        $("#dispatcherCreateDriveDiv").show();
    });
    $("#cancelCreateDriveDispatcherClick").click(function () {
        $("#dispatcherCreateDriveDiv").hide();
        $("#dispatcherCreateDrive").show();
        $("#dispatcherMapsDriveDiv").hide();
        $("#dispatcherMapsDriveDivBlack").hide();
        selectedDriver = 0;
    });

    var isStartLocationValidate = false;

    $("#chooseDriverDispatcherClick").click(function () {
        $.ajax({       
            url: "/api/Dispatcher/GetFreeDrivers",
            method: "GET",
            dataType: "json",
            success: function (data) {
                let freeDrivers = JSON.parse(JSON.stringify(data));
                if (freeDrivers != null) {
                    $("#freeDriversDivCreateDrive").html("");
                    for (let i = 0; i < freeDrivers.length; i++) {
                        $("#freeDriversDivCreateDrive").append("<div class=\"freeDriversSingleDivCreateDrive\" id=\"freeDriversSingleDivCreateDrive" + freeDrivers[i].Id + "\"><p>" +
                            freeDrivers[i].Name + " " + freeDrivers[i].Surname + "</p ><p>" +
                            freeDrivers[i].Phone + "</p><p>" +
                            freeDrivers[i].Location.Address + "</p><p>" +
                            freeDrivers[i].Car.Type + "</p></div > ");
                    }
                }
                selectedDriver = 0;
                $("#freeDriversDivCreateDrive").slideToggle();
            },
            error: function () {
                alert("Error find free drivers");
            }
        });
        
    });

    var selectedDriver = 0;

    $("body").delegate('.freeDriversSingleDivCreateDrive', 'click', function () {
        let divId = $(this).attr('id');
        let id = divId.substring(31);
        selectedDriver = id;      // id kliknutog diva == id odabranog vozaca

        $.ajax({
            url: "/api/Dispatcher/GetDriverById",
            method: "GET",
            dataType: "json",
            data: {
                Id: id
            },
            success: function (data) {
                let driver = JSON.parse(JSON.stringify(data));
                $("#freeDriversDivCreateDrive").hide();
                $("#chooseDriverDispatcherClick").hide();
                $("#freeDriverSelected").text(driver.Name + " " + driver.Surname);
                $("#freeDriverSelected").show();
                $("#chooseDriverDispatcherProcessedClick").hide();
                $("#dispatcherDriverDivName").text(driver.Name + " " + driver.Surname);
                $("#dispatcherDriverDivPhone").text(driver.Phone);
            },
            error: function () {
                alert("Error drive found");
            }
        });
    });

    $("#createDriveDispatcherClick").click(function () {
        StartLocationValidate();
        if (isStartLocationValidate) {
            let currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
            $.ajax({
                url: "/api/Dispatcher/CreateDrive",
                method: "POST",
                dataType: "json",
                data: {
                    Dispatcher: {
                        Id: currentUser.Id
                    },
                    StartLocation: {
                        Address: $("#startAddressIdDispatcher").val(),
                        X: $("#startAddressXIdDispatcher").val(),
                        Y: $("#startAddressYIdDispatcher").val()
                    },
                    Car: $("#carIdDispatcher option:selected").text(), //$("select[name=carCustomer]").filter(":selected").val()
                    Driver: {
                        Id: selectedDriver
                    }
                },
                success: function (data) {
                    let drive = JSON.parse(JSON.stringify(data));
                    displayDrive = drive.Id;
                    //alert("Success");
                    selectedDriver = 0;
                    $("#cancelCreateDriveDispatcherClick").click();
                    $("#dispatcherCurrentDriveDivStartLocation").text(drive.StartLocation.Address);
                    $("#dispatcherCurrentDriveDivStartLocationX").text(drive.StartLocation.X);
                    $("#dispatcherCurrentDriveDivStartLocationY").text(drive.StartLocation.Y);
                    $("#dispatcherCurrentDriveDivDestination").text(drive.Destination.Address);
                    $("#dispatcherDriverDivName").text(drive.Driver.Name);
                    $("#dispatcherDriverDivPhone").text(drive.Driver.Phone);
                    $("#dispatcherDriverDivCar").text(drive.Car);
                    $("#dispatcherCurrentDriveDiv").show();
                    $("#dispatcherDriverDiv").show();
                    $("#dispatcherMapsDriveDiv").show();
                    $("#dispatcherMapsDriveDivBlack").show();
                    $("#dispatcherCreateDrive").hide();
                    $("#successfulImgDispatcher").hide();
                    $("#unsuccessfulImgDispatcher").hide();
                    $("#acceptedImgDispatcher").hide();
                    $("#canceledImgDispatcher").hide();
                    $("#pleaseWaitImgDispatcher").show();
                    $("#dispatcherMessage").text("Please wait . . .");
                    $("#dispatcherMessage").show();
                    $("#dispatcherStateMessage").text(drive.State);
                    $("#dispatcherStateMessage").show();
                },
                error: function () {
                    alert("Error add drive");
                }
            });
        }
    });

    function StartLocationValidate() {

        if ($("#startAddressIdDispatcher").val()) {
            isStartLocationValidate = true;
        }
        else {
            $("#startAddressIdDispatcher").attr("placeholder", "Enter start address").placeholder;
            isStartLocationValidate = false;
        }
        if ($("#startAddressXIdDispatcher").val()) {
            isStartLocationValidate = true;
            let x = $("#startAddressXIdDispatcher").val();
            if (isNaN(x)) {  // vraca true ako nije broj
                $("#startAddressXIdDispatcher").val("");
                $("#startAddressXIdDispatcher").attr("placeholder", "Must be a number").placeholder;
                isStartLocationValidate = false;
            }
        }
        else {
            $("#startAddressXIdDispatcher").attr("placeholder", "Enter start x coordinate").placeholder;
            isStartLocationValidate = false;
        }
        if ($("#startAddressYIdDispatcher").val()) {
            isStartLocationValidate = true;
            let y = $("#startAddressYIdDispatcher").val();
            if (isNaN(y)) {  // vraca true ako nije broj
                $("#startAddressYIdDispatcher").val("");
                $("#startAddressYIdDispatcher").attr("placeholder", "Must be a number").placeholder;
                isStartLocationValidate = false;
            }
        }
        else {
            $("#startAddressYIdDispatcher").attr("placeholder", "Enter start y coordinate").placeholder;
            isStartLocationValidate = false;
        }
        if (selectedDriver == 0) {
            isStartLocationValidate = false;
            $("#chooseDriverDispatcherClick").css('color', '#cc0000');
        }
        else {
            isStartLocationValidate = true;
        }
        if ($("#startAddressIdDispatcher").val() && $("#startAddressXIdDispatcher").val() && $("#startAddressYIdDispatcher").val() && selectedDriver != 0) {
            isStartLocationValidate = true;
        }
        else {
            isStartLocationValidate = false;
        }
        

    }

    $("#dispatcherDivRefresh").click(function () {
        let currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
        $.ajax({        //onHoldDrivesDispacher
            url: "/api/Dispatcher/GetDrives",
            method: "POST",
            dataType: "json",
            data: {
                Id: currentUser.Id
            },
            success: function (data) {
                let drivesList = JSON.parse(JSON.stringify(data));
                if (drivesList != null) {
                    $("#dispatcherAllDrivesDiv").html("");
                    for (let i = 0; i < drivesList.length; i++) {
                        $("#dispatcherAllDrivesDiv").append("<div class=\"dispatcherSingleDriveDiv\" id=\"dispatcherSingleDriveDiv" + drivesList[i].Id + "\"><p>" +
                            drivesList[i].StartLocation.Address + "</p ><p>" +
                            drivesList[i].DateTime + "</p><p>" +
                            drivesList[i].State + "</p> </div >");

                        if (drivesList[i].Id == displayDrive) {
                            ShowChanges(drivesList[i]);
                        }
                    }
                }
            },
            error: function () {
                alert("Error drive list");
            }
        });
        $.ajax({        //onHoldDrivesDispacher
            url: "/api/Dispatcher/GetOnHoldDrives",
            method: "GET",
            dataType: "json",
            success: function (data) {
                let drivesOnHold = JSON.parse(JSON.stringify(data));
                if (drivesOnHold != null) {
                    $("#onHoldDrivesDispacher").html("");
                    for (let i = 0; i < drivesOnHold.length; i++) {
                        $("#onHoldDrivesDispacher").append("<div class=\"onHoldSingleDriveDispacher\" id=\"onHoldSingleDriveDispacher" + drivesOnHold[i].Id + "\"><p>" +
                            drivesOnHold[i].StartLocation.Address + "</p ><p>" +
                            drivesOnHold[i].DateTime + "</p><p>" +
                            drivesOnHold[i].State + "</p> </div >");
                    }
                }
            },
            error: function () {
                alert("Error on hold drive list");
            }
        });
    });

    var displayDrive;

    $("body").delegate('.dispatcherSingleDriveDiv', 'click', function () {
        //alert($(this).attr("id"));
        let divId = $(this).attr('id');
        let id = divId.substring(24);
        displayDrive = id;      // id kliknutog diva == id prikazane voznje

        $.ajax({
            url: "/api/Dispatcher/GetDriveById",
            method: "GET",
            dataType: "json",
            data: {
                Id: id
            },
            success: function (data) {
                let drive = JSON.parse(JSON.stringify(data));
                //alert("Success");

                ShowChanges(drive);
            },
            error: function () {
                alert("Error drive found");
            }
        });
    });

    $("body").delegate('.onHoldSingleDriveDispacher', 'click', function () {
        //alert($(this).attr("id"));
        let divId = $(this).attr('id');
        let id = divId.substring(26);
        displayDrive = id;      // id kliknutog diva == id prikazane voznje

        $.ajax({
            url: "/api/Dispatcher/GetDriveById",
            method: "GET",
            dataType: "json",
            data: {
                Id: id
            },
            success: function (data) {
                let drive = JSON.parse(JSON.stringify(data));
                ShowChanges(drive);
            },
            error: function () {
                alert("Error drive found");
            }
        });
    });

    $("#chooseDriverDispatcherProcessedClick").click(function () {
        $("#chooseDriverDispatcherClick").click();
    });
    
    $("#dispatcherProcessedDrive").click(function () {
        if (selectedDriver == 0) {
            $("#chooseDriverDispatcherProcessedClick").css('color', '#cc0000');
        }
        else {
            let currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
            $.ajax({
                url: "/api/Dispatcher/ProcessedDrive",
                method: "POST",
                dataType: "json",
                data: {
                    Id: displayDrive,
                    Dispatcher: {
                        Id: currentUser.Id
                    },
                    Driver: {
                        Id: selectedDriver
                    }
                },
                success: function (data) {
                    let drive = JSON.parse(JSON.stringify(data));
                    ShowChanges(drive);
                },
                error: function () {
                    alert("Error process drive");
                }
            });
        }
    });
    

    function ShowChanges(drive) {

        $("#addDriver").hide();
        $("#freeDriversDivCreateDrive").hide();
        $("#onHoldDrivesDispacher").hide();
        $("#dispatcherAllDrivesDiv").show();
        $("#dispatcherCreateDrive").hide();
        $("#dispatcherCreateDriveDiv").hide();
        $("#dispatcherCurrentDriveDivStartLocation").text(drive.StartLocation.Address);
        $("#dispatcherCurrentDriveDivStartLocationX").text(drive.StartLocation.X);
        $("#dispatcherCurrentDriveDivStartLocationY").text(drive.StartLocation.Y);
        if (drive.Destination.Address == "None") {
            $("#dispatcherCurrentDriveDivDestination").text("");
        }
        else {
            $("#dispatcherCurrentDriveDivDestination").text(drive.Destination.Address);
        }
        if (drive.Driver.Name == null || drive.Driver.Phone == null) {
            $("#dispatcherDriverDivName").text("");
            $("#dispatcherDriverDivPhone").text("");
        }
        else {
            $("#dispatcherDriverDivName").text(drive.Driver.Name + " " + drive.Driver.Surname);
            $("#dispatcherDriverDivPhone").text(drive.Driver.Phone);
        }
        $("#dispatcherDriverDivCar").text(drive.Car);
        $("#dispatcherCurrentDriveDiv").show();
        $("#dispatcherDriverDiv").show();
        $("#dispatcherMapsDriveDiv").show();
        $("#dispatcherMapsDriveDivBlack").show();

        if (drive.State == "Created") {
            $("#successfulImgDispatcher").hide();
            $("#unsuccessfulImgDispatcher").hide();
            $("#acceptedImgDispatcher").hide();
            $("#canceledImgDispatcher").hide();
            $("#pleaseWaitImgDispatcher").show();
            $("#chooseDriverDispatcherProcessedClick").show();
            $("#dispatcherMessage").text("");
            $("#dispatcherMessage").show();
            $("#dispatcherStateMessage").css('color', '#ffcc00');
            $("#dispatcherProcessedDrive").show();
        }
        else if (drive.State == "Successful") {
            $("#dispatcherStateMessage").css('color', '#009933');
            $("#unsuccessfulImgDispatcher").hide();
            $("#acceptedImgDispatcher").hide();
            $("#canceledImgDispatcher").hide();
            $("#pleaseWaitImgDispatcher").hide();
            $("#successfulImgDispatcher").show();
            $("#dispatcherMessage").text("");
            $("#dispatcherMessage").hide();
            $("#chooseDriverDispatcherProcessedClick").hide();
            $("#dispatcherProcessedDrive").hide();
        }
        else if (drive.State == "Unsuccessful") {
            $("#dispatcherStateMessage").css('color', '#cc0000');
            $("#successfulImgDispatcher").hide();
            $("#acceptedImgDispatcher").hide();
            $("#canceledImgDispatcher").hide();
            $("#pleaseWaitImgDispatcher").hide();
            $("#unsuccessfulImgDispatcher").show();
            $("#dispatcherMessage").text("");
            $("#dispatcherMessage").hide();
            $("#chooseDriverDispatcherProcessedClick").hide();
            $("#dispatcherProcessedDrive").hide();
        }
        else if (drive.State == "Accepted") {
            $("#dispatcherStateMessage").css('color', '#009933');
            $("#successfulImgDispatcher").hide();
            $("#unsuccessfulImgDispatcher").hide();
            $("#canceledImgDispatcher").hide();
            $("#pleaseWaitImgDispatcher").hide();
            $("#acceptedImgDispatcher").show();
            $("#dispatcherMessage").text("");
            $("#dispatcherMessage").hide();
            $("#chooseDriverDispatcherProcessedClick").hide();
            $("#dispatcherProcessedDrive").hide();
        }
        else if (drive.State == "Canceled") {
            $("#dispatcherStateMessage").css('color', '#cc0000');
            $("#successfulImgDispatcher").hide();
            $("#unsuccessfulImgDispatcher").hide();
            $("#acceptedImgDispatcher").hide();
            $("#pleaseWaitImgDispatcher").hide();
            $("#canceledImgDispatcher").show();
            $("#dispatcherMessage").text("");
            $("#dispatcherMessage").hide();
            $("#chooseDriverDispatcherProcessedClick").hide();
            $("#dispatcherProcessedDrive").hide();
        }
        else {
            $("#successfulImgDispatcher").hide();
            $("#unsuccessfulImgDispatcher").hide();
            $("#acceptedImgDispatcher").hide();
            $("#canceledImgDispatcher").hide();
            $("#pleaseWaitImgDispatcher").hide();
            $("#dispatcherMessage").text("");
            $("#dispatcherMessage").hide();
            $("#chooseDriverDispatcherProcessedClick").hide();
            $("#dispatcherProcessedDrive").hide();
        }
        $("#dispatcherStateMessage").text(drive.State);
        $("#dispatcherStateMessage").show();
    }

    $("#onHoldDrivesDispacher").click(function () {

    });

});