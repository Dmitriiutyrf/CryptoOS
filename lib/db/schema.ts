
import { pgTable, serial, text, timestamp, jsonb, varchar } from 'drizzle-orm/pg-core';

export const estimates = pgTable('estimates', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  
  // New fields for project and client info
  projectName: text('project_name').notNull(),
  clientName: text('client_name').notNull(),

  // Storing the list of services with their calculated prices as a JSON object
  services: jsonb('services').$type<Array<{ name: string; price: number }>>().notNull(),
  
  // Storing the final calculated cost
  totalCost: varchar('total_cost', { length: 256 }).notNull(),
});
