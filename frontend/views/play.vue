<template>
	<view class="back" :style="{'background-image':'url(' + $store.state.music.poster + ')'}">
		<view class="back_before">
			<view class="music_info">
				<text class="music_name">{{$store.state.music.name}}</text>
				<text class="music_singer">{{$store.state.music.author}}</text>
			</view>
			
			<view class="style_img">
				<image :style="{transform: $store.state.imgRotate}" :src="$store.state.music.poster"></image>
			</view>
			
			<view class="btns">
				<!-- <view class="leftBtn"></view> -->
				<view class="playBtn" @click="clickPlay">
					<image src="../static/images/play1.png" v-if="!$store.state.play_status"></image>
					<image src="../static/images/pause1.png" v-else></image>
				</view>
				<!-- <view class="rightBtn"></view> -->
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad(option) {
			// console.log(option.style);
			let _this = this;
			
			this.key = this.$store.state.poetry_title;
			this.poetry = this.$store.state.poetry;
		},
		methods: {
			clickPlay(){
				if(this.$store.state.play_status){
					this.$store.commit("pauseMusic");
				}else{
					this.$store.commit("playMusic");
				}
				this.$store.commit("changeStatus");
			}
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
		filter: blur(8px);
		z-index: 2;
	}
	
	.back_before{
		z-index: 3;
		position: absolute;
		width: 100vw;
		height: 100vh;
	}
	
	.music_info{
		display: flex;
		flex-direction: column;
		width: 100vw;
		text-align: center;
		margin-top: 20px;
	}
	
	.music_name{
		font-size: 25px;
		color: #808080;
	}
	
	.music_singer{
		font-size: 15px;
		color: #808080;
	}
	
	.style_img {
		width: 60vw;
		height: 60vw;
		margin: 50px auto;
	}

	.style_img image {
		width: 60vw;
		height: 60vw;
		border-radius: 30vw;
		border: #808080 1px solid;
	}
	
	.btns{
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-top: 30vh;
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
</style>
