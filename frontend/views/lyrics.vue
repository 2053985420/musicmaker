<template>
	<view class="main" :class="{'main1':style=='周杰伦','main2':style!='周杰伦'}">
		<view class="text-color" @click="chooseLyrics">点击选择生成的歌词</view>
		
		<view style="height: 1vh;"></view>
		<view class="style" :class="{'style1':style=='周杰伦','style2':style!='周杰伦'}">
			<view class="img">
				<image :src="imgsrc"></image>
			</view>
			<view class="text">
				<view class="text1">{{style}}</view>
				<view class="text2">{{start}}</view>
			</view>
		</view>
		<scroll-view scroll-y="true">
			<view class="lyrics">
				<view class="lyric" v-for="(item,index) in lyrics" :key="index">
					{{item}}
				</view>
			</view>
		</scroll-view>
		
		<button type="default" @click="screen">保存本地</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgsrc: "../static/images/singer/zhoujielun1.jpg",
				style: "周杰伦",
				start: "",
				lyrics: [
					"故事的小黄花", "从出生那年就飘着",
					"童年的荡秋千", "随记忆一直晃到现在",
					"ReSoSoSiDoSiLa", "SoLaSiSiSiSiLaSiLaSo",
					"吹着前奏望着天空", "我想起花瓣试着掉落",
					"为你翘课的那一天", "花落的那一天",
					"教室的那一间", "我怎么看不见",
					"消失的下雨天", "我好想再淋一遍",
					"没想到失去的勇气我还留着", "好想再问一遍",
					"你会等待还是离开", "刮风这天我试过握着你手",
					"但偏偏雨渐渐", "大到我看你不见",
					"还要多久我才能在你身边", "等到放晴的那天",
					"也许我会比较好一点", "从前从前有个人爱你很久",
					"但偏偏风渐渐", "把距离吹得好远",
					"好不容易又能再多爱一天", "但故事的最后",
					"你好像还是说了拜拜",
				],
			}
		},
		onLoad(data) {
			// console.log(data)
			this.style = data.name;
			this.imgsrc = "../static/images/singer/" + data.style + ".jpg";
			this.lyrics = this.$store.state.lyrics;
			this.start = data.start;
		},
		onShow() {
			this.lyrics = this.$store.state.lyrics;
		},
		methods:{
			chooseLyrics(){
				uni.navigateTo({
					url:"./chooseLyrics?type=lyrics"
				})
			},
			screen(){
				let _this = this;
				//防止切图成白屏
				setTimeout(function() {
					_this.toImage();
					uni.showToast({
						icon:"success",
						title:"保存成功！"
					})
				}, 1000);
			},
			//截屏
			toImage() {
				const that = this;
				
				let create = {
					createImg:that.imgsrc,
					createName:that.style,
					createStyle:"歌词"
				}
				that.$store.commit("addCreate", create);
				
				/* 获取屏幕信息 */
				let ws = this.$mp.page.$getAppWebview();
				let bitmap = new plus.nativeObj.Bitmap('test');
				// 将webview内容绘制到Bitmap对象中
				ws.draw(
					bitmap,
					function(e) {
						/* 获取base64 */
						that.test= bitmap.toBase64Data();
						/* 加载base64编码 */
						bitmap.loadBase64Data(
							bitmap.toBase64Data(),
							function() {
								console.log('加载Base64图片数据成功');
								/* 保存图片 */
								bitmap.save(
									'_doc/share.jpg',
									{},
									async (i)=>{
										console.log('保存图片成功：' + JSON.stringify(i));
										uni.saveImageToPhotosAlbum({
											filePath: i.target,
											success: function() {
												/* 清除 */
												bitmap.clear();
												that.tools.toast('保存成功,请到相册中查看')
											},
											fail(e) {
												that.tools.toast('保存失败')
											}
										});
									},
									function(e) {
										console.log('保存图片失败：' + JSON.stringify(e));
									}
								);
							},
							function() {
								console.log('加载Base64图片数据失败：' + JSON.stringify(e));
							}
						);
					},
					function(e) {
						console.log('截屏绘制图片失败：' + JSON.stringify(e));
					},
					{
						check: true, // 设置为检测白屏
						clip: { top: '100px', left: '0px', height: '100%', width: '100%' } // 设置截屏区域
					}
				);
			},
		}
	}
</script>

<style>
	.main {
		width: 100vw;
		height: 100vh;
	}

	.main1 {
		background-color: #a56f7a;
	}

	.main2 {
		background-color: #6FA1A5;
	}

	.style {
		width: 80vw;
		height: 25vh;
		margin-left: 50px;
		margin: 0 auto;
		display: flex;
		flex-direction: row;
		align-items: center;
		border-radius: 20px;
	}

	.style1 {
		box-shadow: 24px 24px 41px #6d4951,
			-24px -24px 41px #dd95a3;
	}

	.style2 {
		box-shadow: 24px 24px 41px #466568,
			-24px -24px 41px #98dde2;
	}

	.img image {
		width: 35vw;
		height: 35vw;
		margin-left: 15px;
		border-radius: 20px;
	}

	.text {
		margin-left: 50px;
	}

	.text1 {
		margin-bottom: 30px;
		font-size: 30px;
		font-family: "楷体", "楷体_GB2312";
		color: #3a524e;
	}

	.text2 {
		color: #53556c;
		font-size: 20px;
	}

	scroll-view {
		height: 55vh;
		width: 85vw;
		margin-left: 20px;
		margin-top: 20px;
	}

	.lyrics {
		margin-left: 25px;
	}

	.lyric {
		margin-top: 5px;
	}

	.text-color {
		width: 40vw;
		/* height: 30px; */
		margin: 0 auto;
		padding: 10px;
		font-size: 15px;
		text-align: center;
		background: -webkit-linear-gradient(left, #99cbda, #f9f5b8 25%, #99cbda 50%, #f9f5b8 75%, #99cbda);
		color: transparent;
		-webkit-background-clip: text;
		background-size: 200% 100%;
		animation: masked-animation 3s infinite linear;
	}

	@-webkit-keyframes masked-animation {
		0% {
			background-position: 0 0;
		}

		100% {
			background-position: -100% 0;
		}
	}
	
	button{
		width: 100px;
		height: 40px;
		margin-top: 8px;
		border-radius: 20px;
		font-size: 15px;
		text-align: center;
		background-color: #f0f6cd;
	}
</style>
