import { getSettings } from '../../../store';
import { getUnresolvedMessage } from '../../../database';
import { SelectHandler } from './types';
import { removeFromAvailableRoles } from '../../../utils';

export const closeReportSelect: SelectHandler = {
	getChannelId: () => getSettings().createReportChatId,
	selectId: 'снять выговор',
	handle: async interaction => {
		if (interaction.values.length === 0) return;

		const userId = interaction.values[0];
		const oldMessageId = await getUnresolvedMessage(userId);

		if (oldMessageId === '') {
			await interaction.reply({
				ephemeral: true,
				content: 'Не найдено сообщение с выданным выговором для данного пользователя',
			});
			return;
		}

		const member = await interaction.guild.members.fetch(userId);

		await removeFromAvailableRoles(member);

		const oldMessage = await interaction.channel.messages.fetch(oldMessageId);

		const thread = await oldMessage.startThread({
			name: member.nickname,
		});

		await thread.send(`<@${interaction.user.id}> снял выговор`);
		await thread.setArchived(true);
	},
};
