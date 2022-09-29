-- CreateTable
CREATE TABLE "specifications_cars" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "car_id" TEXT NOT NULL,
    "specification_id" TEXT NOT NULL,
    CONSTRAINT "specifications_cars_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "cars" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "specifications_cars_specification_id_fkey" FOREIGN KEY ("specification_id") REFERENCES "Specification" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
