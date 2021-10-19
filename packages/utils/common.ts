export function isUUIDValid(uuid: string) {
  const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

  return regexExp.test(uuid);
}

export function capitalize(word: string) {
  const str = `${word}`;
  return str[0].toUpperCase() + str.slice(1);
}
