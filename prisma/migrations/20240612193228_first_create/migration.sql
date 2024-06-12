-- CreateTable
CREATE TABLE "Locals" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zcode" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "gates" TEXT[],
    "ticketGate" TEXT[],
    "typeId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "lastModified" TIMESTAMP(3),

    CONSTRAINT "Locals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Events" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "startDate" TEXT NOT NULL,
    "endDate" TEXT NOT NULL,
    "localId" INTEGER NOT NULL,
    "typeId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "lastModified" TIMESTAMP(3),

    CONSTRAINT "Events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Type" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "lastModified" TIMESTAMP(3),

    CONSTRAINT "Type_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Locals_cnpj_key" ON "Locals"("cnpj");

-- AddForeignKey
ALTER TABLE "Locals" ADD CONSTRAINT "Locals_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "Type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Events" ADD CONSTRAINT "Events_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "Type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Events" ADD CONSTRAINT "Events_localId_fkey" FOREIGN KEY ("localId") REFERENCES "Locals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
