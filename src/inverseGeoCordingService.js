import GoogleMapsAPI from 'googlemaps';

export default class InverseGeoCordingService {

    constructor() {
        const publicConfig = {
            key: 'INSERT GOOGLE MAPS API KEY',
            stagger_time:       1000, // for elevationPath
            encode_polylines:   false,
            secure:             false // use https
        };
        this._gMAPI = new GoogleMapsAPI(publicConfig);
    }

    convert(location, successCallback, errorCallback) {
        const reverseGeocodeParams = {
            "latlng":        location.latitude + "," + location.longitude,
            "result_type":   "postal_code",
            "language":      "en",
            "location_type": "APPROXIMATE"
        };

        this._gMAPI.reverseGeocode(reverseGeocodeParams, function(err, result){
            console.log(result);
            if(result) {
                successCallback(result);
            }
            else {
                errorCallback(err);
            }
        });
    }
}