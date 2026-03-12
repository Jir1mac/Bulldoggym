-- CreateTable
CREATE TABLE "OpeningHour" (
    "id" SERIAL NOT NULL,
    "day" TEXT NOT NULL,
    "hours" TEXT NOT NULL,
    "note" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "OpeningHour_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pricing" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "priceNormal" TEXT NOT NULL,
    "priceDiscount" TEXT NOT NULL,

    CONSTRAINT "Pricing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Settings" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "entry10" TEXT NOT NULL DEFAULT '1 100',
    "entrySingle" TEXT NOT NULL DEFAULT '130',

    CONSTRAINT "Settings_pkey" PRIMARY KEY ("id")
);
