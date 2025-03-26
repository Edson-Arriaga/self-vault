CREATE TABLE `favsAndOthers` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`entry` text NOT NULL,
	`category` text NOT NULL,
	`section` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `memories` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`category` text NOT NULL,
	`date` text,
	`imageUri` text
);
