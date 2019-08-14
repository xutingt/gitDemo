var role = window.location.href.split("/")[4];
if(role != window.localStorage.getItem("flag")){
    window.localStorage.removeItem("flag");
    window.localStorage.removeItem("uId");
    alert("无访问权限，请重新登陆!");
    window.location.href = "../login/index.html";
}