const { createHash } = require('crypto')
let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i
let handler = async function (m, { text, usedPrefix, command }) {
  let user = global.db.data.users[m.sender]
  if (user.registered === true) throw `Kamu sudah terdaftar\nMau daftar ulang? ${usedPrefix}unreg <SERIAL NUMBER>`
  if (!Reg.test(text)) throw `contoh:\n*${usedPrefix + command} nama.umur*`
  let [_, name, splitter, age] = text.match(Reg)
  if (!name) throw 'Nama tidak boleh kosong (Alphanumeric)'
  if (!age) throw 'Umur tidak boleh kosong (Angka)'
  age = parseInt(age)
  if (age > 70) throw 'انت كبير جدا '
  if (age < 5) throw 'انت صغير جدا ._.'
  user.name = name.trim()
  user.age = age
  user.regTime = + new Date
  user.registered = true
  let sn = createHash('md5').update(m.sender).digest('hex')
  m.reply(`
Daftar berhasil!

┌─〔 المعلومات 〕
├ الاسم: ${name}
├ العمر: ${age} tahun
├ كود التفعيل: ${sn}
└────

simpan/bintangi pesan ini karena SN (Serial Number) digunaan untuk daftar ulang
`.trim())
}
handler.help = ['daftar', 'reg', 'register'].map(v => v + ' <الاسم>.<العمر>')
handler.tags = ['xp']

handler.command = /^(التسجيل|daftar|reg(ister)?)$/i

module.exports = handler

