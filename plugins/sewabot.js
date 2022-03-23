let fetch = require('node-fetch')
let { MessageType } = require('@adiwajshing/baileys')
let handler = async(m, { conn }) => {
    let kamisato = `
┌〔 العضوية 〕
├ العضوية المؤقتة
├ العضوية الدائمة
├ VIP
├ و العضوية التجريبية
└────
طريقة الدفع غير محددة.
مميزاتها premium


`.trim()
    const button = {
        buttonText: 'List Harga',
        description: kamisato,
        sections:  [{title: "Silahkan di pilih", rows: [
        {title: 'العضوية المؤقتة', description: 5 دراهم\ .", rowId:".masuk"},
        {title: 'العضوية الدائمة', description: "20 درهم\", rowId:".masuk"},
        {title: 'VIP', description: "50 درهم\", rowId:".masuk"},
        {title: 'التجريبية', description: "مجانية\", rowId:".join"},
        {title: 'صاحب البوت', description: "التحدث مع البوت بشأن طرق دفع أخرى.", rowId:".owner"},
        {title: 'القوانين', description: "لا يحق استرجاع المال دون داع", rowId:".snk"},
       ] }],
        listType: 1
       }
    conn.sendMessage(m.chat, button, MessageType.listMessage, { quoted: m })
}
handler.tags = ['main']
handler.command = /^(sewa)$/i
handler.help = ['sewa']
module.exports = handler
//R-Txzy
