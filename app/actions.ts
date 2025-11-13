'use server';

import { db } from '@/lib/db';
import { estimates } from '@/lib/db/schema';

// Define the shape of the data we expect from the calculator
interface EstimateData {
  projectName: string;
  clientName: string;
  services: { name: string; price: number }[];
  totalCost: number;
}

export async function saveEstimate(data: EstimateData) {
  if (!data.projectName || !data.clientName || !data.totalCost) {
    return { success: false, message: 'Project name, client name, and total cost are required.' };
  }

  try {
    // The schema expects totalCost as a string (varchar), so we convert it.
    // The services array is stored as JSONB.
    await db.insert(estimates).values({
      projectName: data.projectName,
      clientName: data.clientName,
      services: data.services,
      totalCost: String(data.totalCost),
    });

    console.log('Estimate saved successfully:', data);
    
    return { success: true, message: 'Смета успешно сохранена!' };
  } catch (error) {
    console.error('Error saving estimate:', error);
    return { success: false, message: 'Произошла ошибка при сохранении сметы.' };
  }
}
