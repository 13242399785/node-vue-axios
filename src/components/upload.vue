<template>
    <div class="upload-wapper">
        <form :action="postUrl+'/upload'" @submit="doSubmit"  method="post" target="nm_iframe" enctype="multipart/form-data" ref="uploadimg">
            <h2>上传图片</h2>
            <div class="imglist" v-show='imglist.length>0'>
                <div class="img" v-for='(item,index) in imglist' :key='index'>
                    <img :src="item" @click='choseImg(item)'>
                    <span @click='delectImg(index)'>删除</span>
                </div>	
            </div>	
            <div class="file-wapper">
                <input  multiple='multiple' type="file" name="logo" @change='uploadFile($event)' class="upfile" v-show='imglist.length==0'>	

                <input type="file" name="logo" @change='uploadFile($event)' class="upfile" v-for='(file,index1) in imglist' :key='index1' v-show='imglist.length==(index1+1)' multiple='multiple'>
            </div>		
            <span class="btn-sub" @click='commit'  v-show='imglist.length>0'>上传</span>	    		    
            <!-- <input type="submit" @click.prevent='commit' value="提交"> -->
        </form>
        <iframe id="id_iframe" name="nm_iframe"></iframe> 
        <div class="img-wapper" v-show='mock' @click='mockHiden'>
            <div class="img-content">
                <img :src="mockImg" @click.stop=''>
            </div>	
        </div>
        <span class="showimg" @click="imgControl">
            显示当前图片列表
        </span>
        <!--图片列表 -->
        <div class="img-list" v-show="imgShow">
            <span class="clone"  @click="imgControl">X</span>
            <div class="img-list-w" v-for="(item,index) in imgAll" :key="index">
                <img :src="postUrl+'/imglist/'+item" alt="">
            </div>
            {{imgAll}}
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            messge:'ceshi ',
            imgsrc:'',
            imglist:[],
            imgAll:[],
            mockImg:'',
            mock:false,
            postUrl:'http://192.168.5.147:8888',
            imgShow:false
        }
    },
    methods:{
        // 获取图片列表
        getImglist(){
            let that=this;
            this.$axios.get('apis/readList').then(function(res){
                    console.log(res.data)
                    that.imgAll=res.data.data;
                }).catch(function(err){
                    console.log(err)
                })
        },
        imgControl(){
            this.getImglist()
            this.imgShow=!this.imgShow;
        },
        choseImg(img){
            this.mock=true;
            this.mockImg=img;
        },
        mockHiden(){
            this.mock=false;
        },
        maopao(){
            console.log(222)
        },
        //上传按钮
        uploadFile(e){  
            let me=this;
            console.log(e.target.files)
            let files=e.target.files;
            let file=e.target.files[0]
            console.log(file.name)
            var imgStr = /\.(jpg|jpeg|png|bmp|BMP|JPG|PNG|JPEG|GIF|gif)$/;

            if(!imgStr.test(file.name)){
                alert('当前只允许上传图片文件')
            }else{
                console.log('图片上传')
                for (let i = 0; i < files.length; i++){
                    console.log(111)
                    me.mockimg(files[i])
                }
            }	
            
        },
        //多图片判断循环
        mockimg(file){
            let me=this;
            var reader = new FileReader();
            //读取文件过程方法
            reader.onloadstart = function (e) {
                console.log("开始读取....");
            }
            reader.onprogress = function (e) {
                console.log("正在读取中....");
            }
            reader.onabort = function (e) {
                console.log("中断读取....");
            }
            reader.onerror = function (e) {
                console.log("读取异常....");
            }
            reader.onload = function (e) {
                console.log("成功读取....");
                me.imglist.push(e.target.result)
                // return e.target.result
                // me.imgsrc = e.target.result;
                //或者 img.src = this.result;  //e.target == this
            }
            reader.readAsDataURL(file)
        },
        //删除图片
        delectImg(i){
            console.log(this.imglist)
            this.imglist.splice(i,1);//去掉
        },
        doSubmit(){
            return false;
        },
        //提交
        commit(n,e){
            console.log(n,e)
            if(this.imglist.length==0){
                alert('请选择图片上传！')
                return false;
            }else{
                //运行当前from的表单提交
                this.$refs.uploadimg.submit();
                console.log(this.$refs.uploadimg)
                // e.preventDefault(); 
                // let formData = new FormData()
                // formData.append('name', this.name)
                // formData.append('age', this.age)
                // formData.append('file', this.file)
                // let config = {
                //     headers: {
                //         'Content-Type': 'multipart/form-data'
                //     }
                // }
                // axios.post('apis/upload',config).then(res=>{
                // 	console.log(res)
                // })
            }
            // return false;
            // console.log(axios)
            // axios.get(`http://192.168.5.180:5025/api/DeviceType`).then(res=>{
            // 	console.log(res)
            // });
        }
    },
}
</script>
<style lang="css" scoped>
    html,body,.web{height: 100%;}
    h2{
        text-align: center;
    }
    	.file-wapper{
    	background: url('../assets/add.png') no-repeat 100% 100%;width: 100px;height: 100px;display: inline-block;
    	background-position: 0 0;
	    background-repeat: no-repeat;
	    background-size: 100% 100%;
    }
    .btn-sub{
        color: #FFF;
        background-color: #F56C6C;
        border-color: #F56C6C;
        padding: 6px 14px;
        border-radius: 10px;
        display: inline-block;
        line-height: 1;
    }
    .imglist{font-size: 0;}
    .img{position: relative;width: 25%;overflow: hidden;display: inline-block; margin-bottom:12px;padding-right: 18px;vertical-align: top;}
    img:hover{
        background: #d1d1d3;
    }
    .img span{color:#fff;cursor:pointer;position: absolute;top: 0;right: 0;border-radius: 50%;border: 1px solid #ccc;font-size:14px;width: 30px;height: 30px;background: #1296db;line-height: 30px;text-align: center;}
    .imglist img{max-width:100%;max-height: 200px;vertical-align: top;}
    .upfile{width: 100px;height: 100px;opacity: 0;} 
    .img-wapper{position: fixed;width: 100%;height:100%;left: 50%;top: 50%;transform: translate(-50%,-50%);background: rgba(0,0,0,.2)}  
    .img-wapper img{width: 100%;}
    .img-content{position: fixed;width: 80%;height:auto;left: 50%;top: 50%;transform: translate(-50%,-50%);max-width: 500px;}
    form{height: auto;}
    .showimg{
        display:inline-block;
        background: hotpink;
        color: #fff;
        padding: 10px 20px;
        border-radius: 14px;
    }
    .img-list{
        position: relative;
        width: 100%;
        border: 2px dashed #F56C6C;
        /* display: inline-block; */
    }
    .img-list-w{
        display: inline-block;
    }
    .img-list .clone{
        position: absolute;
        right: 8px;
        top: 10px;
        width: 50px;
        height: 50px;
        text-align: center;
        line-height: 50px;
        border-radius: 50%;
        color: #fff;
        border: 1px solid #ccc;
    }
</style>