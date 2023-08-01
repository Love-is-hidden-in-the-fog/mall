<template>
	<div class="content_con">
		<el-row :gutter="20">
			<el-col :span="12">
				<div class="grid-content bg-purple">
					<el-container>
						<el-header>android下载</el-header>
						<el-main><a href="javascript:;">安卓地址</a></el-main>
					</el-container>
				</div>
			</el-col>
			<el-col :span="12">
				<div class="grid-content bg-purple">
					<el-container>
						<el-header>ios下载</el-header>
						<el-main><a href="javascript:;">ios地址</a></el-main>
					</el-container>
				</div>
			</el-col>
		
		</el-row>
		<el-row :gutter="20">
			<el-col :span="6">
				<div class="grid-content bg-purple">
					<el-row :gutter="0">
						<el-col :span="12">
							<div class="grid-content ep-bg-purple" style="height: 90px; width: 50px; border: none;">
								<el-icon style="width: 30px; height: 90px;"><svg-icon iconClass="order"
										style="font-size: 30px; color:#409eff"></svg-icon></el-icon>
							</div>
						</el-col>
						<el-col :span="12">
							<div class="grid-content ep-bg-purple" style="height: 90px; border: none; margin-left: -20px;">
								<p>今日订单数</p>
								<p>200</p>
							</div>
						</el-col>
					</el-row>
				</div>
			</el-col>
			<el-col :span="6">
				<div class="grid-content bg-purple">
					<el-row :gutter="0">
						<el-col :span="12">
							<div class="grid-content ep-bg-purple" style="height: 90px; width: 50px; border: none;">
								<el-icon style="width: 30px; height: 90px;"><svg-icon iconClass="total-today"
										style="font-size: 30px; color:#409eff"></svg-icon></el-icon>
							</div>
						</el-col>
						<el-col :span="12">
							<div class="grid-content ep-bg-purple" style="height: 90px; border: none; margin-left: -20px;">
								<p>今日销售额</p>
								<p>￥5000.00</p>
							</div>
						</el-col>
					</el-row>
				</div>
			</el-col>
			<el-col :span="6">
				<div class="grid-content bg-purple">
					<el-row :gutter="0">
						<el-col :span="12">
							<div class="grid-content ep-bg-purple" style="height: 90px; width: 50px; border: none;">
								<el-icon style="width: 30px; height: 90px;"><svg-icon iconClass="total-yesterday"
										style="font-size: 30px; color:#409eff"></svg-icon></el-icon>
							</div>
						</el-col>
						<el-col :span="12">
							<div class="grid-content ep-bg-purple" style="height: 90px; border: none; margin-left: -20px;">
								<p>昨日销售额</p>
								<p>￥5000.00</p>
							</div>
						</el-col>
					</el-row>
				</div>
			</el-col>
			<el-col :span="6">
				<div class="grid-content bg-purple">
					<el-row :gutter="0">
						<el-col :span="12">
							<div class="grid-content ep-bg-purple" style="height: 90px; width: 50px; border: none;">
								<el-icon style="width: 30px; height: 90px;"><svg-icon iconClass="total-week"
										style="font-size: 30px; color:#409eff"></svg-icon></el-icon>
							</div>
						</el-col>
						<el-col :span="12">
							<div class="grid-content ep-bg-purple" style="height: 90px; border: none; margin-left: -20px;">
								<p>近七日日销售额</p>
								<p>￥5000.00</p>
							</div>
						</el-col>
					</el-row>
				</div>
			</el-col>
		</el-row>
		<!-- 待处理事务 -->
		<el-row :gutter="20">
			<el-col :span="24">
				<div class="grid-content bg-purple table">
					<el-container>
						<el-header>待处理事务</el-header>
						<el-main>
							<table>
								<tr>
									<td>
										<span>待付款订单</span>
										<span>(10)</span>
									</td>
									<td>
										<span>待付款订单</span>
										<span>(10)</span>
									</td>
									<td>
										<span>待付款订单</span>
										<span>(10)</span>
									</td>
								</tr>
								<tr>
									<td>
										<span>待付款订单</span>
										<span>(10)</span>
									</td>
									<td>
										<span>待付款订单</span>
										<span>(10)</span>
									</td>
									<td>
										<span>待付款订单</span>
										<span>(10)</span>
									</td>
								</tr>
								<tr>
									<td>
										<span>待付款订单</span>
										<span>(10)</span>
									</td>
									<td>
										<span>待付款订单</span>
										<span>(10)</span>
									</td>
									<td>
										<span>待付款订单</span>
										<span>(10)</span>
									</td>
								</tr>
							</table>
						</el-main>
					</el-container>
				</div>
			</el-col>
		</el-row>
		<!-- 商品总览&用户总览 -->
		<el-row :gutter="20">
			<el-col :span="12">
				<div class="grid-content bg-purple">
					<el-container>
						<el-header>商品总览</el-header>
						<el-main style="display: flex;    justify-content: space-around;">
							<div class="ss">
								<p style="font-size: 20px; color:red">100</p>
								<p>已下架</p>
							</div>
							<div class="ss">
								<p style="font-size: 20px; color:red">400</p>
								<p>已上架</p>
							</div>
							<div class="ss">
								<p style="font-size: 20px; color:red">50</p>
								<p>库存紧张</p>
							</div>
							<div class="ss">
								<p style="font-size: 20px; color:red">500</p>
								<p>全部商品</p>
							</div>
						</el-main>
					</el-container>
				</div>
			</el-col>
			<el-col :span="12">
				<div class="grid-content bg-purple">
					<el-container>
						<el-header>用户总览</el-header>
						<el-main style="display: flex;    justify-content: space-around;">
							<div class="ss">
								<p style="font-size: 20px; color:red">100</p>
								<p>今日新增</p>
							</div>
							<div class="ss">
								<p style="font-size: 20px; color:red">400</p>
								<p>昨日新增</p>
							</div>
							<div class="ss">
								<p style="font-size: 20px; color:red">50</p>
								<p>本月新增</p>
							</div>
							<div class="ss">
								<p style="font-size: 20px; color:red">500</p>
								<p>会员总数</p>
							</div>
						</el-main>
					</el-container>
				</div>
			</el-col>
		</el-row>
		<!-- 订单统计 -->
		<el-row :gutter="20">
			<el-col :span="24">
				<div class="grid-content bg-purple">
					<el-container>
						<el-header>订单统计</el-header>
						<el-main>
							<div class="left">
								<div class="left1">
									<p>本月订单总数</p>
									<p style="font-size: 30px;">1000</p>
									<p>+10% 同比上月</p>
								</div>
								<div class="left2">
									<p>本周订单总数</p>
									<p style="font-size: 30px;">1000</p>
									<p>-10% 同比上周</p>
								</div>
								<div class="left3">
									<p>本月销售总额</p>
									<p style="font-size: 30px;">100000</p>
									<p>+10% 同比上月</p>
								</div>
								<div class="left4">
									<p>本周销售总额</p>
									<p style="font-size: 30px;">50000</p>
									<p>-10% 同比上周</p>
								</div>
							</div>
							<div class="right">
								<!-- <img src="@/icons/svg/canvas.jpg" alt="" width="800"> -->
								<echarts></echarts>
							</div>
						</el-main>
					</el-container>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script setup>
	import echarts from "./echarts.vue"
</script>
<style scoped>
	.content_con{
		padding: 50px 100px;
		margin-bottom: 30px;
	}
	a {
		text-decoration: none;
		color: #409eff;
		font-size: 18px;
	}

	.el-row {
		margin-bottom: 20px;

		&:last-child {
			margin-bottom: 0;
		}
	}

	.el-col {}

	.el-header {
		color: #606266;
		padding: 15px 20px;
		background: #f2f6fc;
		font-weight: 700;
		text-align: start;
	}

	.bg-purple-dark {
		/* background: #99a9bf; */
	}

	.bg-purple {
		/* background: #d3dce6; */
	}

	.bg-purple-light {
		/* background: #e5e9f2; */
	}

	.grid-content {

		min-height: 36px;
		border: 1px solid #dcdfe6;
	}

	.row-bg {
		/* padding: 10px 0; */
		background-color: #f9fafc;
	}

	.el-row .el-col .table .el-main table {
		width: 100%;
	}

	.el-row .el-col .table .el-main table tr {
		height: 35px;
		line-height: 38px;
		width: 100%;
		display: flex;
		justify-content: space-between;
	}

	.el-row .el-col .table .el-main table tr td {
		display: flex;
		width: 30%;
		justify-content: space-between;
		border-bottom: 1px solid #ebeef5;
	}

	.el-row .el-col .table .el-main table tr td span:last-child {
		color: red;
	}
/* 订单统计左右两部分 */
	.left {
		width: 15%;
		text-align: start;
		border-right: 1px solid #96989c;
		float: left;

	}

	.left .left1 {
		height: 120px;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}

	.left .left1 p {
		margin: 0;
	}

	.right {
		float: right;
		width: 84%;
		padding: 20px 0;
	}
</style>