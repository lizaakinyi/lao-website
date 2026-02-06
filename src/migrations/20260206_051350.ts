import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`articles\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`slug\` text,
  	\`content\` text NOT NULL,
  	\`excerpt\` text NOT NULL,
  	\`category\` text,
  	\`featured_image_id\` integer,
  	\`published_date\` text,
  	\`author\` text DEFAULT 'Liza Akinyi',
  	\`status\` text DEFAULT 'draft' NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`featured_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`articles_slug_idx\` ON \`articles\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`articles_featured_image_idx\` ON \`articles\` (\`featured_image_id\`);`)
  await db.run(sql`CREATE INDEX \`articles_updated_at_idx\` ON \`articles\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`articles_created_at_idx\` ON \`articles\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`tools\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`slug\` text,
  	\`description\` text,
  	\`type\` text NOT NULL,
  	\`gated\` integer DEFAULT true,
  	\`file_id\` integer,
  	\`component_name\` text,
  	\`thumbnail_id\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`file_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`thumbnail_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`tools_slug_idx\` ON \`tools\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`tools_file_idx\` ON \`tools\` (\`file_id\`);`)
  await db.run(sql`CREATE INDEX \`tools_thumbnail_idx\` ON \`tools\` (\`thumbnail_id\`);`)
  await db.run(sql`CREATE INDEX \`tools_updated_at_idx\` ON \`tools\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`tools_created_at_idx\` ON \`tools\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`events\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`slug\` text,
  	\`date\` text NOT NULL,
  	\`type\` text,
  	\`description\` text,
  	\`location\` text DEFAULT 'Virtual',
  	\`registration_link\` text,
  	\`thumbnail_id\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`thumbnail_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`events_slug_idx\` ON \`events\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`events_thumbnail_idx\` ON \`events\` (\`thumbnail_id\`);`)
  await db.run(sql`CREATE INDEX \`events_updated_at_idx\` ON \`events\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`events_created_at_idx\` ON \`events\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`programs_blocks_hero\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text NOT NULL,
  	\`subtext\` text,
  	\`background_image_id\` integer,
  	\`cta_label\` text,
  	\`cta_url\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`programs\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`programs_blocks_hero_order_idx\` ON \`programs_blocks_hero\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`programs_blocks_hero_parent_id_idx\` ON \`programs_blocks_hero\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`programs_blocks_hero_path_idx\` ON \`programs_blocks_hero\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`programs_blocks_hero_background_image_idx\` ON \`programs_blocks_hero\` (\`background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`programs_blocks_feature_grid_features\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`description\` text,
  	\`icon\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`programs_blocks_feature_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`programs_blocks_feature_grid_features_order_idx\` ON \`programs_blocks_feature_grid_features\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`programs_blocks_feature_grid_features_parent_id_idx\` ON \`programs_blocks_feature_grid_features\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`programs_blocks_feature_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`columns\` text DEFAULT '3',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`programs\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`programs_blocks_feature_grid_order_idx\` ON \`programs_blocks_feature_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`programs_blocks_feature_grid_parent_id_idx\` ON \`programs_blocks_feature_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`programs_blocks_feature_grid_path_idx\` ON \`programs_blocks_feature_grid\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`programs_blocks_content_split\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`alignment\` text DEFAULT 'textLeft',
  	\`text\` text NOT NULL,
  	\`image_id\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`programs\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`programs_blocks_content_split_order_idx\` ON \`programs_blocks_content_split\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`programs_blocks_content_split_parent_id_idx\` ON \`programs_blocks_content_split\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`programs_blocks_content_split_path_idx\` ON \`programs_blocks_content_split\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`programs_blocks_content_split_image_idx\` ON \`programs_blocks_content_split\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`programs_blocks_testimonial_carousel_reviews\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`quote\` text NOT NULL,
  	\`author\` text NOT NULL,
  	\`role\` text,
  	\`avatar_id\` integer,
  	FOREIGN KEY (\`avatar_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`programs_blocks_testimonial_carousel\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`programs_blocks_testimonial_carousel_reviews_order_idx\` ON \`programs_blocks_testimonial_carousel_reviews\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`programs_blocks_testimonial_carousel_reviews_parent_id_idx\` ON \`programs_blocks_testimonial_carousel_reviews\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`programs_blocks_testimonial_carousel_reviews_avatar_idx\` ON \`programs_blocks_testimonial_carousel_reviews\` (\`avatar_id\`);`)
  await db.run(sql`CREATE TABLE \`programs_blocks_testimonial_carousel\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`programs\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`programs_blocks_testimonial_carousel_order_idx\` ON \`programs_blocks_testimonial_carousel\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`programs_blocks_testimonial_carousel_parent_id_idx\` ON \`programs_blocks_testimonial_carousel\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`programs_blocks_testimonial_carousel_path_idx\` ON \`programs_blocks_testimonial_carousel\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`programs_blocks_pricing_card_features\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`feature\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`programs_blocks_pricing_card\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`programs_blocks_pricing_card_features_order_idx\` ON \`programs_blocks_pricing_card_features\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`programs_blocks_pricing_card_features_parent_id_idx\` ON \`programs_blocks_pricing_card_features\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`programs_blocks_pricing_card\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`price\` text NOT NULL,
  	\`cta_label\` text DEFAULT 'Enroll Now',
  	\`cta_url\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`programs\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`programs_blocks_pricing_card_order_idx\` ON \`programs_blocks_pricing_card\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`programs_blocks_pricing_card_parent_id_idx\` ON \`programs_blocks_pricing_card\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`programs_blocks_pricing_card_path_idx\` ON \`programs_blocks_pricing_card\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`programs_blocks_html_embed\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`html\` text NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`programs\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`programs_blocks_html_embed_order_idx\` ON \`programs_blocks_html_embed\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`programs_blocks_html_embed_parent_id_idx\` ON \`programs_blocks_html_embed\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`programs_blocks_html_embed_path_idx\` ON \`programs_blocks_html_embed\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`programs_blocks_rich_text\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`content\` text NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`programs\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`programs_blocks_rich_text_order_idx\` ON \`programs_blocks_rich_text\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`programs_blocks_rich_text_parent_id_idx\` ON \`programs_blocks_rich_text\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`programs_blocks_rich_text_path_idx\` ON \`programs_blocks_rich_text\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`programs_blocks_accordion_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`question\` text NOT NULL,
  	\`answer\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`programs_blocks_accordion\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`programs_blocks_accordion_items_order_idx\` ON \`programs_blocks_accordion_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`programs_blocks_accordion_items_parent_id_idx\` ON \`programs_blocks_accordion_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`programs_blocks_accordion\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`programs\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`programs_blocks_accordion_order_idx\` ON \`programs_blocks_accordion\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`programs_blocks_accordion_parent_id_idx\` ON \`programs_blocks_accordion\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`programs_blocks_accordion_path_idx\` ON \`programs_blocks_accordion\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`programs\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`slug\` text,
  	\`status\` text DEFAULT 'open',
  	\`checkout_url\` text,
  	\`title\` text NOT NULL,
  	\`listing_metadata_summary\` text,
  	\`listing_metadata_thumbnail_id\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`listing_metadata_thumbnail_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`programs_slug_idx\` ON \`programs\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`programs_listing_metadata_listing_metadata_thumbnail_idx\` ON \`programs\` (\`listing_metadata_thumbnail_id\`);`)
  await db.run(sql`CREATE INDEX \`programs_updated_at_idx\` ON \`programs\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`programs_created_at_idx\` ON \`programs\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`subscribers_interests\` (
  	\`order\` integer NOT NULL,
  	\`parent_id\` integer NOT NULL,
  	\`value\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`subscribers\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`subscribers_interests_order_idx\` ON \`subscribers_interests\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`subscribers_interests_parent_idx\` ON \`subscribers_interests\` (\`parent_id\`);`)
  await db.run(sql`CREATE TABLE \`subscribers\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`email\` text NOT NULL,
  	\`source\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`subscribers_email_idx\` ON \`subscribers\` (\`email\`);`)
  await db.run(sql`CREATE INDEX \`subscribers_updated_at_idx\` ON \`subscribers\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`subscribers_created_at_idx\` ON \`subscribers\` (\`created_at\`);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`articles_id\` integer REFERENCES articles(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`tools_id\` integer REFERENCES tools(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`events_id\` integer REFERENCES events(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`programs_id\` integer REFERENCES programs(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`subscribers_id\` integer REFERENCES subscribers(id);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_articles_id_idx\` ON \`payload_locked_documents_rels\` (\`articles_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_tools_id_idx\` ON \`payload_locked_documents_rels\` (\`tools_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_events_id_idx\` ON \`payload_locked_documents_rels\` (\`events_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_programs_id_idx\` ON \`payload_locked_documents_rels\` (\`programs_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_subscribers_id_idx\` ON \`payload_locked_documents_rels\` (\`subscribers_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`articles\`;`)
  await db.run(sql`DROP TABLE \`tools\`;`)
  await db.run(sql`DROP TABLE \`events\`;`)
  await db.run(sql`DROP TABLE \`programs_blocks_hero\`;`)
  await db.run(sql`DROP TABLE \`programs_blocks_feature_grid_features\`;`)
  await db.run(sql`DROP TABLE \`programs_blocks_feature_grid\`;`)
  await db.run(sql`DROP TABLE \`programs_blocks_content_split\`;`)
  await db.run(sql`DROP TABLE \`programs_blocks_testimonial_carousel_reviews\`;`)
  await db.run(sql`DROP TABLE \`programs_blocks_testimonial_carousel\`;`)
  await db.run(sql`DROP TABLE \`programs_blocks_pricing_card_features\`;`)
  await db.run(sql`DROP TABLE \`programs_blocks_pricing_card\`;`)
  await db.run(sql`DROP TABLE \`programs_blocks_html_embed\`;`)
  await db.run(sql`DROP TABLE \`programs_blocks_rich_text\`;`)
  await db.run(sql`DROP TABLE \`programs_blocks_accordion_items\`;`)
  await db.run(sql`DROP TABLE \`programs_blocks_accordion\`;`)
  await db.run(sql`DROP TABLE \`programs\`;`)
  await db.run(sql`DROP TABLE \`subscribers_interests\`;`)
  await db.run(sql`DROP TABLE \`subscribers\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	\`media_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_payload_locked_documents_rels\`("id", "order", "parent_id", "path", "users_id", "media_id") SELECT "id", "order", "parent_id", "path", "users_id", "media_id" FROM \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_payload_locked_documents_rels\` RENAME TO \`payload_locked_documents_rels\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
}
