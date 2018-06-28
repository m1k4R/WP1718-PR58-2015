var myLat;
var myLng;
var markers = [];

function initMap() {
    var mapCustomer = new google.maps.Map(document.getElementById('customerMapsDriveDiv'), {
        zoom: 14,
        center: { lat: 45.2671, lng: 19.8335 }
    });

    mapCustomer.addListener('click', function (e) {
        placeMarkerAndPanTo(e.latLng, mapCustomer);
        geocodeLatLng();
    });

    var mapDispatcher = new google.maps.Map(document.getElementById('dispatcherMapsDriveDiv'), {
        zoom: 14,
        center: { lat: 45.2671, lng: 19.8335 }
    });

    mapDispatcher.addListener('click', function (e) {
        placeMarkerAndPanTo(e.latLng, mapDispatcher);
        geocodeLatLngDispatcher();
    });

    var mapDriver = new google.maps.Map(document.getElementById('driverMapsDriveDiv'), {
        zoom: 14,
        center: { lat: 45.2671, lng: 19.8335 }
    });

    mapDriver.addListener('click', function (e) {
        placeMarkerAndPanTo(e.latLng, mapDriver);
        geocodeLatLngDriver();
    }); 

    var mapDestination = new google.maps.Map(document.getElementById('chooseDestinationMap'), {
        zoom: 14,
        center: { lat: 45.2671, lng: 19.8335 }
    });

    mapDestination.addListener('click', function (e) {
        placeMarkerAndPanTo(e.latLng, mapDestination);
        geocodeLatLngDestination();
    });
}

function geocodeLatLng() {
    $.ajax({
        type: 'GET',
        url: 'https://nominatim.openstreetmap.org/reverse',
        data: {
            format: 'jsonv2',
            lat: myLat,
            lon: myLng
        },
        dataType: 'json',
        success: function (data) {
            let adresa = data.address.road + ' ' + data.address.house_number + ', ' + data.address.city + ' ' + data.address.postcode;
            $('#startAddressIdCustomer').attr('readonly', true);
            $('#startAddressXIdCustomer').attr('readonly', true);
            $('#startAddressYIdCustomer').attr('readonly', true);
            $('#startAddressIdCustomer').val(adresa);
            $('#startAddressXIdCustomer').val(data.lat);
            $('#startAddressYIdCustomer').val(data.lon);

        },
        error: function () {
            alert("Error while getting address.");
        }
    });
}

function geocodeLatLngDispatcher() {
    $.ajax({
        type: 'GET',
        url: 'https://nominatim.openstreetmap.org/reverse',
        data: {
            format: 'jsonv2',
            lat: myLat,
            lon: myLng
        },
        dataType: 'json',
        success: function (data) {
            let adresa = data.address.road + ' ' + data.address.house_number + ', ' + data.address.city + ' ' + data.address.postcode;
            $('#startAddressIdDispatcher').attr('readonly', true);
            $('#startAddressXIdDispatcher').attr('readonly', true);
            $('#startAddressYIdDispatcher').attr('readonly', true);
            $('#startAddressIdDispatcher').val(adresa);
            $('#startAddressXIdDispatcher').val(data.lat);
            $('#startAddressYIdDispatcher').val(data.lon);

        },
        error: function () {
            alert("Error while getting address.");
        }
    });
}

function geocodeLatLngDriver() {
    $.ajax({
        type: 'GET',
        url: 'https://nominatim.openstreetmap.org/reverse',
        data: {
            format: 'jsonv2',
            lat: myLat,
            lon: myLng
        },
        dataType: 'json',
        success: function (data) {
            let adresa = data.address.road + ' ' + data.address.house_number + ', ' + data.address.city + ' ' + data.address.postcode;
            $('#changeAddressIdDriver').attr('readonly', true);
            $('#changeXIdDriver').attr('readonly', true);
            $('#changeYIdDriver').attr('readonly', true);
            $('#changeAddressIdDriver').val(adresa);
            $('#changeXIdDriver').val(data.lat);
            $('#changeYIdDriver').val(data.lon);

        },
        error: function () {
            alert("Error while getting address.");
        }
    });
}

function geocodeLatLngDestination() {
    $.ajax({
        type: 'GET',
        url: 'https://nominatim.openstreetmap.org/reverse',
        data: {
            format: 'jsonv2',
            lat: myLat,
            lon: myLng
        },
        dataType: 'json',
        success: function (data) {
            let adresa = data.address.road + ' ' + data.address.house_number + ', ' + data.address.city + ' ' + data.address.postcode;
            $('#driverDestination').attr('readonly', true);
            $('#driverDestinationX').attr('readonly', true);
            $('#driverDestinationY').attr('readonly', true);
            $('#driverDestination').val(adresa);
            $('#driverDestinationX').val(data.lat);
            $('#driverDestinationY').val(data.lon);

        },
        error: function () {
            alert("Error while getting address.");
        }
    });
}

function placeMarkerAndPanTo(latLng, map) {
    clearMarkers();
    deleteMarkers();

    if (markers.length < 1) {
        var marker = new google.maps.Marker({
            position: latLng,
            map: map
        });
        map.panTo(latLng);
        markers.push(marker);
        myLat = marker.getPosition().lat();
        myLng = marker.getPosition().lng();
    }
}

function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
    setMapOnAll(null);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
    clearMarkers();
    markers = [];
}