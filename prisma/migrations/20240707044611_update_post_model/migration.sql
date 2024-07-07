-- Drop the foreign key constraint on `userId`
ALTER TABLE `post` DROP FOREIGN KEY `Post_userId_fkey`;

-- Add a temporary column to hold the default creatorId
ALTER TABLE `post` ADD COLUMN `tempCreatorId` INTEGER;

-- Update existing rows with the default creatorId (e.g., set to user with ID 1)
UPDATE `post` SET `tempCreatorId` = 1 WHERE `tempCreatorId` IS NULL;

-- Add the new `creatorId` column and populate it with the values from `tempCreatorId`
ALTER TABLE `post` ADD COLUMN `creatorId` INTEGER NOT NULL DEFAULT 1;
UPDATE `post` SET `creatorId` = `tempCreatorId`;

-- Drop the temporary column
ALTER TABLE `post` DROP COLUMN `tempCreatorId`;

-- Drop the old `userId` column
ALTER TABLE `post` DROP COLUMN `userId`;

-- Add the foreign key constraint on `creatorId`
ALTER TABLE `Post` ADD CONSTRAINT `Post_creatorId_fkey` FOREIGN KEY (`creatorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
