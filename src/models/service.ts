import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";

export interface ServiceAttributes {
  id: number;
  name: string;
}

export interface ServiceCreationAttributes
  extends Optional<ServiceAttributes, "id"> {}

class Service
  extends Model<ServiceAttributes, ServiceCreationAttributes>
  implements ServiceAttributes
{
  public id!: number;
  public name!: string;
}

Service.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize,
    modelName: "Service",
    tableName: "services",
  }
);

export default Service;
