import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/db';

export interface ScheduleAttributes {
  id: number;
  date: string;
  dentistId: number;
}

export interface ScheduleCreationAttributes extends Optional<ScheduleAttributes, 'id'> {}

class Schedule extends Model<ScheduleAttributes, ScheduleCreationAttributes> implements ScheduleAttributes {
  public id!: number;
  public date!: string;
  public dentistId!: number;
}

Schedule.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    date: { type: DataTypes.DATEONLY, allowNull: false },
    dentistId: { type: DataTypes.INTEGER, allowNull: false }
  },
  {
    sequelize,
    modelName: 'Schedule',
    tableName: 'schedules'
  }
);

export default Schedule;
