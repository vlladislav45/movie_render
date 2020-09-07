import BaseAPI from './BaseAPI';

class SecurityAPI extends BaseAPI {
  
  removeDeviceFromLog = ipAddress => this.post(`settings/security/deleteDeviceLog`, { ipAddress })
  
  getDeviceLogs = () => this.get(`settings/security/deviceLogs`);
}

export default new SecurityAPI();
