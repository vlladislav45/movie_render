// Online means user is conencted to the internet and there is internet connection
// Offline means the user is not connected to any network (be it LAN or WAN )
// Internet problem means the user has a network connection, but is offline
// Checking with www.google.com, maybe can add another site to check in the future
export const ConnectionStatus = {
  ONLINE: 'ONLINE',
  OFFLINE: 'OFFLINE',
  INTERNET_PROBLEM: 'INTERNET_PROBLEM',
};
//https://stackoverflow.com/a/62208629
// TODO: rework with axios
export const checkInternetConnection = async () => {
  const condition = navigator.onLine ? 'online' : 'offline';
  if (condition === 'online') {
    return new Promise(resolve => {
      fetch('https://www.google.com/', { // Check for internet connectivity
        mode: 'no-cors',
      }).then(() => {
        resolve(ConnectionStatus.ONLINE);
      }).catch(() => {
        resolve(ConnectionStatus.INTERNET_PROBLEM);
      });
    });
  } else {
    return Promise.resolve(ConnectionStatus.OFFLINE);
  }
};
