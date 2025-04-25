const WebSocket = require('ws');
const wss = new WebSocket.Server({ host: '0.0.0.0', port: 8081 });  // 监听所有地址

const groupRooms = {}; // 存储每个小组的 WebSocket 连接

wss.on('connection', ws => {
  console.log('用户连接');
  let groupId = '';

  if (ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({ message: '欢迎加入聊天室！' }));
    console.log('欢迎消息已发送');
  }
  else {
    console.log('连接未打开');
  }

  // 接收到消息时
  ws.on('message', message => {
    const msg = JSON.parse(message);
    
    if (!groupId) {
      groupId = msg.groupId;
      if (!groupRooms[groupId]) {
        groupRooms[groupId] = [];
      }
      groupRooms[groupId].push(ws); // 加入小组的聊天室
    }

    // 广播消息给同一小组的其他成员
    groupRooms[groupId].forEach(client => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message); // 发送消息到小组的其他成员
      }
    });
  });

  // 连接关闭时清理小组聊天室
  ws.on('close', () => {
    if (groupId && groupRooms[groupId]) {
      groupRooms[groupId] = groupRooms[groupId].filter(client => client !== ws);
    }
    console.log('连接关闭');
  });
});

console.log('WebSocket 服务器已启动，监听端口 8081');
