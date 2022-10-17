<template>
	<view class="main">
		<view style="height: 30px;"></view>
		<scroll-view scroll-y="true">
			<view class="lyrics">
				<view class="lyric" :class="{'lyric-selected':choose.indexOf(item) != -1}" v-for="(item,index) in text" :key="index" @click="chooseItem(item)">
					{{item}}
					<image src="../static/images/choose.png" v-if="choose.indexOf(item) != -1"></image>
				</view>
			</view>
		</scroll-view>
		<button type="default" @click="generate">生 成</button>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				type:null,
				text:[],
				choose:[],
			}
		},
		onLoad(data) {
			this.type = data.type;
			if(this.type == "lyrics"){
				this.text = this.$store.state.lyrics;
			}else{
				this.text = this.$store.state.poetry;
			}
		},
		methods:{
			chooseItem(item){
				this.choose.push(item);
			},
			generate(){
				let _this = this;
				uni.showToast({
					title:"已生成！",
					complete() {
						setTimeout(function(){
							if(_this.type == "lyrics"){
								_this.$store.state.lyrics = _this.choose;
							}else{
								_this.$store.state.poetry = _this.choose;
							}
							uni.navigateBack();
						},1200);
					}
				})
			},
		}
	}
</script>

<style>
	.main{
		background-color: #919a9b;
		height: 100vh;
	}
	
	scroll-view{
		height: 80vh;
	}
	
	.lyrics{
		width: 85vw;
		margin: 20px;
	}
	
	.lyric{
		height: 30px;
		text-align: center;
		font-size: 13px;
	}
	
	.lyric-selected{
		color: #d0ddde;
	}
	
	.lyric image{
		position: absolute;
		right: 10px;
		width: 20px;
		height: 20px;
	}
	
	button{
		width: 80px;
		height: 40px;
		margin-top: 20px;
		border-radius: 20px;
		font-size: 15px;
		text-align: center;
	}
</style>
