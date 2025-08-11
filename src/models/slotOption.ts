import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/db';

export interface SlotOptionAttributes {
  id: number;
  name: string;
}

export interface SlotOptionCreationAttributes extends Optional<SlotOptionAttributes, 'id'> {}

class SlotOption extends Model<SlotOptionAttributes, SlotOptionCreationAttributes> implements SlotOptionAttributes {
  public id!: number;
  public name!: string;
}

SlotOption.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize,
    modelName: 'SlotOption',
    tableName: 'slot_options'
  }
);

export default SlotOption;
