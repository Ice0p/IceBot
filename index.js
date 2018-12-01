const botconfig = require("./botconfig.json");
const Discord = require("discord.js");

const bot = new Discord.Client({disableEveryone: true})

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online!`);

bot.user.setActivity('on eu', {type: "streaming", url: "URL"});

  //bot.user.setGame("on eu1??");
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

if(cmd === `${prefix}kick`){

    //kick @daeshan asking for it

    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return message.channel.send("who u trying to kick?");
    let kReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("no noob")
    if(kUser.hasPermission("KICK_MEMBERS")) return message.channel.send ("no xd")
    let kickEmbed = new Discord.RichEmbed()
    .setDescription("~Kick~")
    .setColor("#000000")
    .addField("Kicked User", `${kUser.id}`)
    .addField("Kicked By", `<${message.author.id}> with ID ${message.author.id}`)
    .addField("Kicked In", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", kReason);

    let kickChannel = message.guild.channels.find(`name`, "incidents");
    if(!kickChannel) return message.channel.send("Can't find incidents channel.");

    message.guild.member(kUser).kick(kReason)
    kickChannel.send(kickEmbed);

return;
}

if(cmd === `${prefix}ban`){
  let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!bUser) return message.channel.send("who u trying to ban?");
  let bReason = args.join(" ").slice(22);
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("no noob")
  if(bUser.hasPermission("BAN_MEMBERS")) return message.channel.send ("no xd")
  let banEmbed = new Discord.RichEmbed()
  .setDescription("~Ban~")
  .setColor("#000000")
  .addField("Banned User", `${bUser.id}`)
  .addField("Banned By", `<${message.author.id}> with ID ${message.author.id}`)
  .addField("Banned In", message.channel)
  .addField("Time", message.createdAt)
  .addField("Reason", bReason);

  let incidentchannel = message.guild.channels.find(`name`, "incidents");
  if(!incidentchannel) return message.channel.send("Can't find incidents channel.");

    message.guild.member(bUser).ban(bReason);
    incidentchannel.sent(banEmbed);



    return;
  }

if(cmd === `${prefix}report`){

  //!report @Ice this is the reason

  let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if (!rUser) return message.channel.send("Couldn't find user.");
  let reason = args.join(" ").slice(22);

  let reportEmbed = new Discord.RichEmbed()
  .setDescription("Reports")
  .setColor("#000000")
  .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
  .addField("Reported By",  `${message.author} with ID: ${message.author.id}`)
  .addField("Channel", message.channel)
  .addField("Time", message.createdAt)
  .addField("Reason", reason);

  let reportschannel = message.guild.channels.find(r => r.name ==="reports");

  if(!reportschannel) return message.channel.send("Couldn't find reports channel.")


  message.delete().catch(O_o=>{});
  reportschannel.send(reportEmbed);

    return;
  }


  if(cmd === `${prefix}serverinfo`){

    let sicon = message.guild.iconURL;
    let serverembed = new Discord.RichEmbed()
     .setDescription("Server Information")
     .setColor("#000000")
     .setThumbnail(sicon)
     .addField("Server Name", message.guild.name)
     .addField("Created On", message.guild.createdAt)
     .addField("You Joined", message.member.joinedAt)
     .addField("Total Members",message.guild.memberCount);

     return message.channel.send(serverembed);
   }



if(cmd === `${prefix}botinfo`){

  let bicon = bot.user.displayAvatarURL;
  let botembed = new Discord.RichEmbed()
  .setDescription("Bot Information")
  .setColor("#000000")
  .setThumbnail(bicon)
  .addField("Bot Name", bot.user.username)
  .addField("Created On", bot.user.createdAt);

  return message.channel.send(botembed);
 }

});

bot.login(botconfig.token);
