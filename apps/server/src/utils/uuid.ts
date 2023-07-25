import { customType } from 'drizzle-orm/mysql-core';

function toBinaryFromUUID(uuid: string): Buffer {
  const removeDashesFromUUID = uuid.replace(/-/g, '');

  return Buffer.from(removeDashesFromUUID, 'hex');
}

function toUUIDFromBinary(binary: Buffer): string {
  return [
    binary.toString('hex', 0, 4),
    binary.toString('hex', 4, 6),
    binary.toString('hex', 6, 8),
    binary.toString('hex', 8, 10),
    binary.toString('hex', 10, 16),
  ].join('-');
}

export const uuid = customType<{
  data: string;
  driverData: Buffer;
}>({
  dataType: () => 'binary(16)',
  toDriver: (value): Buffer => toBinaryFromUUID(value),
  fromDriver: (value): string => toUUIDFromBinary(value),
});
