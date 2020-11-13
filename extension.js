/* eslint-disable global-require */
const Discord = require('discord.js');
const nodecgAPIContext = require('./util/nodecg-api-context');

const client = new Discord.Client();

module.exports = function (nodecg) {
  // Store a reference to this NodeCG API context in a place where other libs can easily access it.
  // This must be done before any other files are `require`d.
  nodecgAPIContext.set(nodecg);
  const DISCORD_TOKEN = nodecg.bundleConfig.discordBotToken;
  const DISCORD_CHANNEL = nodecg.bundleConfig.discordChannel;

  client.on('ready', () => {
    nodecg.log.info(`Logged in as ${client.user.tag}!`);
    const discordChannel = client.channels.cache.get(DISCORD_CHANNEL);

    nodecg.listenFor('postDiscordMessage', (message, ack) => {
      const messageEmbed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Some title')
        .setURL('https://discord.js.org/')
        .setAuthor('Some name', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
        .setDescription(message)
        .setThumbnail('https://i.imgur.com/wSTFkRM.png')
        .setTimestamp();

      discordChannel.send(messageEmbed)
        .then(() => ack(null, true));
    });
  });

  client.login(DISCORD_TOKEN);
};
