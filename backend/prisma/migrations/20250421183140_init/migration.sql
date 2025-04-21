/*
  Warnings:

  - You are about to drop the column `gender` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "gender",
DROP COLUMN "role";

-- DropEnum
DROP TYPE "Gender";

-- DropEnum
DROP TYPE "Role";
