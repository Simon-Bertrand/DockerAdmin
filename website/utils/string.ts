export function shortenString(value: string, max: number) {
    return value.length <= max ? value : (value.slice(0, max) + "...")
  }