import { createClient } from '../client';

export const deleteFromWaitingQueue = async (messageId: string) => {
	const client = await createClient();

	await client.query(`DELETE FROM waitforapprove WHERE messageid='${messageId}'`);
};
