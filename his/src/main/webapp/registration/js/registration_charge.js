layui.use(['form', 'layedit', 'laydate', 'layer', 'laypage', 'table'], function () {
    var deptId, registType;
    var form = layui.form
        , layedit = layui.layedit
        , laydate = layui.laydate
        , layer = layui.layer
        , table = layui.table;
    //挂号详情分页
    // table.render({
    //     elem: '#regist-list-body-details'
    //     , url: 'http://localhost:8080/his/registration/regist/listRegister'
    //     , cols: [[
    //         { field: 'caseNumber', width: 80, title: '病历号' }
    //         , { field: 'realName', width: 80, title: '患者姓名' }
    //         , { field: 'gender', width: 80, title: '患者性别' }
    //         , { field: 'idNumber', width: 80, title: '身份证号' }
    //         , { field: 'birthDate', title: '出生日期', minWidth: 150 }
    //         , { field: 'age', width: 80, title: '年龄' }
    //         , { field: 'address', width: 80, title: '家庭住址' }
    //         , { field: 'visitDate', width: 80, title: '看诊日期' }
    //         , { field: 'deptId', width: 135, title: '看诊科室' }
    //         , { field: 'userId', width: 135, title: '看诊医师' }
    //         , { field: 'registType', width: 135, title: '挂号级别' }
    //         , { field: 'visitState', width: 135, title: '挂号状态' }
    //         , { field: 'diagnoseState', width: 135, title: '看诊状态' }
    //         , { field: 'totalCost', width: 135, title: '挂号消费' }
    //     ]]
    //     , page: true
    // });

    //     }
    // });
    //日期
    laydate.render({
        elem: '#diagnoseDate'
    });
    //出生年月
    laydate.render({
        elem: '#patientBirthDate'
    });
    /* 获取看诊医生 */
});
$(document).ready(function () {
    //挂号费用
    var registCost;
    /* 生成病历号 */
    function generateCase() {
        return new Date().getTime();
    }
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
        $('#diagnoseDate').val("");
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
    /* 病例搜索 */
    var caseNumber = '';
    $('#caseSearch').click(function (e) {

        e.preventDefault();
        $.ajax({
            type: "post",
            url: basePath+"registration/regist/findRegisterByCaseName",
            data: { 'caseNumber': $('#case_number_input').val() },
            dataType: "json",
            success: function (response) {
                console.log(response);
                $('#patientCaseNumber').val(response.caseNumber);
                $('#patientCaseNumber').attr('readonly', true);
                $('#patientName').val(response.realName);
                $('#patientName').attr('readonly', true);
                $('#patientGender').val(response.gender);
                $('#patientGender').attr('readonly', true);
                $('#patientBirthDate').val(response.birthDate);
                $('#patientBirthDate').attr('readonly', true);
                $('#patientAge').val(response.age);
                $('#patientAge').attr('readonly', true);
                $('#patientIdNumber').val(response.idNumber);
                $('#patientIdNumber').attr('readonly', true);
                $('#patientAddress').val(response.address);
                $('#patientAddress').attr('readonly', true);
                $('#diagnoseDate').val(response.visitDate);
                $('#diagnoseDate').attr('readonly', true);
                $('#deptName').val(response.deptId);
                $('#deptName').attr('readonly', true);
                $('#registType').val(response.registType);
                $('#registType').attr('readonly', true);
                $('#diagnoseDoctor').val(response.userId);
                $('#diagnoseDoctor').attr('readonly', true);
                //获取病历号
                caseNumber = response.caseNumber;
                //医技信息
                // layui.use(['table'], function () {
                //     var table = layui.table;
                //     table.render({
                //         elem: '#regist-list-medical-details'
                //         , url: 'http://localhost:8080/his/registration/medical/get?caseNumber='+response.caseNumber
                //         , cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
                //         , cols: [[
                //             { field: 'id', width: 80, title: 'ID'}
                //             , { field: 'codes', width: 80, title: '编码' }
                //             , { field: 'type', width: 80, title: '类型'}
                //             , { field: 'name', width: 80, title: '名称' }
                //             , { field: 'price', title: '价格', width: '30%'} //minWidth：局部定义当前单元格的最小宽度，layui 2.2.1 新增
                //         ]]
                //     });

                // });
                //医技详情请求
                //药品详情请求
                //总计
                //收费操作

            }
        });
    });
    /* 医技处置 */
    $('#medical-deal').click(function (e) {
        e.preventDefault();
        $('#regist-table-head').html("");
        $('#regist-table-head').append(
            "<th>ID</th>"
            + "<th>编码</th>"
            + "<th>类型</th>"
            + "<th>名称</th>"
            + "<th>数量</th>"
            + "<th>价格</th>"
        );
        $('#submit-flag').val('medical');
        var medicalSum = 0;
        $.ajax({
            type: "post",
            url: basePath+'registration/medical/get',
            data: { 'caseNumber': caseNumber },
            dataType: "json",
            success: function (response) {
                $('#medical-tbody').html("");
                $.each(response, function (indexInArray, valueOfElement) {
                    $('#medical-tbody').append(
                        "<tr>"
                        + "<td>" + valueOfElement.id + "</td>"
                        + "<td>" + valueOfElement.codes + "</td>"
                        + "<td>" + valueOfElement.type + "</td>"
                        + "<td>" + valueOfElement.name + "</td>"
                        + "<td>1</td>"
                        + "<td>" + valueOfElement.price + "</td>"
                        + "</tr>"
                    );
                    medicalSum = medicalSum + parseFloat(valueOfElement.price);
                });
                $('#charge-sum').html("总计:" + medicalSum);
            }
        });

    });
    /* 药品清单 */
    $('#medicine-deal').click(function (e) {
        e.preventDefault();
        $('#regist-table-head').html("");
        $('#regist-table-head').append(
            "<th>编码</th>"
            + "<th>名称</th>"
            + "<th>厂家</th>"
            + "<th>类型</th>"
            + "<th>价格</th>"
            + "<th>数量</th>"
        );
        $('#submit-flag').val('drug');
        var medicineSum = 0;
        $.ajax({
            type: "post",
            url: basePath+'registration/drugs/get',
            data: { 'caseNumber': caseNumber },
            dataType: "json",
            success: function (response) {
                $('#medical-tbody').html("");
                $.each(response, function (indexInArray, valueOfElement) {
                    $('#medical-tbody').append(
                        "<tr>"
                        + "<td>" + valueOfElement.drugsCode + "</td>"
                        + "<td>" + valueOfElement.drugsName + "</td>"
                        + "<td>" + valueOfElement.manufacturer + "</td>"
                        + "<td>" + valueOfElement.drugsType + "</td>"
                        + "<td>" + valueOfElement.drugsPrice + "</td>"
                        + "<td>" + valueOfElement.drugsNum + "</td>"
                        + "</tr>"
                    );
                    medicineSum = medicineSum + parseFloat(valueOfElement.drugsPrice) * parseInt(valueOfElement.drugsNum);
                });
                $('#charge-sum').html("总计:" + medicineSum);
            }
        });

    });
    /* 结算 */
    $('#charge-submit').click(function (e) {
        e.preventDefault();
        if ($('#submit-flag').val() == 'medical') {
            $.ajax({
                type: "post",
                url: basePath+"registration/medicalCharge/insert",
                data: { "caseNumber": caseNumber },
                dataType: "json",
                success: function (response) {
                    if (response == "success") {
                        alert("结算成功！");
                    }
                    if (response == "failure") {
                        alert("结算失败！");
                    }
                }
            });
        } else if ($('#submit-flag').val() == 'drug') {
            $.ajax({
                type: "post",
                url: basePath+"registration/drugCharge/save",
                data: { "caseNumber": caseNumber },
                dataType: "json",
                success: function (response) {
                    if (response == "success") {
                        alert("结算成功！");
                    }
                    if (response == "failure") {
                        alert("结算失败！");
                    }
                }
            });
        } else {
            alert("未知错误!");
        }
    });
    $('#clearRegistration').click(function () {
        clearAll();
    });
    /* 身份证扫描 */
    $('#identifierScan').click(function () {
        $.ajax({
            type: "post",
            url: "http://localhost:8080/get",
            data: {},
            dataType: "json",
            success: function (response) {
                // 根据身份证号和日期查询病例信息,为避免身份信息与日期相同的情况下，可以设置排序，并限定只取一个  
                if (response.name != null && response.code != null) {
                    $.ajax({
                        type: "post",
                        url: basePath+"registration/regist/scanRegister",
                        data: { "realName": response.name, "idNumber": response.code },
                        dataType: "json",
                        success: function (response2) {
                            $('#patientCaseNumber').val(response2.caseNumber);
                            $('#patientCaseNumber').attr('readonly', true);
                            $('#patientName').val(response2.realName);
                            $('#patientName').attr('readonly', true);
                            $('#patientGender').val(response2.gender);
                            $('#patientGender').attr('readonly', true);
                            $('#patientBirthDate').val(response2.birthDate);
                            $('#patientBirthDate').attr('readonly', true);
                            $('#patientAge').val(response2.age);
                            $('#patientAge').attr('readonly', true);
                            $('#patientIdNumber').val(response2.idNumber);
                            $('#patientIdNumber').attr('readonly', true);
                            $('#patientAddress').val(response2.address);
                            $('#patientAddress').attr('readonly', true);
                            $('#diagnoseDate').val(response2.visitDate);
                            $('#diagnoseDate').attr('readonly', true);
                            $('#deptName').val(response2.deptId);
                            $('#deptName').attr('readonly', true);
                            $('#registType').val(response2.registType);
                            $('#registType').attr('readonly', true);
                            $('#diagnoseDoctor').val(response2.userId);
                            $('#diagnoseDoctor').attr('readonly', true);
                            //获取病历号
                            caseNumber = response2.caseNumber;
                        }
                    });
                } else {
                    alert("读卡失败!");
                }
            }
        });
    });
});