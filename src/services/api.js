

export const agendaApiRequest = (username, date) => fetch(`http://edtmobilite.wigorservices.net:80/WebPsDyn.aspx?Action=posETUD&serverid=h&tel=${username}&date=${date}%208:00`,{
    method: 'GET',
    headers: {
        'Accept': 'text/html; charset=utf-8',
    },
})
