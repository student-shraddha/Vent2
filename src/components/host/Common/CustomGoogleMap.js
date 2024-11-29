import React, { useCallback, useEffect, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
    width: "100%",
    height: "40vh",
    position: "relative",
    borderRadius: "12px",
};

let center = {};

// Los Angeles
const default_lat = 34.0549076;
const default_long = -118.242643;

const CustomGoogleMap = ({ data = {}, isSingleLocation = false, isAddress, setGoogleAddressObj, isMarker = false }) => {

    //default Los angeles
    const { latitude = default_lat, longitude = default_long } = data;
    const [map, setMap] = useState(null);
    const [markers, setMarkers] = useState([]);

    // console.log("data: ", latitude, longitude)
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: `${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`,
    });

    useEffect(() => {
        if (isMarker) {
            setMarkers([{
                lat: Number(latitude),
                lng: Number(longitude),
            }]);
        }
        return () => {
            setMarkers([]);
            center = {};
        };
    }, []);


    const onLoad = useCallback(function callback(Val) {
        setMap(Val);
    }, []);

    const onUnmount = useCallback(function callback(map) {
        setMap(null);
    }, []);

    center = {
        lat: Number(latitude || default_lat),
        lng: Number(longitude || default_long),
    };

    const handleMapClick = (event) => {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();
        setMarkers([...(!isSingleLocation ? [...markers] : []), { lat, lng }]);

        if (isAddress) {
            const geocoder = new window.google.maps.Geocoder();
            geocoder.geocode({ location: { lat, lng } }, (results, status) => {
                if (status === 'OK' && results[0]) {
                    setGoogleAddressObj({
                        lat,
                        lng,
                        completeAddress: results
                    });
                } else {
                    setGoogleAddressObj({
                        lat,
                        lng,
                    });
                }
            });
        }
    };

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}
            style={{ position: "relative", width: "100%", height: "100%" }}
            onClick={(e) => { isSingleLocation && handleMapClick(e) }}
        >
            {markers.map((marker, index) => (
                <>
                    <Marker
                        icon="/images/vector/google_map_pin.svg"
                        key={index}
                        position={marker}
                    />
                </>
            ))}

        </GoogleMap>
    ) : (
        <></>
    );
};

export default React.memo(CustomGoogleMap);
