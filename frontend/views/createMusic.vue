<template>
	<view class="main">
		<view class="btns">
			<view class="btn-con" v-for="(item, index) in musicStyles" :key="index">
				<view class="btn" :class="{'btn-before':index!=current,'btn-after':index==current}"
					@click="clickBtn(index)">
					<image :src="item.icon"></image>
				</view>
				<view>{{item.style}}</view>
			</view>
		</view>

		<swiper :current="current" @change="changeSwiper">
			<swiper-item>
				<view class="musics">
					<view class="music" :class="{'btn-before':music!=item.type,'btn-after2':music==item.type}" v-for="(item,index) in musicStyles[current].musics" :key="index" @click="chooseMusic(item)">
						<image :src="item.icon"></image>
						<view class="name">{{item.name}}</view>
					</view>
				</view>
			</swiper-item>

			<swiper-item>
				<view class="musics">
					<view class="music" :class="{'btn-before':music!=item.type,'btn-after2':music==item.type}" v-for="(item,index) in musicStyles[current].musics" :key="index" @click="chooseMusic(item)">
						<image :src="item.icon"></image>
						<view class="name">{{item.name}}</view>
					</view>
				</view>
			</swiper-item>

			<swiper-item>
				<view class="musics">
					<view class="music" :class="{'btn-before':music!=item.type,'btn-after2':music==item.type}" v-for="(item,index) in musicStyles[current].musics" :key="index" @click="chooseMusic(item)">
						<image :src="item.icon"></image>
						<view class="name">{{item.name}}</view>
					</view>
				</view>
			</swiper-item>
		</swiper>
		
		<view class="createBtn">
			<luButtonRipple class="button" rippleBackgroundColor="red" :rippleOpacity="0.6" @rippleTap="createMusic">
				<image src="../static/images/styles/music/create_music.png"></image>
			</luButtonRipple>
		</view>
		
		<loading ref="loading" :shadeShow="true" :shadeClick="true" :custom="false" :type="2">
			<text style="font-size: 10px;position: fixed;bottom: 10px;">AI正在谱曲中...</text>
		</loading>
	</view>
</template>

<script>
	import luButtonRipple from '@/components/lu-button-ripple/lu-button-ripple.vue';
	import loading from '@/components/xuan-loading/xuan-loading.vue';
	export default {
		components:{
			luButtonRipple,
			loading
		},
		data() {
			return {
				current: 0,
				style:"流行",
				music:"minyao",
				name:"民谣",
				musicStyles: [
					{
						style: "流行",
						icon:"../static/images/styles/music/landiao.png",
						musics:[
							{
								icon:"../static/images/styles/music/minyao.jpg",
								name:"民谣",
								type:"minyao"
							},
							{
								icon:"../static/images/styles/music/jiezou.jpg",
								name:"节奏",
								type:"jiezou"
							},
							{
								icon:"../static/images/styles/music/erge.jpg",
								name:"儿歌",
								type:"erge"
							},
						]
					},
					{
						style: "古典",
						icon:"../static/images/styles/music/gudian.png",
						musics:[
							{
								icon:"../static/images/styles/music/beiduofen.jpg",
								name:"贝多芬",
								type:"beiduofen"
							},
							{
								icon:"../static/images/styles/music/xiaobang.jpg",
								name:"肖邦",
								type:"xiaobang"
							},
							{
								icon:"../static/images/styles/music/bahe.jpg",
								name:"巴赫",
								type:"bahe"
							},
							// {
							// 	icon:"../static/images/styles/music/beiduofen.jpg",
							// 	name:"莫扎特",
							// 	type:"mozhate"
							// },
							// {
							// 	icon:"../static/images/styles/music/beiduofen.jpg",
							// 	name:"海顿",
							// 	type:"haidun"
							// },
						]
					},
					{
						style: "民歌",
						icon:"../static/images/styles/music/minge.png",
						musics:[
							{
								icon:"../static/images/styles/music/hanzu.jpg",
								name:"汉族",
								type:"hanzu"
							},
							{
								icon:"../static/images/styles/music/shaoshuminzu.jpg",
								name:"少数民族",
								type:"shaoshu"
							},
							{
								icon:"../static/images/styles/music/rierman.jpg",
								name:"日耳曼",
								type:"rierman"
							},
							// {
							// 	icon:"../static/images/styles/music/beiduofen.jpg",
							// 	name:"非洲",
							// 	type:"feizhou"
							// },
						]
					}
				],
			}
		},
		methods: {
			clickBtn(index) {
				if (this.current !== index) {
					this.current = index;
					this.style = this.musicStyles[this.current].style;
				}
			},
			changeSwiper(e) {
				this.current = e.detail.current;
				this.style = this.musicStyles[this.current].style;
			},
			chooseMusic(item){
				this.music = item.type;
				this.name = item.name;
			},
			createMusic() {
				let _this = this;
				this.$refs.loading.open();
				
				let url = "http://duing.site:5002/getMusic?music=" + _this.music;
				if(this.style == "流行"){
					url = "http://duing.site:5003/getMusicAdd";
				}
				uni.request({
					url: url,
					// url: "http://1.116.77.118:5002/getMusic?music=" + _this.music,
					timeout: 60000 * 5,
					success(res_) {
						setTimeout(function(){
							
							let create = {
								createImg:"../static/images/styles/music/" + _this.music + ".jpg",
								createName:_this.name,
								createStyle:_this.style
							}
							_this.$store.commit("addCreate", create);
							
							_this.$store.state.musicPlayer.src = res_.data;
							
							let duration = parseInt(Math.random()*20,10) + 20;
							_this.$store.state.music = {
								poster: "../static/images/styles/music/" + _this.music + ".jpg",
								name: "AI乐曲创作-" + _this.name,
								author: "AI",
								duration: "00." + duration,
								currentTime: "00:00",
							}
							_this.$refs.loading.close();
												
							setTimeout(function() {
								_this.$store.state.play_status = true;
								_this.$store.commit("playMusic");
							}, 2000);
												
							uni.navigateTo({
								// url:"../views/play?style=" + style
								url: "../views/play"
							});
						}, 1000);
					}
				});
				
				// _this.$refs.loading.close();
				// uni.navigateTo({
				// 	// url:"../views/play?style=" + style
				// 	url: "../views/play"
				// });
			}
		}
	}
</script>

<style>
	.main {
		background-color: #d3dfdf;
		width: 100vw;
		height: 100vh;
	}

	.btns {
		width: 100vw;
		height: 20vh;
		background-color: #d3dfdf;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.btn-con {
		margin: 0 auto;
		text-align: center;
		font-size: 12px;
	}

	.btn {
		width: 20vw;
		height: 20vw;
		border-radius: 10vw;
		background-color: #d3dfdf;
		margin-bottom: 8px;
		display: flex;
		align-items: center;
	}
	
	.btn image{
		width: 12vw;
		height: 12vw;
		margin: 0 auto;
	}

	.btn-before {
		background: linear-gradient(145deg, #e2efef, #bec9c9);
		box-shadow: 11px 11px 26px #8d9595,
			-11px -11px 26px #ffffff;
	}

	.btn-after {
		background: linear-gradient(145deg, #adb7b7, #d6efef);
		box-shadow: 11px 11px 26px #8d9595,
			-11px -11px 26px #ffffff;
	}
	
	.btn-after2 {
		background: linear-gradient(145deg, #9ba4a4, #d0efef);
		box-shadow: 11px 11px 26px #8d9595,
			-11px -11px 26px #ffffff;
	}

	swiper {
		height: 80vh;
	}
	
	.musics{
		display: flex;
		flex-direction: column;
	}
	
	.music{
		width: 90vw;
		height: 20vw;
		margin: 5px auto;
		margin-top: 10px;
		display: flex;
		flex-direction: row;
		align-items: center;
		border: #c4cdcb 1px solid;
		border-radius: 3vw;
	}
	
	.music image{
		width: 14vw;
		height: 14vw;
		border-radius: 7vw;
		margin-left: 10px;
	}
	
	.name{
		margin-left: 20vw;
	}
	
	.createBtn {
		position: absolute;
		bottom: 22%;
		right: 25%;
	}
	
	.button {
		width: 55px;
		height: 55px;
		border: 1px solid #a5a5a5;
		border-radius: 40px;
		box-shadow: 5px 5px 8px #7f7f7f,-3px -3px 6px #fffff4;
		margin-top: 60px;
	}
	
	.button image {
		width: 35px;
		height: 35px;
	}
</style>
