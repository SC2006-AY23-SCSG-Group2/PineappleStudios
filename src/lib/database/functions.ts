export function getItemInfo(id: string) {
  if (isNaN(+id)) {
    return {
      id: id,
      isNumber: false,
    };
  }
  return {
    id: id,
    isNumber: true,
  };
}
