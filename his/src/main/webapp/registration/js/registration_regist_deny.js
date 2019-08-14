$(document).ready(function () {
    var caseNumber = '';
    // 病例搜索
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
    // 身份扫描
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
    //记录计数
    var count = 0;
    //获取对应的挂号信息
    $('#regist-search').click(function () {
        if (caseNumber != "" && caseNumber.length != 0) {
            $('#regist-deny-details').empty();
            $.ajax({
                type: "post",
                url: basePath+"registration/registerChargeDetails/get",
                data: { "caseNumber": caseNumber },
                dataType: "json",
                success: function (response) {
                    if (response != null && response.length > 0) {
                        $.each(response, function (indexInArray, valueOfElement) {
                            count = count + 1;
                            if (valueOfElement.id == 3) {
                                $('#regist-deny-details').append(
                                    "<tr>"
                                    + "<td>" + valueOfElement.id + "</td>"
                                    + "<td>" + valueOfElement.registName + "</td>"
                                    + "<td>" + valueOfElement.roleType + "</td>"
                                    + "<td>" + valueOfElement.registCost + "</td>"
                                    + "<td>不可退款项目</td>"
                                    + "</tr>"
                                );
                            } else {
                                $('#regist-deny-details').append(
                                    "<tr>"
                                    + "<td>" + valueOfElement.id + "</td>"
                                    + "<td>" + valueOfElement.registName + "</td>"
                                    + "<td>" + valueOfElement.roleType + "</td>"
                                    + "<td>" + valueOfElement.registCost + "</td>"
                                    + "<td>可退款项目</td>"
                                    + "</tr>"
                                );

                            }
                        });
                    } else {
                        alert("无可用退号信息！");
                    }
                }
            });
        } else {
            alert("请重新获取病例信息!");
        }
    });
    //退号操作
    $('#regist-deny').click(function () {
        if (count > 0) {
            $.ajax({
                type: "post",
                url: basePath+"registration/regist/updateRegisterDeny",
                data: { "caseNumber": caseNumber },
                dataType: "json",
                success: function (response) {
                    if (response == "success") {
                        alert("退号成功！")
                    } else {
                        alert("退号失败！");
                    }
                }
            });
        } else {
            alert("无可用退号信息!");
        }
    });
});