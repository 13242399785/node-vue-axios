<template>
	<div class="slide-wapper">
		<div class="slide">
			<div class="swiper-container">
			    <div class="swiper-wrapper">
			      <div class="swiper-slide">Slide 1</div>
			      <div class="swiper-slide">Slide 2</div>
			      <div class="swiper-slide">Slide 3</div>
			      <div class="swiper-slide">Slide 4</div>
			      <div class="swiper-slide">Slide 5</div>
			      <div class="swiper-slide">Slide 6</div>
			      <div class="swiper-slide">Slide 7</div>
			      <div class="swiper-slide">Slide 8</div>
			      <div class="swiper-slide">Slide 9</div>
			      <div class="swiper-slide">Slide 10</div>
			    </div>
			</div>
		</div>
		<div class="slide-footer">
			<div class="slide_b">
				<span class="fl" @click='gohistory'>&lt;</span>
				<span class="fr slide_none">&gt;</span>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import Swiper from 'swiper';
	export default{
		name:'slide',
		data(){
			return{

			}
		},
		mounted(){
			// this.
		},
		methods:{
			gohistory(){
				console.log(window.history.length)
				if(window.history.length<=1){
					this.$router.push({path:'/'});
					return false; 
				}else{
					this.$router.go(-1)
				}
			},
			showslide(){
				var swiper = new Swiper('.swiper-container', {
			      slidesPerView: 3,
			      spaceBetween: 30,
				  centeredSlides: true,
				  loop: true,
			      pagination: {
			        el: '.swiper-pagination',
			        clickable: true,
			      },
			    });
			}
		}
	}
</script>
<style lang="scss">
	@import '../../static/scss/common.scss';
	.slide-wapper{height: 100%;position: relative;overflow: hidden;}  
	.slide-footer{background: #fafbfd;position: absolute;bottom: 0;left: 0;width: 100%;height:pxt(44px);line-height: pxt(44px);font-size: pxt(24px);color:#101010;
		.slide_b{width:50%;margin: auto;}
		.slide_none{color:#b4b4b6; }
		span{
			width:pxt(20px);
		}
	}
	.slide{
		height: 100%;
		background: -webkit-linear-gradient(#FFDE10, #FFA900); /* Safari 5.1 - 6.0 */
		background: -o-linear-gradient(#FFDE10, #FFA900); /* Opera 11.1 - 12.0 */
		background: -moz-linear-gradient(#FFDE10, #FFA900); /* Firefox 3.6 - 15 */
		background: linear-gradient(#FFDE10, #FFA900); /* 标准的语法 */
	}
</style>