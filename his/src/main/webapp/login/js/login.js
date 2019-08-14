$('.tijiao').click(function(){
	alert("123");
    console.log('xxxx');
    $.ajax({
        type: "post",
        url: "/his/login.do",
        data: {"userName":$('#loginName').val(),"password":$('#Possword').val()},
        dataType: "json",
        success: function (data) {
            if(data == 0){
            	window.location.href = "/his/administration/keshi.html";
            }else if(data == 1){
            	window.location.href = "/his/administration/keshi.html";
            }else if(data == 2){
            	window.location.href = "/his/registration/registration.html";
            }else if(data == 3){
            	window.location.href = "/his/doctor/doctor.html";
            }else if(data == 4){
            	window.location.href = "/his/medical/medicalManagement.html";
            }else if(data == 5){
            	window.location.href = "/his/pharmacy/pharmacy.html";
            }else if(data == 6){
            	window.location.href = "/his/finance/Costsubjectmanagement.html";
            }else if(data == -1){
            	window.location.href = "#";
            }
        }
    });
});