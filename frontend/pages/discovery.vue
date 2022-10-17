<template>
	<view class="page">
		<view class="area"></view>
		<ls-swiper :list="bannerList" imgKey="imageUrl" :crown="true" :loop="true" :shadow='true' :height='120'
			:interval="3000" :previousMargin="60" :nextMargin='60' :imgRadius="10" :autoplay="true" :dots="true" />

		<view class="title1" style="margin-left: 10px;">精选歌单</view>
		<scroll-view scroll-x="true">
			<view class="plays">
				<view class="play" v-for="(item, index) in playList" :key="index">
					<image :src="item.picUrl" mode="aspectFit"></image>
					<view class="name">{{item.name}}</view>
				</view>
			</view>
		</scroll-view>

		<uni-segmented-control :current="current" :values="types" @clickItem="onClickItem" style-type="text"
			active-color="red"></uni-segmented-control>
		<swiper :current="current" @change="changeSwiper">
			<swiper-item>
				<scroll-view class="scroll2" scroll-y="true">
					<view class="musics">
						<view class="music" v-for="(item, index) in new_musicList" :key="index" @click="playMusic(item)">
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
					<view class="musics">
						<view class="music" v-for="(item, index) in hot_musicList" :key="index" @click="playMusic(item)">
							<image :src="item.album.picUrl" mode="aspectFit"></image>
							<view class="music_info">
								<text class="music_name" :class="{'music_name_act':item.name == $store.state.music.name}">{{item.name}}</text>
								<text class="music_singer" :class="{'music_singer_act':item.name == $store.state.music.name}">{{item.artists[0].name}} • {{item.album.name}}</text>
							</view>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
		
		<view style="position: fixed;bottom: 2px;">
			<musicPlayer @goToMusic="goToMusic"></musicPlayer>
		</view>
	</view>
</template>

<script>
	import LsSwiper from '@/components/ls-swiper/index.vue';
	import musicPlayer from '../views/musicPlayer.vue'
	export default {
		components: {
			LsSwiper,
			musicPlayer
		},
		data() {
			return {
				bannerList: [],
				playList: [],
				new_musicList: [],
				hot_musicList: [],
				current: 0,
				types: ["最新", "最热"],
			}
		},
		mounted() {
			let _this = this;
			uni.request({
				url: "https://autumnfish.cn/banner",
				method: "GET",
				success(res) {
					// console.log(res);
					_this.bannerList = res.data.banners;
				}
			});
			uni.request({
				url: "https://autumnfish.cn/personalized",
				method: "GET",
				data: {
					limit: 9,
				},
				success(res) {
					// console.log(res.data.result);
					_this.playList = res.data.result;
				}
			});
			uni.request({
				url: "https://autumnfish.cn/personalized/newsong",
				method: "GET",
				success(res) {
					// console.log(res);
					_this.new_musicList = res.data.result;
				}
			});
			uni.request({
				url: "https://autumnfish.cn/top/song",
				method: "GET",
				// data:{
				// 	limit: 9,
				// },
				success(res) {
					// console.log(res.data.data.slice(10,20));
					_this.hot_musicList = res.data.data.slice(10, 20);
				}
			})
		},
		methods: {
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex;
				}
			},
			changeSwiper(e) {
				// console.log(e);
				this.current = e.detail.current;
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
			goToMusic(){
				uni.navigateTo({
					url:"../views/play"
				})
			}
		}
	}
</script>

<style>	
	.page {
		height: 97vh;
	}

	.area {
		position: fixed;
		top: 0;
		left: 0;
		height: 65px;
		width: 100vw;
		margin: 0;
		background-color: red;
	}

	.title {
		text-align: center;
		font-size: large;
		color: #55aa00;
		margin-bottom: 10px;
	}

	.plays {
		display: flex;
		flex-direction: row;
		margin-top: 8px;
		margin-bottom: 10px;
	}

	.play {
		display: flex;
		flex-direction: column;
		font-size: 10px;
		width: 23vw;
		margin: 0 3px;
	}

	.play image {
		width: 23vw;
		height: 23vw;
		border-radius: 10px;
		box-shadow: 1px 2px 2px 1px #c0c0c0;
	}

	.title1 {
		margin-top: 10px;
	}

	.name {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}

	swiper {
		height: 45vh;
	}

	.scroll2 {
		height: 44vh;
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
		margin-left: 10px;
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
	
	.music_name_act{
		color: #FF0000;
	}

	.music_singer {
		font-size: 10px;
		color: #a5a5a5;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		overflow: hidden;
	}
	
	.music_singer_act{
		color: #f1bfc2;
	}
</style>
