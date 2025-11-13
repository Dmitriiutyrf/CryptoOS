
import { pgTable, serial, text, integer, boolean, timestamp, jsonb } from 'drizzle-orm/pg-core';

export const estimates = pgTable('estimates', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  services: text('services').array().notNull(),
  objectType: text('object_type').notNull(),
  area: integer('area').notNull(),
  equipmentClass: text('equipment_class').notNull(),
  needsIntegration: boolean('needs_integration').notNull(),
  videoDetails: jsonb('video_details'),
  accessControlDetails: jsonb('access_control_details'),
  fireAlarmDetails: jsonb('fire_alarm_details'),
  result: jsonb('result').notNull(),
});
