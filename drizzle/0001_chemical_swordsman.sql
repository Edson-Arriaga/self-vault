PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_memories` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`category` text NOT NULL,
	`date` text DEFAULT '',
	`imageUri` text DEFAULT ''
);
--> statement-breakpoint
INSERT INTO `__new_memories`("id", "title", "description", "category", "date", "imageUri") SELECT "id", "title", "description", "category", "date", "imageUri" FROM `memories`;--> statement-breakpoint
DROP TABLE `memories`;--> statement-breakpoint
ALTER TABLE `__new_memories` RENAME TO `memories`;--> statement-breakpoint
PRAGMA foreign_keys=ON;