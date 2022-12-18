'use strict';
import { User } from './User';
import { UserRefresh } from './UserRefresh';

export {
  User,
  UserRefresh,
};

User.hasMany(UserRefresh);
UserRefresh.belongsTo(User);
