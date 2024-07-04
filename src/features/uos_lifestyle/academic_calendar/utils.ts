// 알람 설정 시간을 반환합니다.
// ['2024-01-01T09:00:00'', '2024-01-01T15:00:00']
export const getNotiTime = (standardDateStr: string) => {
  const standardDate = new Date(standardDateStr); // KST
  const yesterdayTime = standardDate.getTime() - 24 * 60 * 60 * 1000;

  const yesterday = new Date(yesterdayTime);
  const yesterdayYear = yesterday.getFullYear();
  const yesterdayMonth = (yesterday.getMonth() + 1).toString().padStart(2, '0');
  const yesterdayDay = yesterday.getDate().toString().padStart(2, '0');

  const utcYesterday = `${yesterdayYear}-${yesterdayMonth}-${yesterdayDay}T09:00:00`;

  const todayYear = standardDate.getFullYear();
  const todayMonth = (standardDate.getMonth() + 1).toString().padStart(2, '0');
  const todayDay = standardDate.getDate().toString().padStart(2, '0');

  const utcToday = `${todayYear}-${todayMonth}-${todayDay}T00:00:00`;

  return [utcYesterday, utcToday];
};
