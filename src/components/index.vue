<template>
	<div class="web">
        <div class="tab clerfixed">
            <ul>
                <li>1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
            </ul>
        </div>
        
        <!-- <div><a :href='video' target="_blank" rel="noopener noreferrer">这是个连接到pdf的地址</a></div> -->
        <div class="childst clerfixed">
            <div class="btncontrol">
                <button @click='addinfo'>添加</button>
                <button @click='delinfo'>删除</button>
            </div>
           <table class="table-list">
               <tbody id="listTable">
                   <tr class="th">
                       <th><input type='checkbox' v-model='checkall' @click='checks'/></th>
                       <th>序号</th>
                       <th>日期</th>
                       <th>费用</th>
                       <th>备注</th>
                       <th>操作</th>
                   </tr>
                   <tr v-show='listd.length==0'><td colspan='6'>当前没有数据</td></tr>
                   <tr v-for='(list,index) in listd' :key=index v-show='listd.length>0'>
                        <td><input type='checkbox' :id='list.Id' v-model='checkone' :value='list.Id'/></td>
                        <td class="xu"><label :for='list.Id'>{{index+1}}</label></td>
                        <td class="datedate"><label :for='list.Id'>{{format(list.time)}}</label></td>
                        <td class="fire">
                            <label :for='list.Id'>
                                <p v-show='list.e'>{{list.fine}}</p>
                            </label>
                            <input v-show='!list.e' ref="content" id='fo' name="" v-model='list.fine' class="input_control" @focus.prevent='focuson()' @blur.prevent="changeCount(listd,index,list.Id)">
                        </td>
                        <td class="notes">
                            <label :for='list.Id'>
                                <p v-show='list.d'>{{list.remark}}</p>  
                            </label>
                            <input v-show='!list.d' ref="content1" type="" name="" v-model='list.remark' class="input_control" @focus.prevent='focuson1()' @blur.prevent="changeCount1(listd,index,list.Id)">
                        </td>
                        <td class="control">
                            <button @click='edit(listd,index,list.id)'>修改</button>
                        </td>
                   </tr>
               </tbody>
           </table>
            <p class="count_num">总数:<span>{{countst}}</span></p>
            <p @click='adde(obj)'>{{obj.e}}</p>
            <p @click='addd(obj)'>{{obj.d}}</p>
            <!-- <input v-focus='focuscontrol' ref='content' type="text"> -->
        </div>
        <!-- 添加弹窗 -->
        <transition name='easein'>
            <div class="mork" v-show='addshow'></div>
        </transition>
        <transition name='add'>
            <div class="modal" v-show='addshow'>
                <p class="clonea"><b @click='addinfo'>x</b></p>
                <p><span>费用:</span><input type="number" v-model='eat.fine' name="" placeholder="请输入费用"></p>
                <p><span>备注:</span><input type="text" v-model='eat.remark' name="" placeholder="请输入备注"></p>
                <p class="botton-p"><button class="confirm" @click='send'>确定</button><button class="cancel" @click='addinfo'>取消</button></p> 
            </div>   
        </transition>
        <!-- 删除弹窗 -->
        <transition name='easein'>
            <div class="mork" v-show='delshow'></div>
        </transition>
        <transition name='add'>
            <div class="modal" v-show='delshow'>
                <p class="clonea"><b @click='delhid'>x</b></p>
                <p class="delinfo">确定删除所选？</p>
                <p class="botton-p"><button class="confirm" @click='delectCheck'>确定</button><button class="cancel" @click='delhid'>取消</button></p> 
            </div>
        </transition>
    </div>
</template>
<script type="text/javascript">
    import '../../static/js/rem.js'
    export default{
        name:'index',
        data(){
            return{
                listd:[],//总
                checkone:[],
                checkall:false,//全选控制
                countst:0,
                obj:{},
                focuscontrol:false,
                input1:true,
                input2:true,
                listShow:true,
                video:'http://183.236.89.104:8995/files/media/5.5高压开关柜的选择20190813224702259.mp4',
                updateData:{
                    fine:'',
                    remark:'',
                    Id:0
                },
                eat:{
                    time:'',
                    fine:'',
                    remark:''
                },
                addshow:false,
                delshow:false,
            }
        },
        directives: {
            focus: {
              inserted: function(el, { value }) {
                if (value) {
                  el.focus();
                }
              }
            }
        },
        mounted(){
            this.showlist();
            this.setSex();
            this.obj = {d: 0};
            // this.obj.e = 0;
            this.$set(this.obj,'e',0)
            console.log('after--', this.obj);
        },
        watch:{
            'checkone':function(){
                if(this.checkone.length==this.listd.length){
                    this.checkall=true;
                }else{
                    this.checkall=false;
                }
            }
        },
        computed:{
            // countst:function(){
            //     this.listd.forEach(function(v,i){
            //         return this.countst+=v.fine//总数
            //     }) 
            // }
        },
        methods:{
            //添加数据
            addinfo(){
                this.addshow=!this.addshow;
            },
            addhid(){
                this.eat.fine='';
                this.eat.remark='';
                this.addshow=false;
            },
            send(){ 
              this.eat.time=this.format(this.datenow());
              console.log(this.$qs.parse(this.eat))
              
              console.log(this.eat.time)
              var that=this;
              this.$axios.post('http://192.168.5.147:8888/insertinfo',this.$qs.stringify(that.eat)).then(function(res){
                console.log(res)
                if(res.data=='ok'){
                  that.showlist();
                  that.addhid();
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
            //删除单条数据
            delinfo(){
                var len=this.checkone.length;
                if(len==0){
                    alert('请选择单条数据进行删除！')
                }else{
                    this.delshow=!this.delshow;
                }
            },
            delhid(){
                this.delshow=false;
            },
            delectCheck(){
                var that=this;
                // this.$axios.delete('http://192.168.5.147:8888/deleteinfo',that.$qs.stringify(that.checkone)).then(function(res){
                //     console.log('删除')
                //     console.log(res)
                //     that.showlist();
                // })
                console.log(that.checkone)
                var len=this.checkone.length
                // if(len>1||len==0){
                //     alert('请选择单条数据进行删除！')
                // }else{
                    this.$axios.delete('http://192.168.5.147:8888/deleteinfo',{
                        params:{
                            Id: that.checkone
                        },
                        paramsSerializer: function(params) {
                            that.showlist();
                            that.delhid();
                            return that.$qs.stringify(params, {arrayFormat: 'repeat'})
                        }
                    })
                // }
                
            },
            //全选
            checks(){
                if(this.checkone.length!=this.listd.length){
                    this.checkone=[];
                    for(var i=0;i<this.listd.length;i++){
                        this.checkone.push(this.listd[i].Id);
                        console.log(this.checkone)
                    }
                }else{
                    this.checkone=[];
                }
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
                return y+'-'+this.add0(m)+'-'+this.add0(d);
            },
            setSex: function(){
                // this.$set(this.last,'false')
                // console.log(this.last)
            },
            adde(i){
                i.e=i.e+1;
                console.log(i)
            },
            addd(i){
                i.d=i.d+1;
                console.log(i)
            },
            //显示数据列表
            showlist(){
                this.video=decodeURI(this.video)
                console.log('请求列表')
                var that=this;
                this.$axios.get('http://192.168.5.147:8888/listshow').then(function(res){
                    console.log(res.data)
                    that.listd=res.data;
                    that.countst=0;
                    that.listd.forEach(function(v,i){
                        that.$set(v,'e',true)
                        that.$set(v,'d',true)
                        // console.log(that.listd)
                        that.countst+=v.fine//总数
                    })
                    // console.log(that.listd)
                }).catch(function(err){
                    console.log(err)
                })
            },
            //得到焦点
            focuson(){
                this.input1=false;
                console.log(this.input1,this.input1)
                console.log('得到焦点')
            },
            focuson1(){
                this.input2=false;
                console.log('得到焦点1')
                console.log(this.input1,this.input1)
            },
            //失去焦点
            changeCount(o,i,id){
                var that=this;
                that.updateData.fine=o[i].fine;
                that.updateData.remark=o[i].remark;
                that.updateData.Id=o[i].Id;
                console.log(that.updateData)
                setTimeout(function(){  
                    that.input1=true;
                    if(that.input1==true&&that.input2==true){
                        console.log('成功了') 
                        o[i].e=true;
                        o[i].d=true;
                        that.$axios.post('http://192.168.5.147:8888/updateinfo',that.$qs.stringify(that.updateData)).then(function(res){
                            console.log(res.data)
                            that.showlist();
                        }).catch(function(err){
                            console.log(err)
                        })
                    }  
                    console.log(that.$qs.stringify(that.updateData))
                    console.log('失去焦点')             
                },10)   
            },
            changeCount1(o,i,id){
                console.log('触发了')
                var that=this;
                that.updateData.fine=o[i].fine;
                that.updateData.remark=o[i].remark;
                that.updateData.Id=o[i].Id;
                console.log(that.updateData)
                setTimeout(function(){ 
                    that.input2=true;
                    if(that.input1==true&&that.input2==true){
                        console.log('成功了')
                        o[i].e=true;
                        o[i].d=true;
                        that.$axios.post('http://192.168.5.147:8888/updateinfo',that.$qs.stringify(that.updateData)).then(function(res){
                            console.log(res.data)
                            that.showlist();
                        }).catch(function(err){
                            console.log(err)
                        })
                    }  
                    console.log(that.input1,that.input2)
                    console.log('失去焦点')             
                },50)
            },
            //编辑
            edit(o,i,id){
                o[i].e=false;
                o[i].d=false;
                // this.focuscontrol=true;
                this.$nextTick(() => {//提前先执行
                    this.$refs.content[i].focus();
                })
                // this.$refs.content.focus()
                // this.listShow=false;              
                console.log('编辑')
            }
        }
    }
</script>
<style scoped lang="scss">
    @import '../../static/scss/common.scss';
	.web{
        position: relative;
        height:100%;
        width: 100%;
        // max-width: 800px;
        margin:auto;
        color: red;
        font-size: pxt(12px); }
        .tab{
            font-size: pxt(12px);
            overflow: hidden;
            ul{
                li{
                    text-align: center;
                    float: left;
                    width: 25%;
                    line-height: pxt(20px);
                    background: #eee;
                    position: relative;
                }
                li::before{
                    content: '';
                    width: pxt(1px);
                    background:green;
                    height: 100%;
                    position:absolute;
                    right: 0;
                }
                li:last-child::before{
                    width: 0;
                }
            }
        }
        .childst{font-size: pxt(6px);transform: translate3d(0, 0, 0);filter: grayscale(100%);
            .btncontrol{text-align: right;padding: 20px;
                button{
                    padding: pxt(4px) pxt(20px);
                    background: red;
                    color: #fff;
                    font-size: pxt(20px);
                }
            }
            .table-list{
                background: #eee;
                text-align: center;
                width: 100%;
                font-size: pxt(16px);
                .th{background: #2c3e50;color: #fff;font-weight: bold;line-height: pxt(30px);
                    th{border-right: 1px solid #fff;}
                }
                td{border-right: pxt(1px) solid #ccc;}
                td:last-child{border-right:none;}
                tr{line-height: pxt(28px);border-bottom: pxt(1px) solid #ccc;}
                tr:nth-child(2n){
                    background: #dcdada;
                }
                .input_control{width: 95%;}
                .control{
                    button{padding: pxt(2px) pxt(8px);background: rgba(26, 176, 202, 0.75);border-radius: pxt(5px);}
                }
                .xu{width: 10%;}
                .datedata{width: 45%;}
                .fire{width: 15%;}
                .notes{width: 30%;}
            }
            .count_num{
                font-size: pxt(20px);
                span{color: #e02929;display: inline-block;font-size: pxt(24px);}
            }
        }
        input[type=checkbox]{
            -webkit-appearance: radio;
            width: pxt(20px);
            height: pxt(20px);
            border-radius: 50%;
            overflow: hidden;
            text-align: center;
            line-height: pxt(20px);
            vertical-align: middle;
            position: relative;
        }
        input[type=checkbox]::before{
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            line-height: pxt(22px);
            width: 100%;
            height: 100%;
            border-radius: 50%;
        }
        input[type=checkbox]:checked::before{
            color: white;
            background-color: #26d09f;
            content:'√';
            font-size: pxt(14px);
            
        }
        // 动画
        .mork{content:' ';display:block;position: fixed;width: 100%;height: 100%;background: rgba(0,0,0,.3);z-index: 1;top:0;}
        .modal{z-index:99;position: fixed;top:50%;left: 50%;width:70%;transform:translate(-50%,-50%);background:rgba(255,255,255,1);padding:pxt(20px) pxt(14px) pxt(10px) pxt(14px);font-size:pxt(10px);border-radius: 20px;box-shadow: 5px 5px 15px #ccc;
            p{
                text-align: center;
                margin-bottom: 10px;
                font-size: 0;
                span{
                    font-size:pxt(18px);
                    width: 15%;
                    display: inline-block;
                }
                input{
                    width:85%;
                    display: inline-block;
                    border:1px solid #ccc;
                    height:pxt(30px);
                    font-size: pxt(18px);
                    padding:0 pxt(2px);
                }
                button{color:#fff;padding:pxt(4px) pxt(18px);border-radius: 6px;font-size: pxt(20px);}
                .cancel{
                    background: #ccc;       
                }
                .confirm{
                    margin-right:pxt(8px);
                    background: red;
                }
            }
            .delinfo{font-size: pxt(22px);color:#d03726;}
            .botton-p{margin-top:18px;}
            .clonea{font-size: pxt(10px);text-align: right;color:#ccc;position: relative;
                b{width: pxt(20px);height: pxt(20px);text-align:center;display: inline-block;border-radius: 50%;border: 1px solid #ccc;position: absolute;right: pxt(-5px);line-height: pxt(20px);top:pxt(-15px);}
            }
        }
        .add-enter-active {
          // transition: all .9s cubic-bezier(1.0, 0.5, 0.8, 1.0);
          animation:add-in .3s;
        }
        .add-leave-active {
          // transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
          animation:add-in .3s reverse;
        }
        .add-enter, .add-leave-to
        {
          transform: translateY(10px);
          opacity: 0;
        }
        .easein-enter-active {
          // transition: all .9s cubic-bezier(1.0, 0.5, 0.8, 1.0);
          animation:mork-in .3s;
        }
        .easein-leave-active {
          // transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
          animation:mork-in .3s reverse;
        }
        .easein-enter, .add-leave-to
        {
          // transform: translateY(10px);
          opacity: 0;
        }
        
        @keyframes mork-in{
            0%{
                transform: scale(0);
            }
            50%{
                transform: scale(1.5);
            }
            100%{
                transform: scale(1);
            }
        }
        @keyframes add-in{
            0%{
                transform:translate(-50%,-200%);
                opacity: 0;
            }
            10%{
                transform:translate(-50%,-190%);
                opacity: 0.1;
            }
            20%{
                transform:translate(-50%,-180%);
                opacity: 0.2;
            }
            30%{
                transform:translate(-50%,-170%);
                opacity: 0.3;
            }
            40%{
                transform:translate(-50%,-160%);
                opacity: 0.4;
            }
            50%{
                transform:translate(-50%,-150%);
                opacity: 0.5;
            }
            60%{
                transform:translate(-50%,-140%);
                opacity: 0.6;
            }
            70%{
                transform:translate(-50%,-130%);
                opacity: 0.7;
            }
            80%{
                transform:translate(-50%,-120%);
                opacity: 0.8;
            }
            90%{
                transform:translate(-50%,-110%);
                opacity: 0.9;
            }
            100%{
                transform:translate(-50%,-100%);
                opacity: 1;
            }
        }
    
</style>