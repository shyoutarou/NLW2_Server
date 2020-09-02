export function convertHoursToMinutes(time: string) {
    const [hour, minutes] = time.split(':').map(Number);
    const timeInMinutes = (hour * 60) + minutes;
  
    return timeInMinutes;
  }

  
export function convertMinutesToHours(time: number): String {
  // 8:00
  const hours = String(Math.floor(time / 60)).padStart(2, '0')
  const minutes = String(Math.floor(time % 60)).padStart(2, '0')

  return `${hours}:${minutes}`
}
