import { DataTypes, Model, Optional, Association } from 'sequelize';
import sequelize from '../config/db';
import Appointment from './appointment';

export interface SlotAttributes {
  id: number;
  scheduleId: number;
  slotOptionId: number;
}

export interface SlotCreationAttributes extends Optional<SlotAttributes, 'id'> {}

class Slot extends Model<SlotAttributes, SlotCreationAttributes> implements SlotAttributes {
  public id!: number;
  public scheduleId!: number;
  public slotOptionId!: number;
}

Slot.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    scheduleId: { type: DataTypes.INTEGER, allowNull: false },
    slotOptionId: { type: DataTypes.INTEGER, allowNull: false }
  },
  {
    sequelize,
    modelName: 'Slot',
    tableName: 'slots'
  }
);

export default Slot;
