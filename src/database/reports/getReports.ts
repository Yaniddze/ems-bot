import { createClient } from '../client';
import { Report } from './types';

export const getReports = async (userId?: string) => {
	const client = await createClient();

	const filter = userId === undefined ? '' : `AND goodguy='${userId}'`;

	const data = await client.query<Pick<Report, 'badguy'>>(
		`SELECT DISTINCT badguy FROM reports WHERE resolved=FALSE ${filter}`,
	);

	return data.rows.map(x => x.badguy);
};
