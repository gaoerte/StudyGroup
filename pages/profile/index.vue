<template>
    <view class="container">
        <!-- 个人信息 -->
        <view class="profile-info">
            <image class="avatar" src="/static/icons/user.png"></image>
            <view class="user-text">
                <text class="username">张三</text>
                <text class="email">zhangsan@example.com</text>
            </view>
        </view>

        <!-- 我的学习小组 -->
        <view class="my-groups">
            <text class="section-title">我加入的小组</text>
            <view v-for="(group, index) in myGroups" :key="index" class="group-card">
                <text>{{ group.name }}</text>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            myGroups: [
                { name: '英语晨读打卡群' },
                { name: 'Python学习小组' }
            ]
        };
    }
}
</script>

<style scoped>
.container {
    padding: 20rpx;
}

.profile-info {
    display: flex;
    background-color: #fff;
    padding: 20rpx;
    border-radius: 10rpx;
    margin-bottom: 20rpx;
}

.avatar {
    width: 80rpx;
    height: 80rpx;
    border-radius: 50%;
    margin-right: 15rpx;
}

.user-text {
    flex: 1;
}

.username {
    font-size: 28rpx;
    font-weight: bold;
}

.email {
    color: #666;
}

.my-groups {
    margin-top: 20rpx;
}

.section-title {
    font-size: 28rpx;
    font-weight: bold;
}

.group-card {
    background-color: #f5f5f5;
    padding: 15rpx;
    margin-bottom: 10rpx;
    border-radius: 8rpx;
}
</style>
