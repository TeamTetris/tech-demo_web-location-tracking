export default class GpsGeoLocationService {

    constructor() {
        this._lastPosition = null;
        this._monitoringId = null;
    }

    static _browserIsCompatible() {
        return !!navigator.geolocation;
    }

    requestCurrentLocation(successCallback, errorCallback) {
        if (!GpsGeoLocationService._browserIsCompatible()) {
            return errorCallback(new Error('Browser does not support location service'));
        }
        navigator.geolocation.getCurrentPosition(
            this._receiveLocation.bind(this, successCallback),
            GpsGeoLocationService._receiveLocationError.bind(this, errorCallback));
    }

    monitorCurrentLocation(successCallback, errorCallback) {
        if (!GpsGeoLocationService._browserIsCompatible()) {
            return errorCallback(new Error('Browser does not support location service'));
        }
        navigator.geolocation.watchPosition(
            this._receiveLocation.bind(this, successCallback),
            GpsGeoLocationService._receiveLocationError.bind(this, errorCallback));
    }

    stopMonitoring() {
        if(this._monitoringId == null) {
            return Error('No monitoring active');
        }
        navigator.geolocation.clearWatch(this._monitoringId);
        this._monitoringId = null;
    }

    _receiveLocation(successCallback, position) {
        this._lastPosition = position;
        successCallback(position);
    }

    static _receiveLocationError(errorCallback, locationError) {
        errorCallback(new Error(locationError.message));
    }

    get lastPosition() {
        return this._lastPosition;
    }
}