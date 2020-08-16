export function msToTime(duration) {
  let minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
  
  hours = (hours === 0) ? "" : hours + "h ";
  minutes = (minutes === 0) ? "" : minutes + "min";
  
  return hours + minutes;
}