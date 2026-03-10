<template>
	<div class="friend-link">
		<p class="card-title">友情链接</p>
		<div class="row friend-link friend-link-box">
			<div class="col-md-4 col-sm-4 col-xs-12 friend-link__wrap" v-for="(item,index) in list">
				<a :href="item.href" target="_blank" class="friend-link__wrap__item">
					<img :src="item.src"></img>
				</a>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'friend-link',
		props: {

		},
		data() {
			return {
				list:[
					{
						src:"image/ad/1.jpg",
						href:"https://www.aliyun.com/minisite/goods?userCode=eeg47b5x"
					},
					{
						src:"image/ad/2.jpg",
						href:"https://www.aliyun.com/1111/new?userCode=eeg47b5x"
					},
					{
						src:"image/ad/3.png",
						href:"https://yqh.aliyun.com/live/cdncarnival?userCode=eeg47b5x"
					}
				]
			};
		},
		created(){
			this.init();
		},
		mounted() {

		},
		methods: {
			// 页面数据初始化函数
			init(options = {}){

			}
		},
		// 计算属性
		computed:{

		}
	};
</script>

<style scoped>
	.friend-link{
		text-align: center;
		margin-top: 3em;
	}
	.friend-link .friend-link-box{
		display: flex;
	}
	.friend-link .card-title{
		font-size: 24px;
	}
	.friend-link .friend-link .row{
		margin-right: -15px;
		margin-left: -15px;
	}

	.friend-link .friend-link .friend-link__wrap{
		margin:8px 8px;
	}
	.friend-link .friend-link .friend-link__wrap .friend-link__wrap__item{
		border-radius: 5px;
		overflow: hidden;
		display: inline-block;
	}
	.friend-link .friend-link .friend-link__wrap img{
		display:block;
	}
	.friend-link .friend-link .col-sm-4 {
		width: 33.33333333%;
	}

</style>
