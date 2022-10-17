<script>
	export default {
		onLaunch: function() {
			console.log('App Launch');
			
			let _this = this;
			uni.getStorage({
				key:"user",
				success:function(res){
					_this.$store.state.user = res.data;
				}
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	.page{
		margin: 10px;
	}
</style>
