import { createClient } from '../client';
import { Report } from '../reports/types';

type Query = Report & { waitmessage: string };

export const getFromWaitingQueue = async (messageId: string): Promise<Query | undefined> => {
	const client = await createClient();

	const data = await client.query<Query>(
		`SELECT reports.*, waitforapprove.messageid as waitmessage
		FROM waitforapprove 
		JOIN reports ON reports.id = waitforapprove.reportid 
		WHERE waitforapprove.messageid='${messageId}'`,
	);

	return data.rows[0];
};
