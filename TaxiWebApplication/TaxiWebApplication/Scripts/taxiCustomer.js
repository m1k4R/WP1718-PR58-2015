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
        $("#saveChangesDriveCustomerClick").hide();
        $("#cancelChangesDriveCustomerClick").hide();
        $("#createDriveCustomerClick").show();
        $("#cancelCreateDriveCustomerClick").show();

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
        $("#customerMapsDriveDiv").hide();
        $("#customerMapsDriveDivBlack").hide();
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
                    Car: $( "#carIdCustomer option:selected" ).text() 
                    //$("select[name=carCustomer]").filter(":selected").val()
                    
                },
                success: function (data) {
                    //sessionStorage.setItem("currentDrive", JSON.stringify(data));   
                    //let drive = JSON.parse(sessionStorage.getItem("currentDrive"));
                    let drive = JSON.parse(JSON.stringify(data));
                    displayDrive = drive.Id;
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
                    $("#successfulImg").hide();
                    $("#unsuccessfulImg").hide();
                    $("#acceptedImg").hide();
                    $("#canceledImg").hide();
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

        $("#customerCreateDrive").hide();
        $("#customerCreateDriveDiv").hide();
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
            $("#customerEditDriveImg").show();
            $("#customerMessage").text("Please wait . . .");
            $("#customerMessage").show();
            $("#customerStateMessage").css('color', '#ffcc00');
            if (drive.Dispatcher.Id == 0) {
                $("#customerCancelDrive").show();
            }
            else {
                $("#customerCancelDrive").hide();
            }
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
            $("#customerEditDriveImg").hide();
            $("#customerCancelDrive").hide();
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
            $("#customerEditDriveImg").hide();
            $("#customerCancelDrive").hide();
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
            $("#customerEditDriveImg").hide();
            $("#customerCancelDrive").hide();
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
            $("#customerEditDriveImg").hide();
            $("#customerCancelDrive").hide();
        }
        else {
            $("#successfulImg").hide();
            $("#unsuccessfulImg").hide();
            $("#acceptedImg").hide();
            $("#canceledImg").hide();
            $("#pleaseWaitImg").hide();
            $("#customerMessage").text("");
            $("#customerMessage").hide();
            $("#customerEditDriveImg").hide();
            $("#customerCancelDrive").hide();
        }
        $("#customerStateMessage").text(drive.State);
        $("#customerStateMessage").show();
    }

    $("#customerEditDriveImg").click(function () {

        $.ajax({
            url: "/api/Customer/GetDriveById",
            method: "GET",
            dataType: "json",
            data: {
                Id: displayDrive
            },
            success: function (data) {
                let drive = JSON.parse(JSON.stringify(data));

                if (drive.State == "Created") {
                    $("#customerCreateDrive").click();
                    $("#startAddressIdCustomer").val(drive.StartLocation.Address);
                    $("#startAddressXIdCustomer").val(drive.StartLocation.X);
                    $("#startAddressYIdCustomer").val(drive.StartLocation.Y);
                    $("select[name=carCustomer]").filter(":selected").val(drive.Car);
                    $("#createDriveCustomerClick").hide();
                    $("#cancelCreateDriveCustomerClick").hide();
                    $("#saveChangesDriveCustomerClick").show();
                    $("#cancelChangesDriveCustomerClick").show();
                }
                else {
                    ShowChanges(drive);
                }
            },
            error: function () {
                alert("Error drive found");
            }
        });
    });

    // na klik save changes opet saljem zahtjev da vidim dal je i dalje u stanju sreated ako jeste onda saljem .ajax da edituje, implementirati u driveData
    $("#saveChangesDriveCustomerClick").click(function () {

        CustomerLocationValidate();
        if (isCustomerLocationValidate) {
            $.ajax({
                url: "/api/Customer/GetDriveById",
                method: "GET",
                dataType: "json",
                data: {
                    Id: displayDrive
                },
                success: function (data) {
                    let drive = JSON.parse(JSON.stringify(data));

                    if (drive.State == "Created") {
                        $.ajax({
                            url: "/api/Customer/EditDrive",
                            method: "POST",
                            dataType: "json",
                            data: {
                                Id: drive.Id,
                                StartLocation: {
                                    Address: $("#startAddressIdCustomer").val(),
                                    X: $("#startAddressXIdCustomer").val(),
                                    Y: $("#startAddressYIdCustomer").val()
                                },
                                Car: $("#carIdCustomer option:selected").text() 
                            },
                            success: function (data) {
                                let driveEdit = JSON.parse(JSON.stringify(data));

                                ShowChanges(driveEdit);
                            },
                            error: function () {
                                alert("Error edit drive");
                            }
                        });
                    }
                    else {
                        ShowChanges(drive);
                    }
                },
                error: function () {
                    alert("Error drive found");
                }
            });
        }
    });

    $("#cancelChangesDriveCustomerClick").click(function () {
        $.ajax({
            url: "/api/Customer/GetDriveById",
            method: "GET",
            dataType: "json",
            data: {
                Id: displayDrive
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

    $("#customerCancelDrive").click(function () {

        $.ajax({
            url: "/api/Customer/CancelDrive",
            method: "POST",
            dataType: "json",
            data: {
                Id: displayDrive
            },
            success: function (data) {
                let driveCancel = JSON.parse(JSON.stringify(data));
                ShowChanges(driveCancel);
                $("#commentDivBlack").show();
            },
            error: function () {
                alert("Error cancel drive");
            }
        });
       
    });

    $("#customerSendComment").click(function () {

        let currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
        $.ajax({
            url: "/api/Customer/CreateComment",
            method: "POST",
            dataType: "json",
            data: {
                Description: $("#enterComment").val(),
                Grade: $("#gradeComment").val(),
                User: {
                    Id: currentUser.Id
                },
                Drive: {
                    Id: displayDrive
                }
            },
            success: function (data) {
                let comment = JSON.parse(JSON.stringify(data));
                $("#commentDivBlack").hide();
                $("#customerMessage").text("Comment: " + comment.Description);
                $("#customerMessage").show();
                $("#customerCreateDrive").show();
            },
            error: function () {
                alert("Error comment");
            }
        });

    });
});