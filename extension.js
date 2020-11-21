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
      if (!message.title || !message.content) {
        ack('Missing title and/or content fields!');
      }

      const messageEmbed = new Discord.MessageEmbed()
        .setTitle(message.title)
        .setDescription(message.content);

      if (message.author) {
        messageEmbed.setAuthor(message.author.name, message.author.image, message.author.url);
      }

      if (message.url) {
        messageEmbed.setURL(message.url);
      }

      if (message.color) {
        messageEmbed.setColor(message.color);
      } else {
        messageEmbed.setColor('#0099ff');
      }

      if (message.fields) {
        Object.values(message.fields).forEach((field) => {
          if (typeof (field.inline) === 'undefined' || field.inline === null) {
            // eslint-disable-next-line no-param-reassign
            field.inline = false;
          }
          messageEmbed.addField(field.name, field.value, field.inline);
        });
      }

      if (message.thumbnail) {
        messageEmbed.setThumbnail(message.thumbnail);
      }

      if (message.image) {
        messageEmbed.setImage(message.image);
      }

      if (message.timestamp) {
        messageEmbed.setTimestamp(message.timestamp);
      }

      discordChannel.send(messageEmbed);
    });
  });

  client.login(DISCORD_TOKEN);
};
