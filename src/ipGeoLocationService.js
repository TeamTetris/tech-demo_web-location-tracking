export default class ipGeoLocationService {

    requestCurrentLocation(successCallback, errorCallback) {
        fetch('http://ip-api.com/json')
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                successCallback(data['zip'] + ", " + data['city']);
            })
            .catch(function(error) {
                errorCallback(error);
            });
    }
}