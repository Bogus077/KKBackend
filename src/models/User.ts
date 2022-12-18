import { sequelize } from '../database/database.config';
import { CreationOptional, DataTypes as Sequelize, ForeignKey, InferAttributes, InferCreationAttributes, Model } from "sequelize";

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>;
  declare phone: string;
  declare password: string;
  declare name: string;
  declare surname: string;
  // createdAt can be undefined during creation
  declare createdAt: CreationOptional<Date>;
  // updatedAt can be undefined during creation
  declare updatedAt: CreationOptional<Date>;
}

// export const User = sequelize.define(
//   'User',
//   {
//     id: {
//       allowNull: false,
//       autoIncrement: true,
//       primaryKey: true,
//       type: Sequelize.INTEGER
//     },
//     phone: {
//       type: Sequelize.STRING
//     },
//     password: {
//       type: Sequelize.STRING
//     },
//     name: {
//       type: Sequelize.STRING
//     },
//     surname: {
//       type: Sequelize.STRING
//     }
//   },
//   {
//     freezeTableName: true,
//     timestamps: true,
//   }
// );
