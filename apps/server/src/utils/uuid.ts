import { randomUUID } from 'crypto';
import { customType } from 'drizzle-orm/mysql-core';

function toBinaryFromUUID(uuid: string): Buffer {
  const removeDashesFromUUID = uuid.replace(/-/g, '');

  const binary = Buffer.from(removeDashesFromUUID, 'hex');

  return binary;
}

function toUUIDFromBinary(binary: Buffer): string {
  const uuid = [
    binary.toString('hex', 0, 4),
    binary.toString('hex', 4, 6),
    binary.toString('hex', 6, 8),
    binary.toString('hex', 8, 10),
    binary.toString('hex', 10, 16),
  ].join('-');

  return uuid;
}

export const uuid = customType<{ data: string; driverData: Buffer }>({
  dataType() {
    return 'binary(16)';
  },
  toDriver(): Buffer {
    const uuid = randomUUID();

    const binary = toBinaryFromUUID(uuid);

    return binary;
  },
  fromDriver(value): string {
    const uuid = toUUIDFromBinary(value);

    return uuid;
  },
});
