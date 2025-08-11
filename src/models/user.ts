import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";
import bcrypt from "bcrypt";

export type UserRole = "admin" | "client";

export interface UserAttributes {
  id: number;
  email: string;
  password: string;
  name: string;
  mobileNumber: string;
  address?: string;
  role: UserRole;
}

export interface UserCreationAttributes
  extends Optional<UserAttributes, "id" | "role"> {}

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public email!: string;
  public password!: string;
  public name!: string;
  public mobileNumber!: string;
  public address?: string;
  public role!: UserRole;

  async validPassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}

User.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    mobileNumber: { type: DataTypes.STRING, allowNull: false },
    address: { type: DataTypes.STRING },
    role: {
      type: DataTypes.ENUM("admin", "client"),
      allowNull: false,
      defaultValue: "client",
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
    hooks: {
      beforeCreate: async (user: User) => {
        if (user.password) {
          user.password = await bcrypt.hash(user.password, 10);
        }
      },
      beforeUpdate: async (user: User) => {
        if (user.password && user.changed("password")) {
          user.password = await bcrypt.hash(user.password, 10);
        }
      },
    },
  }
);

export default User;
