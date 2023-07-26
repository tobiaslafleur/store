export function toBinaryFromUUID(uuid: string): Buffer {
  const removeDashesFromUUID = uuid.replace(/-/g, '');

  return Buffer.from(removeDashesFromUUID, 'hex');
}

export function toUUIDFromBinary(binary: Buffer): string {
  return [
    binary.toString('hex', 0, 4),
    binary.toString('hex', 4, 6),
    binary.toString('hex', 6, 8),
    binary.toString('hex', 8, 10),
    binary.toString('hex', 10, 16),
  ].join('-');
}
