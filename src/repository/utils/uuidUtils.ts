import validate from 'uuid-validate';

export function isValidUUID(id: string): boolean {
  return validate(id);
}