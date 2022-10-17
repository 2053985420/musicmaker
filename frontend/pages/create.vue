<template>
	<view>
		<uni-segmented-control :current="choose_index" :values="choose" @clickItem="onClickItem" style-type="text"
			active-color="red"></uni-segmented-control>

		<swiper :current="choose_index" @change="changeSwiper">
			<swiper-item>
				<createMusic></createMusic>
			</swiper-item>

			<swiper-item>
				<input :value="start" @input="inputStart" @blur="inputBlur" />
				<view :style="classObj.transition + 'background-color:' + swiperItems[current].bgColor + ';'">
					<swiper :duration="duration" class="swiperStyle" @change="swiperChange($event)" circular="true">
						<swiper-item v-for="(items, indexs) in swiperItems" :key="indexs" class="swiperItem">
							<block v-for="(item, index) in items.itemArray" :key="index">
								<block v-if="item&&item.type=='image'">
									<image :src="item.value" :mode="item.mode||'widthFix'" class="position_absolute"
										:style="classObj.transition + (current==indexs&&onReady?item.changeAfter:item.changeBefore) + item.css ">
									</image>
								</block>
								<block v-else-if="item&&item.type=='text'">
									<view class="position_absolute"
										:style="classObj.transition + (current==indexs&&onReady?item.changeAfter:item.changeBefore) + item.css">
										{{item.value}}
									</view>
								</block>
								<block v-else-if="item&&item.type=='button'">
									<button type="primary" :size="item.mode||'mini'" class="position_absolute"
										:style="classObj.transition + (current==indexs&&onReady?item.changeAfter:item.changeBefore) + item.css"
										@tap="activeFc()">{{item.value}}</button>
								</block>
							</block>
						</swiper-item>
					</swiper>
					<!-- <button type="primary" size="mini" class="position_absolute" :style="classObj.goonBtn" v-show="current!==(swiperItems.length-1)"
					 @tap="activeFc(true)">跳过</button> -->
					<view class="createBtn">
						<luButtonRipple class="button" rippleBackgroundColor="red" :rippleOpacity="0.6"
							@rippleTap="createLyrics">
							<image src="../static/images/send.png"></image>
						</luButtonRipple>
					</view>
				</view>
			</swiper-item>

			<swiper-item>
				<createPoetry></createPoetry>
			</swiper-item>
		</swiper>

		<loading ref="loading" :shadeShow="true" :shadeClick="true" :custom="false" :type="1">
			<text style="font-size: 10px;position: fixed;bottom: 10px;">AI正在作词中...</text>
		</loading>
	</view>
</template>

<script>
	import luButtonRipple from '@/components/lu-button-ripple/lu-button-ripple.vue';
	import createMusic from '../views/createMusic.vue';
	import createPoetry from '../views/createPoetry.vue';
	import loading from '@/components/xuan-loading/xuan-loading.vue'
	export default {
		components: {
			luButtonRipple,
			createMusic,
			createPoetry,
			loading
		},
		data() {
			const duration = 666; //动画时长控制
			return {
				current: 0, //swiper的index
				lyricStyles: ["zhoujielun", "dengziqi", "chenyixun", "xusong"],
				lyricNames: ["周杰伦","邓紫棋","陈奕迅","许嵩"],
				//注意所有元素都是绝对定位
				swiperItems: [{
						bgColor: '#6FA1A5',
						itemArray: [{
								type: 'image',
								css: 'width:60%;top:15%;left:50%;border-radius:10px;box-shadow: 24px 24px 41px #3c575a,-24px -24px 41px #98dde2;',
								value: '../static/images/singer/zhoujielun.jpg',
								changeBefore: 'transform: translate(-50%, -200%);',
								changeAfter: 'transform: translate(-50%, 0);'
							}, {
								type: 'text',
								css: 'font-size:5vh;top:50%;left:50%;font-weight: bold;text-shadow: 3px 3px 3px grey;',
								value: '周杰伦',
								changeBefore: 'transform: translate(-50%, 200%);opacity:0;color:black;',
								changeAfter: 'transform: translate(-50%, 0);opacity:1;color:#98dde2;'
							}, 
							{
								type: 'button', //button类型 在最后一页有跳转首页与设置iflLaunch标识为true方法
								css: 'width:100px;top:10%;left:15%;background-color:#bee0d4;color: #68e4cb;border-radius: 15px;box-shadow: 6px 6px 12px #3c575a,-4px -4px 8px #98dde2;',
								mode: 'default', //button时为button的size，  图片类型是为图片的mode
								value: '晴天',
								changeBefore: 'transform: translate(-50%, 50%) scale(0,0);opacity:0;',
								changeAfter: 'transform: translate(-50%, 0) scale(1,1);opacity:1;'
							},
							{
								type: 'button', //button类型 在最后一页有跳转首页与设置iflLaunch标识为true方法
								css: 'width:100px;top:38%;left:85%;background-color:#bee0d4;color: #e493b6;border-radius: 15px;box-shadow: 6px 6px 12px #3c575a,-4px -4px 8px #98dde2;',
								mode: 'default', //button时为button的size，  图片类型是为图片的mode
								value: '青花瓷',
								changeBefore: 'transform: translate(-50%, 50%) scale(0,0);opacity:0;',
								changeAfter: 'transform: translate(-50%, 0) scale(1,1);opacity:1;'
							},
							{
								type: 'button', //button类型 在最后一页有跳转首页与设置iflLaunch标识为true方法
								css: 'width:100px;top:64%;left:15%;background-color:#bee0d4;color: #9094ba;border-radius: 15px;box-shadow: 6px 6px 12px #3c575a,-4px -4px 8px #98dde2;',
								mode: 'default', //button时为button的size，  图片类型是为图片的mode
								value: '七里香',
								changeBefore: 'transform: translate(-50%, 50%) scale(0,0);opacity:0;',
								changeAfter: 'transform: translate(-50%, 0) scale(1,1);opacity:1;'
							},
						]
					},
					{
						bgColor: '#e29cb8',
						itemArray: [{
								type: 'image',
								css: 'width:80%;top:30%;left:50%;border-radius:10px;box-shadow: 20px 20px 40px #684855,-20px -20px 40px #ffdcff;',
								value: '../static/images/singer/dengziqi.jpg',
								changeBefore: 'transform: translate(-50%, -200%);',
								changeAfter: 'transform: translate(-50%, 0);'
							}, {
								type: 'text',
								css: 'font-size: 5vh;top:20%;left:50%;font-weight: bold;text-shadow: 3px 3px 3px grey;',
								value: '邓紫棋',
								changeBefore: 'transform: translate(-50%, 200%);opacity:0;color: #a996aa;',
								changeAfter: 'transform: translate(-50%, 0);opacity:1;color: #acb7bc;'
							},
							{
								type: 'button',
								css: 'width:100px;top:15%;left:85%;background-color:#e0c2e0;color: #68e4cb;border-radius: 15px;box-shadow: 6px 6px 12px #684855,-4px -4px 8px #ffdcff;',
								mode: 'default',
								value: '泡沫',
								changeBefore: 'transform: translate(-50%, 50%) scale(0,0);opacity:0;',
								changeAfter: 'transform: translate(-50%, 0) scale(1,1);opacity:1;'
							},
							{
								type: 'button',
								css: 'width:100px;top:15%;left:15%;background-color:#e0c2e0;color: #dfe480;border-radius: 15px;box-shadow: 6px 6px 12px #684855,-4px -4px 8px #ffdcff;',
								mode: 'default',
								value: '光年之外',
								changeBefore: 'transform: translate(-50%, 50%) scale(0,0);opacity:0;',
								changeAfter: 'transform: translate(-50%, 0) scale(1,1);opacity:1;'
							},
							{
								type: 'button',
								css: 'width:100px;top:64%;left:50%;background-color:#e0c2e0;color: #9094ba;border-radius: 15px;box-shadow: 6px 6px 12px #684855,-4px -4px 8px #ffdcff;',
								mode: 'default',
								value: '喜欢你',
								changeBefore: 'transform: translate(-50%, 50%) scale(0,0);opacity:0;',
								changeAfter: 'transform: translate(-50%, 0) scale(1,1);opacity:1;'
							},
						]
					},
					{
						bgColor: '#8bd08a',
						itemArray: [{
								type: 'image',
								css: 'width:70%;top:20%;left:50%;border-radius:10px;box-shadow: 28px 28px 42px #476b46,-28px -28px 42px #d0ffd2;', //css代码 其中top|bottom ， left|right 一般是必填的
								value: '../static/images/singer/chenyixun.jpg',
								changeBefore: 'transform: translate(-50%, -200%);',
								changeAfter: 'transform: translate(-50%, 0);'
							}, {
								type: 'text',
								css: 'font-size: 5vh;top:50%;left:50%;font-weight: bold;text-shadow: 3px 3px 3px grey;', //css样式
								value: '陈奕迅',
								changeBefore: 'transform: translate(-50%, 200%);opacity:0;color:black;',
								changeAfter: 'transform: translate(-50%, 0);opacity:1;color:#88e09a;'
							},
							{
								type: 'button',
								css: 'width:100px;top:10%;left:50%;background-color:#a1f1a0;color: #ffffff;border-radius: 15px;box-shadow: 4px 4px 8px #476b46,-4px -4px 8px #d0ffd2;',
								mode: 'default',
								value: '十年',
								changeBefore: 'transform: translate(-50%, 50%) scale(0,0);opacity:0;',
								changeAfter: 'transform: translate(-50%, 0) scale(1,1);opacity:1;'
							},
							{
								type: 'button',
								css: 'width:100px;top:64%;left:15%;background-color:#a1f1a0;color: #ffffff;border-radius: 15px;box-shadow: 4px 4px 8px #476b46,-4px -4px 8px #d0ffd2;',
								mode: 'default',
								value: '好久不见',
								changeBefore: 'transform: translate(-50%, 50%) scale(0,0);opacity:0;',
								changeAfter: 'transform: translate(-50%, 0) scale(1,1);opacity:1;'
							},
							{
								type: 'button',
								css: 'width:100px;top:64%;left:85%;background-color:#a1f1a0;color: #ffffff;border-radius: 15px;box-shadow: 4px 4px 8px #476b46,-4px -4px 8px #d0ffd2;',
								mode: 'default',
								value: '富士山下',
								changeBefore: 'transform: translate(-50%, 50%) scale(0,0);opacity:0;',
								changeAfter: 'transform: translate(-50%, 0) scale(1,1);opacity:1;'
							},
						]
					},
					{
						bgColor: '#e2d79c',
						itemArray: [{
								type: 'image',
								css: 'width:60%;top:16%;left:50%;border-radius:10px;box-shadow: 24px 24px 41px #857f5c,-24px -24px 41px #ffffdc;',
								value: '../static/images/singer/xusong.jpg',
								changeBefore: 'transform: translate(-50%, -200%);',
								changeAfter: 'transform: translate(-50%, 0);'
							}, {
								type: 'text',
								css: 'font-size: 5vh;top:40%;left:50%;font-weight: bold;text-shadow: 3px 3px 3px grey;',
								value: '许嵩',
								changeBefore: 'transform: translate(-50%, 200%);opacity:0;color: white;',
								changeAfter: 'transform: translate(-50%, 0);opacity:1;color: #ffffdc;'
							},
							{
								type: 'button',
								css: 'width:100px;top:8%;left:85%;background-color:#fffdee;color: #68e4cb;border-radius: 15px;box-shadow: 6px 6px 12px #857f5c,-4px -4px 8px #ffffdc;',
								mode: 'default',
								value: '幻听',
								changeBefore: 'transform: translate(-50%, 50%) scale(0,0);opacity:0;',
								changeAfter: 'transform: translate(-50%, 0) scale(1,1);opacity:1;'
							},
							{
								type: 'button',
								css: 'width:100px;top:38%;left:15%;background-color:#fffdee;color: #e493b6;border-radius: 15px;box-shadow: 6px 6px 12px #857f5c,-4px -4px 8px #ffffdc;',
								mode: 'default',
								value: '庐州月',
								changeBefore: 'transform: translate(-50%, 50%) scale(0,0);opacity:0;',
								changeAfter: 'transform: translate(-50%, 0) scale(1,1);opacity:1;'
							},
							{
								type: 'button',
								css: 'width:100px;top:64%;left:85%;background-color:#fffdee;color: #9094ba;border-radius: 15px;box-shadow: 6px 6px 12px #857f5c,-4px -4px 8px #ffffdc;',
								mode: 'default',
								value: '城府',
								changeBefore: 'transform: translate(-50%, 50%) scale(0,0);opacity:0;',
								changeAfter: 'transform: translate(-50%, 0) scale(1,1);opacity:1;'
							},
						]
					},
				],
				onReady: false,
				duration,
				classObj: {
					transition: 'transition: all ' + (duration / 1000) + 's;',
					goonBtn: 'top:10%;right:10%;background-color:rgba(255,255,255,.6);color: #666666;border-radius: 8px;' //跳过的按钮样式
				},

				choose_index: 0,
				choose: ['谱曲', '作词', '国风'],
				
				start:'梦一样',
				starts:['故事','距离','心情','遇见','温柔','梦一样','离开','回忆'],
			};
		},
		methods: {
			swiperChange(e) {
				this.current = e.detail.current;
				this.getStart();
			},
			activeFc(goOn) {
				if (this.current === (this.swiperItems.length - 1) || goOn) {
					uni.setStorageSync('ifLaunch', true);
					uni.reLaunch({
						url: '../main/main'
					})
				}
			},
			onClickItem(e) {
				if (this.choose_index !== e.currentIndex) {
					this.choose_index = e.currentIndex;
				}
			},
			changeSwiper(e) {
				// console.log(e);
				this.choose_index = e.detail.current;
			},
			//创作歌词接口调用
			createLyrics() {
				let _this = this;
				let style = this.lyricStyles[this.current];
				let name = this.lyricNames[this.current];
				let start = _this.start;
				this.$refs.loading.open(); 
				uni.request({
					url: "http://duing.site:5000/getLyrics?singer=" + style + "&start=" + start,
					success(res_) {
						// console.log(res_)
						_this.$store.state.lyrics = res_.data;
						_this.$refs.loading.close();
				
						uni.navigateTo({
							url: "../views/lyrics?style=" + style + "&name=" + name + "&start=" + start,
						});
					}
				})
			},
			getStart(){
				let len = this.starts.length;
				let index = parseInt(Math.random()*len,10);
				this.start = this.starts[index];
			},
			inputStart(e){
				// console.log(e);
				this.start = e.detail.value;
			},
			inputBlur(e){
				if(e.detail.value == ''){
					this.getStart();
				}
			}
		},
		onReady() {
			this.onReady = true;
		},
	}
</script>

<style scoped>
	input{
		z-index: 4;
		position: absolute;
		top: 15px;
		left: 30vw;
		width: 40vw;
		height: 36px;
		border-bottom: #767676 1px solid;
		border-radius: 4px;
		/* box-shadow: 2px 2px 4px #838383,-2px -2px 4px #ffffdc; */
		color: #5e5e5e;
		text-align: center;
	}
	
	swiper {
		height: 94vh;
	}

	swiper-item {
		height: 94vh;
	}

	.swiperStyle {
		height: 100vh;
		width: 100vw;
	}

	.transition {
		transition: 0.8s;
	}

	.swiperItem {
		position: relative;
	}

	.position_absolute {
		position: absolute;
	}

	.img {
		width: 30%;
		position: absolute;
		top: 10%;
		left: 50%;
	}

	.text1 {
		font-size: 5vh;
		font-weight: bold;
		position: absolute;
		top: 30%;
		left: 50%;
	}

	.text2 {
		font-size: 3vh;
		position: absolute;
		top: 50%;
		left: 20%;
	}

	.createBtn {
		position: fixed;
		bottom: 25%;
		left: 43%;
	}

	.button {
		width: 50px;
		height: 50px;
		border: 1px solid #bababa;
		border-radius: 40px;
		box-shadow: 5px 5px 8px #7f7f7f,-2px -2px 5px #ffffdc;
		margin-top: 60px;
	}

	.button image {
		width: 30px;
		height: 30px;
	}
</style>
