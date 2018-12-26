var realCanvas = document.getElementById("realCanvas");
var cacheCanvas = document.getElementById("cacheCanvas");

var realContext = realCanvas.getContext("2d");
var cacheContext = cacheCanvas.getContext("2d");

var brush = document.getElementById("brush");
var line = document.getElementById("line");
var circle = document.getElementById("circle");
var rect = document.getElementById("rect");
var text = document.getElementById("text");
var clear = document.getElementById("clear");
var file = document.getElementById("file");
var fileText = document.getElementById("fileText");
var color = document.getElementById("color");
var colorText = document.getElementById("colorText");
var horizontal_rotate = document.getElementById("horizontal_rotate");
var vertical_rotate = document.getElementById("vertical_rotate");
var save = document.getElementById("save");
var img = new Image();

var startX, startY, endX, endY;
var flag;
var spans= document.getElementsByTagName("span");
realCanvas.width = 800;
realCanvas.height = 600;
cacheCanvas.width = 800;
cacheCanvas.height = 600;
realContext.font = realContext.font.replace(/\d+(\.\d+)?(px|pt|em|%)/i,"20px");

//修改选项字体颜色
function initColor(){
    for(var i = 0; i < spans.length; i++){
        document.getElementsByTagName("span")[i].style.color='#444';
    }
}

//画笔
brush.addEventListener('click',function () {
    initColor();
    this.style.color = "#55f";
    flag=0;
    realCanvas.onmousedown = function(e){
        e = e ? e : window.event;
        startX = e.pageX - this.offsetLeft;
        startY = e.pageY - this.offsetTop;
        flag = 1;
        realContext.closePath();
        realContext.beginPath();
        realContext.moveTo(startX,startY);
    };

    realCanvas.onmousemove = function (e) {
        e = e ? e : window.event;
        endX = e.pageX - this.offsetLeft;
        endY = e.pageY - this.offsetTop;

        if(flag){
            realContext.lineTo(endX, endY);
            realContext.stroke();
        }
    };

    realCanvas.onmouseup = function (e) {
        flag = 0;
    };

    realCanvas.onmouseout = function (e) {
        flag = 0;
    };
});

//画直线
line.addEventListener('click',function () {
    initColor();
    this.style.color = "#55f";
    flag=0;
    realCanvas.onmousedown = function (e) {
        e = e ? e : window.event;
        startX = e.pageX - this.offsetLeft;
        startY = e.pageY - this.offsetTop;
        realContext.closePath();
        realContext.beginPath();
        realContext.moveTo(startX,startY);
        cacheContext.moveTo(startX,startY);
        flag = 1;
    };
    realCanvas.onmousemove = function (e){
        if(flag) {
            cacheContext.clearRect(0, 0, 800, 600);
            cacheContext.closePath();
            cacheContext.beginPath();
            e = e ? e : window.event;
            endX = e.pageX - this.offsetLeft;
            endY = e.pageY - this.offsetTop;
            cacheContext.moveTo(startX,startY);
            cacheContext.lineTo(endX, endY);
            cacheContext.stroke();
        }
    };
    realCanvas.onmouseup = function (e) {
        cacheContext.clearRect(0, 0, 800, 600);
        e = e ? e : window.event;
        endX = e.pageX - this.offsetLeft;
        endY = e.pageY - this.offsetTop;
        realContext.lineTo(endX,endY);
        realContext.stroke();
        flag = 0;
    };
    realCanvas.onmouseout = null;
});

//画圆形
circle.addEventListener('click',function () {
    initColor();
    this.style.color = "#55f";
    flag=0;
    realCanvas.onmousedown = function (e) {
        e = e ? e : window.event;
        startX = e.pageX - this.offsetLeft;
        startY = e.pageY - this.offsetTop;
        realContext.closePath();
        realContext.beginPath();
        flag = 1;
    };
    realCanvas.onmousemove = function (e){
        if(flag) {
            cacheContext.clearRect(0, 0, 800, 600);
            cacheContext.closePath();
            cacheContext.beginPath();
            e = e ? e : window.event;
            endX = e.pageX - this.offsetLeft;
            endY = e.pageY - this.offsetTop;
            cacheContext.arc((startX+endX)/2,(startY+endY)/2,Math.sqrt(Math.pow((endX-startX)/2,2)+Math.pow((endY-startY)/2,2)),0,Math.PI*2);
            cacheContext.stroke();
        }
    };
    realCanvas.onmouseup = function (e) {
        cacheContext.clearRect(0, 0, 800, 600);
        e = e ? e : window.event;
        endX = e.pageX - this.offsetLeft;
        endY = e.pageY - this.offsetTop;
        realContext.arc((startX+endX)/2,(startY+endY)/2,Math.sqrt(Math.pow((endX-startX)/2,2)+Math.pow((endY-startY)/2,2)),0,Math.PI*2);
        realContext.stroke();
        flag = 0;
    };
    realCanvas.onmouseout = null;
});

//画矩形
rect.addEventListener('click',function () {
    initColor();
    this.style.color = "#55f";
    flag=0;
    realCanvas.onmousedown = function (e) {
        e = e ? e : window.event;
        startX = e.pageX - this.offsetLeft;
        startY = e.pageY - this.offsetTop;
        flag = 1;
    };
    realCanvas.onmousemove = function (e){
        if(flag) {
            cacheContext.clearRect(0, 0, 800, 600);
            e = e ? e : window.event;
            endX = e.pageX - this.offsetLeft;
            endY = e.pageY - this.offsetTop;
            cacheContext.strokeRect(startX,startY,endX-startX,endY-startY);
        }
    };
    realCanvas.onmouseup = function (e) {
        cacheContext.clearRect(0, 0, 800, 600);
        e = e ? e : window.event;
        endX = e.pageX - this.offsetLeft;
        endY = e.pageY - this.offsetTop;
        realContext.strokeRect(startX,startY,endX-startX,endY-startY);
        flag = 0;
    };
    realCanvas.onmouseout = null;
});

//写字
text.addEventListener('click',function () {
    initColor();
    this.style.color = "#55f";
    flag=0;
    realCanvas.onmousedown = function (e) {
        e = e ? e : window.event;
        startX = e.pageX - this.offsetLeft;
        startY = e.pageY - this.offsetTop;
        var content=window.prompt('请输入文本','');
        realContext.fillText(content,startX,startY);
    };
    realCanvas.onmouseup = null;
    realCanvas.onmousemove = null;
    realCanvas.onmouseout = null;
});

//选择添加图片
file.addEventListener('click',function () {
    flag=0;
    initColor();
    fileText.style.color = "#55f";
    realCanvas.onmousedown = null;
    realCanvas.onmouseup = null;
    realCanvas.onmousemove = null;
    realCanvas.onmouseout = null;
});

//添加图片
file.addEventListener('change',function (e) {
    var reads= new FileReader();
    var f = file.files[0];
    reads.readAsDataURL(f);
    reads.onload = function(){
        img.src = this.result;
        img.style.display = 'none';
        document.body.appendChild(img);
    };
    realCanvas.onmousedown = function(e){
        flag=1;
        e = e ? e : window.event;
        startX = e.pageX - this.offsetLeft;
        startY = e.pageY - this.offsetTop;
        realContext.drawImage(img,startX-img.width/2,startY-img.height/2);
    };
    realCanvas.onmouseup = null;
    realCanvas.onmousemove = null;
    realCanvas.onmouseout = null;
});

//水平反转图片
horizontal_rotate.addEventListener('click',function () {
    initColor();
    this.style.color = "#55f";
    if(flag) {
        var img_data = realContext.getImageData(startX - img.width / 2, startY - img.height / 2, img.width, img.height);
        var i, i2, t, h = img_data.height, w = img_data.width, w_2 = w / 2;
        for (var dy = 0; dy < h; dy++) {
            for (var dx = 0; dx < w_2; dx++) {
                i = (dy << 2) * w + (dx << 2);
                i2 = ((dy + 1) << 2) * w - ((dx + 1) << 2);
                for (var p = 0; p < 4; p++) {
                    t = img_data.data[i + p];
                    img_data.data[i + p] = img_data.data[i2 + p];
                    img_data.data[i2 + p] = t;
                }
            }
        }
        realContext.putImageData(img_data, startX - img.width / 2, startY - img.height / 2);
    }
    realCanvas.onmousedown = null;
    realCanvas.onmouseup = null;
    realCanvas.onmousemove = null;
    realCanvas.onmouseout = null;
});

//垂直反转图片
vertical_rotate.addEventListener('click',function () {
    initColor();
    this.style.color = "#55f";
    if(flag) {
        var img_data = realContext.getImageData(startX - img.width / 2, startY - img.height / 2, img.width, img.height);
        var i, i2, t, h = img_data.height, w = img_data.width, h_2 = h / 2;
        for (var dx = 0; dx < w; dx++) {
            for (var dy = 0; dy < h_2; dy++) {
                i = (dy << 2) * w + (dx << 2);
                i2 = ((h - dy - 1) << 2) * w + (dx << 2);
                for (var p = 0; p < 4; p++) {
                    t = img_data.data[i + p];
                    img_data.data[i + p] = img_data.data[i2 + p];
                    img_data.data[i2 + p] = t;
                }
            }
        }
        realContext.putImageData(img_data, startX - img.width / 2, startY - img.height / 2);
    }

    realCanvas.onmousedown = null;
    realCanvas.onmouseup = null;
    realCanvas.onmousemove = null;
    realCanvas.onmouseout = null;
});

//选择颜色
color.addEventListener('click',function () {
    flag=0;
    initColor();
    colorText.style.color = "#55f";
    realCanvas.onmousedown = null;
    realCanvas.onmouseup = null;
    realCanvas.onmousemove = null;
    realCanvas.onmouseout = null;
})

//改变颜色
color.addEventListener('change',function () {
    flag=0;
    realContext.strokeStyle = this.value;
    realContext.fillStyle = this.value;
    cacheContext.strokeStyle = this.value;
    cacheContext.fillStyle = this.value;
});

//清除
clear.addEventListener('click',function () {
    initColor();
    this.style.color = "#55f";
    realContext.clearRect(0,0,800,600);
    realCanvas.onmousedown = null;
    realCanvas.onmouseup = null;
    realCanvas.onmousemove = null;
    realCanvas.onmouseout = null;
});

//保存
save.addEventListener('click',function () {
    initColor();
    this.style.color = "#55f";
    var dataURL = realCanvas.toDataURL("image/png");
    saveFile(dataURL,'image.jpg');

    realCanvas.onmousedown = null;
    realCanvas.onmouseup = null;
    realCanvas.onmousemove = null;
    realCanvas.onmouseout = null;
});

//保存实现
var saveFile = function(data, filename){
    var save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
    save_link.href = data;
    save_link.download = filename;

    var event = document.createEvent('MouseEvents');
    event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    save_link.dispatchEvent(event);
}
