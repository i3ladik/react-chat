const { WebSocketServer } = require('ws');

const wSS = new WebSocketServer({ noServer: true });
const wSSClients = [];

wSS.on('connection', (ws) => {
    wSSClients.push(ws);

    ws.on('close', () => {
        const index = wSSClients.indexOf(ws);
        if (index !== -1) wSSClients.splice(index, 1);
    });
});

const wsHandleUpgrade = (req, socket, head) => {
    wSS.handleUpgrade(req, socket, head, (ws) => {
        wSS.emit('connection', ws, req);
    });
};

const wsSend = (data) => wSSClients.forEach((client) => client.send(JSON.stringify(data)));

module.exports = {
    wsSend,
    wsHandleUpgrade
};