$(document).ready(function () {

    $("#customerActionCreateDrive").click(function () {
        $("#accountDiv").hide();
        $("#customerDiv").show();
        $("#customerCreateDrive").click();
    });
    $("#customerCreateDrive").click(function () {

        $("#customerCreateDrive").hide();
        $("#customerCurrentDriveDiv").hide();
        $("#customerDriverDiv").hide();
        $("#customerMapsDriveDiv").show();
        $("#customerMapsDriveDivBlack").hide();

        $("#startAddressIdCustomer").val("");
        $("#startAddressXIdCustomer").val("");
        $("#startAddressYIdCustomer").val("");
        $("#startAddressIdCustomer").attr("placeholder", "").placeholder;
        $("#startAddressXIdCustomer").attr("placeholder", "").placeholder;
        $("#startAddressYIdCustomer").attr("placeholder", "").placeholder;
        $("#customerCreateDriveDiv").show();
    });
    $("#cancelCreateDriveCustomerClick").click(function () {
        $("#customerCreateDriveDiv").hide();
        $("#customerCreateDrive").show();
        $("#customerMapsDriveDivBlack").show();
    });

    var isCustomerLocationValidate = false;

    $("#createDriveCustomerClick").click(function () {
        CustomerLocationValidate();
        if (isCustomerLocationValidate) {
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
                    //sessionStorage.setItem("currentDrive", JSON.stringify(data));   
                    //let drive = JSON.parse(sessionStorage.getItem("currentDrive"));
                    let drive = JSON.parse(JSON.stringify(data));
                    alert("Success");
                    $("#cancelCreateDriveCustomerClick").click();
                    $("#customerCurrentDriveDivStartLocation").text(drive.StartLocation.Address);
                    $("#customerCurrentDriveDivStartLocationX").text(drive.StartLocation.X);
                    $("#customerCurrentDriveDivStartLocationY").text(drive.StartLocation.Y);
                    $("#customerCurrentDriveDivDestination").text(drive.Destination.Address);
                    $("#customerDriverDivName").text(drive.Driver.Name);
                    $("#customerDriverDivPhone").text(drive.Driver.Phone);
                    $("#customerDriverDivCar").text(drive.Car);
                    $("#customerCurrentDriveDiv").show();
                    $("#customerDriverDiv").show();
                    $("#customerMapsDriveDiv").show();
                    $("#customerMapsDriveDivBlack").show();
                    $("#customerCreateDrive").hide();
                    $("#pleaseWaitImg").show();
                    $("#customerMessage").text("Please wait . . .");
                    $("#customerMessage").show();
                    $("#customerStateMessage").text(drive.State);
                    $("#customerStateMessage").show();
                },
                error: function () {
                    alert("Error add drive");
                }
            });
        }
    });

    function CustomerLocationValidate() {

        if ($("#startAddressIdCustomer").val()) {
            isCustomerLocationValidate = true;
        }
        else {
            $("#startAddressIdCustomer").attr("placeholder", "Enter your address").placeholder;
            isCustomerLocationValidate = false;
        }
        if ($("#startAddressXIdCustomer").val()) {
            isCustomerLocationValidate = true;
            let x = $("#startAddressXIdCustomer").val();
            if (isNaN(x)) {  // vraca true ako nije broj
                $("#startAddressXIdCustomer").val("");
                $("#startAddressXIdCustomer").attr("placeholder", "Must be a number").placeholder;
                isCustomerLocationValidate = false;
            }
        }
        else {
            $("#startAddressXIdCustomer").attr("placeholder", "Enter your x coordinate").placeholder;
            isCustomerLocationValidate = false;
        }
        if ($("#startAddressYIdCustomer").val()) {
            isCustomerLocationValidate = true;
            let y = $("#startAddressYIdCustomer").val();
            if (isNaN(y)) {  // vraca true ako nije broj
                $("#startAddressYIdCustomer").val("");
                $("#startAddressYIdCustomer").attr("placeholder", "Must be a number").placeholder;
                isCustomerLocationValidate = false;
            }
        }
        else {
            $("#startAddressYIdCustomer").attr("placeholder", "Enter your y coordinate").placeholder;
            isCustomerLocationValidate = false;
        }
        if ($("#startAddressIdCustomer").val() && $("#startAddressXIdCustomer").val() && $("#startAddressYIdCustomer").val()) {
            isCustomerLocationValidate = true;
        }
        else {
            isCustomerLocationValidate = false;
        }

    }
    
    $("#customerDivRefresh").click(function () {
            let currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
            $.ajax({
                url: "/api/Customer/GetDrives",
                method: "POST",
                dataType: "json",
                data: {
                    Id: currentUser.Id
                },
                success: function (data) {
                    let drivesList = JSON.parse(JSON.stringify(data));
                    if (drivesList != null) {
                        $("#customerAllDrivesDiv").html("");
                        for (let i = 0; i < drivesList.length; i++) {
                            $("#customerAllDrivesDiv").append("<div class=\"customerSingleDriveDiv\" id=\"customerSingleDriveDiv" + drivesList[i].Id + "\"><p>" +
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
    });

    var displayDrive;

    $("body").delegate('.customerSingleDriveDiv', 'click', function () {
        //alert($(this).attr("id"));
        let divId = $(this).attr('id');
        let id = divId.substring(22);
        displayDrive = id;      // id kliknutog diva == id prikazane voznje

        $.ajax({
                url: "/api/Customer/GetDriveById",
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

    function ShowChanges(drive) {

        $("#customerCurrentDriveDivStartLocation").text(drive.StartLocation.Address);
        $("#customerCurrentDriveDivStartLocationX").text(drive.StartLocation.X);
        $("#customerCurrentDriveDivStartLocationY").text(drive.StartLocation.Y);
        $("#customerCurrentDriveDivDestination").text(drive.Destination.Address);
        $("#customerDriverDivName").text(drive.Driver.Name);
        $("#customerDriverDivPhone").text(drive.Driver.Phone);
        $("#customerDriverDivCar").text(drive.Car);
        $("#customerCurrentDriveDiv").show();
        $("#customerDriverDiv").show();
        $("#customerMapsDriveDiv").show();
        $("#customerMapsDriveDivBlack").show();
        if (drive.State == "Created") {
            $("#successfulImg").hide();
            $("#unsuccessfulImg").hide();
            $("#acceptedImg").hide();
            $("#canceledImg").hide();
            $("#pleaseWaitImg").show();
            $("#customerMessage").text("Please wait . . .");
            $("#customerMessage").show();
            $("#customerStateMessage").css('color', '#ffcc00');
        }
        else if (drive.State == "Successful") {
            $("#customerStateMessage").css('color', '#009933');
            $("#unsuccessfulImg").hide();
            $("#acceptedImg").hide();
            $("#canceledImg").hide();
            $("#pleaseWaitImg").hide();
            $("#successfulImg").show();
            $("#customerMessage").text("");
            $("#customerMessage").hide();
        }
        else if (drive.State == "Unsuccessful") {
            $("#customerStateMessage").css('color', '#cc0000');
            $("#successfulImg").hide();
            $("#acceptedImg").hide();
            $("#canceledImg").hide();
            $("#pleaseWaitImg").hide();
            $("#unsuccessfulImg").show();
            $("#customerMessage").text("");
            $("#customerMessage").hide();
        }
        else if (drive.State == "Accepted") {
            $("#customerStateMessage").css('color', '#009933');
            $("#successfulImg").hide();
            $("#unsuccessfulImg").hide();
            $("#canceledImg").hide();
            $("#pleaseWaitImg").hide();
            $("#acceptedImg").show();
            $("#customerMessage").text("");
            $("#customerMessage").hide();
        }
        else if (drive.State == "Canceled") {
            $("#customerStateMessage").css('color', '#cc0000');
            $("#successfulImg").hide();
            $("#unsuccessfulImg").hide();
            $("#acceptedImg").hide();
            $("#pleaseWaitImg").hide();
            $("#canceledImg").show();
            $("#customerMessage").text("");
            $("#customerMessage").hide();
        }
        else {
            $("#successfulImg").hide();
            $("#unsuccessfulImg").hide();
            $("#acceptedImg").hide();
            $("#canceledImg").hide();
            $("#pleaseWaitImg").hide();
            $("#customerMessage").text("");
            $("#customerMessage").hide();
        }
        $("#customerStateMessage").text(drive.State);
        $("#customerStateMessage").show();
    }

});