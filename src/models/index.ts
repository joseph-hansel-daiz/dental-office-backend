import sequelize from '../config/db';

import User from './user';
// import Service from './service';
// import Dentist from './dentist';
// import SlotOption from './slotOption';
// import Schedule from './schedule';
// import Slot from './slot';
// import Appointment from './appointment';

// Dentist.belongsToMany(Service, { through: 'DentistServices', as: 'services' });
// Service.belongsToMany(Dentist, { through: 'DentistServices', as: 'dentists' });

// Schedule.belongsTo(Dentist, { as: 'dentist' });
// Dentist.hasMany(Schedule, { foreignKey: 'dentistId', as: 'schedules' });

// Slot.belongsTo(SlotOption, { as: 'slotOption' });
// Slot.belongsTo(Schedule, { as: 'schedule' });
// Schedule.hasMany(Slot, { foreignKey: 'scheduleId', as: 'slots' });

// Appointment.belongsTo(User, { as: 'user' });
// User.hasMany(Appointment, { foreignKey: 'userId', as: 'appointments' });

// Appointment.belongsTo(Slot, { as: 'slot' });
// Slot.hasOne(Appointment, { foreignKey: 'slotId', as: 'appointment' });

// Appointment.belongsTo(Service, { as: 'service' });
// Service.hasMany(Appointment, { foreignKey: 'serviceId', as: 'appointments' });

export {
  sequelize,
  User,
  // Service,
  // Dentist,
  // SlotOption,
  // Schedule,
  // Slot,
  // Appointment
};
