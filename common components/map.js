import React, { useCallback, useEffect, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useRouter } from "next/router";

const containerStyle = {
  width: "100%",
  height: "60vh",
  position: "relative",
  borderRadius: "12px",
};

let center = {};
let markers = [];
let golf_course_markers = [];

const GoogleMaps = (PropertyData) => {
  const RouterRef = useRouter();
  const { latitude, longitude } = RouterRef.query;
  const [map, setMap] = useState(null);
  // const [isLoaded, setisLoaded] = useState(null);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: `${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`,
  });

  useEffect(() => {
    return () => {
      markers = [];
      center = {};
      golf_course_markers = [];
    };
  }, []);

  // setTimeout(() => {
  //   setisLoaded(true)
  // }, 2000)

  const onLoad = useCallback(function callback(Val) {
    setMap(Val);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  if (PropertyData.data?.length === 1) {
    //* THIS WILL RUN IF USER CLICK TO VIEW PROPERTY

    markers = [
      {
        lat: Number(PropertyData.data[0]?.latitude),
        lng: Number(PropertyData.data[0]?.longitude),
      },
    ];

    center = {
      lat: Number(PropertyData.data[0]?.latitude),
      lng: Number(PropertyData.data[0]?.longitude),
    };
  } else if (PropertyData.data.length > 1) {
    markers = [
      {
        lat: Number(PropertyData.data[0]?.latitude),
        lng: Number(PropertyData.data[0]?.longitude),
      },
      {
        lat: Number(PropertyData.data[1]?.latitude),
        lng: Number(PropertyData.data[1]?.longitude),
      },
      {
        lat: Number(PropertyData.data[2]?.latitude),
        lng: Number(PropertyData.data[2]?.longitude),
      },
      {
        lat: Number(PropertyData.data[3]?.latitude),
        lng: Number(PropertyData.data[3]?.longitude),
      },
      {
        lat: Number(PropertyData.data[4]?.latitude),
        lng: Number(PropertyData.data[4]?.longitude),
      },
      {
        lat: Number(PropertyData.data[5]?.latitude),
        lng: Number(PropertyData.data[5]?.longitude),
      },
      {
        lat: Number(PropertyData.data[6]?.latitude),
        lng: Number(PropertyData.data[6]?.longitude),
      },
      {
        lat: Number(PropertyData.data[7]?.latitude),
        lng: Number(PropertyData.data[7]?.longitude),
      },
      {
        lat: Number(PropertyData.data[8]?.latitude),
        lng: Number(PropertyData.data[8]?.longitude),
      },
      {
        lat: Number(PropertyData.data[9]?.latitude),
        lng: Number(PropertyData.data[9]?.longitude),
      },
    ];

    center = {
      lat: Number(PropertyData.data[0]?.latitude),
      lng: Number(PropertyData.data[0]?.longitude),
    };
  } else if (PropertyData.data.length === 0) {
    markers = [
      {
        lat: Number(latitude),
        lng: Number(longitude),
      },
    ];

    center = {
      lat: Number(latitude),
      lng: Number(longitude),
    };
  }

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
      style={{ position: "relative", width: "100%", height: "100%" }}
    >
      {markers.map((marker, index) => (
        <>
          <Marker
            icon="/images/vector/google_map_markers.svg"
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

export default React.memo(GoogleMaps);
