import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		musicPlayer: uni.createInnerAudioContext(), //全局播放器
		play_status: false,
		music: {
			poster: "../static/music/poster.jpg",
			name: "未播放",
			author: "未命名",
			duration: "00.00",
			currentTime: "00:00",
		},
		rotateNum: 0,//旋转角度
		imgRotate: 'rotate(0deg)',//旋转角度
		interval: null,//计时器
		
		poetry_title: "",
		poetry: null,
		
		lyrics: null,
		
		user:null,//用户信息
		
		creates:[
			{
				createImg:"../static/images/styles/music/bahe.jpg",
				createName:"巴赫",
				createStyle:"古典"
			},
			{
				createImg:"../static/images/styles/music/xiaobang.jpg",
				createName:"肖邦",
				createStyle:"古典"
			},
			{
				createImg:"../static/images/chinese/shanshui.png",
				createName:"山水",
				createStyle:"国风"
			},
			{
				createImg:"../static/images/singer/chenyixun.jpg",
				createName:"陈奕迅",
				createStyle:"歌词"
			},
			{
				createImg:"../static/images/styles/music/jiezou.jpg",
				createName:"节奏",
				createStyle:"流行"
			},
		]
	},
	//mutations定义同步操作的方法
	mutations: {
		addCreate(state, create){
			state.creates.push(create);
		},
		getMusic(state, music) {
			// console.log(music);
			if(music.picUrl != undefined){
				state.music.poster = music.picUrl;
				state.music.name = music.name;
				state.music.author = music.song.artists[0].name;
			}
			else{
				state.music.poster = music.album.picUrl;
				state.music.name = music.name;
				state.music.author = music.artists[0].name;
			}
			//处理时间
			let duration = state.musicPlayer.duration;
			let m = parseInt(duration / 60);
			if(m < 10){
				m = "0" + m;
			}
			let s = parseInt(duration % 60);
			if(s < 10){
				s = "0" + s;
			}
			state.music.duration = m + ":" + s;
			clearInterval(state.interval);  //停止定时器
		},
		playMusic(state) {
			if(state.musicPlayer.src != undefined){
				state.musicPlayer.play();
				state.interval = setInterval(function() {
					state.rotateNum = state.rotateNum + 3;
					state.imgRotate = "rotate(" + state.rotateNum + "deg)";
				}, 50);
				state.musicPlayer.onEnded(function(){
					state.musicPlayer.stop();
					if (state.interval !== null) {
						clearInterval(state.interval);  //停止定时器
					}
					state.play_status = !state.play_status;
				})
			}
		},
		pauseMusic(state) {
			state.musicPlayer.pause();
			if (state.interval !== null) {
				clearInterval(state.interval);  //停止定时器
			}
		},
		changeStatus(state) {
			if(state.musicPlayer.src != undefined){
				state.play_status = !state.play_status;
			}
		}
	},
	actions: {

	}
})
export default store
