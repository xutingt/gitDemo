var basepath="http://localhost:8080/";
/**定义一个div排序方法 实现点击标签切换页面效果 */
$("#pagelabel div").on({
    "click":function(){                                          //标签的点击事件    
        var pages=$(".page")                                     //选出类.pge的div标签数组    
        $.each(pages,function(i,page){                           //给.pga div进行默认排序                   
            $(page).css("z-index",i);       
        })
        var thisidstr=$(this).attr("id")                         //得到标签的id值   
        var thisid=thisidstr.substring(thisidstr.indexOf("_")+1) //计算并求出需要显示的div的id
        $(("#page_"+thisid)).css("z-index",100)                  //将对应的div显示在最上层
        if(thisid=="3"){                                           //如果点击的是药品管理标签就在对应的div里插入表格
         var colList=["编号","药名","规格","单位","制造商","服法","类型","价格","代号"];
         var actionList={select:basepath+"getDrugs.do",
                        update:basepath+"changeDrugs.do",
                        delete:basepath+"removeDrugs.do",
                        insert:basepath+"addDrugs.do"};
         $(".basetable").empty();                              
         generateTable("page_3",935,650,actionList,colList,10);  

        }  
        if(thisid=="1"){                              //如果点击的是药品管理标签就在对应的div里插入表格
            /***定义代发要列表 */
$("#refreshbutton").on({
    "click":function(){
        $("#detilebody input").val("");//点击刷新按钮清空患者信息
        $("#hisDrugs table tbody").empty();//点击刷新按钮清空表格内容
        var caseNumber=$("#case_number").val();
        var value=$("input[name='op']:checked").val();
      
        $.ajax({
            type: "post",
            url: basepath+"getkey.do",
            contentType: "application/x-www-form-urlencoded;charset=utf-8",
            dataType: "json",
            data: {
                caseNumber:caseNumber,
                chargeState:value,
            },
            success:function(data){
            
        var actionList={select:basepath+"getkey.do",update:"",delete:"",insert:""}
        var colList=["姓名","病历号"];
       // $(".basetable").empty();  
        generateTable("registerList",320,300,actionList,colList,5,data,{"chargeState":value})
        $(".basetable thead tr:first-child").empty();
        var tds=$(".basetable tbody .change").parent().css({
            "display":"none"
        });
        $(".basetable tbody tr").css({
            "cursor":"pointer"
        })
        $(".basetable tbody tr").on({
            mouseover:function(){
             $(this).children(".gcell").css({
                "background-color":"white",
                "color":"#009688"
             })   
            },
            mouseout:function(){
                $(this).children(".gcell").css({
                    "background-color":"transparent",
                    "color":"gray"
                 })   
            },
            click:function(){
                console.log($(($(this).children(".gcell"))[1]).text())
                $.ajax({
                    type: "post",
                    url: basepath+"sendingdetile.do",
                    contentType: "application/x-www-form-urlencoded;charset=utf-8",
                    dataType: "json",
                    data: {
                        caseNumber:$(($(this).children(".gcell"))[1]).text(),  
                    },
                    success:function(r){
                        var data =r.s;
                        var drugdata=r.d
                        console.log(data[0].caseNumber)
                        $("#hisDrugs table tbody").empty();
                        $(drugdata).each(function(i,subdata){
                            $("<tr><td>"+subdata.user.username+"</td><td>"+
                                     subdata.drugs.drugsName+"</td><td>"+
                                     subdata.drugs.specifications+"</td><td>"+
                                     subdata.drugs.drugsUnit+"</td><td>"+
                                     subdata.drugs.drugsPrice+"</td><td>"+
                                    
                                     (subdata.drugs.drugsPrice)*(subdata.registerDrugChargeDetails.drugNum)+"</td><td>"+
                                     subdata.drugs.manufacturer+"</td><td>"+
                                     subdata.registerDrugChargeDetails.drugNum+"</td><td>"+
                                     subdata.registerDrugCharge.chargeState+
                                     "</td></tr>"
                                     ).appendTo("#hisDrugs table tbody")
                        })
                        $("#caseNumber").val(data[0].caseNumber);
                        $("#registerName").val(data[0].realName);
                        $("#gender").val(data[0].gender);
                        $("#age").val(data[0].age);
                        $("#deptname").val(data[0].keshiguanli.keshimingcheng);
                        $("#chargeState").val(data[0].registerDrugCharge.chargeState);
                        $(".action").on({
                            click:function(){
                                
                                $.ajax({
                                    type: "post",
                                    url: basepath+"sendDrugs.do",
                                    contentType: "application/x-www-form-urlencoded;charset=utf-8",
                                    dataType: "json",
                                    data: {
                                        caseNumber:$("#caseNumber").val(),
                                        chargeState:$(this).text()
                                          
                                    },
                                    success:function(data){
                                        if(data.result==1){
                                            alert($(this).text()+"成功")
                                        }
                                    }})//发药结束位置

                            }
                        })
                    }
                    
                })





            }
            })
              
                
            }//ajax成功事件结束                        
        })
        
    }
})
   
           }                  
    }//点击事件结束位置
})   //div排序方法结束位置

/**打印药单 */
$("#print").click(function(){
    $("#detilebody").print();
})

