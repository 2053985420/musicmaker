<template>
	<view style="height: 100vh;">
		<image class="head" :src="user_info.headimg" mode="aspectFill"></image>
		
		<view class="blank"></view>
		<view class="user_info" @click="login">
			<image :src="user_info.headimg"></image>
			<text class="username">{{user_info.username}}</text>
			<text class="level">{{user_info.level}}</text>
		</view>
		
		<uni-segmented-control style="margin-top: 3vh;" :current="current" :values="types" @clickItem="onClickItem" style-type="text"
			active-color="red"></uni-segmented-control>
		
		<swiper :current="current" @change="changeSwiper">
			<swiper-item>
				<scroll-view class="scroll2" scroll-y="true">
					<view class="musics">
						<view class="music" v-for="(item, index) in like_musicList" :key="index" @click="playMusic(item)">
							<image :src="item.picUrl" mode="aspectFit"></image>
							<view class="music_info">
								<text class="music_name" :class="{'music_name_act':item.name == $store.state.music.name}">{{item.name}}</text>
								<text class="music_singer" :class="{'music_singer_act':item.name == $store.state.music.name}">{{item.song.artists[0].name}} • {{item.song.album.name}}</text>
							</view>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view class="scroll2" scroll-y="true">
					<view class="creates">
						<view class="create" v-for="(item,index) in creates" :key="index">
							<image :src="item.createImg"></image>
							<text>{{item.createName}} • {{item.createStyle}}</text>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
		
		<uni-drawer ref="loginDrawer">
			<view class="drawer">
				<view style="margin-top: 10px;margin-left: 5px;">头像选择</view>
				<view style="margin: 10px auto;">
					<image class="chooseIcon" :class="{'chooseIcon_selected':item == icon}" v-for="(item,index) in icons" :key="index" :src="item" @click="chooseIcon(item)"></image>
				</view>
				
				<view>昵称设置</view>
				<input @input="inputName" :value="user_info.username" />
				
				<view>称号选择</view>
				<picker-view class="picker-view" :value="picker" @change="pick">
					<picker-view-column>
						<view class="picker" v-for="(item,index) in pickers" :key="index">{{item}}</view>
					</picker-view-column>
				</picker-view>
				
				<button class="sure" type="primary" @click="sure">确定</button>
			</view>
		</uni-drawer>
	</view>
</template>

<script>
	export default{
		data() {
			return {
				user_info:{
					headimg:"../static/images/touxiang/icon1.jpg",
					username:"未设置",
					level:"未设置"
				},
				types:["我的热歌","我的创作"],
				like_musicList:[],
				current:0,
				creates:[],
				icons:[
					"../static/images/touxiang/icon1.jpg",
					"../static/images/touxiang/icon2.jpg",
					"../static/images/touxiang/icon3.jpg",
					"../static/images/touxiang/icon4.jpg",
					"../static/images/touxiang/icon5.jpg",
				],
				icon:"../static/images/touxiang/icon1.jpg",
				name:"未设置",
				pickers:[
					"音乐才子","押韵狂人","说唱达人","文笔新秀"
				],
				picker:[0],
				pick_index:0,
			}
		},
		mounted() {
			let _this = this;
			this.creates = this.$store.state.creates;
			uni.request({
				url: "https://autumnfish.cn/personalized/newsong",
				method: "GET",
				success(res) {
					_this.like_musicList = res.data.result;
				}
			});
			if(this.$store.state.user != null){
				this.user_info = this.$store.state.user;
				this.icon = this.user_info.headimg;
			}
		},
		methods:{
			changeSwiper(e){
				this.current = e.detail.current;
			},
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex;
				}
			},
			login(){
				// if(this.$store.state.user == null){
				// 	this.$refs.loginDrawer.open();
				// }
				this.$refs.loginDrawer.open();
			},
			chooseIcon(icon){
				this.icon = icon;
			},
			inputName(e){
				this.name = e.detail.value;
			},
			pick(e){
				// console.log(e);
				this.pick_index = e.detail.value[0];
			},
			sure(){
				this.user_info.headimg = this.icon;
				this.user_info.username = this.name;
				this.user_info.level = this.pickers[this.pick_index];
				uni.setStorage({
					key:"user",
					data:this.user_info
				});
				this.$refs.loginDrawer.close();
			},
			playMusic(music) {
				// console.log(music)
				let _this = this;
				uni.request({
					url: "https://autumnfish.cn/song/url",
					method: "GET",
					data: {
						id: music.id
					},
					success(res) {
						_this.$store.commit("getMusic",music);
						_this.$store.state.musicPlayer.src = res.data.data[0].url;
						_this.$store.state.play_status = true;
						_this.$store.commit("playMusic");
					}
				});
			},
		}
	}
</script>

<style>
	.head{
		position: absolute;
		width: 100vw;
		height: 150px;
		z-index: -1;
	}
	
	.blank{
		height: 100px;
	}
	
	.user_info{
		width: 80vw;
		height: 90px;
		margin: 0 auto;
		border: #8F8F94 1px solid;
		border-radius: 20px;
		background-color: #ffffff;
		display: flex;
		flex-direction: row;
		align-items: center;
		box-shadow: 1px 2px 2px 1px #c0c0c0;
	}
	
	.user_info image{
		width: 60px;
		height: 60px;
		border-radius: 30px;
		margin-left: 20px;
	}
	
	.username{
		margin-left: 20px;
		width: 110px;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		overflow: hidden;
	}
	
	.level{
		margin-left: 15px;
		font-size: small;
		color: #0effb7;
	}
	
	swiper {
		height: 60vh;
	}
	
	.scroll2 {
		height: 60vh;
	}
	
	.musics {
		width: 100%;
		margin-top: 5px;
	}
	
	.music {
		height: 45px;
		width: 100%;
		display: flex;
		flex-direction: row;
		background-color: transparent;
		border: white 0;
	}
	
	.music image {
		width: 40px;
		height: 40px;
		border-radius: 8px;
		margin-left: 20px;
	}
	
	.music_info {
		margin-left: 20px;
		display: flex;
		flex-direction: column;
	}
	
	.music_name {
		font-size: 15px;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		overflow: hidden;
	}
	
	.music_singer {
		font-size: 10px;
		color: #a5a5a5;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		overflow: hidden;
	}
	
	.music_name_act{
		color: #FF0000;
	}
	
	.music_singer_act{
		color: #f1bfc2;
	}
	
	.creates{
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		width: 100vw;
	}
	
	.create{
		width: 28vw;
		height: 35vw;
		margin-left: 4vw;
		margin-top: 5px;
	}
	
	.create image{
		width: 28vw;
		height: 28vw;
		border-radius: 10px;
		box-shadow: 2px 2px 2px 1px #c0c0c0;
	}
	
	.create text{
		font-size: 12px;
		color: #3F536E;
	}
	
	.drawer{
		padding: 5px;
	}
	
	.chooseIcon{
		width: 55px;
		height: 55px;
		border-radius: 10px;
		margin: 5px  5px;
	}
	
	.chooseIcon_selected{
		border: #0EFFB7 1px solid;
	}
	
	input{
		border: #3A524E 1px solid;
		border-radius: 10px;
		width: 70%;
		height: 30px;
		margin: 20px auto;
	}
	
	.picker-view{
		width: 100%;
		height: 100px;
		margin-top: 20px;
	}
	
	.picker{
		text-align: center;
	}
	
	.sure{
		margin-top: 50px;
		width: 80px;
		height: 40px;
		font-size: 15px;
	}
</style>