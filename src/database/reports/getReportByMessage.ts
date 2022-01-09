import { createClient } from '../client';
import { Report } from './types';

type Query = Report & { waitmessage: string };

export const getReportByMessage = async (messageId: string): Promise<Query | undefined> => {
	const client = await createClient();

	const query = await client.query<Query>(`SELECT reports.*, waitforapprove.messageid as waitmessage
    FROM waitforapprove 
    JOIN reports ON reports.id = waitforapprove.reportid 
    WHERE reports.messageid='${messageId}' AND reports.resolved=FALSE`);

	return query.rows[0];
};
