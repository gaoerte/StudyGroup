<template>
    <view class="container">
        <!-- 聊天消息显示区域 -->
        <scroll-view class="chat-window" scroll-y :scroll-top="scrollTop">
            <view v-for="(message, index) in messages" :key="index" class="message">
                <view class="message-content">{{ message.content }}</view>
                <view class="message-time">{{ message.timestamp }}</view>
            </view>
        </scroll-view>

        <!-- 输入框 -->
        <view class="input-area">
            <input v-model="message" placeholder="请输入消息" class="input-box" @confirm="sendMessage" />
            <button @click="sendMessage" class="send-button">发送</button>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            groupId: '',  // 小组ID
            message: '',  // 输入的消息
            messages: [],  // 聊天记录
            scrollTop: 0,  // 滚动位置
            socketOpen: false  // WebSocket连接状态
        };
    },
    onLoad(options) {
        // 获取传递的 groupId
        this.groupId = options.id;
        console.log('获取的 groupId：', this.groupId);

        // 连接到 WebSocket
        uni.connectSocket({
            url: `ws://localhost:8081/group/${this.groupId}`,  // 使用 groupId 创建房间
        });

        // 监听 WebSocket 连接打开事件
        uni.onSocketOpen(() => {
            console.log('WebSocket 连接成功');
            this.socketOpen = true;
        });

        // 监听 WebSocket 消息事件
        uni.onSocketMessage((res) => {
            const message = JSON.parse(res.data);
            this.messages.push(message);  // 将收到的消息显示在聊天界面
            this.scrollTop = this.messages.length * 60;  // 滚动到最新消息
        });

        // 监听 WebSocket 错误事件
        uni.onSocketError((err) => {
            console.error('WebSocket 连接错误：', err);
        });
    },
    methods: {
        sendMessage() {
            if (this.socketOpen && this.message.trim()) {
                const msg = {
                    content: this.message,
                    timestamp: this.formatTimestamp(new Date()),
                    groupId: this.groupId,
                };

                // 发送消息到 WebSocket 后端
                uni.sendSocketMessage({
                    data: JSON.stringify(msg)
                });

                this.messages.push(msg);  // 本地显示发送的消息
                this.message = '';  // 清空输入框
            } else {
                console.log('WebSocket 尚未连接或消息为空');
            }
        },
        formatTimestamp(date) {
            const hours = date.getHours();
            const minutes = date.getMinutes();
            return `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
        }
    },
    onUnload() {
        // 退出小组聊天时关闭 WebSocket 连接
        uni.closeSocket();
    }
}
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    padding: 20rpx;
}

.chat-window {
    flex: 1;
    background-color: #f7f7f7;
    padding-bottom: 20rpx;
    overflow-y: scroll;
}

.message {
    background-color: #fff;
    border-radius: 10rpx;
    margin-bottom: 10rpx;
    padding: 10rpx;
}

.message-content {
    font-size: 28rpx;
    color: #333;
}

.message-time {
    font-size: 20rpx;
    color: #888;
    text-align: right;
}

.input-area {
    display: flex;
    align-items: center;
    background-color: #fff;
    padding: 10rpx;
    border-top: 1px solid #ccc;
}

.input-box {
    flex: 1;
    padding: 10rpx;
    font-size: 26rpx;
    border: 1px solid #ccc;
    border-radius: 5rpx;
}

.send-button {
    margin-left: 10rpx;
    background-color: #007AFF;
    color: #fff;
    padding: 10rpx 20rpx;
    font-size: 28rpx;
    border-radius: 5rpx;
}
</style>
