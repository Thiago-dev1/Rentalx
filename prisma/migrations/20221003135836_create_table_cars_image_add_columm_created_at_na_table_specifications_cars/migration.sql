-- CreateTable
CREATE TABLE "cars_image" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "car_id" TEXT NOT NULL,
    "image_name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "cars_image_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "cars" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_specifications_cars" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "car_id" TEXT NOT NULL,
    "specification_id" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "specifications_cars_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "cars" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "specifications_cars_specification_id_fkey" FOREIGN KEY ("specification_id") REFERENCES "Specification" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_specifications_cars" ("car_id", "id", "specification_id") SELECT "car_id", "id", "specification_id" FROM "specifications_cars";
DROP TABLE "specifications_cars";
ALTER TABLE "new_specifications_cars" RENAME TO "specifications_cars";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
