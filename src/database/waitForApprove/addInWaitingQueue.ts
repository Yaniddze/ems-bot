import { createClient } from '../client';

export const addInWaitingQueue = async (messageId: string, reportId: number) => {
	const client = await createClient();

	await client.query(`INSERT INTO waitforapprove(messageid, reportid) VALUES ('${messageId}', ${reportId})`);
};
