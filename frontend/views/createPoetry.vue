<template>
	<view class="main">
		<scroll-view scroll-y="true">
			<view class="head">国风欣赏</view>
			<ls-swiper :list="bannerList" imgKey="imageUrl" :crown="true" :loop="true" :shadow='true' :height='120'
				:interval="3000" :previousMargin="100" :nextMargin='100' :imgRadius="10" :autoplay="true" :dots="true" />
			
			<view class="head">配乐作诗</view>
			<!-- <view class="title">创作主题</view> -->
			<view class="themes">
				<view class="theme" v-for="(item,index) in themes" :key="index">
					<view class="theme_img" :class="{'theme_selected':item.name == theme_selected}" @click="select_theme(item)">
						<image :src="item.icon"></image>
					</view>
					<text :class="{'themeTitle_selected':item.name == theme_selected}">{{item.name}}</text>
				</view>
			</view>
			<input placeholder="自定义主题" :value="theme_selected" @input="input" @blur="blur" />
			
			<view class="head">古乐创作</view>
			<!-- <view class="title"></view> -->
			<view class="musics">
				<view class="music" v-for="(item,index) in music_styles" :key="index" @click="select_music(item)">
					<image :src="item.img" :class="{'music_selected':item.name == music_selected}"></image>
					<text :class="{'themeTitle_selected':item.name == music_selected}">{{item.name}}</text>
				</view>
			</view>
			
		</scroll-view>
		
		<view class="createBtn">
			<luButtonRipple class="button" rippleBackgroundColor="red" :rippleOpacity="0.6" @rippleTap="createPoetry">
				<image src="../static/images/chinese/maobi.png"></image>
			</luButtonRipple>
		</view>
		
		<loading ref="loading" :shadeShow="true" :shadeClick="true" :custom="false" :type="2">
			<text style="font-size: 10px;position: fixed;bottom: 10px;">AI正在写诗中...</text>
		</loading>
	</view>
</template>

<script>
	import luButtonRipple from '@/components/lu-button-ripple/lu-button-ripple.vue';
	import LsSwiper from '@/components/ls-swiper/index.vue';
	import loading from '@/components/xuan-loading/xuan-loading.vue';
	export default{
		components:{
			luButtonRipple,
			LsSwiper,
			loading
		},
		data(){
			return {
				bannerList: [
					{
						imageUrl:"../static/images/chinese/chinese1.jpg",
					},
					{
						imageUrl:"../static/images/chinese/chinese2.jpg",
					},
					{
						imageUrl:"../static/images/chinese/chinese3.jpg",
					},
					{
						imageUrl:"../static/images/chinese/chinese4.jpg",
					},
				],
				themes:[
					// {
					// 	icon:"../static/images/chinese/maobi.png",
					// 	name:"随机",
					// 	style:"shanshui",
					// 	titles:['']
					// },
					{
						icon:"../static/images/chinese/sixiang.png",
						name:"思乡",
						style:"sixiang",
						titles:['月为故乡明','空窗守归梦','客行思故乡','归雁更思归','梦游远乡路'],
						music:['']
					},
					{
						icon:"../static/images/chinese/aiguo.png",
						name:"爱国",
						style:"aiguo",
						titles:['沙场为国躯','何须生入关','壮心终难赴','精忠能报国','汗青忠心照','龙城飞将度']
					},
					{
						icon:"../static/images/chinese/yueqi.png",
						name:"离别",
						style:"libie",
						titles:['离别秋意浓','离愁白日斜','自古伤离别','落日离人情','离人心上秋']
					},
					{
						icon:"../static/images/chinese/aiqing.png",
						name:"爱情",
						style:"aiqing",
						titles:['两情相悦时','谁知相思意','忆君心似水','伊人水一方','梦寻心系人']
					},
					{
						icon:"../static/images/chinese/shanshui.png",
						name:"山水",
						style:"shanshui",
						titles:['远看山有色','寒山深处云','溪流穿山过','山色镜中映','山长水阔处']
					},
					// {
					// 	icon:"../static/images/chinese/shanzi.png",
					// 	name:"节日",
					// 	titles:['离别愁意浓','离愁白日斜','自古伤离别','落日离人情','离人心上秋']
					// },
				],
				theme_selected:"思乡",
				
				music_styles:[
					// {
					// 	img:"../static/images/chinese/instrument/suiji.jpg",
					// 	name:"随机",
					// 	type:"suiji"
					// },
					{
						img:"../static/images/chinese/instrument/dizi.jpg",
						name:"笛子",
						type:"dizi"
					},
					{
						img:"../static/images/chinese/instrument/pipa.jpg",
						name:"琵琶",
						type:"pipa"
					},
					{
						img:"../static/images/chinese/instrument/guzheng.jpg",
						name:"古筝",
						type:"guzheng"
					},
					{
						img:"../static/images/chinese/instrument/erhu.jpg",
						name:"二胡",
						type:"erhu"
					},
					{
						img:"../static/images/chinese/instrument/guqin.jpg",
						name:"古琴",
						type:"guqin"
					},
				],
				music_selected:"笛子",
				type_selected:"dizi"
			}
		},
		methods:{
			select_theme(theme){
				this.theme_selected = theme.name;
			},
			select_music(music){
				this.music_selected = music.name;
				this.type_selected = music.type;
			},
			blur(){
				if(this.theme_selected == ""){
					this.theme_selected = "思乡";
				}
			},
			input(e){
				// console.log(e)
				this.theme_selected = e.detail.value;
			},
			createPoetry(){
				// this.$store.commit("pauseMusic");
				// this.$store.commit("changeStatus");
				let theme = null;
				
				for(let i = 0; i < this.themes.length; i++){
					if(this.themes[i].name == this.theme_selected){
						theme = this.themes[i];
						// flag = false;
						break;
					}
				}
				
				let title = '';
				if(theme == null){
					let len = this.themes.length;
					let k = parseInt(Math.random()*len, 10); //随机选一个主题
					theme = this.themes[k];
					title = this.theme_selected;
				}else{
					let num = theme.titles.length;
					let index = parseInt(Math.random()*num, 10); //随机选一个标题
					title = theme.titles[index];
				}
				
				let type = this.type_selected;
				
				let _this = this;
				this.$refs.loading.open();
								
				uni.request({
					url: "http://duing.site:5002/getChinese?type=" + _this.type_selected,
					timeout: 60000 * 5,
					success(res_) {
						// console.log(res_.data);
						uni.request({
							url: "http://duing.site:5001/getPoetry?theme=" + title + "&style=" + theme.style,
							success(res) {
								_this.$store.state.poetry = res.data.slice(1);
								_this.$store.state.poetry_title = res.data.slice(0, 1)[0];
								
								_this.$store.state.musicPlayer.src = res_.data;
								_this.$refs.loading.close();
								
								uni.navigateTo({
									url: "../views/poetry?style=" + theme.style + "&name=" + theme.name
								});
							}
						});
					}
				});
			}
		}
	}
</script>

<style>
	.main{
		background-color: #f1f3ee;
	}
	
	scroll-view{
		height: 96vh;
	}
	
	.head{
		margin: 10px;
		text-align: center;
		font-size: 15px;
		color: #71797b;
		padding-bottom: 8px;
		border-bottom: #ff0000 2px solid;
	}
	
	.title{
		font-size: 14px;
		color: #7d7d7d;
		margin-left: 6vw;
	}
	
	.themes{
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		width: 100vw;
		margin-bottom: 10px;
	}
	
	.theme{
		width: 14vw;
		height: 20vw;
		margin-left: 8.5vw;
		margin-top: 15px;
		font-size: 10px;
		color: #658f8a;
		text-align: center;
	}
	
	.theme_img{
		width: 15vw;
		height: 15vw;
		border: #989898 1px solid;
		border-radius: 7.5vw;
		box-shadow:  2px 2px 2px 2px #9ea590,
	}
	
	.theme_selected{
		background-color: #fff4f5;
		box-shadow:  6px 6px 12px #a2a993,
		             -5px -5px 10px #ffffff;
	}
	
	.themeTitle_selected{
		color: #ff0000;
	}
	
	.theme_img image{
		width: 10vw;
		height: 10vw;
		margin-top: 2.5vw;
		margin-left: 0.5vw;
	}
	
	input{
		border: #658F8A 1px solid;
		width: 82vw;
		height: 30px;
		margin: 0 auto;
		border-radius: 10px;
		text-align: center;
		font-size: 13px;
		margin-bottom: 10px;
	}
	
	.musics{
		width: 100vw;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		margin-bottom: 25px;
	}
	
	.music{
		width: 25vw;
		display: flex;
		flex-direction: column;
		text-align: center;
		font-size: 13px;
		color: #2C405A;
		margin-left: 6.5vw;
		margin-top: 10px;
	}
	
	.music image{
		width: 25vw;
		height: 25vw;
		border-radius: 10px;
		
	}
	
	.music_selected{
		box-shadow:  10px 10px 20px #979e8a,
		             -8px -8px 16px #ffffff;
	}
	
	.createBtn {
		position: fixed;
		bottom: 20%;
		left: 45%;
	}
	
	.button {
		width: 50px;
		height: 50px;
		border: 1px solid #aeaeae;
		border-radius: 40px;
		box-shadow: 5px 5px 8px #7f7f7f,-3px -3px 6px #ffffff;
		margin-top: 60px;
	}
	
	.button image {
		width: 30px;
		height: 30px;
	}
</style>
