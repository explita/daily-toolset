import { useEffect, useState } from "react";

type NetworkData = {
  online: boolean;
  rtt?: number;
  downlink?: number;
  downlinkMax?: number;
  effectiveType?: "slow-2g" | "2g" | "3g" | "4g";
  saveData?: boolean;
  networkType?:
    | "bluetooth"
    | "cellular"
    | "ethernet"
    | "wifi"
    | "wimax"
    | "none"
    | "other"
    | "unknown";
};

/**
 * useNetwork
 *
 * A hook to get the current network information.
 *
 * It returns an object with the following properties:
 * - online: a boolean indicating if the browser is online or not.
 * - rtt: the round trip time in milliseconds of the current connection.
 * - downlink: the estimated effective bandwidth in megabits per second of the
 *   current connection in megabits per second.
 * - downlinkMax: the maximum downlink speed in megabits per second of the
 *   current connection.
 * - effectiveType: the effective type of the connection, which is one of the
 *   following:
 *   - "slow-2g"
 *   - "2g"
 *   - "3g"
 *   - "4g"
 * - saveData: a boolean indicating if the user has requested a reduced data
 *   usage mode.
 * - networkType: the type of the connection, which is one of the following:
 *   - "bluetooth"
 *   - "cellular"
 *   - "ethernet"
 *   - "wifi"
 *   - "wimax"
 *   - "none"
 *   - "other"
 *   - "unknown"
 *
 * The hook updates the returned value when the connection type changes.
 *
 * @returns {NetworkData} an object with the current network information.
 */

export function useNetwork() {
  const connection =
    (navigator as any).connection ||
    (navigator as any).mozConnection ||
    (navigator as any).webkitConnection;

  const getNetworkData = (): NetworkData => ({
    online: navigator.onLine,
    rtt: connection ? connection.rtt : undefined,
    downlink: connection ? connection.downlink : 0,
    downlinkMax: connection ? connection.downlinkMax : undefined,
    effectiveType: connection ? connection.effectiveType : "unknown",
    saveData: connection ? connection.saveData : undefined,
    networkType: connection ? connection.type : undefined,
  });

  const [networkInfo, setNetworkInfo] = useState(getNetworkData());

  useEffect(() => {
    function updateNetworkInfo() {
      setNetworkInfo(getNetworkData());
    }

    window.addEventListener("online", updateNetworkInfo);
    window.addEventListener("offline", updateNetworkInfo);
    connection?.addEventListener("change", updateNetworkInfo);

    return () => {
      window.removeEventListener("online", updateNetworkInfo);
      window.removeEventListener("offline", updateNetworkInfo);
      connection?.removeEventListener("change", updateNetworkInfo);
    };
  }, [connection]);

  return networkInfo;
}
