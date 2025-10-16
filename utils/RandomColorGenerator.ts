  const colorList = [
    '#aa4040ff',
    '#44a744ff',
    '#3737ffff',
    '#5ed5daff',
    '#ec9d42ff',
    '#ae5ed3ff',
    '#56ddddff',
    '#ca5bcaff',
    '#8bbe50ff',
    '#703870ff',
    '#393870ff',
    '#1c7944ff',
    '#83432aff',
  ]
  let colorIndex = 0;
export function generateRandomHexColor(): string {
  const color = colorList[colorIndex];

  colorIndex = (colorIndex + 1) % colorList.length;

  return color;
}