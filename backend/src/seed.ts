import prisma from "./db/prisma-client.js";

const development = await prisma.Sector.create({
    name:"development"
});

console.log(`created Sector: ${development.name}`);


const malta_holidays = await prisma.Holidays_type.create({
  name: "Holydays",
  amount_of_days_off :15,
  country :"Malta"
})

console.log(`created Holidays type: ${malta_holidays.name}`);