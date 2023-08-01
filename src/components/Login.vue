<template>
	<div id="container">
		  <el-form
		    ref="infoRef"
		    :model="info"
			 :rules="rules"
	
		    label-width="120px"
		    class="demo-info"
		  >
			<svg-icon iconClass="login-mall"></svg-icon>
			<h2 style="color: rgb(64, 158, 255) ;margin-bottom: 30px; 0">mall-admin-web</h2>
		    <el-form-item label="" style="margin-left: -100px;" prop="username">
				<el-input v-model="info.username"  >
					<template #prefix>
					  <el-icon class="el-input__icon">
						  <svg-icon iconClass="user"></svg-icon>
					  </el-icon>
					</template>
				</el-input>
		    </el-form-item>
		    <el-form-item label="" style="margin-left: -100px;" prop="password">
		      <el-input v-model="info.password" :type="showPassword ? 'text' : 'password'">
				  <template #prefix>
				    <el-icon class="el-input__icon">
				  	  <svg-icon iconClass="password" ></svg-icon>
				    </el-icon>
				  </template>
				  <template #suffix>
				    <el-icon class="el-input__icon">
				  	  <svg-icon class="eye" iconClass="eye" @click="checkpassword"></svg-icon>
				    </el-icon>
				  </template>
			  </el-input>
			    
		    </el-form-item>
		    <el-form-item style="margin-left: -100px;">
		      <el-button class="button" type="primary" @click="submitForm(infoRef)"
		        >登录</el-button
		      >
		    </el-form-item>
		  </el-form>
	</div>
	<img src="../icons/svg/login_center_bg.5307896.png" alt="">
</template>

<script  setup>
import { reactive, ref } from 'vue'
import  { ElMessage } from 'element-plus'
import router from "@/router";
import axios from "axios";
const infoRef =ref()
let showPassword=ref(false)
let info = reactive({
  password: 'macro123',
  username: 'admin',
})

// 点击切换查看密码
let checkpassword=()=>{
	showPassword.value=!showPassword.value
}
const rules = reactive({
	username:[
		 { required: true, message: '请输入用户名', trigger: 'blur' },
	],
	password:[
		 { required: true, message: '请输入密码', trigger: 'blur' },
	]
})

const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
		axios.post("http://8.129.190.90:19527/admin/login",{"username":info.username,"password":info.password})
		.then(res=>{
			// console.log(res)
			if(res.data.code==200){
				let data=res.data.data.tokenHead+res.data.data.token
				localStorage.setItem("token",data)
				router.push("/home")
			}else{
				ElMessage.error('登陆失败')
			}
		})
/*      if (info.pass==="123456"&&info.username==="admin") {
		  // 将数据传到本地存储
		  localStorage.setItem("token","Bearer xxx")
      	alert("登录成功")
		//  登录成功跳转主页
		router.push("/home");
      }else{
		  localStorage.removeItem('token')
	  } */
    } else {
      console.log('error submit!', fields)
    }
  })
}


</script>

<style  scoped>
	*{
		margin: 0;
		padding: 0;
	}

	img{
		position: absolute;
		top: 362px;
		left: 0;
		background: #409eff;
		width: 100%;
		height: 200px;
		z-index: -1999;
	}
	#container{
		width: 400px;
		height: 400px;
		margin: 300px auto;
		box-shadow: 0 0 5px 1px;
		border-top: 5px solid rgb(64, 158, 255) ;
		background-color: #fff;
	}
	#container .svg-icon{
		font-size: 56px;
		color: rgb(64, 158, 255);
		margin: 30px auto;
	}

	#container.el-form-item{
		margin: 20px 0;
		width: 470px;
		
	}
	#container.el-form-item .el-form-item__content{
		width: 300px;
		height: 40px;
		margin-left: 20px !important;
	}

	#container .el-form-item .el-form-item__content .el-input{
		height: 40px;
		width: 96%;
	}
	#container .button{
		width: 366px;
		height: 40px;
	}
</style>