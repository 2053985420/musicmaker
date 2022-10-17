<template>
	<view class="back" :style="{'background-image':'url(' + bgImg + ')'}">
		<view class="back_before">
			<view class="key">《{{title}}》</view>
			<scroll-view class="scroll" scroll-y="true">
				<view class="poetry">
					<view class="poetry_item" v-for="(item,index) in poetry" :key="index">{{item}}</view>
				</view>
			</scroll-view>
			
			<view class="text-color" @click="chooseLyrics">点击选择生成的诗句</view>
			
			<view class="btns">
				<!-- <view class="leftBtn"></view> -->
				<view class="playBtn" @click="clickBtn">
					<image src="../static/images/play1.png" v-if="!$store.state.play_status"></image>
					<image src="../static/images/pause1.png" v-else></image>
				</view>
				<!-- <view class="rightBtn"></view> -->
			</view>
			
			<button type="default" @click="screen">保存本地</button>
			
			<!-- <view style="position: fixed;bottom: 2px;margin-left: 2.5vw;">
				<musicPlayer></musicPlayer>
			</view> -->
		</view>
	</view>
</template>

<script>
	import musicPlayer from '../views/musicPlayer.vue'
	export default{
		// components:{
		// 	musicPlayer
		// },
		data(){
			return {
				title:"寄人",
				poetry:[
					"别梦依依到谢家，小廊回合曲阑斜。",
					"多情只有春庭月，犹为离人照落花。",
					"别梦依依到谢家，小廊回合曲阑斜。",
					"多情只有春庭月，犹为离人照落花。",
					"别梦依依到谢家，小廊回合曲阑斜。",
					"多情只有春庭月，犹为离人照落花。",
					"别梦依依到谢家，小廊回合曲阑斜。",
					"多情只有春庭月，犹为离人照落花。",
					"别梦依依到谢家，小廊回合曲阑斜。",
					"多情只有春庭月，犹为离人照落花。",
					"别梦依依到谢家，小廊回合曲阑斜。",
					"多情只有春庭月，犹为离人照落花。"
				],
				bgImg:"",
				style:"",
				name:""
			}
		},
		onLoad(data) {
			this.style = data.style;
			this.name = data.name;
			console.log(data)
			this.bgImg = "../static/images/chinese/" + data.style + ".jpg";
			
			let _this = this;
			this.title = this.$store.state.poetry_title;
			this.poetry = this.$store.state.poetry;
			setTimeout(function(){
				_this.$store.state.play_status = true;
				_this.$store.commit("playMusic");
			},1000);
		},
		onShow() {
			this.title = this.$store.state.poetry_title;
			this.poetry = this.$store.state.poetry;
		},
		onBackPress() {
			this.$store.state.play_status = false;
			this.$store.commit("pauseMusic");
		},
		methods:{
			clickBtn(){
				if(this.$store.state.play_status){
					this.$store.commit("pauseMusic");
				}else{
					this.$store.commit("playMusic");
				}
				this.$store.commit("changeStatus");
			},
			chooseLyrics(){
				uni.navigateTo({
					url:"./chooseLyrics?type=poetry"
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
					createImg:that.bgImg,
					createName:that.name,
					createStyle:"国风"
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
								// console.log('加载Base64图片数据成功');
								/* 保存图片 */
								bitmap.save(
									'_doc/share.jpg',
									{},
									async (i)=>{
										// console.log('保存图片成功：' + JSON.stringify(i));
										uni.saveImageToPhotosAlbum({
											filePath: i.target,
											success: function() {
												/* 清除 */
												bitmap.clear();
												that.tools.toast('保存成功,请到相册中查看')
											},
											// fail(e) {
											// 	that.tools.toast('保存失败')
											// }
										});
									},
									// function(e) {
									// 	console.log('保存图片失败：' + JSON.stringify(e));
									// }
								);
							},
							// function() {
							// 	console.log('加载Base64图片数据失败：' + JSON.stringify(e));
							// }
						);
					},
					// function(e) {
					// 	console.log('截屏绘制图片失败：' + JSON.stringify(e));
					// },
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
	.back{
		background-repeat: no-repeat;
		background-size: 100vw 100vh;
		z-index: 1;
	}
	
	.back::before{
		content: "";
		width:100%;
		height:100%;
		position: absolute;
		left:0;
		top:0;
		background: inherit;
		filter: blur(3px);
		z-index: 2;
	}
	
	.back_before{
		z-index: 3;
		position: absolute;
		width: 100vw;
		height: 100vh;
	}
	
	.key{
		height: 5vh;
		text-align: center;
		font-size: 23px;
		margin: 20px 0;
	}
	
	.scroll{
		height: 50vh;
	}
	
	.poetry{
		height: 95vh;
		text-align: center;
		font-family: "楷体","楷体_GB2312";
		font-size: 18px;
		color: #4f4f4f;
	}
	
	.poetry_item{
		margin-top: 10px;
	}
	
	.btns{
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-top: 8vh;
	}
	
	.leftBtn{
		width: 35px;
		height: 35px;
		border-radius: 25px;
		background-color: #f0fffc;
		margin-left: 25vw;
	}
	
	.playBtn{
		width: 50px;
		height: 50px;
		border-radius: 25px;
		background-color: #f0fffc;
		margin: 0 auto;
	}
	
	.playBtn image{
		width: 20px;
		height: 20px;
		margin-left: 15px;
		margin-top: 15px;
	}
	
	.rightBtn{
		width: 35px;
		height: 35px;
		border-radius: 25px;
		background-color: #f0fffc;
		margin-right: 25vw;
	}
	
	.text-color {
		/* z-index: 4; */
		width: 40vw;
		/* height: 30px; */
		margin: 0 auto;
		margin-top: 20px;
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
		margin-top: 25px;
		border-radius: 20px;
		font-size: 15px;
		text-align: center;
		background-color: #f0f6e3
	}
</style>
