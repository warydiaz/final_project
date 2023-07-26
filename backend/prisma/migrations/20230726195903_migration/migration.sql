-- CreateTable
CREATE TABLE "Sector" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Sector_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Employee" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "document_type" INTEGER NOT NULL,
    "document_number" TEXT NOT NULL,
    "current_hours_off" INTEGER NOT NULL,
    "position_name" TEXT NOT NULL,
    "holidays_typeId" INTEGER NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Employee_Sector" (
    "id" SERIAL NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "sectortorId" INTEGER NOT NULL,
    "isManager" BOOLEAN NOT NULL,

    CONSTRAINT "Employee_Sector_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Holidays_type" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "amount_of_days_off" INTEGER NOT NULL,
    "country" TEXT NOT NULL,

    CONSTRAINT "Holidays_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Leave_request" (
    "id" SERIAL NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "start_daye" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "hours_off_requested" DECIMAL(65,30) NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "Leave_request_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Public_holidays" (
    "id" SERIAL NOT NULL,
    "country" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Public_holidays_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Sector_name_key" ON "Sector"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_userId_key" ON "Employee"("userId");

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_holidays_typeId_fkey" FOREIGN KEY ("holidays_typeId") REFERENCES "Holidays_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee_Sector" ADD CONSTRAINT "Employee_Sector_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee_Sector" ADD CONSTRAINT "Employee_Sector_sectortorId_fkey" FOREIGN KEY ("sectortorId") REFERENCES "Sector"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Leave_request" ADD CONSTRAINT "Leave_request_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
