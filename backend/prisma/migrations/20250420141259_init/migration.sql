-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" VARCHAR(60) NOT NULL,
    "username" VARCHAR(35) NOT NULL,
    "password" VARCHAR(200) NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "phone" VARCHAR(15),
    "avatar" TEXT,
    "birthday" TIMESTAMP(3) NOT NULL,
    "gender" "Gender" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
