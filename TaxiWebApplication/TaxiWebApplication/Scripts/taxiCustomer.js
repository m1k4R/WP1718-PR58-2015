$(document).ready(function () {

    $("#customerActionCreateDrive").click(function () {
        $("#accountDiv").hide();
        $("#customerDiv").show();
        $("#customerCreateDrive").click();
    });
    $("#customerCreateDrive").click(function () {

        $("#customerCurrentDriveDiv").hide();
        $("#customerDriverDiv").hide();
        $("#customerMapsDriveDiv").hide();

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
                    sessionStorage.setItem("currentDrive", JSON.stringify(data));
                    let drive = JSON.parse(sessionStorage.getItem("currentDrive"));
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
                    $("#customerCreateDrive").hide();
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
            isUpdateValidate = true;
        }
        else {
            isUpdateValidate = false;
        }

    }
});