<template>
	
	<div class="cube">
		<transition name='slide-left'>
			我是一个例子
		</transition>
		
	</div>
</template>

<script>
  export default {
  	data(){
  		return{
  			transitionName:'slide-right'	
  		}
  	},
    methods: {
      showDialog() {
        this.$createDialog({
          type: 'alert',
          title: 'Alert',
          content: 'dialog content'
        }).show()
      }
    },
    watch: {
      '$route' (to, from) {
        let isBack = this.$router.isBack  //  监听路由变化时的状态为前进还是后退
        console.log(isBack)
        if(isBack) {
          this.transitionName = 'slide-right'
        } else {
          this.transitionName = 'slide-left'
        }
      }
    }
  }
</script>
<style lang="scss">
	.Router{position:absolute;width: 100%;transition:all .8s ease;top: 40px;background: red;}
	.slide-left-enter,.slide-right-leave-active {opacity: 0; -webkit-transform:translate(100%, 0);transform:translate(100%, 0);}
	.slide-left-leave-active,.slide-right-enter {opacity:0;-webkit-transform: translate(-100%, 0);transform:translate(-100% 0);}
</style>