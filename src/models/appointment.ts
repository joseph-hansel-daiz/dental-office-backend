import { Association, DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";

export interface AppointmentAttributes {
  id: number;
  userId: number;
  slotId: number;
  serviceId: number;
  notes?: string;
}

export interface AppointmentCreationAttributes
  extends Optional<AppointmentAttributes, "id"> {}

class Appointment
  extends Model<AppointmentAttributes, AppointmentCreationAttributes>
  implements AppointmentAttributes
{
  public id!: number;
  public userId!: number;
  public slotId!: number;
  public serviceId!: number;
  public notes?: string;
}

Appointment.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    slotId: { type: DataTypes.INTEGER, allowNull: false, unique: true },
    serviceId: { type: DataTypes.INTEGER, allowNull: false },
    notes: { type: DataTypes.TEXT },
  },
  {
    sequelize,
    modelName: "Appointment",
    tableName: "appointments",
  }
);

export default Appointment;
