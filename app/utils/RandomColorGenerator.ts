export function generateRandomHexColor(): string {
  const colorList = [
    'red',
    'orange',
    'green',
    'blue',
    'indigo',
    'violet',
  ]
  return colorList[Math.floor(Math.random() * colorList.length)];
}