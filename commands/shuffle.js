const { MessageEmbed } = require("discord.js");
const sendError = require("../util/error");

module.exports = {
  info: {
    name: "shuffle",
    description: "Toca as músicas em uma ordem aleatória",
    usage: "[shuffle ou aleatório]",
    aliases: ["shuffle", "aleatório"],
  },

  run: async function (client, message, args) {
    let channel = message.member.voice.channel;
    if (!channel) return sendError("Você precisa está conectado a um canal de voz", message.channel);

    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue) return sendError("Não há uma lista",message.channel).catch(console.error);
try{
    let songs = serverQueue.songs;
    for (let i = songs.length - 1; i > 1; i--) {
      let j = 1 + Math.floor(Math.random() * i);
      [songs[i], songs[j]] = [songs[j], songs[i]];
    }
    serverQueue.songs = songs;
    message.client.queue.set(message.guild.id, serverQueue);
    message.react("✅")
      } catch (error) {
        message.guild.me.voice.channel.leave();
        message.client.queue.delete(message.guild.id);
        return; //sendError(`${error}`, message.channel);
     }
  },
};
