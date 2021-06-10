import { hash } from 'bcrypt';

export const hashPassword = async (password: string) => hash(password, 12);

import _omit from 'lodash.omit';

export const ommitedKeys = [
  'pKey',
  'dataKey',
  'sKey',
  'GSI2pKey',
  'GSI2sKey',
  'GSI1pKey',
  'GSI1sKey',
  'GSI3pKey',
  'GSI3sKey',
  'GSI4pKey',
  'GSI4sKey',
  'password',
  'updatedAt',
];

export const getIdFromAttribute = (attributeValue: string, prefix: string): string => {
  if (!attributeValue || !attributeValue.includes(prefix)) {
    return attributeValue;
  }

  return attributeValue.split(prefix)[1];
};

export const omit = (obj: any, keys: string[] = ommitedKeys) => {
  return _omit(obj, keys);
};

export const keys = (value: object) => Object.keys(value || {});
