export function getNumber(value?: string) {
    if(!value) return undefined
    value = value.replace(/[^0-9]/g, '');
    const num = parseInt(value)
    return isNaN(num) ? undefined : num;
  }