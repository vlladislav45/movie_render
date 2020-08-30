import React, { useEffect, useState } from 'react';
import { UAParser } from 'ua-parser-js';
import { Button } from 'components/basic';
import SecurityAPI from 'api/SecurityAPI';
import Loading from 'components/Loading';
import Table from '../components/Table';

const DEVICE_DETAILS = 'deviceDetails';
const LOCATION = 'location';
const LAST_LOGGED_IN = 'lastLoggedIn';
const IP_ADDRESS = 'ipAddress';

interface DataBaseEntry {
  [DEVICE_DETAILS]: string,
  [LOCATION]: string,
  [LAST_LOGGED_IN]: string,
  [IP_ADDRESS]: string
}

const Security = () => {
  const [logs, setLogs] = useState<Array<Array<string>> | null>(null);
  const [columnNames, setColumnNames] = useState<Array<string>>([]);

  useEffect(() => {
    SecurityAPI.getDeviceLogs().then(({ data }) => {
      if (!data || data.length === 0) return;
      let deviceLogs: Array<Array<string>> = [];

      data.forEach((deviceLogInfo: DataBaseEntry, index: number) => {
        // @ts-ignore
        const { browser: { name: browserName }, os: { name: osName }, device: { model, type, vendor } } = UAParser(deviceLogInfo[DEVICE_DETAILS]);
        const ipAddress = deviceLogInfo[IP_ADDRESS];

        function handleClick() {
          SecurityAPI.removeDeviceFromLog(ipAddress).then(() => {
            // @ts-ignore
            setLogs(prevLogs => prevLogs?.filter((log) => log[1] !== ipAddress));
          });
        }

        deviceLogs[index] = [
          new Date(deviceLogInfo[LAST_LOGGED_IN]).toLocaleDateString(),
          ipAddress,
          deviceLogInfo[LOCATION],
          `${browserName} on ${osName}`,
          // @ts-ignore
          <Button type='text' onClick={handleClick}>Terminate</Button>
        ];
      });
      setColumnNames(['Last logged in', 'IP Address', 'Location', 'Device', 'Logout']);
      setLogs(deviceLogs);
    });
  }, []);

  return (
    <>
      <Loading isLoading={logs === null}/>
      {logs !== null &&
        <Table
          columnNames={columnNames}
          items={logs}
        />
      }
    </>
  );
};

export default Security;
