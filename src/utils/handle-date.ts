export const pad = (num: number) => (num < 10 ? `0${num}` : num);

export const getUploadTimeString = (uploadTime: Date) => {
  const uploadYear = uploadTime.getFullYear();
  const uploadMonth = pad(uploadTime.getMonth());
  const uploadDay = pad(uploadTime.getDay());
  const uploadHours = pad(uploadTime.getHours());
  const uploadMinutes = pad(uploadTime.getMinutes());
  const uploadDate = pad(uploadTime.getDate());

  const todayDate = new Date().getDate();
  const isToday = uploadDate === todayDate;

  const processedUploadTimeString = isToday
    ? `${uploadHours}:${uploadMinutes}`
    : `${uploadYear}.${uploadMonth}.${uploadDay}`;

  return processedUploadTimeString;
};
