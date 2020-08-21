<template>
	<div class="login">
		<!--from-->
	    <div class="login-from">
	      <p class="login-title">用户登录</p>
	      <div class="login-input">
	        <span><i class="iconfont">&#xe636;</i></span>
	        <input type="text" placeholder="用户名" @blur="blurtop" v-model="user.username">
	      </div>
	      <div class="login-input margin-tow">
	        <span><i class="iconfont">&#xe6b4;</i></span>
	        <input type="password" placeholder="密码" @blur="blurtop" v-model="user.password">
	      </div>
	      <button class="login-btn" @click="login">登录</button>
	    </div>
		<canvas id="canvas" width="793" height="937"></canvas>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				user:{
					'username':'',
					// 'username':'',
                	'password':''
				}
			}
		},
		mounted(){
			this.inits();
		},
		methods:{
			//失去焦点屏幕回弹
          blurtop(){
              window.scrollTo({top:0,left:0,behavior:"smooth"});
          },
          //登录
          login(){
              let me=this;
              // localStorage.setItem('nowUserName',me.user.username)
              if(this.user.username==''){
                  alert('用户名不能为空！')
              }else if(this.user.password==''){
                  alert('密码不能为空！')
              }else{
                  this.$axios.post('apis/login',this.$qs.stringify(this.user)).then(res=>{
                      // localStorage.setItem('nowUserName',me.user.name)
					  console.log(res)
					  if(res.data.err_code===0){
						  console.log(res.data.msg)
						  me.$router.push('/');
					  }else{
						  alert(res.data.msg)
					  }
                      // if(res.data==)
                      // localStorage.setItem('sessionIds',res.data.result.substring(parseInt(res.data.result.indexOf('为:'))+2,res.data.result.length))
                      // console.log(res.data.result.substring(parseInt(res.data.result.indexOf('为:'))+2,res.data.result.length))
                      // alert('登录成功!')
                    //   me.$router.push('/')
                  })
              }
		  },
		  inits(){

			/*=============================================================================*/  
			/* Canvas Lightning v1
			/*=============================================================================*/
			var canvasLightning = function(c, cw, ch){
				
			/*=============================================================================*/  
			/* Initialize
			/*=============================================================================*/
				this.init = function(){
				this.loop();
				};    
				
			/*=============================================================================*/  
			/* Variables
			/*=============================================================================*/
				var _this = this;
				this.c = c;
				this.ctx = c.getContext('2d');
				this.cw = cw;
				this.ch = ch;
				this.mx = 0;
				this.my = 0;
				
				this.lightning = [];
				this.lightTimeCurrent = 0;
				this.lightTimeTotal = 50;
				
			/*=============================================================================*/  
			/* Utility Functions
			/*=============================================================================*/        
			this.rand = function(rMi, rMa){return ~~((Math.random()*(rMa-rMi+1))+rMi);};
			this.hitTest = function(x1, y1, w1, h1, x2, y2, w2, h2){return !(x1 + w1 < x2 || x2 + w2 < x1 || y1 + h1 < y2 || y2 + h2 < y1);};
				
			/*=============================================================================*/ 
			/* Create Lightning
			/*=============================================================================*/
				this.createL= function(x, y, canSpawn){         
				this.lightning.push({
					x: x,
					y: y,
					xRange: this.rand(5, 30),
					yRange: this.rand(5, 25),
					path: [{
					x: x,
					y: y  
					}],
					pathLimit: this.rand(10, 35),
					canSpawn: canSpawn,
					hasFired: false
				});
				};
				
			/*=============================================================================*/ 
			/* Update Lightning
			/*=============================================================================*/
				this.updateL = function(){
				var i = this.lightning.length;
				while(i--){
					var light = this.lightning[i];            
					
					
					light.path.push({
					x: light.path[light.path.length-1].x + (this.rand(0, light.xRange)-(light.xRange/2)),
					y: light.path[light.path.length-1].y + (this.rand(0, light.yRange))
					});
					
					if(light.path.length > light.pathLimit){
					this.lightning.splice(i, 1)
					}
					light.hasFired = true;
				};
				};
				
			/*=============================================================================*/ 
			/* Render Lightning
			/*=============================================================================*/
				this.renderL = function(){
				var i = this.lightning.length;
				while(i--){
					var light = this.lightning[i];
					
					this.ctx.strokeStyle = 'hsla(0, 100%, 100%, '+this.rand(10, 100)/100+')';
					this.ctx.lineWidth = 1;
					if(this.rand(0, 30) == 0){
					this.ctx.lineWidth = 2; 
					}
					if(this.rand(0, 60) == 0){
					this.ctx.lineWidth = 3; 
					}
					if(this.rand(0, 90) == 0){
					this.ctx.lineWidth = 4; 
					}
					if(this.rand(0, 120) == 0){
					this.ctx.lineWidth = 5; 
					}
					if(this.rand(0, 150) == 0){
					this.ctx.lineWidth = 6; 
					} 
					
					this.ctx.beginPath();
					
					var pathCount = light.path.length;
					this.ctx.moveTo(light.x, light.y);
					for(var pc = 0; pc < pathCount; pc++){  
					
					this.ctx.lineTo(light.path[pc].x, light.path[pc].y);
					
					if(light.canSpawn){
						if(this.rand(0, 100) == 0){
						light.canSpawn = false;
						this.createL(light.path[pc].x, light.path[pc].y, false);
						} 
					}
					}
					
					if(!light.hasFired){
					this.ctx.fillStyle = 'rgba(255, 255, 255, '+this.rand(4, 12)/100+')';
					this.ctx.fillRect(0, 0, this.cw, this.ch);  
					}
					
					if(this.rand(0, 30) == 0){
					this.ctx.fillStyle = 'rgba(255, 255, 255, '+this.rand(1, 3)/100+')';
					this.ctx.fillRect(0, 0, this.cw, this.ch);  
					} 
					
					this.ctx.stroke();
				};
				};
				
			/*=============================================================================*/ 
			/* Lightning Timer
			/*=============================================================================*/
				this.lightningTimer = function(){
				this.lightTimeCurrent++;
				if(this.lightTimeCurrent >= this.lightTimeTotal){
					var newX = this.rand(100, cw - 100);
					var newY = this.rand(0, ch / 2); 
					var createCount = this.rand(1, 3);
					while(createCount--){             
					this.createL(newX, newY, true);
					}
					this.lightTimeCurrent = 0;
					this.lightTimeTotal = this.rand(30, 100);
				}
				}
				
			/*=============================================================================*/ 
			/* Clear Canvas
			/*=============================================================================*/
				this.clearCanvas = function(){
					this.ctx.globalCompositeOperation = 'destination-out';
					this.ctx.fillStyle = 'rgba(0,0,0,'+this.rand(1, 30)/100+')';
					this.ctx.fillRect(0,0,this.cw,this.ch);
					this.ctx.globalCompositeOperation = 'source-over';
				};
				
			/*=============================================================================*/ 
			/* Resize on Canvas on Window Resize
			/*=============================================================================*/
			$(window).on('resize', function(){
				_this.cw = _this.c.width = window.innerWidth;
				_this.ch = _this.c.height = window.innerHeight;  
			});
				
			/*=============================================================================*/ 
			/* Animation Loop
			/*=============================================================================*/
				this.loop = function(){
					var loopIt = function(){
					requestAnimationFrame(loopIt, _this.c);
					_this.clearCanvas();
					_this.updateL();
					_this.lightningTimer();
					_this.renderL();  
				};
				loopIt();         
				};
				
			};

			/*=============================================================================*/ 
			/* Check Canvas Support
			/*=============================================================================*/
			var isCanvasSupported = function(){
				var elem = document.createElement('canvas');
				return !!(elem.getContext && elem.getContext('2d'));
			};

			/*=============================================================================*/ 
			/* Setup requestAnimationFrame
			/*=============================================================================*/
			var setupRAF = function(){
				var lastTime = 0;
				var vendors = ['ms', 'moz', 'webkit', 'o'];
				for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x){
				window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
				window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
				};
				
				if(!window.requestAnimationFrame){
				window.requestAnimationFrame = function(callback, element){
					var currTime = new Date().getTime();
					var timeToCall = Math.max(0, 16 - (currTime - lastTime));
					var id = window.setTimeout(function() { callback(currTime + timeToCall); }, timeToCall);
					lastTime = currTime + timeToCall;
					return id;
				};
				};
				
				if (!window.cancelAnimationFrame){
				window.cancelAnimationFrame = function(id){
					clearTimeout(id);
				};
				};
			};      

			/*=============================================================================*/ 
			/* Define Canvas and Initialize
			/*=============================================================================*/
			var c = document.getElementById('canvas');
			var cw = c.width = window.innerWidth;
			var ch = c.height = window.innerHeight; 
			var cl = new canvasLightning(c, cw, ch);        
			
			setupRAF();
			cl.init();
			},
		}
	}
</script>
<style lang="scss">
	.login{
		background: #27c2ff;
		background: -moz-linear-gradient(top,  #27c2ff 0%, #cbf500 100%);
		background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#27c2ff), color-stop(100%,#cbf500));
		background: -webkit-linear-gradient(top,  #27c2ff 0%,#cbf500 100%);
		background: -o-linear-gradient(top,  #27c2ff 0%,#cbf500 100%);
		background: -ms-linear-gradient(top,  #27c2ff 0%,#cbf500 100%);
		background: linear-gradient(to bottom,  #27c2ff 0%,#cbf500 100%);
		filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#27c2ff', endColorstr='#cbf500',GradientType=0 );
		width: 100%;
		height: 100%;
		.login-from{width: 400px;height: 270px;background: #fff;
	      box-shadow: 0px 0px 10px #ccc;
	      position: absolute;
	      left:50%;
	      border-radius: 12px;
	      text-align: center;
	      font-size: 18px;
	      top:25%;
		  z-index: 3;
	      .login-title{
	        text-align: center;
	        font-size: 24px;
	        color: #383838;
	        padding: 24px 0;
	      }
	      .login-input{
	        position: relative;
	        width: 260px;
	        margin: auto;
	        border: 1px solid #959595;
	        margin-bottom: 30px;
	        .foget{position: absolute;right: 0;bottom: -22px;font-size: 14px;color: #b2c9d2;cursor: pointer;text-decoration:underline;padding-bottom: 2px;}
	        .foget:hover{
	          color: #13b5b1;
	        }
	        span{display: inline-block;padding: 8px 10px;}
	        input{border: none;width: 80%;}
	      }
	      .margin-tow{margin-bottom: 25px;}
	      .login-btn{border-radius: 50px;width:120px;height: 40px;line-height: 40px;background: #f19149;color: #fff;margin-bottom: 20px; }
	    }
	    .posititle{
	      text-align: center;
	      padding-top: 106px;
	    }
	}
	 /*phone*/
	@media (max-width: 1081px) {
	    .login{
	      background-size: 96% 70%;
	      .login-from{
	        width: 92%;
	        top:20%;
	        height: auto;
	        border: 1px solid #ccc;
	        transform: translateX(-50%);
	      }
	      .posititle{padding-top: 14px;}
	    }
	}
	#canvas{
		position: absolute;
		top:0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 1;
	}
</style>