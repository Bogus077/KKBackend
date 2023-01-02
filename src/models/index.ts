'use strict';
import { User } from './User';
import { UserRefresh } from './UserRefresh';
import { SmsCode } from './SmsCode';

export {
  User,
  UserRefresh,
  SmsCode,
};

User.hasMany(UserRefresh, {
  sourceKey: 'id',
  foreignKey: 'UserId',
  as: 'refresh' // this determines the name in `associations`!
});
UserRefresh.belongsTo(User);


// User.hasMany(UserRefresh);
// UserRefresh.belongsTo(User);
