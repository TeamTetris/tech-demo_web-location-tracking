import GpsGeoLocationService from "./gpsGeoLocationService";
import InverseGeoCordingService from "./inverseGeoCordingService";
import ipGeoLocationService from "./ipGeoLocationService";

export default class RenderingService {

    constructor(rootElement) {
        this._rootElement = rootElement;
        this._locationService = new GpsGeoLocationService();
        this._locationService.requestCurrentLocation(this.processGPS.bind(this), this.processError.bind(this));
        this._inverseCordingService = new InverseGeoCordingService();
        this._ipGeoLocationService = new ipGeoLocationService();
        this._ipGeoLocationService.requestCurrentLocation(this.processIPAddress.bind(this), this.processError.bind(this));
        this._ipHtml = 'Determining location - Hold on!';
        this._gpsHtml = 'Determining location - Hold on!';
    }

    processIPAddress(result) {
        this._ipHtml = result;
        this.render();
    }

    processGPS(position) {
        this._inverseCordingService.convert(
            position.coords,
            this.processAddress.bind(this),
            this.processError.bind(this)
        );
    }

    processAddress(result) {
        if(result['results'].length > 0) {
            this._gpsHtml = result['results'][0]['formatted_address'];
            this.render();
        } else {
            this.processError(new Error('No results'));
        }
    }

    processError(error) {
        console.log(error);
    }

    render() {
        this._rootElement.innerHTML = `
            <h1>GPS Geolocation results:</h1>
            <strong>${this._gpsHtml}</strong>
            <h1>IP Geolocation results:</h1>
            <strong>${this._ipHtml}</strong>
        `;
    }
}