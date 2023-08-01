<template>
	<div>
		<div id="maychar"></div>
	</div>
</template>

<script lang="js">
	import {
		defineComponent,
		onMounted,
		inject
	} from "vue"; // 主要
	export default defineComponent({
		setup() {
			onMounted(() => {
				changetype();
			});
			// 通过inject方法引入了echarts库
			let echarts = inject("echarts"); // 主要
			// 折线图
			const changetype = () => {
				// 获取组件实例
				const machart = echarts.init(document.getElementById("maychar"));
				// 设置配置项
				const option = {
					backgroundColor: '#081736',
					grid: {
						top: '38%',
						left: '5%',
						bottom: '30%',
						right: '5%',
						containLabel: true
					},
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'none'
						},
					},
					dataZoom: [{
							show: true,
							realtime: true,
							start: 0,
							end: 100
						},
						{
							type: 'inside',
							realtime: true,
							start: 0,
							end: 100
						}
					],
					xAxis: [{
							type: 'category',
							show: false,
							data: ['小西关村', '谢家井社区', '城东社区', '石家庄村', '东环路社区', '大东关社区', '翟家寺村', '曹家村',
								'小东关社区', '杜家漕村', '庙坡村', '莲花池村', '五郎庙村', '廉家庄村', '栗子园村', '吕家村',
								'大草坝村',
								'博雅社区', '胥水村', '黄家村', '马家店村'
							],
							axisLabel: {
								textStyle: {
									color: '#fff'
								}
							}
						},
						{
							type: 'category',
							position: "bottom",
							data: ['小西关村', '谢家井社区', '城东社区', '石家庄村', '东环路社区', '大东关社区', '翟家寺村', '曹家村',
								'小东关社区', '杜家漕村', '庙坡村', '莲花池村', '五郎庙村', '廉家庄村', '栗子园村', '吕家村',
								'大草坝村',
								'博雅社区', '胥水村', '黄家村', '马家店村'
							],
							boundaryGap: true,
							// offset: 40,
							axisTick: {
								show: false
							},
							axisLine: {
								show: false
							},
							axisLabel: {
								textStyle: {
									color: '#fff'
								}
							}
						}
					],
					yAxis: [{
							show: true,
							type: 'value',
							name: "人",
							nameTextStyle: {
								color: "#fff",
								fontSize: 11,
							},
							//offset: 52,
							splitLine: {
								show: false,
								lineStyle: {
									color: "rgba(255,255,255,0.2)"
								}
							},
							axisTick: {
								show: false
							},
							axisLine: {
								show: false
							},
							axisLabel: {
								show: true,
								color: '#fff'
							}
						},
						{
							type: 'value',
							name: "人",
							min: 0,
							position: 'right',
							nameTextStyle: {
								color: "#fff",
								fontSize: 11,
							},
							axisLine: {
								lineStyle: {
									color: '#0a3e98'
								}
							},
							axisTick: {
								show: false,
							},
							splitLine: {
								show: true,
								lineStyle: {
									color: '#0a3e98',
									type: "dotted",
								}
							},
							axisLabel: {
								formatter: '{value}',
								textStyle: {
									color: "#fff",
								}
							},
						}
					],
					color: ['#e54035'],
					series: [{
							name: '参保人数',
							type: 'bar',
							yAxisIndex: 1,
							barWidth: 15,
							// barCategoryGap: '%',
							barGap: '2%', //柱子之间间距
							symbolOffset: [0, -6],
							// barCategoryGap: '-5%',
							symbol: 'path://d="M150 50 L130 130 L170 130  Z"',
							itemStyle: {
								normal: {
									color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
											offset: 0,
											color: "rgba(254,215,46,1)",
										},
										{
											offset: 1,
											color: "rgba(254,215,46,0)",
										},
									]),
									barBorderRadius: [30, 30, 0, 0] //圆角大小
								},
							},
							data: [586, 417, 47, 598, 249, 825, 785, 753, 394, 525, 988, 682, 830, 641,
								464, 745, 498, 1243, 630, 1267, 1062
							],
						},
						{
							name: '领取人数',
							type: 'line',
							xAxisIndex: 1,
							barCategoryGap: '50%',
							barGap: '20%', //柱子之间间距
							symbolOffset: [0, -6],
							// barCategoryGap: '-5%',
							symbol: 'path://d="M150 50 L130 130 L170 130  Z"',
							itemStyle: {
								normal: {
									color: '#7BE09A'
								},
								emphasis: {
									opacity: 1
								}
							},
							data: [224, 181, 1, 305, 97, 361, 303, 364, 214, 245, 417, 256, 344, 276,
								198, 341, 302, 525, 338, 554, 586
							],
						}
					],
				};
				// 复制 使用setOption方法设置了图表的配置项
				machart.setOption(option);
				// 根据页面大小自动响应图表大小 添加了一个窗口大小改变的事件监听器，当窗口大小改变时，调用resize方法重新渲染图表。这段代码的主要作用是配置echarts图表的显示效果，并且保证图表在窗口大小改变时能够自适应。
				window.addEventListener("resize", function() {
					machart.resize();
				});
			};
			return {
				changetype,
			};
		},
	});
</script>

<style scoped>
	#maychar {
		max-height: 500px;
		height: 500px;
	}
</style>