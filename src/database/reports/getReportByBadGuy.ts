import { createClient } from '../client';
import { Report } from './types';

export const getReportByBadGuy = async (userId: string): Promise<Report | undefined> => {
	const client = await createClient();

	const query = await client.query<Report>(`SELECT * FROM reports WHERE resolved=FALSE AND badguy='${userId}'`);

	return query.rows[0];
};
