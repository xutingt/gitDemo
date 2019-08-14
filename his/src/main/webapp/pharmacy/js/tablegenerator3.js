/*分页查询生成器 
需要参数：
1.表格尺寸：twidth、theight参数。
2.表格插入目标ID参数：target。
3.行为参数：actionList{select:"",update:"",delete:"",insert："}。
4.列名参数：colList[]。
5.每页显示的记录数：pagesize
6.后台分页使用count回传,数据使用data回传
7.后台接收参数使用字母a~z接收
**更新tablegenerator2方法》》》》》》》》》》》》》》generator3
**新增参数[resultValue] 支持绑定方法外部查询数据 
         [custompro] 支持自定义外部ajax发送数据 custompro 属性应是一个对象{"自定义参数名"："值"}
         新的tablegenerator发放发可以使分页查询标签ajax发送自定义分页条件,可以使用外部的查询数据展示在表格内、
*/
//定义类型验证方法
function checkType(arg) {
    if (arg) {
        return arg.constructor;
    }
    else if (arg == 0) {
        return arg.constructor;
    }
    else return arg;
}//类型检验方法定义结束***************************************

//表格生成方法
function generateTable(target, twidth, theight, actionList, colList, pageSize,resultValue,custompro) {
    var container = document.getElementById(target);
    $(container).empty();
    //参数验证
    //1.验证target参数是不是一个字符串
    if (checkType(target) != String) {
        throw new Error("目标ID参数[target]不是一个有效的字符串类型")
    }
    //2.验证twidth、theight参数是不是一个有效数字
    if (checkType(twidth) != Number) {
        throw new Error("表格宽度参数[twidth]不是一个有效的的数字")
    }
    if (checkType(theight) != Number) {
        throw new Error("表格高度度参数[twidth]不是一个有效的的数字")
    }
    //3.验证url参数actionList参数是不是一个数组
    if (checkType(actionList) != Object) { throw new Error("url列表参数[actionList]不是一个对象类型") }
    else {
        $.each(actionList, function (key) {
            var argList = ["select", "update", "delete", "insert"]
            for (var i = 0; i < argList.length; i++) {
                if (key != argList[i]) {
                    if (key != argList[i] && i == argList.length - 1) {
                        throw new Error('url列表参数[actionList]中属性' + key +
                            '不符合标准{select:"",update:"",delete:"",insert："}')
                    }
                }
                else break;
            }
        })
    }
    //4.验证colList参数是不是一个头数组
    if (checkType(colList) != Array) {
        throw new Error("表格列名列表参数[colList]不是一个数组类型")
    }
    //5.验证pageSize是不是一个合法的数字
    if (checkType(pageSize) != Number) {
        throw new Error("表格分页参数[pageSize]不是一个合法的数字")
    }


    /********************参数验证结束*************************************** */
    /** 生成基本的表格体 
     * 表格基本组成thead--tr--<td>动态生成的查询条件输入框</td>
     *                   tr--<td>button 查询</td>   <td>button 增加</td>
     *            tbody--tr*pageSize-td*列数+<td>button修改button删除</td>
     *            tfoot--tr--td--动态生成的<ul>
    */
    //根据传入的参数绘制基础表格方法
    //绘制表头部分**********************************************************
    //生成一个表格
    var table = $("<table class='basetable'>");
    //生成一个表头
    var thead = $("<thead>");
    var tbody = $("<tbody>");
    var tfoot = $("<tfoot>");
    //生成两个表头行
    var thtr1 = $("<tr class='thtr1'>");
    var thtr2 = $("<tr class='thtr2'>");
    //生成一个单元格
    var thtd = $("<td style='width:" + 75 + "px;height:" + parseInt(theight / (pageSize + 3)) + "px'>");
    //生成查询按钮和增加按钮
    var searchbutton = $("<input type='button' class='searchbutton' value='查询'>")
    var addbutton = $("<input type='button' class='addbutton' value='增加'>")
    //生成操作单元格
    var tdop = $("<td style='text-align:center'></td>")
    //根据传入的列cloList生成条件过滤器文本框和列名信息添加表头
    var lable = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
    var objstr = "{";

    $(colList).each(function (i, colname) {
        $("<td style='text-align:center'><input class='filter' id='" + lable[i] + "' placeholder=查询" + colname + " ></td>").appendTo(thtr1);
        $("<td style='text-align:center'>" + colname + "</td>").appendTo(thtr2);
        objstr = objstr + '"' + lable[i] + '"' + ":null,";
    })
    if(custompro!=null){
         //alert(custompro.chargeState)
         $.each(custompro,function(key){
            objstr=objstr+'"'+key+'"'+':"'+ custompro[key]+'",';
         })
         
     
    }
    objstr = objstr + '"pageNumber":null,' + '"pagesize":null' + "}";

    console.log(objstr);
    var dataObj = JSON.parse(objstr);
    //在表给内组装表头部分 
    $(tdop).appendTo(thtr2);
    $(searchbutton).appendTo(thtd);
    $(addbutton).appendTo(thtd);
    $(thtd).appendTo(thtr1);
    $(thtr1).appendTo(thead);
    $(thtr2).appendTo(thead);
    $(thead).appendTo(table);
    //获得插入目标
    var targetObj = document.getElementById(target);
    $(table).appendTo($(targetObj))
    //表头部分生成结束************************************************************
    /** ************************* tbody生成*************************************/
    /**根据传入的pageSize参数生成对应数量的tr在其末尾加入修改和删除按钮*********** */
    for (var i = 0; i < pageSize; i++) {
        $("<tr class=tbtr" + (i + 1) +
            "><td style='vertical-align:middle'>" + "<input class='change'" + "value='修改' type='button' style='display:none'>" +
            "<input type='button' class='delete' value='删除'  style='display:none'>" + "</td></tr>").appendTo(tbody)
    }
    $(tbody).appendTo(table);
    //根据传入的列colList参数生成tbody的单元格
    var trs = $(".basetable tbody tr");
    for (var i = 0; i < pageSize; i++) {
        for (var j = 0; j < colList.length; j++) {
            ($(trs[i])).prepend($("<td class='gcell'></td>"));
        }
    }
    //表格体部分生成结束*******************************************
    /** 生成表格页脚*/
    var tftr = $("<tr class='tftr'>");
    var tftd = $("<td class='tftd' style='text-align:center'>");
    $(tftd).appendTo(tftr);
    $(tftr).appendTo(tfoot);
    $(tfoot).appendTo(table);
    //页脚生成结束*************************************************
    /****生成添加界面默认设为隐藏当点击添加按钮后显示出来********** */
    var mdiv = $("<div class='mdiv'></div>");//生成一个遮罩div用来遮住页面
    var fdiv = $("<div class='fdiv'></div>");//生成一个formdiv用来容纳表单
    $(colList).each(function (i, colname) {
        $("<div class='borderdiv'><label>" + colname + ":&nbsp;&nbsp;" + "</label><input class='ginput' type='text'/></div>").appendTo(fdiv)//按传入的列名生成对应的输入框
    })
    var opbar = $("<div class='borderdiv'><input class='addok' type='button' value='确认添加'><input class='addno' type='button' value='取消'></div>")
    $(opbar).appendTo(fdiv);//将操作按钮添加到表单中
    $(fdiv).appendTo(mdiv);//将表单div装入遮罩div
    $("body").prepend(mdiv);//将遮罩div装入body
    $(mdiv).css({
        "position": "absolute",
        "width": "100%",
        "height": "100%",
        "margin": 0,
        "display": "none",
        "background-color": "rgba(0,0,0,0.7)",
        "z-index": "999"
    })

    $(fdiv).css({
        "border-style": "solid",
        "border-width": "1px",
        "width": "500px",
        "height": "500px",
        "margin-left": "auto",
        "margin-right": "auto",
        "margin-top": "100px",
        "background-color": "#009688",
        "padding-top": "50px",


    })
    $(".fdiv label").css({
        "position": "relative",
        "display": "block",
        "float": "left",
        "width": 100,
        "text-align": "right"
    })
    $(".fdiv input").css({
        "position": "relative",
        "display": "block",
        "width": "150px",
        "margin-bottom": "5px",
    })
    $(".borderdiv").css({
        "position": "relative",
        "margin-top": "25px",
        "margin-left": "auto",
        "margin-right": "auto",
        "border-style": "solid",
        "border-width": "0 0 1px 0",
        "border-color": "lightgray",
        "width": "350px",
        "height": parseInt(100 / (colList.length))
    })
    $(".addok ,.addno").css({
        "margin-left": '100px',
        "margin-top": "10px",
        "background-color":"#1E9FFF"
    })
    $(".addok").parent().css({
        "border-bottom": "none"
    })
    /*****************************************给确定addok按钮添加事件按钮添加隐藏事件********************** */
    $(".addok").on({
        "click": function () {
            var addvalue = new Array();//创建一个数组来保存要插入的数据
            var ginputs = $(".ginput");//得到输入框
            $(ginputs).each(function (i, input) {//循环得到输入框里的值保存在刚刚定义的addvalue数组里
                addvalue.push($(input).val())
            })//取值循环结束
            var flag = 0;//定义一个计数标记
            $.each(dataObj, function (key) {
                if (lable.indexOf(key) == -1) { return false; }
                dataObj[key] = addvalue[flag];//利用循环给数据传递对象赋值
                flag = flag + 1;
            })
            $.ajax({
                type: "post",
                url: actionList.insert,//向服务器发送ajax insert请求
                contentType: "application/x-www-form-urlencoded;charset=utf-8",
                dataType: "json",
                data: dataObj,
                success: function (result) {
                    if(result.result==1){
                    alert("修改成功！！")}
                    //插入成功就清空输入框
                    $(ginputs).each(function (i, input) {
                        $(input).val("");
                    })
                    $(mdiv).css({
                        "display": "none"
                    })

                },//success方法结束
                error: function () {
                    alert("插入失败")
                    $(ginputs).each(function (i, input) {
                        $(input).val("");
                    })
                    $(mdiv).css({
                        "display": "none"
                    })
                }

            })

        }
    })
    /*****************************************给取消按钮添加隐藏事件************************************** */
    $(".addno").on({
        "click": function () {
            $(mdiv).css({
                "display": "none"
            })
        }
    })

    //给addbutton按钮绑定事件**************************************
    $(".addbutton").on({
        "click": function () {
            $(mdiv).css({
                "display": "block"
            })
        }
    })
    /******************************************* 给修改按钮添加事件********************************************/
    var vArray = new Array();
    $(".change").on({
        "click": function () {
            vArray.length = 0;
            var gcells = $(this).parent().parent().children(".gcell")//当点击changebutto时获得
            if ($(this).val() == "修改") {            //判断点击的按钮状态是不是“修改”
                $(this).val("提交").next().val("取消")//当点击修改按钮后按钮内容变更成提交和取消
                $(gcells).each(function (i, cell) {
                    var text = $(cell).text();         //循环遍历每一个当前行的td并得到其中的值
                    vArray.push(text);               //将td的原值保存到VArray中
                    $(cell).empty();                 //保存后清空td
                    //清空td后给td重新附加元素
                    $(cell).append("<input class='gtext' style='width:" + ((twidth / (colList.length + 1)) - 5 * (colList.length - 1)) + "px' value='" + text + "'>")
                })//td的修改样式定义结束
            }
            /****************************************************给提交按钮绑定ajaxUpdate方法********************************** */
            else if ($(this).val() == "提交") {//判断当前点击的按钮是不是提交状态如果是“提交”状态的话给按钮绑定update方法
                vArray.length = 0;     //定义一个数组
                var tds = $(this).parent().parent().children(".gcell");//获得当前行的td
                $(tds).each(function (i, td) {                          //循环遍历每一个当前行的td
                    var v = $(td).children(".gtext").val();               //得到当前行td中input元素的值                                    
                    vArray.push(v)                                       //将input中的值保存到已经定义好的textv中
                    $(td).empty();                                      //删除td中的input元素            
                    $(td).text(v);                                      //将td的值更改为提交的值（如果提交失败在后面将td内的值改回原来的值）
                })//赋值循环结束
                var flag = 0;//定义一个循环次数标记
                $.each(dataObj, function (key) {                       //循环遍历数据传输对象dataObj的每一个属性
                    if (lable.indexOf(key) != -1) {                       //判断属性是否在a~z范围内 如果是则给属性赋值
                        dataObj[key] = vArray[flag]                           //将在文本框内需要update的值赋值给数据传输对象
                        console.log("key:" + dataObj[key])
                        flag = flag + 1;//循环变量+1                                       
                    } else {
                        return false;                                 //如果属性a~z已经赋值完成就退出数据传输对象赋值循环  
                    }
                })
                $(this).val("修改");
                $(this).next().val("删除");                                //当点击提交按钮后按钮样式变回修改 
                $.ajax({                                            //发送ajaxUpdate请求
                    type: "post",
                    url: actionList.update,
                    xhrFields: { withCredentials: true },                     //使用用户传入的select方法的链接
                    contentType: "application/x-www-form-urlencoded;charset=utf-8",
                    dataType: "json",
                    data: dataObj,                                     //发送数据库传输对象
                    success: function (result) {

                       // alert(result.result) //发送成功提示

                    },
                    error: function (result) {
                        // alert(result.result)
                        $(this).val("修改");
                        $(tds).each(function (i, td) {                   //若发送失败将td的内容改回提交之前的值
                            $(td).text(vArray[i])                     //遍历每一个td将内容改回变更前的值 
                        })
                    }
                })                  //ajax方法结束


            }


        }
    })
    //给删除按钮添加事件
    $(".delete").on({
        "click": function () {
            var current = $(this);
            if ($(this).val() == "取消") {
                $(this).val("删除").prev().val("修改")

                var tds = $(this).parent().parent().children(".gcell");
                $(tds).each(function (i, td) {
                    $(td).empty();
                    $(td).text(vArray[i]);

                })
            }
            else if ($(this).val() == "删除") {
                //alert("删除事件触发了")
                if (confirm("确认删除")) {
                    vArray.length = 0;
                    var cells = $(this).parent().parent().children(".gcell");//获得单元格数组
                    $(cells).each(function (i, cell) {
                        vArray.push($(cell).text())//将单元格里的值读出来放到values数组里             
                    })
                    var flag = 0;
                    $.each(dataObj, function (key) {
                        if (lable.indexOf(key) == -1) { return false }
                        dataObj[key] = vArray[flag];
                        flag = flag + 1;
                    })
                    $.ajax({                                            //发送ajaxUpdate请求
                        type: "post",
                        url: actionList.delete,                             //使用用户传入的select方法的链接
                        contentType: "application/x-www-form-urlencoded;charset=utf-8",
                        dataType: "json",
                        data: dataObj,                                     //发送数据库传输对象
                        success: function (result) {
                            $(current).parent().parent().children(".gcell").empty().last().next().children().css({
                                "display": "none"
                            })
                            alert("删除成功")
                        },
                        error: function () {
                            alert("删除失败")
                        }
                    })
                }

            }

        }
    })
    /****************分页标签生成方法****************************************** */
    function pagehelper(count) {
        if ($(tftd).children().length > 0) { $(tftd).empty() }//判断是否已经存在分页标签如果有就清空
        var pageul = $("<ul class='pagelab'>");
        if (Math.ceil(count / pageSize) <= 5) {               //如果分页数小于等于5就给ul添加li
            for (i = 0; i < Math.ceil(count / pageSize); i++) {
                $(pageul).append("<li class='gli'>" + (i + 1) + "</li>")
            }
        } else {                                          //如果分页数大于5就给ul添加换页标签
            var clickable = Math.ceil(Math.ceil(count / pageSize) / 5) - 1
            console.log("可点击次数" + clickable);
            var clicknum = 0;//点击次数统计
            //给换页标签"<"添加点击事件
            $(pageul).append("<li>" + "<" + "</li>")
            for (var i = 0; i < 5; i++) {
                $(pageul).append("<li class='gli'>" + (i + 1) + "</li>")
            }
            $(pageul).append("<li>" + '>' + "</li>")
            var lis = $(pageul).children();
            $(lis[0]).on({//绑定后退标签的点击事件
                "click": function () {
                    var text = $(lis[0 + 1]).text();
                    if (parseInt(text) > 5) {//如果已经是首页则按钮无效 若不是首页就重新赋值给标签               
                        clicknum = clicknum - 1
                        console.log(clicknum)
                        for (var i = 0; i < 5; i++) {//点击后退标签给标签重新赋值
                            var gettext = $(lis[i + 1]).text()
                            var val = null;
                            if (gettext == '-') { val = parseInt($(lis[1]).text()) + i }
                            else {
                                val = parseInt(gettext) - 5;
                            }

                            $(lis[i + 1]).text(val);
                        } //后退标签循环体结束
                    }
                    dataObj.pageNumber = parseInt($(lis[1]).text());
                    defaultSelect(false)

                }//后退标签点击事件结束
            })//后退标签事件绑定结束********************************
            //pagehelper()方法内给换页标签'>'添加事件

            $(lis[6]).on({//给下一页按钮>绑定事件
                "click": function () {
                    if (clicknum >= clickable) {
                        return;//如果点击次数大于可点击次数就退出方法
                    } else {
                        clicknum = clicknum + 1;//如果在点击次数范围允许内则重新计算标签值记录点击次数
                        console.log("点击下一页:" + clicknum)
                        for (var i = 0; i < 5; i++) {
                            var text = $(lis[i + 1]).text();
                            var val = parseInt(text);

                            if (val + 5 <= Math.ceil(count / pageSize)) {
                                $(lis[i + 1]).text(val + 5);
                                console.log(val)
                            }
                            else { $(lis[i + 1]).text("-"); }
                        }
                    }
                    dataObj.pageNumber = parseInt($(lis[1]).text());
                    defaultSelect(false)
                }
            })
        }

        $(pageul).appendTo(tftd).parent().attr({
            "colspan": (colList.length)
        });
        $(" .basetable li").css({
            "borderStyle": "solid",
            "borderWidth": "1px",
            "display": "inline-block",
            "width": "23px",
            "height": "23px",
            "margin-left": 10 + 'px',
            "text-align": "center",
            "background-color":"#009688" ,
            "color": "black"
        })
        $(" .basetable li").hover(function () {//分页列表的鼠标悬停时间
            $(this).css({
                "color": "white",
                "cursor": "pointer"

            })
        }, function () {
            $(this).css({
                "color": "#689ad3"
            })
        }
        )//分页标签的鼠标悬停事件结束

        $(".gli").on("mouseup", function () {

            dataObj.pageNumber = parseInt($(this).text())
            defaultSelect(false);

        })


    }//pagehelper()方法结尾***************************************************************
    /**********************************表格样式 *****************************************/
    $(".basetable").css({
        "border-collapse": "collapse",
        "width": twidth,
        "height": theight,
        "text-align": "center",
        "margin-left": "10px",
        "margin-top": "10px",
       
        

    })
    $(".filter").css({
        "width": (twidth / (colList.length + 1)) - (5 * (colList.length - 1)),
        "font-size":"12px",
        "text-align":"center",
        "border-style":"solid",
        "border-width":"1",
        "border-radius":"5px",
        "border-color":"#009688"

    })

    $(".gcell").css({
        "borderStyle": "solid",
        "borderWidth": "0 0 1px 0",
        "border-color": "lightgray",
        "width": parseInt((twidth - 130) / colList.length),
        "text-align": "center",
        "color": "black",
        "vertical-align": "middle"
    })
    $(".basetable tbody tr").last().children().css({
        "borderStyle": "none",
    })
    $(".basetable tbody tr").css({
        "padding-top":"10px"
    })
    $(".basetable thead tr:last").css({

        "color": "#009688"

    })
    $(".basetable thead tr td").css({ //头部背景色
        "background-color": "transport",
        "color": "#009688"

    })

    $(".basetable tbody").css({

        
        "margin-top": "20px",
       //表格体背景色

    })
    $(".basetable tbody td").css({
        "color":"#808080 ",
        "font-size": "10px"

    })

    $(".change").css({
        "border-radius": "5px " + '0' + " " + '0' + " 5px",
        "margin-left": 0
    })
    $(".delete").css({
        "border-radius": "0 " + '5px' + " " + '5px' + " 0",

    })
    $(".addbutton,.searchbutton,.change, .delete").css({ //按钮背景色
        "border-style": "none",
        "height": parseInt(theight / (pageSize + 6)),
        "width": parseInt(parseInt($(thtd).width()) / 2),
        "margin-left": "-5px",
        "background-color":"#009688",
        "color": "white",
        "font-size": "15px",
        "outline": "none",
        "cursor": "pointer",
    }).mouseover(function () {     //鼠标悬浮背景色
        $(this).css({
            "background-color": "#ff9200",
            "color": "black"
        })
    }).mouseout(function () {
        $(this).css({
            "background-color":"#009688",
            "color": "white"
        })
    })
   
    $(".filter").css({
        "height": parseInt(theight / (pageSize + 12)),

    })
    $(".searchbutton").css({
        "border-radius": "5px " + '0' + " " + '0' + " 5px"

    })
    $(".addbutton").css({
        "border-radius": "0 " + '5px' + " " + '5px' + " 0"

    })

    /*****************************表格样式结束******************************************* */
    /******************************定义数据插入方法*************************************** */
    function insertdata(rebackdata){
        
        $(".gcell").empty();
        if (checkType(rebackdata) != Array) {
            throw new Error("[function insertdata(){}参数不是一个json对象数组]")
        }
        if (rebackdata.length < pageSize) {
            var emptynum = pageSize - rebackdata.length;
        }
        var trs = $(".basetable tbody tr")
        for (var i = 0; i <= emptynum; i++) {

            $(trs[rebackdata.length + i]).children().last().children().css({
                "display": "none"
            });
        }

        $(rebackdata).each(function (i, obj) {
            var num = 0;//定义计数器用来选择td

            $.each(obj, function (key) {
                var gettr = $(".basetable tbody tr")//获得tr
                var tds = $(gettr[i]).children(".gcell");//获得td
                $(tds).last().next().children().css({ "display": "inline-block" })
                if (obj[key].constructor == Object) {
                    $.each(obj[key], function (keyin) {//如果值是一个对象就遍历出里面的属性值
                        $(tds[num]).text(obj[key][keyin]);//通过计数器来选择td给td添加内容
                        num = num + 1;
                    })
                    return true
                }
                $(tds[num]).text(obj[key]);//通过计数器来选择td给td添加内容
                num = num + 1;
                //currentobj=$(tds[num])
            })

        })



    }
    /****************************获取过滤器值方法***************************************** */
    function getfilterval() {
        var valueArray = new Array();
        var filters = $(".filter");
        $(filters).each(function (i, filter) {
            var text = $(filter).val();//得到过滤器的值
            if (text != "") {
                valueArray.push(text);
            }
            else {
                valueArray.push(null);
            }
        })
        var flag = 0;
        $.each(dataObj, function (key) {
            if (lable.indexOf(key) == -1) {//如果属性不在属性列表lable中name退出循环
                return false;
            }
            dataObj[key] = valueArray[flag];
            flag = flag + 1;
            console.log(key + "  " + dataObj[key])
        })

        dataObj.pagesize = pageSize;
    }
    //insertdata([{"id":1,"name":"中国","code":"CN"},{"id":1,"name":"中国","code":"CN"}]);
    /****************************给表格添加默认查询事件在表格加载后自动进行查询全部********** */
    function defaultSelect(repage) {
        getfilterval();  //使用getFilterval方法得到过滤器参数并给dataObj对象赋值        
        console.log(dataObj);

        $.ajax({
            type: "post",
            url: actionList.select,//使用用户传入的select方法的链接
            contentType: "application/x-www-form-urlencoded;charset=utf-8",
            dataType: "json",
            data: dataObj,         //发送从过滤器的到的对象
            success: function (result) {
                console.log("执行成功:" + result.count + ":" + result.data)
                insertdata(result.data)//使用已经定义的insertdata方法把得到的数据插入表格中
                if (repage == true) {
                    pagehelper(result.count)//使用已经定义好的pagehelper方法生成分页标签
                }
            }
        })

    }
    if(resultValue !=null){//判断是否给定了表格数据如果给定数据就不使用预定义的查询功能
        insertdata(resultValue.data);
        pagehelper(resultValue.count);
    }else{
    /****************************给表格添加默认的自动查询方法用来初始化数据****************** */
    (function () {
        defaultSelect(true);
    })()
    /****************************给查询按钮绑定ajax点击事件******************************** */
    $(".searchbutton").on("click", function () {
        defaultSelect(true);
    }) 
}


}

