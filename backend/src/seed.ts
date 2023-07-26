import prisma from "./db/prisma-client.js";

async function insertData() {
  const development = await prisma.sector.create({
    data: {
      name: "development",
    },
  });

  console.log(`created Sector: ${development.name}`);

  const malta_holidays = await prisma.holidays_type.create({
    data: {
      name: "Holydays",
      amount_of_days_off: 15,
      country: "Malta",
    },
  });

  console.log(`created Holidays type: ${malta_holidays.name}`);
}

export default insertData;
