/*
  Warnings:

  - You are about to drop the column `refrash_token` on the `users_tokens` table. All the data in the column will be lost.
  - Added the required column `refresh_token` to the `users_tokens` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_users_tokens" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "refresh_token" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "expires_date" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "users_tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_users_tokens" ("createdAt", "expires_date", "id", "user_id") SELECT "createdAt", "expires_date", "id", "user_id" FROM "users_tokens";
DROP TABLE "users_tokens";
ALTER TABLE "new_users_tokens" RENAME TO "users_tokens";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
