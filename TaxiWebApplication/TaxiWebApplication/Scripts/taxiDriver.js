$(document).ready(function () {

    $("#driverActionChangeLocation").click(function () {
        $("#accountDiv").hide();
        $("#driverDiv").show();
        $("#driverChangeLocation").click();
    });
    $("#driverChangeLocation").click(function () {
        $("#onHoldDrivesDriver").hide();
        $("#driverCurrentDriveDiv").hide();
        $("#driverCustomerDiv").hide();
        $("#driverMapsDriveDiv").show();
        $("#driverMapsDriveDivBlack").hide();
        $("#changeLocationDriverClick").show();
        $("#cancelLocationDriverClick").show();

        $("#changeAddressIdDriver").val("");
        $("#changeXIdDriver").val("");
        $("#changeYIdDriver").val("");
        $("#changeAddressIdDriver").attr("placeholder", "").placeholder;
        $("#changeXIdDriver").attr("placeholder", "").placeholder;
        $("#changeYIdDriver").attr("placeholder", "").placeholder;

        let currentUser = JSON.parse(sessionStorage.getItem("currentUser"))
        $.ajax({
            url: "/api/Driver/GetDriverById",
            method: "GET",
            dataType: "json",
            data: {
                Id: currentUser.Id
            },
            success: function (data) {
                let driver = JSON.parse(JSON.stringify(data));

                $("#changeAddressIdDriver").val(driver.Location.Address);
                $("#changeXIdDriver").val(driver.Location.X);
                $("#changeYIdDriver").val(driver.Location.Y);
            },
            error: function () {
                alert("Error driver found");
            }
        });

        $("#driverChangeLocationDiv").show();
    });

    $("#cancelLocationDriverClick").click(function () {
        $("#driverChangeLocationDiv").hide();
        $("#homeButton").click();
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
                    Username: currentUser.Username,
                    Id: currentUser.Id,
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

        if ($("#changeAddressIdDriver").val().trim() != "") {
            isDriverLocationValidate = true;
        }
        else {
            $("#changeAddressIdDriver").val("");
            $("#changeAddressIdDriver").attr("placeholder", "Enter your address").placeholder;
            isDriverLocationValidate = false;
        }
        if ($("#changeXIdDriver").val().trim() != "") {
            isDriverLocationValidate = true;
            let x = $("#changeXIdDriver").val();
            if (isNaN(x)) {  // vraca true ako nije broj
                $("#changeXIdDriver").val("");
                $("#changeXIdDriver").attr("placeholder", "Must be a number").placeholder;
                isDriverLocationValidate = false;
            }
        }
        else {
            $("#changeXIdDriver").val("");
            $("#changeXIdDriver").attr("placeholder", "Enter your x coordinate").placeholder;
            isDriverLocationValidate = false;
        }
        if ($("#changeYIdDriver").val().trim() != "") {
            isDriverLocationValidate = true;
            let y = $("#changeYIdDriver").val();
            if (isNaN(y)) {  // vraca true ako nije broj
                $("#changeYIdDriver").val("");
                $("#changeYIdDriver").attr("placeholder", "Must be a number").placeholder;
                isDriverLocationValidate = false;
            }
        }
        else {
            $("#changeYIdDriver").val("");
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

    //************************ Driver New *************************
    $("#searchDriver").click(function () {
        $("#searchDriverDiv").slideToggle();
    });

    $("#resetButtonDriver").click(function () {
        $("input[type='text'], textarea").val("");
        $("input[type='number'], textarea").val("");
        $("input[type='date'], textarea").val("");
        $("select").each(function () {
            this.selectedIndex = 0;
        });
    });
    

    $("#searchButtonDriver").click(function () {
        filtersOn = true;
        displayDrive = 0; // nisam sigurna za ovo
        let currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
        let filters;
        filters = {
            driverId: currentUser.Id,
            filter: $("#filterDriver option:selected").text(),
            sort: $("#sortDriver option:selected").text(),
            fromDate: $("#fromDateDriver").val(),
            toDate: $("#toDateDriver").val(),
            fromGrade: $("#fromGradeDriver option:selected").text(),
            toGrade: $("#toGradeDriver option:selected").text(),
            fromPrice: $("#fromPriceDriver").val(),
            toPrice: $("#toPriceDriver").val(),
        };

        $.ajax({
            url: "/api/Driver/GetFilteredDrives",
            type: "POST",
            contentType: 'application/json; charset=utf-8',
            dataType: "json",
            data: JSON.stringify(filters),
            success: function (data) {
                let drivesList = JSON.parse(JSON.stringify(data));
                if (drivesList != null) {
                    $("#driverAllDrivesDiv").html("");
                    for (let i = 0; i < drivesList.length; i++) {
                        $("#driverAllDrivesDiv").append("<div class=\"driverSingleDriveDiv\" id=\"driverSingleDriveDiv" + drivesList[i].Id + "\"><p>" +
                            drivesList[i].StartLocation.Address.slice(0, drivesList[i].StartLocation.Address.indexOf(",")) + "</p ><p>" +
                            drivesList[i].DateTime + "</p><p>" +
                            drivesList[i].State + "</p> </div >");

                        if (drivesList[i].Id == displayDrive) {
                            ShowChanges(drivesList[i]);
                        }
                    }
                }
                $("#searchDriverDiv").fadeOut();
            },
            error: function () {
                alert("Error filter drive list");
            }
        });
    });

    $("#driverDivRefresh").click(function () {
        if (!filtersOn) {
            let currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
            $.ajax({
                url: "/api/Driver/GetDrives",
                method: "POST",
                dataType: "json",
                data: {
                    Id: currentUser.Id
                },
                success: function (data) {
                    let drivesList = JSON.parse(JSON.stringify(data));
                    if (drivesList != null) {
                        $("#driverAllDrivesDiv").html("");
                        for (let i = 0; i < drivesList.length; i++) {
                            $("#driverAllDrivesDiv").append("<div class=\"driverSingleDriveDiv\" id=\"driverSingleDriveDiv" + drivesList[i].Id + "\"><p>" +
                                drivesList[i].StartLocation.Address.slice(0, drivesList[i].StartLocation.Address.indexOf(",")) + "</p ><p>" +
                                drivesList[i].DateTime + "</p><p>" +
                                drivesList[i].State + "</p> </div >");

                            if (drivesList[i].State == "Processed" || drivesList[i].State == "Formated") {
                                if (drivesList[i].Driver.Id == currentUser.Id) {
                                    displayDrive = drivesList[i].Id;
                                    ShowChanges(drivesList[i]);
                                }
                            }
                            else if (drivesList[i].Id == displayDrive) {
                                ShowChanges(drivesList[i]);
                            }

                        }
                    }
                },
                error: function () {
                    alert("Error drive list");
                }
            });
        }
        $.ajax({        //onHoldDrivesDriver
            url: "/api/Driver/GetOnHoldDrives",
            method: "GET",
            dataType: "json",
            success: function (data) {
                let drivesOnHold = JSON.parse(JSON.stringify(data));
                if (drivesOnHold != null) {
                    $("#onHoldDrivesDriver").html("");
                    for (let i = 0; i < drivesOnHold.length; i++) {
                        $("#onHoldDrivesDriver").append("<div class=\"onHoldSingleDriveDriver\" id=\"onHoldSingleDriveDriver" + drivesOnHold[i].Id + "\"><p>" +
                            drivesOnHold[i].StartLocation.Address.slice(0, drivesOnHold[i].StartLocation.Address.indexOf(",")) + "</p ><p>" +
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

    $("body").delegate('.driverSingleDriveDiv', 'click', function () {
        let divId = $(this).attr('id');
        let id = divId.substring(20);
        displayDrive = id;      // id kliknutog diva == id prikazane voznje

        $.ajax({
            url: "/api/Driver/GetDriveById",
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

    $("body").delegate('.onHoldSingleDriveDriver', 'click', function () {
        let divId = $(this).attr('id');
        let id = divId.substring(23);
        displayDrive = id;      // id kliknutog diva == id prikazane voznje

        $.ajax({
            url: "/api/Driver/GetDriveById",
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

    $("#driverAcceptDrive").click(function () {
        let currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
        $.ajax({
            url: "/api/Driver/AcceptedDrive",
            method: "POST",
            dataType: "json",
            data: {
                Id: displayDrive,
                Driver: {
                    Id: currentUser.Id
                }
            },
            success: function (data) {
                let drive = JSON.parse(JSON.stringify(data));
                ShowChanges(drive);
            },
            error: function () {
                alert("Error accepted drive");
            }
        });
        
    });

    $("#driverNoDrive").click(function () {
        $("#enterCommentDriver").val("");
        $("#destinationPriceDivDriver").hide();
        $("#commentDivBlackDriver").show();
    });

    $("#driverSendComment").click(function () {

        if ($("#enterCommentDriver").val().trim() != "") {
            let currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
            $.ajax({
                url: "/api/Driver/UnsuccessfulDrive",
                method: "POST",
                dataType: "json",
                data: {
                    Description: $("#enterCommentDriver").val(),
                    User: {
                        Id: currentUser.Id
                    },
                    Drive: {
                        Id: displayDrive
                    }
                },
                success: function (data) {
                    let unsuccessfulDrive = JSON.parse(JSON.stringify(data));
                    $("#commentDivBlackDriver").hide();
                    ShowChanges(unsuccessfulDrive);
                    $("#driverMessage").text("Comment: " + unsuccessfulDrive.Comment.Description);
                    $("#driverMessage").show();
                },
                error: function () {
                    alert("Error unsuccessful drive");
                }
            });
        }
        else {
            $("#enterCommentDriver").val("Enter your comment here . . .");
        }
    });

    $("#driverYesDrive").click(function () {
        $("#driverDestination").val("");
        $("#driverDestinationX").val("");
        $("#driverDestinationY").val("");
        $("#driverPrice").val("");
        $("#commentDivDriver").hide();
        $("#destinationPriceDivDriver").show();
        $("#commentDivBlackDriver").show();
    });

    $("#driverSendDestinationPrice").click(function () {

        if ($("#driverDestination").val().trim() != "" && $("#driverDestinationX").val().trim() != "" && $("#driverDestinationY").val().trim() != "" && $("#driverPrice").val().trim() != "") {
            let currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
            $.ajax({
                url: "/api/Driver/SuccessfulDrive",
                method: "POST",
                dataType: "json",
                data: {
                    Id: displayDrive,
                    Destination: {
                        Address: $("#driverDestination").val(),
                        X: $("#driverDestinationX").val(),
                        Y: $("#driverDestinationY").val()
                    },
                    Price: $("#driverPrice").val()
                },
                success: function (data) {
                    let successfulDrive = JSON.parse(JSON.stringify(data));
                    $("#commentDivBlackDriver").hide();
                    ShowChanges(successfulDrive);
                },
                error: function () {
                    alert("Error successful drive");
                }
            });
        }
        else {
            $("#driverDestination").val("");
            $("#driverDestinationX").val("");
            $("#driverDestinationY").val("");
            $("#driverPrice").val("");
            $("#driverDestination").attr("placeholder", "Enter your destination").placeholder;
            $("#driverDestinationX").attr("placeholder", "Enter x coordinates").placeholder;
            $("#driverDestinationY").attr("placeholder", "Enter y coordinates").placeholder;
            $("#driverPrice").attr("placeholder", "Enter price").placeholder;
        }
    });
    
    function ShowChanges(drive) {
        
        $("#driverChangeLocationDiv").hide();
        $("#onHoldDrivesDriver").hide();
        $("#driverCurrentDriveDivStartLocation").text(drive.StartLocation.Address);
        if (drive.Destination.Address == "None") {
            $("#driverCurrentDriveDivDestination").text("");
        }
        else {
            $("#driverCurrentDriveDivDestination").text(drive.Destination.Address);
        }
        if (drive.State == "Successful") {
            $("#driverCurrentDriveDivPrice").text(drive.Price);
            $("#driverCurrentDriveDivDate").text(drive.DateTime);
        }
        else {
            $("#driverCurrentDriveDivPrice").text("");
            $("#driverCurrentDriveDivDate").text("");
        }
        if (drive.Dispatcher.Id != 0) {
            $("#driverCustomerDivName").text("");
            $("#driverCustomerDivPhone").text("");
        }
        else {
            $("#driverCustomerDivName").text(drive.Customer.Name + " " + drive.Customer.Surname);
            $("#driverCustomerDivPhone").text(drive.Customer.Phone);
        }
        $("#driverCustomerDivCar").text(drive.Car);
        $("#driverCurrentDriveDiv").show();
        $("#driverCustomerDiv").show();
        $("#driverMapsDriveDiv").show();
        $("#driverMapsDriveDivBlack").show();

        if (drive.State == "Created") {
            $("#successfulImgDriver").hide();
            $("#unsuccessfulImgDriver").hide();
            $("#acceptedImgDriver").hide();
            $("#canceledImgDriver").hide();
            $("#processImgDriver").hide();
            $("#pleaseWaitImgDriver").show();
            //$("#driverEditDriveImg").show();  // ova funkcionalnost kada se zavrsi voznja
            $("#driverMessage").text("Customer is waiting . . .");
            $("#driverMessage").show();
            $("#driverState").show();
            $("#driverStateMessage").css('color', '#ffcc00');
            $("#driverAcceptDrive").css('backgroundColor', '#009933');
            $("#driverAcceptDrive").css('borderColor', '#009933');
            $("#driverAcceptDrive").html('Accept');
            $("#driverAcceptDrive").show();
            $("#driverYesDrive").hide();
            $("#driverNoDrive").hide();
        }
        else if (drive.State == "Successful") {
            $("#driverState").show();
            $("#driverStateMessage").css('color', '#009933');
            $("#unsuccessfulImgDriver").hide();
            $("#acceptedImgDriver").hide();
            $("#canceledImgDriver").hide();
            $("#pleaseWaitImgDriver").hide();
            $("#processImgDriver").hide();
            $("#successfulImgDriver").show();
            $("#driverMessage").text(drive.Customer.Username + ": " + drive.Comment.Description + " (" + drive.Comment.Grade + ")  [" + drive.Comment.CreatedDateTime + "]");
            $("#driverMessage").show();
            //$("#driverEditDriveImg").hide();
            $("#driverAcceptDrive").hide();
            $("#driverYesDrive").hide();
            $("#driverNoDrive").hide();
        }
        else if (drive.State == "Unsuccessful") {
            $("#driverState").show();
            $("#driverStateMessage").css('color', '#cc0000');
            $("#successfulImgDriver").hide();
            $("#acceptedImgDriver").hide();
            $("#canceledImgDriver").hide();
            $("#pleaseWaitImgDriver").hide();
            $("#processImgDriver").hide();
            $("#unsuccessfulImgDriver").show();
            $("#driverMessage").text(drive.Driver.Username + ": " + drive.Comment.Description + " (" + drive.Comment.Grade + ")  [" + drive.Comment.CreatedDateTime + "]");
            $("#driverMessage").show();
            //$("#driverEditDriveImg").hide();
            $("#driverAcceptDrive").hide();
            $("#driverYesDrive").hide();
            $("#driverNoDrive").hide();
        }
        else if (drive.State == "Accepted") {
            $("#driverState").show();
            $("#driverStateMessage").css('color', '#009933');
            $("#successfulImgDriver").hide();
            $("#unsuccessfulImgDriver").hide();
            $("#canceledImgDriver").hide();
            $("#pleaseWaitImgDriver").hide();
            $("#processImgDriver").hide();
            $("#acceptedImgDriver").show();
            $("#driverMessage").text("");
            $("#driverMessage").hide();
            // $("#driverEditDriveImg").hide();
            $("#driverYesDrive").show();
            $("#driverNoDrive").show();
            $("#driverYesDrive").html('Successful');
            $("#driverNoDrive").html('Unsuccessful');
            $("#driverAcceptDrive").hide();
            // dodati dugme za neuspjesna
        }
        else if (drive.State == "Canceled") {
            $("#driverState").show();
            $("#driverStateMessage").css('color', '#cc0000');
            $("#successfulImgDriver").hide();
            $("#unsuccessfulImgDriver").hide();
            $("#acceptedImgDriver").hide();
            $("#pleaseWaitImgDriver").hide();
            $("#processImgDriver").hide();
            $("#canceledImgDriver").show();
            $("#driverMessage").text(drive.Customer.Username + ": " + drive.Comment.Description + " (" + drive.Comment.Grade + ")  [" + drive.Comment.CreatedDateTime + "]");
            $("#driverMessage").show();
           // $("#driverEditDriveImg").hide();
            $("#driverAcceptDrive").hide();
            $("#driverYesDrive").hide();
            $("#driverNoDrive").hide();
        }
        else if (drive.State == "Processed" || drive.State == "Formated") {
            $("#successfulImgDriver").hide();
            $("#unsuccessfulImgDriver").hide();
            $("#acceptedImgDriver").hide();
            $("#canceledImgDriver").hide();
            $("#pleaseWaitImgDriver").hide();
            $("#processImgDriver").show();
            $("#driverMessage").text("");
            $("#driverMessage").hide();
            //$("#driverEditDriveImg").hide();
            $("#driverAcceptDrive").hide();
            $("#driverYesDrive").show();
            $("#driverNoDrive").show();
            $("#driverYesDrive").html('Successful');
            $("#driverNoDrive").html('Unsuccessful');
            $("#driverStateMessage").css('color', '#339966');
        }
        $("#driverState").show();
        $("#driverStateMessage").text(drive.State);
        $("#driverStateMessage").show();
    }
   
});