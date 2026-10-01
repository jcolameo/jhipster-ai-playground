import dayjs from 'dayjs/esm';

import { IUserManagement, NewUserManagement } from './user-management.model';

export const sampleWithRequiredData: IUserManagement = {
  login: 'Randall.Sauer',
  email: 'Lucienne5@hotmail.com',
};

export const sampleWithPartialData: IUserManagement = {
  id: 2737,
  login: 'Grayson_Klein32',
  firstName: 'Mertie',
  lastName: 'Mitchell',
  email: 'Gerson.Franey@gmail.com',
  activated: false,
  imageUrl: 'boo suspension',
  lastModifiedDate: dayjs('2023-12-18T13:07'),
};

export const sampleWithFullData: IUserManagement = {
  id: 26558,
  login: 'Brisa72',
  firstName: 'Lorena',
  lastName: 'Bode',
  email: 'Rylan_Altenwerth65@hotmail.com',
  activated: false,
  imageUrl: 'as vastly than',
  createdBy: 'out absentmindedly',
  createdDate: dayjs('2023-12-18T13:10'),
  lastModifiedBy: 'but sour sympathetically',
  lastModifiedDate: dayjs('2023-12-18T09:04'),
};

export const sampleWithNewData: NewUserManagement = {
  email: 'Jasen82@yahoo.com',
  login: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
