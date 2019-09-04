<template>
  <div class="hello">
    <h1 @click="save">{{ msg }}</h1>
    <div id="web">
      这是一个web
    </div>
    <div class="onput">
      <input type="number" v-model="eat.fine">
      <input type="text" v-model="eat.remark">
      <button @click="send">确认</button>
    </div>
    <div id="content">
      
    </div>
    
  </div> 
</template>

<script>
import html2canvas from 'html2canvas';

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      data:{
        username:'huazai',
        password:'123456'
      },
      eat:{
        time:'',
        fine:'',
        remark:''
      }
    }
  },
  methods:{
    send(){ 
      this.eat.time=this.format(this.datenow());
      console.log(this.$qs.parse(this.eat))
      
      console.log(this.eat.time)
      var that=this;
      this.$axios.post('http://192.168.5.147:8888/insertinfo',this.$qs.stringify(that.eat)).then(function(res){
        console.log(res)
        if(res.data=='ok'){
          that.$router.push({name:'Index'})
        }
      }).catch(function(err){
        console.log(err)
      })
    },
    //时间转化
		add0(m){
			return m<10?'0'+m:m;
		},
		format(shijianchuo)
		{
			var time = new Date(shijianchuo);
			var y = time.getFullYear();
			var m = time.getMonth()+1;
			var d = time.getDate();
			var h = time.getHours();
			var mm = time.getMinutes();
			var s = time.getSeconds();
			return y+'-'+this.add0(m)+'-'+d+'  '+h+':'+this.add0(mm);
		},
    datenow(){
      var now=new Date();
      console.log(now)
      return now.getTime();
      
    },
    //移动端转码
    base64ToBlob(code){    
        let parts = code.split(';base64,')     
        let contentType = parts[0].split(':')[1]     
        let raw = window.atob(parts[1])
        let rawLength = raw.length
        let uInt8Array = new Uint8Array(rawLength)          
        for (let i = 0; i < rawLength; ++i) {
            uInt8Array[i] = raw.charCodeAt(i)
        }
        return new Blob([uInt8Array], {type: contentType})
    },

    show(){  
      html2canvas(document.querySelector('#web')).then(canvas =>{
        let saveUrl=canvas.toDataURL('image/png');
        let a=document.createElement('a');
        document.body.appendChild(a);
        a.href=saveUrl;
        a.download='下载图片名称';
        // a.click()
        window.location.replace(saveUrl)

      })
    },
    //移动端save
    save(){
      const _this=this;
      // var doc = window.document;
        var obj = document.getElementById("web"); 
        var width = obj.offsetWidth; 
        var height = obj.offsetHeight; 
        console.log(window)
        console.log(width)
      //   var context = canvas.getContext("2d");
      //   var scale = 2; 
    
      //   canvas.width = width * scale;
      //   canvas.height = height * scale;
                
      //   canvas.getContext("2d").scale(scale, scale); 
      
      // var opts = {
      //       scale: scale, 
      //       canvas: canvas, 
      //       logging: true, 
      //       width: width, 
      //       height: height 
      // }   
      setTimeout(function(){
          html2canvas(document.querySelector('#web')).then(canvas =>{
            console.log(canvas)
            let saveUrl=canvas.toDataURL('image/png');
            let a=document.createElement('a');
            document.body.appendChild(a);

            let blob=_this.base64ToBlob(saveUrl);
            console.log(blob.size)
            let evt=document.createEvent('HTMLEvents');
            console.log(saveUrl)
            evt.initEvent('click',true,true);
            if(document.querySelector('#content').children.length>0){
              // document.querySelector('#content').removeChild(document.querySelector('#content').childNodes[0])
              return false;
              // console.log(canvas)
            }else{
               document.querySelector('#content').appendChild(canvas)
            }
            a.href=URL.createObjectURL(blob);
            console.log(a.href)
            a.download="图片名称";
            a.remove();
            // document.querySelector('#content').removeChild(canvas)
            // document.querySelector('#content').appendChild(canvas)
            // console.log(document.querySelector('#content').children.length)
            // document.querySelector('#content').remoteChild(canvas)
            // document.querySelector('#content').appendChild(canvas)
            a.click()
            console.log(a)
        })
      },100)  
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#content{height: 500px;width: 100%;background: #ccc;}
#web{width: 100%;background: red;color: #333;}
.hello{max-width: 800px;margin: auto;position: relative;
  .onput{
    padding:12px 8px;
  }
}

h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
