import {
  DataTypes,
  Model,
  Optional,
  BelongsToManyAddAssociationMixin,
  BelongsToManySetAssociationsMixin,
  BelongsToManyGetAssociationsMixin,
} from "sequelize";
import sequelize from "../config/db";
import Service from "./service";

export interface DentistAttributes {
  id: number;
  name: string;
}

export interface DentistCreationAttributes
  extends Optional<DentistAttributes, "id"> {}

class Dentist
  extends Model<DentistAttributes, DentistCreationAttributes>
  implements DentistAttributes
{
  public id!: number;
  public name!: string;

  // Association mixins for TypeScript
  public getServices!: BelongsToManyGetAssociationsMixin<Service>;
  public setServices!: BelongsToManySetAssociationsMixin<Service, number>;
  public addService!: BelongsToManyAddAssociationMixin<Service, number>;
}

Dentist.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize,
    modelName: "Dentist",
    tableName: "dentists",
  }
);

export default Dentist;
