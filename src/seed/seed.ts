import "dotenv/config";
import {
  sequelize,
  User,
  Service,
  Dentist,
  SlotOption,
  Schedule,
  Slot,
} from "../models";

async function seed() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });

    console.log("Seeding default user...");
    await User.create({
      email: "user@example.com",
      password: "password123",
      name: "John Doe",
      mobileNumber: "09161575591",
      address: "123 Main Street",
      role: "admin",
    });

    console.log("Seeding services...");
    const services = await Service.bulkCreate([
      { name: "Teeth Cleaning" },
      { name: "Tooth Extraction" },
      { name: "Root Canal" },
    ]);

    console.log("Seeding dentists...");
    const dentists = await Dentist.bulkCreate([
      { name: "Dr. Maria Cabalhao" },
      { name: "Dr. Jude Cabalhao" },
      { name: "Dr. Lyn Cabalhao" },
    ]);

    console.log("🔗 Linking dentists to services...");
    await dentists[0].setServices([services[0], services[1]]);
    await dentists[1].setServices([services[1], services[2]]);
    await dentists[2].setServices([services[0], services[1], services[2]]);

    console.log("🌱 Seeding slot options...");
    const slotOptions = await SlotOption.bulkCreate([
      { name: "08:00 AM" },
      { name: "09:00 AM" },
      { name: "10:00 AM" },
      { name: "11:00 AM" },
      { name: "01:00 PM" },
      { name: "02:00 PM" },
      { name: "03:00 PM" },
      { name: "04:00 PM" },
    ]);

    console.log("📅 Seeding schedules for all weekdays of August 2025...");
    const year = 2025;
    const month = 7; // August is month index 7 in JS Date (0-based)
    const schedules: Schedule[] = [];

    for (let day = 1; day <= 31; day++) {
      const date = new Date(year, month, day);
      const dayOfWeek = date.getDay(); // 0 = Sunday, 6 = Saturday
      if (dayOfWeek === 0 || dayOfWeek === 6) continue; // Skip weekends

      for (const dentist of dentists) {
        const schedule = await Schedule.create({
          date: date.toISOString().split("T")[0],
          dentistId: dentist.id,
        });
        schedules.push(schedule);
      }
    }

    console.log(`🗓 Created ${schedules.length} schedules`);

    console.log(
      "🕒 Creating slots for all schedules using all slot options..."
    );
    for (const schedule of schedules) {
      for (const slotOption of slotOptions) {
        await Slot.create({
          scheduleId: schedule.id,
          slotOptionId: slotOption.id,
        });
      }
    }

    console.log("Seeding complete!");
    process.exit(0);
  } catch (err) {
    console.error("Seeding failed:", err);
    process.exit(1);
  }
}

seed();
