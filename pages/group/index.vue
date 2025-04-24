<template>
    <view class="container">
        <!-- 小组信息 -->
        <view class="group-info">
            <image class="group-cover" :src="group.cover" alt="group cover"></image>
            <view class="group-text">
                <text class="group-title">{{ group.name }}</text>
                <text class="group-member">{{ group.memberCount }}人</text>
                <text class="group-desc">{{ group.description }}</text>
            </view>
        </view>

        <!-- 小组成员 -->
        <view class="member-list">
            <text class="section-title">成员</text>
            <view v-for="(member, index) in group.members" :key="index" class="member-card">
                <text>{{ member }}</text>
            </view>
        </view>

        <!-- 小组任务 -->
        <view class="task-list">
            <text class="section-title">任务</text>
            <view v-for="(task, index) in group.tasks" :key="index" class="task-card">
                <text>{{ task }}</text>
            </view>
        </view>

        <!-- 跳转到聊天页面 -->
        <view class="chat-button">
            <button @click="navigateToChat">进入聊天</button>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            groupId: '',  // 接收小组 ID
            group: {}     // 存储小组信息
        };
    },
    onLoad(options) {
        // 获取传递的 groupId
        this.groupId = options.id;
        console.log('获取的 groupId：', this.groupId);

        // 假设从数据库或 API 获取小组数据
        const groups = [
            {
                id: 1,
                name: '英语晨读打卡群',
                cover: '/static/group-covers/english.png',
                memberCount: 235,
                description: '每日清晨6:30准时打卡，互相监督学英语',
                members: ['张三', '李四', '王五'],
                tasks: ['晨读打卡', '周末总结分享']
            },
            {
                id: 2,
                name: 'Python学习小组',
                cover: '/static/group-covers/python.png',
                memberCount: 120,
                description: '一起学习 Python，解决技术问题',
                members: ['李明', '赵海', '孙丹'],
                tasks: ['Python语法学习', '项目实战']
            },
            // 其他小组数据
        ];

        // 根据 groupId 查找对应的小组
        const group = groups.find(group => group.id === parseInt(this.groupId));
        if (group) {
            this.group = group;
        } else {
            console.error('小组未找到');
        }
    },
    methods: {
        // 跳转到聊天页面
        navigateToChat() {
            uni.navigateTo({
                url: `/pages/group/chat?id=${this.groupId}`
            });
        }
    }
}
</script>

<style scoped>
.container {
    padding: 20rpx;
}

.group-info {
    display: flex;
    background-color: #fff;
    padding: 20rpx;
    border-radius: 10rpx;
    margin-bottom: 20rpx;
}

.group-cover {
    width: 100rpx;
    height: 100rpx;
    border-radius: 8rpx;
    margin-right: 15rpx;
}

.group-text {
    flex: 1;
}

.group-title {
    font-size: 30rpx;
    font-weight: bold;
}

.group-member {
    color: #007AFF;
}

.group-desc {
    color: #666;
    font-size: 24rpx;
}

.member-list,
.task-list {
    margin-top: 20rpx;
}

.section-title {
    font-size: 28rpx;
    font-weight: bold;
}

.member-card,
.task-card {
    background-color: #f5f5f5;
    padding: 15rpx;
    margin-bottom: 10rpx;
    border-radius: 8rpx;
}

.chat-button {
    margin-top: 30rpx;
    text-align: center;
}

.chat-button button {
    background-color: #007AFF;
    color: white;
    padding: 12rpx 30rpx;
    border-radius: 8rpx;
    font-size: 28rpx;
}
</style>
