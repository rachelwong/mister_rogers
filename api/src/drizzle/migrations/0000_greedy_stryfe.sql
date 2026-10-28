CREATE TABLE "pins" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"type" text DEFAULT 'none' NOT NULL,
	"description" text NOT NULL,
	"lat" double precision NOT NULL,
	"lng" double precision NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "description_not_empty" CHECK (length(trim("pins"."description")) > 0)
);
--> statement-breakpoint
ALTER TABLE "pins" ENABLE ROW LEVEL SECURITY;