<template>
    <el-col>
        <el-input type="textarea" placeholder="请输入评论" v-model="newComment.value"></el-input>
        <el-row>
            <el-button type="primary">发表评论</el-button>
            <!-- <el-button type="primary" @click="postComment">发表评论</el-button> -->
        </el-row>

        <div v-for="item in comments" :key="item.ownerId" class="comment">
            <el-col class="parentComment">
                <el-col>
                    <el-col style="padding: 10px">
                        <el-row class="fullwidth">
                            <el-col :span="2" style="margin: 5px;">
                                <el-avatar :size="35" :src="item.fromAvatar" />
                            </el-col>
                            <el-col :span="20" class="vertical-layout">
                                <span>
                                    {{ item.fromName }}
                                </span>
                                <span>
                                    {{ item.date }}
                                </span>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-col>
                <el-col>
                    <el-row class="fullwidth">
                        <el-col :span="24">
                            <el-col class="comment-text">
                                <el-text>
                                    {{ item.content }}
                                </el-text>
                            </el-col>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col>
                    <el-button color="#626aef" text>
                        <!-- <el-button @click="toggleLike(index)" color="#626aef" text> -->
                        <el-icon><LikeIcon /></el-icon>
                        <el-text> {{ item.likeNum ? "取消点赞" : "点赞" }} ({{ item.likeNum }}) </el-text>
                    </el-button>
                    <el-button color="#626aef" text>
                        <!-- <el-button @click="reply(index)" color="#626aef" text> -->
                        <el-icon size="20"><ChatRound /></el-icon>回复</el-button
                    >

                    <el-button @click="fillIcon"
                        ><el-icon :class="{ 'filled-icon': isFilled }">
                            <LikeIcon />
                            <!-- 替换为你的el-icon组件 --> </el-icon
                        >点击我</el-button
                    >

                    <!-- 使用动态class绑定来改变icon颜色 -->
                </el-col>
            </el-col>
            <el-col class="ChildComment right-aligned-col">
                <el-col v-for="reply in item.reply">
                    <el-col class="parentComment">
                        <el-col>
                            <el-col style="padding: 10px">
                                <el-row class="fullwidth">
                                    <el-col :span="2" style="margin: 5px;">
                                        <el-avatar :size="35" :src="item.fromAvatar" />
                                    </el-col>
                                    <el-col :span="20" class="vertical-layout">
                                        <span>
                                            {{ reply.fromName }}
                                        </span>
                                        <span>
                                            {{ reply.date }}
                                        </span>
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-col>
                        <el-col>
                            <el-row class="fullwidth">
                                <el-col :span="24">
                                    <el-col class="comment-text">
                                        <el-text>
                                            {{ reply.content }}
                                        </el-text>
                                    </el-col>
                                </el-col>
                            </el-row>
                        </el-col>
                        <el-col>
                            <el-button color="#626aef" text>
                                <!-- <el-button @click="toggleLike(index)" color="#626aef" text> -->
                                <el-icon><LikeIcon /></el-icon>
                                <el-text> {{ reply.likeNum ? "取消点赞" : "点赞" }} ({{ reply.likeNum }}) </el-text>
                            </el-button>
                            <el-button color="#626aef" text>
                                <!-- <el-button @click="reply(index)" color="#626aef" text> -->
                                <el-icon size="20"><ChatRound /></el-icon>回复</el-button
                            >

                            <el-button @click="fillIcon"
                                ><el-icon :class="{ 'filled-icon': isFilled }">
                                    <LikeIcon />
                                    <!-- 替换为你的el-icon组件 --> </el-icon
                                >点击我</el-button
                            >

                            <!-- 使用动态class绑定来改变icon颜色 -->
                        </el-col>
                    </el-col>
                </el-col>
            </el-col>
        </div>
    </el-col>
</template>

<script lang="ts" setup>
    import { ref } from "vue";
    import { Delete, Edit, Search, Share, Upload } from "@element-plus/icons-vue";
    import LikeIcon from "@/icon/thumb.vue";

    const newComment = ref("");

    // 定义评论数据类型
    interface CommentData {
        id: string;
        date: string;
        ownerId: string;
        fromId: string;
        fromName: string;
        fromAvatar: string;
        likeNum: number;
        content: string;
        reply: Reply[];
    }

    // 定义回复数据类型
    interface Reply {
        id: string;
        commentId: string;
        fromId: string;
        fromName: string;
        fromAvatar: string;
        toId: string;
        toName: string;
        toAvatar: string;
        content: string;
        date: string;
    }

    // 定义顶层评论对象的类型
    interface Comment {
        status: string;
        code: number;
        data: CommentData[];
    }

    // 使用上述定义的类型声明 `comment` 对象
    const comments: CommentData[] = [
        {
            id: "comment0001",
            date: "2018-07-05 08:30",
            ownerId: "talents100020",
            fromId: "errhefe232213",
            fromName: "犀利的评论家",
            fromAvatar: "https://avatars.githubusercontent.com/u/96361202?v=4",
            likeNum: 3,
            content:
                "本场春招加时赛的做题页面采用全新「灵动布局」如果你对「灵动布局」不太熟悉，可在题库中选择任一题目.进入做题页面后，在右上角选择布局，通过「帮助」引导了解更多.本场春招加时赛的做题页面采用全新「灵动布局」如果你对「灵动布局」不太熟悉，可在题库中选择任一题目.进入做题页面后，在右上角选择布局，通过「帮助」引导了解更多",
            reply: [
                {
                    id: "34523244545",
                    commentId: "comment0001",
                    fromId: "observer223432",
                    fromName: "夕阳红",
                    fromAvatar: "https://wx4.sinaimg.cn/mw690/69e273f8gy1ft1541dmb7j215o0qv7wh.jpg",
                    toId: "errhefe232213",
                    toName: "犀利的评论",
                    toAvatar: "http://ww4.sinaimg.cn/bmiddle/006DLFVFgy1ft0j2pddjuj30v90uvagf.jpg",
                    content: "赞同，很靠谱，水平很高",
                    date: "2018-07-05 08:35",
                },
                {
                    id: "34523244545",
                    commentId: "comment0001",
                    fromId: "observer567422",
                    fromName: "清晨一缕阳光",
                    fromAvatar: "http://imgsrc.baidu.com/imgad/pic/item/c2fdfc039245d688fcba1b80aec27d1ed21b245d.jpg",
                    toId: "observer223432",
                    toName: "夕阳红",
                    toAvatar: "https://wx4.sinaimg.cn/mw690/69e273f8gy1ft1541dmb7j215o0qv7wh.jpg",
                    content: "本场春招加时赛的做题页面采用全新「灵动布局」如果你对「灵动布局」不太熟悉，可在题库中选择任一题目.进入做题页面后，在右上角选择布局，通过「帮助」引导了解更多.本场春招加时赛的做题页面采用全新「灵动布局」如果你对「灵动布局」不太熟悉，可在题库中选择任一题目.进入做题页面后，在右上角选择布局，通过「帮助」引导了解更多",
                    date: "2018-07-05 08:50",
                },
            ],
        },
        {
            id: "comment0002",
            date: "2018-07-05 08:30",
            ownerId: "talents100020",
            fromId: "errhefe232213",
            fromName: "兄弟你好评论家",
            fromAvatar: "https://avatars.githubusercontent.com/u/96361202?v=4",
            likeNum: 0,
            content: "从没见过这么优秀的人",
            reply: [
                {
                    id: "34523244545",
                    commentId: "comment0001",
                    fromId: "observer223432",
                    fromName: "夕阳红",
                    fromAvatar: "https://wx4.sinaimg.cn/mw690/69e273f8gy1ft1541dmb7j215o0qv7wh.jpg",
                    toId: "errhefe232213",
                    toName: "犀利的评论",
                    toAvatar: "http://ww4.sinaimg.cn/bmiddle/006DLFVFgy1ft0j2pddjuj30v90uvagf.jpg",
                    content: "赞同，很靠谱，水平很高",
                    date: "2018-07-05 08:35",
                }],
        },
        {
            id: "comment0003",
            date: "2018-07-05 08:30",
            ownerId: "talents100020",
            fromId: "errhefe232213",
            fromName: "兄弟你好评论家",
            fromAvatar: "https://avatars.githubusercontent.com/u/96361202?v=4",
            likeNum: 0,
            content: "从没见过这么优秀的人",
            reply: [],
        },
    ];

    //模拟评论数据

    // const postComment = () => {
    //     comments.value.push({ text: newComment.value, likes: 0, isLiked: false });
    //     newComment.value = "";
    // };
    const props = defineProps({
        comments: {
            type: Array as () => Comment[],
            required: true,
        },
    });

    const reply = (index: number) => {
        console.log("Reply to comment:", index);
        // 实际应用中可以添加回复逻辑
    };
    // 控制是否填充颜色的响应式引用
    const isFilled = ref(false);

    // 点击后改变图标颜色的方法
    const fillIcon = () => {
        isFilled.value = !isFilled.value;
    };
</script>

<style scope>
    .comment {
        margin-top: 10px;
    }
    .parentComment {
        background-color: rgb(255, 255, 255);
        height: 100%;
        width: 100%;
        border-bottom: thin dashed gray;
    }
    .ChildComment {
        background-color: rgb(255, 255, 255);
        height: 100%;
        width: 80%;
        
    }
    .logo {
        padding: 10px;
    }
    .fullwidth {
        width: 100%;
    }

    .text-margin {
        padding: 5px;
    }
    .comment-text {
        padding: 0 12px 12px;
    }
    .vertical-layout {
        display: flex;
        flex-direction: column;
    }
    .right-aligned-col {
      border-left: medium outset rgb(46, 46, 46);
        margin-left: auto;
    }
</style>
