let fetch = require('node-fetch')
let handler = async (m, { text, usedPrefix, command }) => {
  if (!text) throw `Harap masukkan parameter negara!\n\nContoh: ${usedPrefix + command} Indonesia`
  let res = await fetch(global.API('https://covid19.mathdro.id', '/api/countries/' + (text)))
  if (!res.ok) throw await `${res.status} ${res.statusText}`
  let json = await res.json()
  if (json.confirmed) m.reply(`
الدولة: ${text}
الحالات المؤكدة: ${json.confirmed.value}
المحتملين: ${json.recovered.value}
الوفايات: ${json.deaths.value} 
آخر تحديث: ${json.lastUpdate}
`.trim())
  else throw json
}
handler.help = ['covid'].map(v => v + ' <negara>')
handler.tags = ['internet']
handler.command = /^(corona|covid|covid19|كورونا)$/i
//susu
module.exports = handler
