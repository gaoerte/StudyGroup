<template>
    <view class="container">
        <!-- 分类筛选 -->
        <view class="filter">
            <button v-for="(category, index) in categories" :key="index" @click="filterGroup(category)">
                {{ category }}
            </button>
        </view>

        <!-- 小组列表 -->
        <view class="group-list">
            <view v-for="(group, index) in filteredGroupList" :key="index" class="group-card"
                @click="navigateToDetail(group.id)">
                <image class="group-cover" :src="group.cover"></image>
                <view class="group-info">
                    <text class="group-title">{{ group.name }}</text>
                    <text class="group-desc">{{ group.description }}</text>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            categories: ['全部', '语言学习', '编程学习', '读书会'],
            allGroupList: [
                { id: 1, name: '英语晨读群', cover: '/static/group-covers/english.png', description: '互相督促，早晨一起学英语', category: '语言学习' },
                { id: 2, name: 'JavaScript学习群', cover: '/static/group-covers/javascript.png', description: '一起探讨 JS 技术', category: '编程学习' },
                { id: 3, name: 'Python学习小组', cover: '/static/group-covers/python.png', description: '学习 Python 编程语言', category: '编程学习' },
                // 添加更多小组数据
            ],
            filteredGroupList: []
        };
    },
    created() {
        // 初始展示所有小组
        this.filteredGroupList = this.allGroupList;
    },
    methods: {
        filterGroup(category) {
            if (category === '全部') {
                this.filteredGroupList = this.allGroupList;
            } else {
                this.filteredGroupList = this.allGroupList.filter(group => group.category === category);
            }
        },
        navigateToDetail(groupId) {
            uni.navigateTo({
                url: `/pages/group/index?id=${groupId}`
            });
        }
    }
}
</script>

<style scoped>
.container {
    padding: 20rpx;
}

.filter {
    margin-bottom: 20rpx;
}

.filter button {
    margin: 10rpx;
    padding: 10rpx;
    background: #007AFF;
    color: #fff;
    border-radius: 5rpx;
}

.group-list {
    display: flex;
    flex-direction: column;
}

.group-card {
    display: flex;
    margin-bottom: 20rpx;
    background-color: #fff;
    border-radius: 10rpx;
    padding: 15rpx;
    box-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.1);
}

.group-cover {
    width: 100rpx;
    height: 100rpx;
    border-radius: 8rpx;
    margin-right: 15rpx;
}

.group-info {
    flex: 1;
}

.group-title {
    font-size: 28rpx;
    font-weight: bold;
}

.group-desc {
    font-size: 24rpx;
    color: #666;
}
</style>
