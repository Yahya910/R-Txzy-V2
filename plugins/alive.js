let fetch = require('node-fetch')
let fs = require('fs')
function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0) ).join(':')
}

let handler  = async (m, { conn }) => {
  pplink = await conn.getProfilePicture(conn.user.jid)
  ppstatus = await conn.getStatus(conn.user.jid)
  totaluser = Object.keys(db.data.users)
  ppbuffer = await fetch(pplink).then(v => v.buffer())
  conn.sendMessage(m.chat, ppbuffer, 'imageMessage', { caption:`
❏ *اسم البوت* : ${conn.user.name}
❏ *من مجموعة* : ${conn.chats.array.filter(v => v.jid.endsWith('g.us')).map(v => v.jid).length}
❏ *رقمي الخاص* : ${conn.chats.array.filter(v => v.jid.endsWith('s.whatsapp.net')).map(v => v.jid).length}
❏ *كامل المستعملين* : ${totaluser.length}
❏ *واتساب رابط* : ${conn.browserDescription[0]}
❏ *نسخة رابط الواتساب* : ${conn.browserDescription[2]}
❏ *المتصفح* : ${conn.browserDescription[1]}
❏ *البلاطفورف* : Safari Linux
❏ *الوقت* : ${clockString(process.uptime() * 1000)}
❏ *هوتس رقم* : @${global.conn.user.jid.split('@')[0]}
❏ *البيو* : ${ppstatus.status}`, quoted: m, sendEphemeral: true, thumbnail: fs.readFileSync('./src/R-Txzy.png'), contextInfo: { mentionedJid: [global.conn.user.jid]}})
}
handler.help = ['alive']
handler.tags = ['main']
handler.command = /^(alive|حي)$/i
handler.fail = null

module.exports = handler
