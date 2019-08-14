layui.use(['form', 'layedit', 'laydate', 'layer', 'laypage', 'table'], function () {
    var deptId, registType;
    var form = layui.form
        , layedit = layui.layedit
        , laydate = layui.laydate
        , layer = layui.layer
        , table = layui.table;
    //挂号详情分页
    table.render({
        elem: '#regist-list-body-details'
        , url: basePath + 'registration/regist/listRegister'
        , cols: [[
            { field: 'caseNumber', width: 80, title: '病历号' }
            , { field: 'realName', width: 80, title: '患者姓名' }
            , { field: 'gender', width: 80, title: '患者性别' }
            , { field: 'idNumber', width: 80, title: '身份证号' }
            , { field: 'birthDate', width: 80, title: '出生日期' }
            , { field: 'age', width: 80, title: '年龄' }
            , { field: 'address', width: 80, title: '家庭住址' }
            , { field: 'visitDate', width: 80, title: '看诊日期' }
            , { field: 'deptId', width: 80, title: '看诊科室' }
            , { field: 'userId', width: 80, title: '看诊医师' }
            , { field: 'registType', width: 80, title: '挂号级别' }
            , { field: 'visitState', width: 80, title: '挂号状态' }
            , { field: 'diagnoseState', width: 80, title: '看诊状态' }
            , { field: 'totalCost', width: 80, title: '挂号消费' }
        ]]
        , page: true
    });

    //     }
    // });
    //日期
    laydate.render({
    	elem: '#date',
    	type:'datetime'
    });
    //出生年月
//    laydate.render({
//        elem: '#patientBirthDate'
//    });
    /* 科室类别 */
    form.on('select(deptType)', function (s) {
    	var deptCategoryID = $("#deptType").select().val();
    	if(deptCategoryID == '' ){
    		alert("deptCategoryID为空")
    	}else{
            //清空二级内容
            $('#deptTypeClass').html("");
            $.ajax({
                type: "post",
                url: "/his/registration/getDeptTypeClass.do",
                data: { 'deptCategoryID': $("#deptType").select().val()},
                dataType: "json",
                success: function (data) {
                    $('#deptTypeClass').append(
                        "<option value=''>请选择</option>"
                    );
                    for(var i = 0; i < data.length; i++){
        				var h = "<option value='" + data[i].id + "'>" + data[i].deptName + "</option>";
        				$("#deptTypeClass").append(h);
        			}
                    form.render('select');
                }
            });
    		
    		
    	}

    });
    /* 获取科室类别 */
    form.on('select(deptTypeClass)', function (s) {
        deptId = s.value;

    });
    /* 获取看诊医生
    form.on('select(registType)', function (s) {
    	

    });
*/
    //待解决NaN

/*    var caseBookCost;
    $.ajax({
        type: "post",
        url: basePath + "registration/registType/getRegistTypeCost",
        data: { "id": 3 },
        dataType: "json",
        success: function (response) {
            console.log(response);
            caseBookCost = Number(response);
            console.log(caseBookCost);
        }
    });
*/    
    form.on('checkbox(caseBook)', function (data) {
  //  	alert("病例本")
        var cost = parseFloat($('#registCost').val());
        if (cost != 0) {
            if (data.elem.checked) {
                $('#caseBook').val("1");
                cost = cost+1;
                
            } else {
                $('#caseBook').val("0");
                cost = cost-1;
//                if(isNaN(cost)){
//                	cost = 0;
//                }
            }
        }else{
        	cost = 1;
        }
        $('#registCost').val(cost);
    });
    form.on('select(registType)', function (data) {
 //   	alert('select(registType)获取挂号费用')
    	/* 获取挂号费用 */
    	var registTypeID = $("#registType").select().val();
//    	alert(registTypeID)
        $.ajax({
            type: "post",
            url: "/his/registration/getRegistFee.do",
            data: { 'registTypeID': registTypeID },
            dataType: "json",
            success: function (data) {
            	var cost = parseFloat($('#registCost').val());
                if (cost == 0 || !$('#caseBook').prop("checked")) {
                	cost = data;
                } else if(cost == 1 || $('#caseBook').prop("checked")){
                	cost = data+1;
                }
                $('#registCost').val(cost);
            }
        });
//    	alert('select(registType)获取看诊医生')

        /* 获取看诊医生 */
        $("#diagnoseDoctor").html(
                "<option value=''>请选择</option>"
            );
        $.ajax({
            type: "post",
            url: "/his/registration/selectDoc.do",
            data: { "SchedDate":$("#date").val(),"Noon":$("#Noon").select().val(),"RegistLeID":$("#registType").select().val(),"DeptID": $('#deptTypeClass').select().val()},
            dataType: "json",
            success: function (data) {
            	for(var i =0; i < data.length; i++ ){
            		$('#diagnoseDoctor').append(
                            "<option value='" + data[i].id + "'>" + data[i].realName + "</option>"
                        );
            	}
                form.render('select'); 
            }
        });
    });
   
});
$(document).ready(function () {
    //挂号费用
    var registCost;
    /* 生成病历号 */
    function generateCase() {
        return new Date().getTime();
    }
    /* 生成发票号 */
    function generateInvoice(){
        return "i"+generateCase();
    }
    /* dateFormart */
    function myDateFormat(k) {
        var k1 = k.substr(0, 4);
        var k2 = k.substr(4, 2);
        var k3 = k.substr(6, 2);
        return k1 + "-" + k2 + "-" + k3;
    }
    /* 生日年龄换算 */
    function birthToAge(birth) {
//    	alert("生日年龄换算");
        var now = new Date().getTime();
        var birth = new Date(birth.replace(/-/g, '/')).getTime();
        var age = (now - birth) / (1000 * 3600 * 24 * 365);
        return Math.floor(age);
    }
    /* 获取看诊日期 */
    function getCurrentTime(){
    	var str;
    	$.ajax({
            type: "post",
            url: "/his/registration/getCurrentTime.do",
            data: {},
            dataType: "text",
            success: function (data) {
            	var d = new Date()
            	d.setTime(data);
            	str=d.getFullYear() +"-" +(d.getMonth()+1)+ "-" + d.getDate() + " "+d.getHours() +":" + d.getMinutes()+ ":" + d.getSeconds();
            	$('#date').val(str);
                $('#date').attr('readonly', true);
            }
    	});
    }
    /* 判断看诊午别 */
    function getNoon(){
    	var str;
    	$.ajax({
            type: "post", 
            url: "/his/registration/getCurrentTime.do",
            data: {},
            dataType: "text",
            success: function (data) {
            	var d = new Date()
            	d.setTime(data);
 //           	alert("d.getHours()"+d.getHours())
            	if(d.getHours() <= 12){
            		str = "上午";
                	$('#Noon').val(str);
                	$('#Noon').attr('readonly', true);
            	}else{
            		str = "下午";
                	$('#Noon').val(str);
                	$('#Noon').attr('readonly', true);
            	}
            }
    	});
    }
    /* 身份扫描 */
    $('#identifierScan').click(function () {
        $.ajax({
            type: "post",
            url: "http://localhost:8080/get",
            data: {},
            dataType: "json",
            success: function (response) {
                console.log("身份扫描");
                $('#patientCaseNumber').val(generateCase());
                $('#patientCaseNumber').attr('readonly', true);
                $('#patientName').val(response.name);
                $('#patientName').attr('readonly', true);
                //$('#patientGender').val(response.gender);
                if (response.gender === "男") {
                    //$('#patientGender').find('option').eq(2).click();
                    $('.clear-select').find("select").siblings("div.layui-form-select").find('[lay-value="男"]').click();
                } else {
                    //$('#patientGender').find('option').eq(2).click();
                    $('.clear-select').find("select").siblings("div.layui-form-select").find('[lay-value="女"]').click();
                }
                $('#patientGender').attr('readonly', true);
                $('#patientBirthDate').val(myDateFormat(response.birthday));
                $('#patientBirthDate').attr('readonly', true);
                $('#patientAge').val(birthToAge(myDateFormat(response.birthday)));
                $('#patientAge').attr('readonly', true);
                $('#patientIdNumber').val(response.code);
                $('#patientIdNumber').attr('readonly', true);
                $('#patientAddress').val(response.address);
                $('#patientAddress').attr('readonly', true);
                $('#registInvoice').val(generateInvoice());
                $('#registInvoice').attr('readonly', true);
                layui.use('form', function () {  //此段代码必不可少
                    var form = layui.form;
                    form.render("select");
                });
            }
        });
    });
    /* 清空函数 */
    function clearAll() {
        $('#patientCaseNumber').val("");
        $('#patientCaseNumber').attr('readonly', true);
        $('#patientName').val("");
        $('#patientName').attr('readonly', false);
        $('#patientGender').val("");
        $('#patientGender').attr('readonly', false);
        $('#patientBirthDate').val("");
        $('#patientBirthDate').attr('readonly', false);
        $('#patientAge').val("");
        $('#patientAge').attr('readonly', false);
        $('#patientIdNumber').val("");
        $('#patientIdNumber').attr('readonly', false);
        $('#patientAddress').val("");
        $('#patientAddress').attr('readonly', false);
        $('#date').val("");
        //选择select的第一项
        $('.clear-select').find("select").siblings("div.layui-form-select").find("dd:first").click();
        $('#registCost').val(0);
        //$('#caseBook').prop('checked',false);
        //layui.form.render();
        //$('div.laytable-cell-checkbox').find('div.layui-form-checked').click();
        //layui.form.render('checkbox');
        //$('#caseBook').data.elem.checked = 'false';
        // layui.use(['form', 'layer'], function () {
        //     var form = layui.form
        //     if ($('#caseBook').attr("checked") === "checked") { //判断是否选中
        //         $('#caseBook').prop("checked", false); //设置选中 注意这里使用的是prop(), 这里要是使用了attr()是无效的
        //     }
        //     form.render('checkbox');
        // });
        //console.log($('#caseBook').checked);
        //清空layui checkbox的选中状态
        layui.use('form', function () {  //此段代码必不可少
            var form = layui.form;
            $('#caseBook').prop("checked", false);
            form.render("checkbox");
        });
    }
    /* 创建病例 */
    $('#createCaseRegist').click(function (e) {
        e.preventDefault();
        $("#patientCaseNumber").val(generateCase());
        $('#patientCaseNumber').attr('readonly', true);
        $('#registInvoice').val(generateInvoice());
        $('#registInvoice').attr('readonly', true);
        getCurrentTime();
    	getNoon();
    });
    /* 病例搜索 */
    // $('#caseSearch').click(function (e) {
    //     e.preventDefault();
    //     $.ajax({
    //         type: "post",
    //         url: "http://localhost:8080/his/registration/regist/findRegisterByCaseName",
    //         data: { 'caseNumber': $('#case_number_input').val() },
    //         dataType: "json",
    //         success: function (response) {
    //             console.log(response);
    //             $('#patientCaseNumber').val(response.caseNumber);
    //             $('#patientCaseNumber').attr('readonly', true);
    //             $('#patientName').val(response.realName);
    //             $('#patientName').attr('readonly', true);
    //             $('#patientGender').val(response.gender);
    //             $('#patientGender').attr('readonly', true);
    //             $('#patientBirthDate').val(response.birthDate);
    //             $('#patientBirthDate').attr('readonly', true);
    //             $('#patientAge').val(response.age);
    //             $('#patientAge').attr('readonly', true);
    //             $('#patientIdNumber').val(response.idNumber);
    //             $('#patientIdNumber').attr('readonly', true);
    //             $('#patientAddress').val(response.address);
    //             $('#patientAddress').attr('readonly', true);
    //         }
    //     });
    // });
    /* 科室分类 */
    $.ajax({
        type: "post",
        url: "/his/registration/getDeptType.do",
        data: {},
        dataType: "json",
        success: function (data) {
            $('#deptType').append(
                "<option id='type_select' value=''>请选择</option>"
            );
        	for(var i = 0; i < data.length; i++){
				var h = "<option value='" + data[i].id + "'>" + data[i].constantName + "</option>";
				$("#deptType").append(h);
			}
            
/*            layui.use('form', function () {  //此段代码必不可少
                var form = layui.form;
                form.render();
            });
 */           
        }
    });
    /* 挂号类型 */
    $.ajax({
        type: "post",
        url: "/his/registration/getRegistType.do",
        data: {},
        dataType: "json",
        success: function (data) {
            $('#registType').html("");
            $('#registType').append(
                "<option value=''>请选择</option>"
            );
            for(var i = 0; i < data.length; i++){
				var h = "<option value='" + data[i].id + "'>" + data[i].registName + "</option>";
				$("#registType").append(h);
			}
        }
    });
    /*根据出生日期计算年龄*/
    
    $('#patientBirthDate').blur(function(){
 //   	alert("开始执行计算日期")
    	var birthday = $('#patientBirthDate').val();
//    	alert(birthday)
    	if(birthday == null || birthday == ''){
    		alert("生日不能为空");
    	}else{
//    		alert("else");
    		var age = birthToAge(birthday);
 //   		alert(age);
    		$('#patientAge').val(age);
    	}
    });
    
    
    
    /* 清空 */
    $('#clearRegistration').click(function () {
        clearAll();
    });
    /* 挂号确认 */
    var registSwitch = 0;
    $('#confirmRegistration').click(function () {
        //避免连续点击挂号
        if (registSwitch == 0) {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
            registSwitch = 1;

            //验证年龄
            var age = $('#patientAge').val()
            if (age == null || age < 0 || age > 200 || isNaN(age)) {
                alert("请输入有效年龄!");
                return;
            }
            //验证科室
            var dept = $('#deptTypeClass').val();
            if (dept == null || dept.length == 0 || isNaN(dept)) {
                alert("请选择科室!");
                return;
            }
            //验证挂号类型
            var registType = $('#registType').val();
            if (registType == null || registType.length == 0 || isNaN(registType)) {
                alert("请选择挂号类型!");
                return;
            }
            //验证医生
            var doctor = $('#diagnoseDoctor').val();
            if (doctor == null || doctor.length == 0 || isNaN(doctor)) {
                alert("请选择看诊医生!");
                return;
            }
            var postData = {
                'CaseNumber': $('#patientCaseNumber').val(),
                'RealName': $('#patientName').val(),
                'Gender': $('#patientGender').val(),
                'Age': $('#patientAge').val(),
                'BirthDate': $('#patientBirthDate').val(),
                'IDNumber': $('#patientIdNumber').val(),
                'HomeAddress': $('#patientAddress').val(),
                'VisitDate': $('#date').val(),
                'Noon':$('#Noon').val(),
                'DeptID': $('#deptTypeClass').val(),
                'RegistLeID': $('#registType').val(),
                'UserID': $('#diagnoseDoctor').val(),
                'TotalCost': $('#registCost').val(),
                'IsBook': $('#caseBook').val(),
                'RegistInvoice':$('#registInvoice').val()
            };
            console.log($('#caseBook').val())
            $.ajax({
                type: "post",
                url: "/his/registration/regist/insertRegist.do",
                data: postData,
                dataType: "json",
                success: function (data) {
                    registSwitch = 0;
                    if (data == "1") {
                        alert("挂号成功！");
                    }
                    if (data == "0") {
                        alert("挂号失败！");
                    }
                }
            });
        }else{
            alert("正在提交挂号信息，请稍后!");
        }
    });
});