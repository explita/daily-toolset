import { useState, useEffect } from "react";

/**
 * Hook to retrieve the user's current location.
 *
 * The hook returns an array of three elements:
 *
 * 1. The current location as an object with latitude and longitude
 *    properties. The initial value is `{ latitude: 0, longitude: 0 }`.
 * 2. An error string if an error occurred while retrieving the location,
 *    or `null` if no error occurred. The initial value is `null`.
 * 3. A function to request the user's location permission and retrieve
 *    the current position. The function takes no arguments and returns
 *    no value.
 *
 * The hook uses the `getCurrentPosition` method of the `Geolocation`
 * API to retrieve the user's location. The request is made with high
 * accuracy mode enabled.
 *
 * @returns An array with the current location, an error string (or null),
 *          and a function to request the user's location permission.
 */
export function useLocation() {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  }>({ latitude: 0, longitude: 0 });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const success = (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;
      setLocation({ latitude, longitude });
    };

    const error = (error: GeolocationPositionError) => {
      setError(error.message);
    };

    navigator.geolocation.getCurrentPosition(success, error);
  }, []);

  /**
   * Requests the user's location permission and retrieves the current position.
   *
   * If permission is granted, updates the location state with the latitude
   * and longitude coordinates. If an error occurs, updates the error state
   * with the error message. The request uses high accuracy mode.
   */
  const requestLocationPermission = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
      },
      (error) => setError(error.message),
      { enableHighAccuracy: true }
    );
  };

  return [location, error, requestLocationPermission] as const;
}
