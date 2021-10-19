export function isUUIDValid(uuid: string) {
  const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

  return regexExp.test(uuid);
}

export function capitalize(word: string) {
  return word[0].toUpperCase() + word.slice(1);
}
