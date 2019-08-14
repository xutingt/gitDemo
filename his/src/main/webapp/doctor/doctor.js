Date.prototype.format = function(fmt) { 
     var o = { 
        "M+" : this.getMonth()+1,                 //月份 
        "d+" : this.getDate(),                    //日 
        "h+" : this.getHours(),                   //小时 
        "m+" : this.getMinutes(),                 //分 
        "s+" : this.getSeconds(),                 //秒 
        "q+" : Math.floor((this.getMonth()+3)/3), //季度 
        "S"  : this.getMilliseconds()             //毫秒 
    }; 
    if(/(y+)/.test(fmt)) {
            fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
    }
     for(var k in o) {
        if(new RegExp("("+ k +")").test(fmt)){
             fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
         }
     }
    return fmt; 
} 
function size(data){
	var size = 0;
	for(var i in data){
		size++;
	}
	return size;
}
$("#name").val(localStorage.uId);
$.post(basePath+"doc/user/getdeptid",{Id:localStorage.uId},function(data){
	localStorage.deptid=data;
});
	$(document).ready(function() {
		$('.layui-nav-item').eq(3).addClass("layui-nav-itemed");
		
		// 搜索患者病历号
		$("#ss").click(function(){
			if($("#ssk").val()==''){
				brwzhztb.reload({
					none: '暂无相关数据' //默认：无数据。注：该属性为 layui 2.2.5 开始新增
				})
				bryzhztb.reload({
					none: '暂无相关数据' //默认：无数据。注：该属性为 layui 2.2.5 开始新增
				})
				kswzhztb.reload({
					none: '暂无相关数据' //默认：无数据。注：该属性为 layui 2.2.5 开始新增
				})
				ksyzhztb.reload({
					none: '暂无相关数据' //默认：无数据。注：该属性为 layui 2.2.5 开始新增
				})
				return ;
			}
			var table = layui.table	;
			url1=basePath+"doc/register/getByIdYZ?casenumber="+$("#ssk").val()+"&userid="+localStorage.uId;
			var tableIns1 = table.render({
			  elem: '#bryzhz',
			  height: 200
			  ,cols:[[
				{field:'casenumber',  title: '病历号'}
				,{field:'realname',  title: '姓名'}
				,{field:'age',  title: '年龄'}
			  ]] //设置表头
			  ,url: url1 //设置异步接口
			  
			  ,page: false
			}); 
			 
			//这里以搜索为例
// 			tableIns1.reload({
// 			  text: {
// 				none: '暂无相关数据' //默认：无数据。注：该属性为 layui 2.2.5 开始新增
// 			  }
// 			});
			url2=basePath+"doc/register/getByIdWZ?casenumber="+$("#ssk").val()+"&userid="+localStorage.uId;
			var tableIns2 = table.render({
			  elem: '#brwzhz',
			  height: 200
			  ,cols:[[
				{field:'casenumber',  title: '病历号'}
				,{field:'realname',  title: '姓名'}
				,{field:'age',  title: '年龄'}
			  ]] //设置表头
			  ,url: url2 //设置异步接口
			  
			  ,page: false
			}); 
			//这里以搜索为例
// 			tableIns2.reload({
// 			  text: {
// 				none: '暂无相关数据' //默认：无数据。注：该属性为 layui 2.2.5 开始新增
// 			  }
// 			});
		})
		
		// 没有选择患者时的弹出框
		$("#caozuo").click(function(){
			if($("#huanzhexinxi").html()=='请选择患者'){
				
				layer.msg('请选择患者', {
				  icon: 2,
				  time: 1000 //2秒关闭（如果不配置，默认是3秒）
				});
			}
		})
		
		// 显示患者栏
		$("#show").click(function() {
			if ($("#show").html() == "隐藏患者栏") {
				$("#huanzhe").hide();
				$("#caozuo").attr("style", "width: 100%;margin-right:10px;")
				$("#show").html("显示患者栏");
			} else {
				$("#huanzhe").show();
				$("#caozuo").attr("style", "width: 70%;margin-right:10px;")
				$("#show").html("隐藏患者栏");
			}
		})
		
		// 点击处方选项卡隐藏患者栏
		$(".cfxxk").click(function(){
			$("#huanzhe").hide();
			$("#caozuo").attr("style", "width: 100%;margin-right:10px;")
			$("#show").html("显示患者栏");
		})
		
		// 门诊病历提交 
		$("#tj").click(function(){
			layer.confirm('提交后不可改变，是否提交?', {icon: 3, title:'提示'}, function(index){
				var $idsW = [];    //定义一个空数组
				var $idsC = []; 
				var $chkBoxesW = $('#Western').find('input:checked');   //找到被选中的checkbox集
				var $chkBoxesC = $('#Chinese').find('input:checked');
				if ($chkBoxesW.length == 0 && $chkBoxesC.length == 0) {         //如果不勾选弹出警告框
				  layer.alert('请至少选择一个诊断结果');
				  return false;
				}
				
				//遍历被选中的checkbox集
				$($chkBoxesW).each(function () { 
				  $idsW.push( $(this).attr('data-id') );   //找到对应checkbox中data-id属性值，然后push给空数组
				});
				$($chkBoxesC).each(function () { 
				  $idsC.push( $(this).attr('data-id') );
				});
				var $idsW_str = $idsW.join(',');              //将数组转化为用逗号隔开的字符串
				var $idsC_str = $idsC.join(',');
				//( 还有一种写法：var $ids_str += ','+($ids + '') ) ，Number型加上空字符串''可以将Number转化为字符串
	// 				console.log($idsW_str);                  // =>1,2
	// 				console.log($idsC_str);
				$.post(basePath+"doc/medicalrecord/update",{CaseNumber:$("#binglihao").html(),RegisterID:localStorage.RegisterID,Readme:$("#Readme").val(),Present:$("#Present").val(),History:$("#History").val(),Allergy:$("#Allergy").val(),Physique:$("#Physique").val(),Auxiliary:$("#Auxiliary").val(),Western:$idsW_str,Chinese:$idsC_str,Proposal:$("#Proposal").val(),Careful:$("#Careful").val()},function(data){
					if(data==1)	{	
						$("#ss").click();
						layer.msg('提交成功，1秒后自动返回', {
						  icon: 1,
						  time: 1000 //2秒关闭（如果不配置，默认是3秒）
						});							
					}else{
						layer.msg('提交失败，2秒后自动返回', {
						  icon: 1,
						  time: 1000 //2秒关闭（如果不配置，默认是3秒）
						});
					}
				});
				   
			  layer.close(index);
			});
			return;
				
		})
		// 门诊病历暂存 
		$("#zc").click(function(){

				var $idsW = [];    //定义一个空数组
				var $idsC = []; 
				var $chkBoxesW = $('#Western').find('input:checked');   //找到被选中的checkbox集
				var $chkBoxesC = $('#Chinese').find('input:checked');
				
				//遍历被选中的checkbox集
				$($chkBoxesW).each(function () { 
				  $idsW.push( $(this).attr('data-id') );   //找到对应checkbox中data-id属性值，然后push给空数组
				});
				$($chkBoxesC).each(function () { 
				  $idsC.push( $(this).attr('data-id') );
				});
				var $idsW_str = $idsW.join(',');              //将数组转化为用逗号隔开的字符串
				var $idsC_str = $idsC.join(',');

				$.post(basePath+"doc/medicalrecord/update",{CaseNumber:$("#binglihao").html(),RegisterID:localStorage.RegisterID,Readme:$("#Readme").val(),Present:$("#Present").val(),History:$("#History").val(),Allergy:$("#Allergy").val(),Physique:$("#Physique").val(),Auxiliary:$("#Auxiliary").val(),Western:$idsW_str,Chinese:$idsC_str,Proposal:$("#Proposal").val(),Careful:$("#Careful").val()},function(){
					
				});
				layer.msg('暂存成功，1秒后自动返回', {
				  icon: 1,
				  time: 1000 //2秒关闭（如果不配置，默认是3秒）
				});   
			  layer.close(index);
			});
			return;
				
		})
		
		// 门诊病历清空 
		$("#qk").click(function(){
			layer.confirm('是否全部清空?', {icon: 3, title:'提示'}, function(index){
			$("#Readme").val("");
			$("#Present").val("");
			$("#History").val("");
			$("#Allergy").val("");
			$("#Physique").val("");
			$("#Auxiliary").val("");
			// $("tbody").val("");
			$("#Proposal").val("");
			$("#Careful").val("");
			$("#Western tbody").html("");
			$("#Chinese tbody").html("");
			layer.msg('清空成功！', {
				  icon: 1,
				  time: 1000 //2秒关闭（如果不配置，默认是3秒）
				});   
			  // layer.close(index);
			});
			return;
		})
		// 删除表格
			$("#csc").click(function(){
				
				$("#Chinese input[name='test']:checked").each(function() { // 遍历选中的checkbox
				
					n = $(this).parents("tr").index()+1;  // 获取checkbox所在行的顺序
					$("#Chinese").find("tr:eq("+n+")").remove();
				});
			});
			$("#wsc").click(function(){
				
				$("#Western input[name='test']:checked").each(function() { // 遍历选中的checkbox
					
					n = $(this).parents("tr").index()+1;  // 获取checkbox所在行的顺序
					$("#Western").find("tr:eq("+n+")").remove();
				});
			});
			$("#jcsc").click(function(){
				
				$("#jiancha input[name='test']:checked").each(function() { // 遍历选中的checkbox
					
					n = $(this).parents("tr").index()+1;  // 获取checkbox所在行的顺序
					$("#jiancha").find("tr:eq("+n+")").remove();
				});
			});
			$("#jysc").click(function(){
				
				$("#jianyan input[name='test']:checked").each(function() { // 遍历选中的checkbox
					
					n = $(this).parents("tr").index()+1;  // 获取checkbox所在行的顺序
					$("#jianyan").find("tr:eq("+n+")").remove();
				});
			});
			$("#czsc").click(function(){
				
				$("#chuzhi input[name='test']:checked").each(function() { // 遍历选中的checkbox
					
					n = $(this).parents("tr").index()+1;  // 获取checkbox所在行的顺序
					$("#chuzhi").find("tr:eq("+n+")").remove();
				});
			});
		
		// 检查开立
		$("#jckl").click(function(){	
			var time1 = new Date().format("yyyy-MM-dd hh:mm:ss");
			$.post(basePath+"doc/checkapply/save",{Name:'检查',MedicalId:$("#mzblh").val(),CreationTime:time1,TotalSum:$("#total").html(),DelMark:'否'},function(data){
				var $idsW = [];    //定义一个空数组
				var $idsJ = [];
				var $idsJ_str='';
				var $chkBoxesW = $('#jiancha').find('input:checked');   //找到被选中的checkbox集
	
// 				console.log(JSON.stringify($chkBoxesW));
				//遍历被选中的checkbox集
				$($chkBoxesW).each(function () { 
				  $idsW.push( $(this).attr('data-id') );   //找到对应checkbox中data-id属性值，然后push给空数组
				});	
				var $idsW_str = $idsW.join('@');              //将数组转化为用逗号隔开的字符串
				
				console.log($idsW_str);                  // =>1,2
				
				var arr = $idsW_str.split("@");
				
				for(var i=0;i<arr.length;i++){
					var a = arr[i].split("%");
					// console.log(a[0]);
					var j = JSON.parse(a[0]);
					j[0].DeptId=a[1];
					j[0].YQ=a[2];
					j[0].State="未执行";
					j[0].CheckAppId=data;
					j[0].CreationTime=new Date().format("yyyy-MM-dd hh:mm:ss");
					var str = '{CheckAppId:"'+data+'",CheckProjId:"'+j[0].id+'",DeptId:"'+a[1]+'",CreationTime:"'+new Date().format("yyyy-MM-dd hh:mm:ss")+'",Position:"'+a[3]+'",Num:"1",Price:"'+j[0].price+'",State:"未执行",DelMark:"否",YQ:"'+a[2]+'"}';
					$idsJ.push(str);
					$idsJ_str = $idsJ.join('@');
				}
				$.post(basePath+"doc/checkdetailed/save",{data:$idsJ_str},function(data){
					if(data==1){
						layer.msg('开立成功！', {
						  icon: 1,
						  time: 1000 //2秒关闭（如果不配置，默认是3秒）
						});   
					}else{
						layer.msg('开立失败！', {
						  icon: 1,
						  time: 1000 //2秒关闭（如果不配置，默认是3秒）
						});   
						
					}
				})
				
			})
		})
		
		// 检验开立
		$("#jykl").click(function(){	
			var time1 = new Date().format("yyyy-MM-dd hh:mm:ss");
			$.post(basePath+"doc/checkapply/save",{Name:'检验',MedicalId:$("#mzblh").val(),CreationTime:time1,TotalSum:$("#total2").html(),DelMark:'否'},function(data){
				var $idsW = [];    //定义一个空数组
				var $idsJ = [];
				var $idsJ_str='';
				var $chkBoxesW = $('#jianyan').find('input:checked');   //找到被选中的checkbox集
	
// 				console.log(JSON.stringify($chkBoxesW));
				//遍历被选中的checkbox集
				$($chkBoxesW).each(function () { 
				  $idsW.push( $(this).attr('data-id') );   //找到对应checkbox中data-id属性值，然后push给空数组
				});	
				var $idsW_str = $idsW.join('@');              //将数组转化为用逗号隔开的字符串
				
				console.log($idsW_str);                  // =>1,2
				
				var arr = $idsW_str.split("@");
				
				for(var i=0;i<arr.length;i++){
					var a = arr[i].split("%");
					// console.log(a[0]);
					var j = JSON.parse(a[0]);
					j[0].DeptId=a[1];
					j[0].IsUrgent=a[2];
					j[0].State="未执行";
					j[0].CheckAppId=data;
					j[0].CreationTime=new Date().format("yyyy-MM-dd hh:mm:ss");
					var str = '{CheckAppId:"'+data+'",CheckProjId:"'+j[0].id+'",DeptId:"'+a[1]+'",CreationTime:"'+new Date().format("yyyy-MM-dd hh:mm:ss")+'",Price:"'+j[0].price+'",State:"未执行",DelMark:"否",IsUrgent:"'+a[2]+'"}';
					console.log(str);
					$idsJ.push(str);
					$idsJ_str = $idsJ.join('@');
				}
				$.post(basePath+"doc/checkdetailed/save",{data:$idsJ_str},function(data){
					if(data==1){
						layer.msg('开立成功！', {
						  icon: 1,
						  time: 1000 //2秒关闭（如果不配置，默认是3秒）
						});   
					}else{
						layer.msg('开立失败！', {
						  icon: 1,
						  time: 1000 //2秒关闭（如果不配置，默认是3秒）
						});   
						
					}
				})
				
			})
		})
		
		// 处置开立
		$("#czkl").click(function(){	
			var time1 = new Date().format("yyyy-MM-dd hh:mm:ss");
			$.post(basePath+"doc/checkapply/save",{Name:'处置',MedicalId:$("#mzblh").val(),CreationTime:time1,TotalSum:$("#total3").html(),DelMark:'否'},function(data){
				var $idsW = [];    //定义一个空数组
				var $idsJ = [];
				var $idsJ_str='';
				var $chkBoxesW = $('#chuzhi').find('input:checked');   //找到被选中的checkbox集
	
// 				console.log(JSON.stringify($chkBoxesW));
				//遍历被选中的checkbox集
				$($chkBoxesW).each(function () { 
				  $idsW.push( $(this).attr('data-id') );   //找到对应checkbox中data-id属性值，然后push给空数组
				});	
				var $idsW_str = $idsW.join('@');              //将数组转化为用逗号隔开的字符串
				
				console.log($idsW_str);                  // =>1,2
				
				var arr = $idsW_str.split("@");
				
				for(var i=0;i<arr.length;i++){
					var a = arr[i].split("%");
					// console.log(a[0]);
					var j = JSON.parse(a[0]);
					j[0].DeptId=a[1];
					j[0].IsUrgent=a[2];
					j[0].State="未执行";
					j[0].CheckAppId=data;
					j[0].CreationTime=new Date().format("yyyy-MM-dd hh:mm:ss");
					var str = '{CheckAppId:"'+data+'",CheckProjId:"'+j[0].id+'",DeptId:"'+a[1]+'",CreationTime:"'+new Date().format("yyyy-MM-dd hh:mm:ss")+'",Price:"'+j[0].price+'",State:"未执行",DelMark:"否",IsUrgent:"'+a[2]+'"}';
					console.log(str);
					$idsJ.push(str);
					$idsJ_str = $idsJ.join('@');
				}
				$.post(basePath+"doc/checkdetailed/save",{data:$idsJ_str},function(data){
					if(data==1){
						layer.msg('开立成功！', {
						  icon: 1,
						  time: 1000 //2秒关闭（如果不配置，默认是3秒）
						});   
					}else{
						layer.msg('开立失败！', {
						  icon: 1,
						  time: 1000 //2秒关闭（如果不配置，默认是3秒）
						});   
						
					}
				})
				
			})
		})
				
		// 门诊确诊
		$("#mzbc").click(function(){
			alert($("#mzjc").val());
			alert($("#mzzd").val());
			alert($("#mzyj").val());
			alert($("#mzblh").val());
			$.post(basePath+"doc/medicalrecord/update",{CheckResult:$("#mzjc").val(),Diagnosis:$("#mzzd").val(),Handling:$("#mzyj").val(),CaseNumber:$("#mzblh").val()},function(data){
				alert(data);
			})
		})
	
		//新增处方
		$("#xzcf").click(function(){
			
			var index=1;
			$("#ypcf input[name='test']").each(function() { // 遍历选中的checkbox
			
				  // 获取checkbox所在行的顺序
				index++;
				
			});
			$("#yaopin tbody").html("");
			$.post(basePath+"doc/prescription/save",{medicalId:$("#mzblh").val(),userId:localStorage.uId},function(data){
				$("#ypcf tbody").append("<tr><th><input type='radio' checked name='test'/></th><td id ='cf"+index+"' data-id=''>新增处方"+index+"</td><td class='state'>新增</td></tr>");				
				$("#cf"+index+"").attr("data-id",data);
				$("#zysy").attr("style","display:flex");
				$("#cfmc").html("新增处方"+index);
				$("#cfmc").attr("data-id",data);
				$("#cf"+index+"").parent().on("click",function(){
					var id= $(this).find("td:eq(0)").attr("data-id");  //获取当前处方id
					var name= $(this).find("td:eq(0)").html();
					$("#cfmc").html(name);
					$("#cfmc").attr("data-id",id);
				})
			});
				
		})
		
		//发送处方
		$("#fscf").click(function(){
			var time1 = new Date().format("yyyy-MM-dd hh:mm:ss");
			$.post(basePath+"doc/prescription/update",{id:$("#cfmc").attr('data-id'),prescriptionName:$("#cfmc").html(),prescriptionState:'开立',prescriptionTime:time1,state:'',delMark:'否'},function(data){
				$("#ypcf input:checked").parents('tr').find('.state').html("已发送");

					var $idsW = [];    //定义一个空数组
					var $idsJ = [];
					var $idsJ_str='';
					var $chkBoxesW = $('#yaopin').find('input:checked');   //找到被选中的checkbox集
					console.log(JSON.stringify($chkBoxesW));

// 				console.log(JSON.stringify($chkBoxesW));
				//遍历被选中的checkbox集
				$($chkBoxesW).each(function () { 
				  $idsW.push( $(this).attr('data-id') );   //找到对应checkbox中data-id属性值，然后push给空数组
				});	
				var $idsW_str = $idsW.join('@');              //将数组转化为用逗号隔开的字符串
				
				console.log($idsW_str);                  // =>1,2
				
				var arr = $idsW_str.split("@");
				for(var i=0;i<arr.length;i++){
					var a = arr[i].split("%");
					// console.log(a[0]);
					var j = JSON.parse(a[0]);
					var str = '{prescriptionId:"'+$("#cfmc").attr("data-id")+'",drugsId:"'+j[0].drugsCode+'",usageDosage:"'+a[1]+'",frequency:"'+a[2]+'",num:"'+a[3]+'",days:"'+a[4]+'",explains:"'+a[5]+'"}';
					
					console.log(str);
					$idsJ.push(str);
					$idsJ_str = $idsJ.join('@');
				}

				$.post(basePath+"doc/prescriptiondetailed/save",{data:$idsJ_str},function(data){
					if(data==1){
						
						layer.msg('发送成功！', {
						  icon: 1,
						  time: 1000 //2秒关闭（如果不配置，默认是3秒）
						});   
					}else{
						layer.msg('发送失败！', {
						  icon: 1,
						  time: 1000 //2秒关闭（如果不配置，默认是3秒）
						});   
						
					}
				})
			})
		});
		
		layui.use('table', function(){
			var table = layui.table;
			table.on('row(ypcf)', function(obj){
				alert();
			});
		});

	// _header头部区域
	$("#header").load("../conmmon/_header.html");
	//_lefter 左侧导航区域
	$("#lefter").load("../conmmon/_lefter.html");
	//_footer 底部区域
	//$("#footer").load("/conmmon/_footer.html");

	//JavaScript代码区域
	layui.use('element', function(){
		var element = layui.element;
	});



<!-- 患者列表 -->

	layui.use('table', function(){
		var table = layui.table;
		// 本人未诊
		brwzhztb = table.render({
			elem: '#brwzhz'
			,url:basePath+'doc/register/get?diagnosestate=未诊&userid='+localStorage.uId,
			height: 200
			// ,toolbar: '#toolbarDemo'
			,cols: [[
			  {field:'casenumber',  title: '病历号'}
			  ,{field:'realname',  title: '姓名'}
			  ,{field:'age',  title: '年龄'}
			  
			]]
			,page: false,
			text: {
				none: '暂无相关数据' //默认：无数据。注：该属性为 layui 2.2.5 开始新增
			}
		  });
		// 本人已诊	
		bryzhztb = table.render({
			  elem: '#bryzhz'
			  ,url:basePath+'doc/register/get?diagnosestate=已诊&userid='+localStorage.uId,
			height: 200
			  // ,toolbar: '#toolbarDemo'
			  ,cols: [[
				{field:'casenumber',  title: '病历号'}
				,{field:'realname',  title: '姓名'}
				,{field:'age',  title: '年龄'}
				
			  ]]
			  ,page: false,
			text: {
				none: '暂无相关数据' //默认：无数据。注：该属性为 layui 2.2.5 开始新增
			}
			});
		// 科室未诊
		kswzhztb = table.render({
			elem: '#kswzhz'
			,url:basePath+'doc/register/get?diagnosestate=未诊&deptid='+localStorage.deptid,
			height: 200
			// ,toolbar: '#toolbarDemo'
			,cols: [[
			  {field:'casenumber',  title: '病历号'}
			  ,{field:'realname',  title: '姓名'}
			  ,{field:'age',  title: '年龄'}
			  
			]]
			,page: false,
			text: {
				none: '暂无相关数据' //默认：无数据。注：该属性为 layui 2.2.5 开始新增
			}
		  });
		// 科室已诊	
		ksyzhztb =table.render({
			elem: '#ksyzhz'
			,url:basePath+'doc/register/get?diagnosestate=已诊&deptid='+localStorage.deptid
			,height: 200
			,cols: [[
			{field:'casenumber',  title: '病历号'}
			,{field:'realname',  title: '姓名'}
			,{field:'age',  title: '年龄'}	
			]]
			,page: false,
			text: {
				none: '暂无相关数据' //默认：无数据。注：该属性为 layui 2.2.5 开始新增
			}
		});

		// 获取当前行数据
		table.on('row(test)', function(obj){
	  		var data = obj.data;
			var sex = '男';
			if(data.gender!='男'){
				sex = '女';
			}	
			$("#huanzhexinxi").html('病历号:<span id = "binglihao">'+data.casenumber+'</span>；患者姓名:'+data.realname+'；年龄:'+data.age+'；性别:'+sex);
	  		localStorage.RegisterID=data.id;
			$("#mzblh").val(data.casenumber);
			$("#mzxm").val(data.realname);
			$("#mzxb").val(data.gender);
			$("#mznl").val(data.age);
			//载入病历信息
			$("#Western tbody").html("");
			$("#Chinese tbody").html("");
			$.post(basePath+"doc/medicalrecord/load",{CaseNumber:data.casenumber},function(data){
				if(data!=''&& data!='null'){
					var j = JSON.parse(data);
					$("#Readme").val(j.Readme);
					$("#Present").val(j.Present);
					$("#History").val(j.History);
					$("#Allergy").val(j.Allergy);
					$("#Physique").val(j.Physique);
					$("#Auxiliary").val(j.Auxiliary);
					// $("tbody").val(j.tbody);
					$("#Proposal").val(j.Proposal);
					$("#Careful").val(j.Careful);
	// 				$("#Western tbody").html(j.);
					if(j.Western!=''){
						var wid = j.Western.split(",");
						for(var i=0;i<wid.length;i++){
							$.post(basePath+"doc/disease/findById",{Id:wid[i]},function(data){
								var j = JSON.parse(data);
								$("#Western tbody").append("<tr><th><input type='checkbox' checked name='test' data-id='"+j.Id+"'/></th><th>"+j.DiseaseICD+"</th><th>"+j.DiseaseName+"</th><th></th></tr>")
							})
						}
					}
					
					if(j.Chinese!=''){
						var cid = j.Chinese.split(",");
						for(var i=0;i<cid.length;i++){
							$.post(basePath+"doc/disease/findById",{Id:cid[i]},function(data){
								var j = JSON.parse(data);
								$("#Chinese tbody").append("<tr><th><input type='checkbox' checked name='test' data-id='"+j.Id+"'/></th><th>"+j.DiseaseICD+"</th><th>"+j.DiseaseName+"</th><th></th></tr>")
							})
						}
					}
					$("#mzjc").html(j.CheckResult);
					$("#mzzd").html(j.Diagnosis);
					$("#mzyj").html(j.Handling);
					
				

// 				$("#Chinese tbody").html(j.);
				}
			});
			//载入检查检验处置信息
			$("#jiancha tbody").html("");
			$("#jianyan tbody").html("");
			$("#chuzhi tbody").html("");
	  		$.post(basePath+"doc/checkdetailed/get",{MedicalId:data.casenumber},function(data){

				var j = JSON.parse(data);
				var jctotal=0;
				var jytotal=0;
				var cztotal=0;
				// console.log(size(j));
				for(var i=0;i<size(j);i++){
					switch(j[i].type){
						case("检查"):
							$("#jiancha tbody").append("<tr><th><input type='checkbox' checked name='test' data-id='待定'/></th><th>"+j[i].codes+"</th><th>"+j[i].name+"</th><th>"+j[i].DeptId+"</th><th>"+j[i].State+"</th><th class='price'>"+j[i].Price+"</th><th><button data-method='offset' data-type='auto' data-href='JieGuo.html?JieGuo="+j[i].Result+"' style='background-color:#4AB2FF;' class='layui-btn layui-btn-sm tanchu'><span style='font-size: 12px;color: white;'>查看</span></button></th></tr>");
							jctotal = jctotal+Number(j[i].Price);
							break;
						case("检验"):
							$("#jianyan tbody").append("<tr><th><input type='checkbox' checked name='test' data-id='待定'/></th><th>"+j[i].codes+"</th><th>"+j[i].name+"</th><th>"+j[i].DeptId+"</th><th>"+j[i].IsUrgent+"</th><th>"+j[i].State+"</th><th class='price'>"+j[i].Price+"</th><th><button data-method='offset' data-type='auto' data-href='JieGuo.html?JieGuo="+j[i].Result+"' style='background-color:#4AB2FF;' class='layui-btn layui-btn-sm tanchu'><span style='font-size: 12px;color: white;'>查看</span></button></th></tr>");
							jytotal = jytotal+Number(j[i].Price);
							break;
						case("处置"):
							$("#chuzhi tbody").append("<tr><th><input type='checkbox' checked name='test' data-id='待定'/></th><th>"+j[i].codes+"</th><th>"+j[i].name+"</th><th>"+j[i].DeptId+"</th><th>"+j[i].IsUrgent+"</th><th>"+j[i].State+"</th><th class='price'>"+j[i].Price+"</th><th><button data-method='offset' data-type='auto' data-href='JieGuo.html?JieGuo="+j[i].Result+"' style='background-color:#4AB2FF;' class='layui-btn layui-btn-sm tanchu'><span style='font-size: 12px;color: white;'>查看</span></button></th></tr>");
							cztotal = cztotal+Number(j[i].Price);
							break;
					}
					$('.tanchu').on('click', function(){
						  console.log("asd");
						var othis = $(this), method = othis.data('method');
						active[method] ? active[method].call(this, othis) : '';
					});
					console.log(JSON.stringify(j[i]));
				}
				$("#total").html(jctotal);
				$("#total2").html(jytotal);
				$("#total3").html(cztotal);
			});
			
			//标注选中样式
			obj.tr.addClass('layui-table-click').siblings().removeClass('layui-table-click');
			
		}); 
	});

<!-- 弹出新增页面 -->
	var jcsum=0;
	var jysum=0;
	var czsum=0;
	var ypsum=0;
	
	layui.use('layer', function(){ 
	  var $ = layui.jquery, layer = layui.layer; 
	  
	  //触发事件
	  active = {

		offset: function(othis){
		  var type = othis.data('type')
		  var href = othis.data('href')
		  text = othis.text();
		  
		  layer.open({
			type: 2
// 			,offset: type //具体配置参考：http://www.layui.com/doc/modules/layer.html#offset
			,id: 'layerDemo' //防止重复弹出
			,title: false
			,content: [href,'no']
			,area: ['550px', '560px']
			
			,btnAlign: 'c' //按钮居中
			,shade: 0.5 //不显示遮罩
			,end:function(){
				// console.log(localStorage.jibing);
				var kind = localStorage.kind;
				switch (kind){
					case "Western":
						var j = JSON.parse(localStorage.jibing);
						var kind = localStorage.kind;
						// console.log(j[0].Id);
						if(j.length=="0"){
							layer.alert("添加失败，请重新添加")
							return;
						}
						$("#"+kind+" tbody").append("<tr><th><input type='checkbox' checked name='test' data-id='"+j[0].Id+"'/></th><th>"+j[0].DiseaseICD+"</th><th>"+j[0].DiseaseName+"</th><th></th></tr>")
						localStorage.jibing="";
						break;
					case "Chinese":
						var j = JSON.parse(localStorage.jibing);
						var kind = localStorage.kind;
						// console.log(j[0].Id);
						if(j.length=="0"){
							layer.alert("添加失败，请重新添加")
							return;
						}
						$("#"+kind+" tbody").append("<tr><th><input type='checkbox' checked name='test' data-id='"+j[0].Id+"'/></th><th>"+j[0].DiseaseICD+"</th><th>"+j[0].DiseaseName+"</th><th></th></tr>")
						localStorage.jibing="";
						break;
					case "jiancha":
						var s = localStorage.jiancha;
						var arr = s.split("%");
						var j = JSON.parse(arr[0]);
						
						console.log(j);
						var ks = arr[1];
						var yq = arr[2];
						var kind = localStorage.kind;
						if(j.length=="0"){
							layer.alert("添加失败，请重新添加")
							return;
						}
						$("#"+kind+" tbody").append("<tr><th><input type='checkbox' checked name='test' data-id='"+s+"'/></th><th>"+j[0].codes+"</th><th>"+j[0].name+"</th><th>"+ks+"</th><th>新增</th><th class='price'>"+j[0].price+"</th><th>查看</th></tr>");
						jcsum=Number((Number(jcsum)+Number(j[0].price)).toFixed(2));
						$("#total").html(jcsum);
						console.log("kind"+kind);
						console.log("j"+j[0].code);
						console.log("ks"+ks);
						console.log("yq"+yq);
						localStorage.jiancha="";
						break;
					case "jianyan":
						var s = localStorage.jianyan;
						var arr = s.split("%");
						var j = JSON.parse(arr[0]);
						console.log(j);
						var ks = arr[1];
						var jj = arr[2];
						var kind = localStorage.kind;
						if(j.length=="0"){
							layer.alert("添加失败，请重新添加")
							return;
						}
						$("#"+kind+" tbody").append("<tr><th><input type='checkbox' checked name='test' data-id='"+s+"'/></th><th>"+j[0].codes+"</th><th>"+j[0].name+"</th><th>"+ks+"</th><th>"+jj+"</th><th>新增</th><th class='price'>"+j[0].price+"</th><th>查看</th></tr>");
						jysum=Number((Number(jysum)+Number(j[0].price)).toFixed(2));
						
						$("#total2").html(jysum);
						console.log("kind"+kind);
						console.log("j"+j[0].code);
						console.log("ks"+ks);
						console.log("jj"+jj);
						localStorage.jianyan="";
						break;
					case "chuzhi":
						var s = localStorage.chuzhi;
						var arr = s.split("%");
						var j = JSON.parse(arr[0]);
						console.log(j);
						var ks = arr[1];
						var jj = arr[2];
						var kind = localStorage.kind;
						if(j.length=="0"){
							layer.alert("添加失败，请重新添加")
							return;
						}
						$("#"+kind+" tbody").append("<tr><th><input type='checkbox' checked name='test' data-id='"+s+"'/></th><th>"+j[0].codes+"</th><th>"+j[0].name+"</th><th>"+ks+"</th><th>"+jj+"</th><th>新增</th><th class='price'>"+j[0].price+"</th><th>查看</th></tr>");
						czsum=Number((Number(czsum)+Number(j[0].price)).toFixed(2));
						$("#total3").html(czsum);
						console.log("kind"+kind);
						console.log("j"+j[0].code);
						console.log("ks"+ks);
						console.log("jj"+jj);
						localStorage.chuzhi="";
						break;
					case "yaopin":
						var s = localStorage.yaopin;
						var arr = s.split("%");
						var j = JSON.parse(arr[0]);
						console.log(j);
						var yp = j[0];
						// console.log(yp[0].dosage);
// 						var jj = arr[2];
						var kind = localStorage.kind;
						if(j.length=="0"){
							layer.alert("添加失败，请重新添加")
							return;
						}
						$("#"+kind+" tbody").append("<tr><th><input type='checkbox' checked name='test' data-id='"+s+"'/></th><th>"+yp.drugsName+"</th><th>"+yp.specifications+"</th><th>"+yp.drugsPrice+"</th><th>"+arr[1]+"</th><th>"+arr[2]+"</th><th>"+arr[3]+"</th><th>"+arr[4]+"</th><th>"+arr[5]+"</th><th>查看</th></tr>");
// 						console.log(Number(Number(ypsum).toFixed(2)));
// 						console.log(Number(Number(j[0].drugsPrice).toFixed(2)));
						ypsum=Number((Number(ypsum)+Number(yp.drugsPrice)).toFixed(2));
						$("#total4").html(ypsum);
						console.log("kind"+kind);
						console.log("j"+j[0].code);
						console.log("ks"+ks);
						console.log("jj"+jj);
						localStorage.yaopin="";
						break;
					default:
						
						break;
				}
				localStorage.kind="";
				
				 $('.tanchu').on('click', function(){
						  console.log("asd");
						var othis = $(this), method = othis.data('method');
						active[method] ? active[method].call(this, othis) : '';
				});
			}
		})
	  }};		  
	  $('.tanchu').on('click', function(){
		  console.log("asd");
		var othis = $(this), method = othis.data('method');
		active[method] ? active[method].call(this, othis) : '';
	  });
	  
	});
	