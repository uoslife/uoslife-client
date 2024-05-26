const getCurrentTime = () => {
  const today = new Date();
  const hours = `0${today.getHours()}`.slice(-2);
  const minutes = `0${today.getMinutes()}`.slice(-2);
  const seconds = `0${today.getSeconds()}`.slice(-2);
  return `${hours}:${minutes}:${seconds}`;
};

export default getCurrentTime;
