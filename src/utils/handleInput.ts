export function handleTextInput(
  e: Event,
  setValue: (value: string | null) => void
) {
  const inputValue = (e.target as HTMLInputElement).value;

  if (['', null, undefined].includes(inputValue)) {
    setValue(null);
  } else {
    setValue(inputValue.trim());
  }
}

export function handleNumberInput(
  e: Event,
  setValue: (value: number | null) => void
) {
  const inputValue = (e.target as HTMLInputElement).value;

  if (['', null, undefined].includes(inputValue)) {
    setValue(null);
    return;
  }

  const numberValue = Number(inputValue);

  if (isNaN(numberValue)) {
    setValue(null);
  } else {
    setValue(numberValue);
  }
}
