<template>
	<div class="full-page flex flex-col">
		<baseComponent activeIndex="3" />
		<el-container class="flex flex-grow pb-2 ps-1 pe-05">
			<el-row class="mt-05 w-100 h-100" :gutter="5">
				<div class="flex-grow"></div>
				<el-col :xs="24" :md="12" class="h-100">
					<el-card class="h-100 flex flex-col" body-class="flex flex-col flex-grow p-0">
						<template #header>
							<el-row class="card-header flex w-100">
								<el-col class="flex" :span="8">
									<el-space>
										<!-- <theAvatar :email="pasteUser.email" /> -->
										<theAvatar :email="pasteUser.email" />
										<div>
											<el-text>{{ pasteUser.nickname }}</el-text><br>
											<el-text size="small" type="info">发布于3小时前</el-text><br>
										</div>
									</el-space>
									<div class="flex-grow"></div>
								</el-col>
								<el-col class="flex" :span="8">
									<div class="flex-grow"></div>
									<span>Paste</span>
									<div class="flex-grow"></div>
								</el-col>
								<el-col class="flex" :span="8">
									<div class="flex-grow"></div>
									<el-button type="primary">分享</el-button>
								</el-col>
							</el-row>
							<el-col style="background-color: aquamarine;height:300px;">
								
							</el-col>
							
						</template>
						
						<!-- <div class="card-body flex flex-col h-0">
							<-editor class="flex-grow" v-model="context" :toolbarsFlag="false" :subfield="false" defaultOpen="preview" boxShadowStyle="none" />
						</div> -->
						
						<el-col style="background-color: rgb(255, 255, 255);">
							<el-col class="discusInfo">
								<el-row :gutter="24" style="height: 100%;">
									<el-col :span="8" style="background-color: aqua;height:100%;">
										<el-row class="fullheight">
											<el-col :span="8">
												<el-button type="info" :icon="Message" circle />
												<el-text>点赞</el-text>
											</el-col>
											<el-col :span="8">
												<el-button type="info" :icon="Message" circle />
												<el-text>收藏</el-text>
											</el-col>
											<el-col :span="8">
												<el-button type="info" :icon="Message" circle />
												<el-text>分享</el-text>
											</el-col>
										</el-row>
									</el-col>
									<el-col :span="8" style="background-color: aqua;">
										<el-text>nih1</el-text>
									</el-col>
									<el-col :span="8" style="background-color: aqua;">
										<el-row class="fullheight">
											<el-col :span="8"></el-col>
											<el-col :span="8"></el-col>
											<el-col :span="8">
												<el-button type="info" :icon="Message" circle />
												
											</el-col>
										</el-row>
										
									</el-col>
								</el-row>
								
							</el-col>
							<el-row slot="tableHeader" class="header-content">
								<el-text style="font-size: 25px;">评论</el-text>
							</el-row>
							<Comment prop=""/>
						</el-col>
					</el-card>
				</el-col>
				<div class="flex-grow"></div>
			</el-row>
		</el-container>
	</div>
</template>

<script setup lang="ts">
import baseComponent from "@/components/BaseComponent.vue"
import theAvatar from "@/components/TheAvatar.vue"
import axios from "axios";
import { reactive, ref } from "vue";
import { useRouter } from 'vue-router'

import Comment from "../../components/Comment.vue";
import {
	Check,
	Delete,
	Edit,
	Message,
	Search,
	Star,
  } from '@element-plus/icons-vue'
const router = useRouter()
const pasteId = router.currentRoute.value.params.id
const context = ref("")
const pasteUser = reactive({
	id: 0,
	username: '',
	nickname: '',
	email: '',
	className: '',
});
const comments = ref([
{
	status: "成功",
	code: 200,
	data: [
		{
			id: "comment0001",
			date: "2018-07-05 08:30",
			ownerId: "talents100020",
			fromId: "errhefe232213",
			fromName: "犀利的评论家",
			fromAvatar: "http://ww4.sinaimg.cn/bmiddle/006DLFVFgy1ft0j2pddjuj30v90uvagf.jpg",
			likeNum: 3,
			content: "非常靠谱的程序员",
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
					content: "大神一个！",
					date: "2018-07-05 08:50",
				},
			],
		},
		{
			id: "comment0002",
			date: "2018-07-05 08:30",
			ownerId: "talents100020",
			fromId: "errhefe232213",
			fromName: "毒蛇郭德纲",
			fromAvatar: "http://ww1.sinaimg.cn/bmiddle/006DLFVFgy1ft0j2q2p8pj30v90uzmzz.jpg",
			likeNum: 0,
			content: "从没见过这么优秀的人",
			reply: [],
		},
	],
}
])
axios.get(`/pastes/${pasteId}/`)
	.then(response => {
		// 请求成功后的处理
		pasteUser.id = response.data.user.id
		pasteUser.username = response.data.user.username
		pasteUser.nickname = response.data.user.nickname
		pasteUser.email = response.data.user.email
		pasteUser.className = response.data.user.class_name
		context.value = `# ${response.data.title}\n${response.data.text}\n\`\`\`${response.data.lang}\n${response.data.code}\n\`\`\``
	})
	.catch(_error => {
		// 请求失败后的处理
		context.value = `# 来晚了，这条Paste已过期\n这条Paste已经抵达了它的终点\n每人最多可维持10条Paste，最早发布的Paste会被销毁哦~`
	})

</script>

<style scoped>
.card-header {
	align-items: center;
}

.card-body {
	flex: 1;
}
.header-content {
	display: flex; /* 使用Flexbox */
	justify-content: center; /* 水平居中 */
	align-items: center; /* 垂直居中 (如果你也想垂直居中) */
	width: 100%; /* 占满整个容器宽度 (根据具体情况调整) */
  }
.discusInfo {
	height: 60px;
	background-color: rgb(255, 255, 255);
}
.center-content {
	display: flex;
	align-items: center;
	justify-content: center; /* 如果您也想水平居中 */
	height: 100px; /* 根据需要设置高度 */
  }
.fullheight {
	height: 100%;
	align-items: center;
}
</style>