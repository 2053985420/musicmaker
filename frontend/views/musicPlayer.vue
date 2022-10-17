<template>
	<view class="musicPlayer">
		<image :src="$store.state.music.poster" @click="goToMusic"></image>
		<view class="play_info" @click="goToMusic">
			<text class="play_name">{{$store.state.music.name}}</text>
			<text class="play_singer">{{$store.state.music.author}}</text>
		</view>
		<view @click="goToMusic">
			<text class="play_time">{{$store.state.music.currentTime}} / {{$store.state.music.duration}}</text>
		</view>
		<view class="btn">
			<button class="play_btn" @click="clickBtn">
				<image src="../static/images/play.png" v-if="!$store.state.play_status"></image>
				<image src="../static/images/pause.png" v-else></image>
			</button>
		</view>
	</view>
</template>

<script>
	export default{
		mounted() {
			let _this = this;
			//实时更新音频播放时间
			this.$store.state.musicPlayer.onTimeUpdate(()=>{
				let time = parseInt(_this.$store.state.musicPlayer.currentTime);
				let m = parseInt(time / 60);
				if(m < 10){
					m = "0" + m;
				}
				let s = parseInt(time % 60);
				if(s < 10){
					s = "0" + s;
				}
				_this.$store.state.music.currentTime = m + ":" + s;
			})
		},
		methods:{
			clickBtn(){
				if(this.$store.state.play_status){
					this.$store.commit("pauseMusic");
				}else{
					this.$store.commit("playMusic");
				}
				this.$store.commit("changeStatus");
				// console.log(this.$store.state.musicPlayer.duration)
			},
			goToMusic(){
				this.$emit("goToMusic");
			}
		}
	}
</script>

<style>
	.musicPlayer{
		width: 95vw;
		height: 50px;
		background-color: #e9e9e9;
		border-radius: 20px;
		display: flex;
		flex-direction: row;
		padding-top: 5px;
		/* position: fixed;
		bottom: 0; */
	}
	
	.musicPlayer image{
		width: 45px;
		height: 45px;
		border-radius: 5px;
		margin-left: 15px;
	}
	
	.play_info{
		margin-left: 20px;
		display: flex;
		flex-direction: column;
		width: 120px;
	}
	
	.play_name{
		font-size: 15px;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		overflow: hidden;
		margin-bottom: 5px;
	}
	
	.play_singer{
		font-size: 10px;
		color: #a5a5a5;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		overflow: hidden;
	}
	
	.play_time{
		font-size: 12px;
		margin-top: 10px;
		/* margin-left: 25px; */
	}
	
	.btn{
		width: 45px;
		position: absolute;
		right: 25px;
	}
	
	.play_btn{
		width: 45px;
		height: 45px;
		border-radius: 22.5px;
		border: #4e4e4e 2px solid;
	}
	
	.play_btn image{
		width: 18px;
		height: 18px;
		margin-left: 0;
	}
</style>
