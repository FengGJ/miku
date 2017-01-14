//人物
function person(canvas, cobj, runs, jump, di, background, hua) {
    this.canvas = canvas;
    this.cobj = cobj;
    this.runs = runs;
    this.jump = jump;
    this.hua = hua;
    this.x = 5;
    this.y = 420;
    this.status = "runs";
    this.state = 0;
    this.width = 110;
    this.height = 105;
    this.speedx = 8;
    this.bgx = 8;
    this.num = 0;
    this.life = 5;
}
person.prototype = {
    draw: function () {

        this.cobj.save();
        this.cobj.translate(this.x, this.y);
        // 图片，哪多大的图片，放到多大的容器
        this.cobj.drawImage(this[this.status][this.state], 0, 0, 83, 74, 0, 0, this.width, this.height);


        this.cobj.restore()
    }
}
//游戏主类
function game(canvas, cobj, runs, jump, di, background, hinderImg, hua, cong, huaxing, jumpa, pengzhuang, bg) {

    this.canvas = canvas;


    this.huaxing = huaxing;
    this.pengzhuang = pengzhuang;
    this.jumpa = jumpa;
    this.bg = bg;

    this.cobj = cobj;
    this.hinderImg = hinderImg;
    this.canvasw = canvas.width;
    this.canvash = canvas.height;
    this.di = di;
    this.background = background;
    this.cong = cong;
    this.hua = hua;
    this.bullet = new bullet(canvas, cobj, cong);
    this.person = new person(canvas, cobj, runs, jump, di, background, hua);

    this.hinderArr = [];//用数组保存障碍物
    this.isfire = false;
    this.score = 0;

    this.scoreflag = true;
    this.scoreF = true;

    this.syFlag = true;

    this.flag = true;

    this.num = 0;
    this.back = 0;
    this.backnum = 0;

    this.palyFlag = true;

    this.ptime;
    this.t1;
    this.t;


    this.mflag = true;


    this.rand = (2 + Math.ceil(Math.random())) * 1000;

    this.fntime = 20;
    this.scorenum = 1;
    this.name;
}


game.prototype = {

    play: function (name) {

        this.name = name;
        var that = this;
        this.ptime = setInterval(function () {
            that.move();
        }, this.fntime);
        this.key();
        this.click();
        // that.keyjump()
    },
    move: function () {
        var that = this;
        if (!this.mflag) {
            return;
        }
        if (that.syFlag) {
            that.bg.play()

        } else {
            that.bg.pause()

        }
        that.num += 50;

        that.back -= that.person.bgx;
        that.backnum -= 2;

        that.cobj.clearRect(0, 0, that.canvasw, that.canvash);
        //显示图片
        if (that.person.status == "runs") {
            if (that.person.num >= 8) {
                that.person.num = 0;
            }
            that.person.state = that.person.num;
        } else if (that.person.status == "jump") {
            that.person.state = 4;
        } else if (that.person.status == "hua") {
            that.person.state = 0;

        }

        //人物X坐标改变
        that.person.x += that.person.speedx;
        if (that.person.x > that.canvasw / 8) {
            that.person.speedx = 4;
            that.person.x += that.person.speedx;

            that.person.x = that.canvasw / 8
        }
        that.person.draw();

        //背景移动
        that.di.style.backgroundPositionX = that.back + "px";
        that.background.style.backgroundPositionX = (that.backnum) + "px";


        //障碍物


        if (that.num % that.rand == 0) //5000时间必须能够被50整除
        {

            that.rand = (2 + Math.ceil(1 * Math.random())) * 1000;
            that.num = 0;
            var obj = new hinder(that.canvas, that.cobj, that.hinderImg);

            //向下取整 随机取照片
            obj.state = Math.floor(Math.random() * that.hinderImg.length);
            that.hinderArr.push(obj);
        }
        for (var i = 0; i < that.hinderArr.length; i++) {
            that.hinderArr[i].x -= that.hinderArr[i].speedx;
            that.hinderArr[i].draw();

            //判断碰撞

            if (hitPix(that.canvas, that.cobj, that.person, that.hinderArr[i])) {

                //判断让每个障碍物指出发一次
                if (that.hinderArr[i].lifeFlag) {
                    if (that.syFlag) {
                        that.pengzhuang.play();

                    } else {
                        that.pengzhuang.pause();

                    }
                    that.hinderArr[i].lifeFlag = false;
                    //出血
                    bloods(that.cobj, that.person.x + that.person.width / 2 + 23, that.person.y + that.person.height / 2 - 9);

                    //减少生命
                    that.person.life--;
                    that.xuetiao();
                    if (that.person.life < 0) {

                        var messages = localStorage.messages ? JSON.parse(localStorage.messages) : [];
                        var temp = [{name: that.name, score: that.score*100}];
                        if (messages.length>0){
                            messages.sort(function (a,b) {

                                return b-a;
                            });
                            if (messages.length<5){
                                messages.push(temp)
                            }else {
                                messages[messages.length-1]=temp
                            }

                        }else if (messages.length==0){
                            messages.push(temp)
                        }
                        var msg=JSON.stringify(messages);
                        localStorage.messages=msg;

                        that.over()
                        }

                    that.hinderArr[i].flag = true;
                }

            }
            if (that.person.x > (that.hinderArr[i].x + that.hinderArr[i].width)) {
                if (!that.hinderArr[i].flag) {

                    that.score++;
                    that.fengshu(that.score * 100);
                    that.hinderArr[i].flag = true;
                }
            }


        }
        that.person.num++;


        if (that.isfire) {

            //让子弹移动

            that.bullet.speedx += that.bullet.jia;
            that.bullet.x += that.bullet.speedx;

            that.bullet.draw();

            // if(that.bullet)
        }

    },
    key: function () {

        var that = this;

        $(window).keydown(function (e) {
            if (!that.mflag) {
                return;
            }
            var speedy = 1;
            var inita = 0;
            var r = 130;
            var intiY = that.person.y;
            var time = 0;
            if (e.keyCode == 32 || e.keyCode == 38 || e.keyCode == 87) {

                if (that.syFlag) {
                    that.jumpa.play();
                } else {
                    that.jumpa.pause();

                }
                if (!that.flag) {
                    return;
                }
                that.flag = false;
                that.person.status = "jump";
                that.t = setInterval(function () {
                    inita += speedy;
                    if (inita > 180) {
                        inita = 0;
                        stone(that.cobj, that.person.x + that.person.width / 2 + 5, that.person.y + that.person.height - 8);
                        clearInterval(that.t);
                        that.flag = true;
                        that.person.status = "runs";
                        that.scoreF = true;
                    } else {
                        var jumpTop = Math.sin(inita * Math.PI / 180) * r;
                        that.person.y = intiY - jumpTop;


                    }

                }, 1)
            } else if (e.keyCode == 40 || e.keyCode == 83) {

                if (that.syFlag) {
                    that.huaxing.play();
                } else {
                    that.huaxing.pause();

                }

                if (!that.flag) {
                    return;
                }
                that.flag = false;


                that.person.status = "hua";

                that.t1 = setInterval(function () {
                    time += speedy;
                    if (time > 170) {
                        that.person.y -= 2;
                        // console.log(that.person.y);
                    }
                    else if (time < 2) {
                        that.person.y += 60;
                        // console.log(that.person.y)
                    }
                    else {
                        var obj = new fire(that.cobj);
                        obj.speedy = 3;
                        // stone(that.cobj, that.person.x + that.person.width / 2+5, that.person.y + that.person.height-8)
                        that.bullet.y = that.person.y + that.person.height / 2 - 50;
                    }
                    if (time == 200) {
                        that.flag = true;
                        clearInterval(that.t1);
                        that.person.status = "runs";
                        that.scoreF = true;
                    }

                }, 1)


            }
        })

    },
    click: function () {

        var that = this;
        $(window).keydown(function (e) {
            if (e.keyCode == 74) {
                //点击 确定 子弹出现的位置
                that.bullet.x = that.person.x + that.person.width;
                that.bullet.y = that.person.y + that.person.height / 2 - 15;


                //让子弹速度保持恒定

                that.bullet.speedx = 5;
                that.isfire = true;
            }
            // that.bullet.draw();
        })
    },
    shengying: function (val) {

        this.syFlag = val;
    },
    zt: function (val) {
        if (this.palyFlag) {
            clearInterval(this.ptime);
            clearInterval(this.t);
            clearInterval(this.t1);
            this.huaxing.pause();
            this.pengzhuang.pause();
            this.jumpa.pause();
            this.bg.pause();
            this.palyFlag = val;
            this.syFlag = val;
            this.mflag = val;
        } else {
            this.ptime = setInterval(()=> {
                this.move();
            }, 20)
            this.person.status = "runs";
            this.person.state = 4;
            this.flag = true;

            this.person.y = 420;
            this.palyFlag = val;
            this.syFlag = val;
            this.mflag = val;
            this.key()

        }
    },
    xuetiao: function () {
        $(".life span:last-child").remove();
    },
    fengshu: function (val) {
        $(".score span").text(val);
        if (val > this.scorenum * 1500) {
            console.log(this.scorenum)
            this.scorenum++;

            if (this.fntime < 14) {
                this.fntime = 14;
            } else {
                this.fntime -= 2;
            }
            clearInterval(this.ptime);
            this.ptime = setInterval(()=> {
                this.move();
            }, this.fntime);
        }
    },
    over:function () {
        $(".over").addClass("active");
        $(".over>div:nth-child(2)").find("span").text(this.score*100);
        var messages = localStorage.messages ? JSON.parse(localStorage.messages) : [];
        for(var i = 0 ; i<5;i ++){
            $(`<li>
            <div class="user">`+messages[i][0].name+`</div>
            <div class="feng">`+messages[i][0].score+`</div>
        </li>`).appendTo(".over ul")
        }
        clearInterval(this.ptime);
        clearInterval(this.t);
        clearInterval(this.t1);
        this.huaxing.pause();
        this.pengzhuang.pause();
        this.jumpa.pause();
        this.bg.pause();
        this.palyFlag = false;
        this.syFlag = false;
        this.mflag = false;
    }
    /*again:function(canvas, cobj, runs, jump, di, background, hinderImg, hua, cong, huaxing, jumpa, pengzhuang,bg){
     this.canvas = canvas;


     this.huaxing = huaxing;
     this.pengzhuang = pengzhuang;
     this.jumpa = jumpa;
     this.bg=bg;

     this.cobj = cobj;
     this.hinderImg = hinderImg;
     this.canvasw = canvas.width;
     this.canvash = canvas.height;
     this.di = di;
     this.background = background;
     this.cong = cong;
     this.hua = hua;

     this.person = new person(canvas, cobj, runs, jump, di, background, hua);
     this.bullet = new bullet(canvas, cobj, cong);
     this.person.y=420;


     this.hinderArr = [];//用数组保存障碍物
     this.isfire = false;
     this.score = 0;

     this.scoreflag = true;

     this.syFlag=true;

     this.flag = true;

     this.num = 0;
     this.back = 0;
     this.backnum = 0;

     this.palyFlag=true;





     this.mflag=true;


     this.rand = (2 + Math.ceil(Math.random())) * 1000;


     this.move();

     }*/
}

//障碍物       确定 宽高，位置，每次移动的距离
function hinder(canvas, cobj, hinderImg) {
    this.canvas = canvas;
    this.cobj = cobj;
    this.hinderImg = hinderImg;
    this.x = this.canvas.width - 40;
    this.y = 452;
    this.width = 60;
    this.height = 65;
    this.speedx = 10;
    this.speedy = 100 * Math.random();
    this.state = 0;  //障碍物的下标
    this.lifeFlag = true;
}

hinder.prototype = {
    draw: function () {
        this.random();
        this.cobj.save();
        this.cobj.translate(this.x, this.y - this.speedy);
        this.cobj.drawImage(this.hinderImg[this.state], 0, 0, 40, 45, 0, 0, this.width, this.height);
        this.cobj.restore();
    },
    random: function () {
        if (this.speedy > 50) {
            this.speedy = 60;
        } else {
            this.speedy = 0;
        }
    }
}

//冒血
function blood(cobj) {
    this.cobj = cobj;
    this.r = 3 + 3 * Math.random();
    this.x = 50;
    this.y = 50;
    this.x1 = 20 * Math.random() - 10;
    this.y1 = 20 * Math.random() - 10;
    this.x2 = 20 * Math.random() - 10;
    this.y2 = 20 * Math.random() - 10;
    this.speedx = 6 * Math.random() - 3;
    this.speedy = 4 * Math.random() - 2;
    this.gravity = .3;
    this.speedr = .4;
    this.color = "red";
}
blood.prototype = {
    draw: function () {
        this.cobj.save();
        this.cobj.fillStyle = this.color;
        this.cobj.beginPath();
        this.cobj.translate(this.x, this.y);
        this.cobj.arc(0, 0, this.r, 0, 2 * Math.PI);
        this.cobj.fill();
        this.cobj.restore();
        this.update();
    },
    dust: function () {
        var cobj = this.cobj;
        cobj.save();
        cobj.beginPath();
        cobj.fillStyle = this.color;
        cobj.translate(this.x, this.y);
        cobj.scale(this.r, this.r);
        cobj.moveTo(0, 0);
        //cobj.bezierCurveTo(this.x1,this.y1,this.x2,this.y2,0,0);
        cobj.lineTo(this.x1, this.y1);
        cobj.lineTo(this.x2, this.y2);
        cobj.fill();
        cobj.restore();
        this.update();
    },
    update: function () {
        this.speedy += this.gravity;
        this.x += this.speedx;
        this.y += this.speedy;
        this.r -= this.speedr;
    }
}

function bloods(cobj, x, y) {
    var arr = [];
    for (var i = 0; i < 30; i++) {
        var xue = new blood(cobj);
        xue.x = x;
        xue.y = y;
        arr.push(xue);

    }
    var that = this;
    var t1 = setInterval(function () {
        for (var i = 0; i < arr.length; i++) {
            arr[i].draw();

            if (arr[i].r < 0) {
                //删除
                arr.splice(i, 1);
            }
        }
        if (arr.length == 0) {
            clearInterval(t1);
        }

    }, 50)
}

// 尘埃
function fire(cobj) {
    this.cobj = cobj
    this.x = 0;
    this.y = 0;
    this.x1 = 20 * Math.random() - 10;
    this.y1 = 20 * Math.random() - 10;
    this.x2 = 20 * Math.random() - 10;
    this.y2 = 20 * Math.random() - 10;
    this.speedy = -2 - Math.random() - 2;
    this.speedx = (16 * Math.random() - 8);
    this.life = 4;
    this.r = 1;
    this.color = "#fef";
}
fire.prototype = {
    draw: function () {
        var cobj = this.cobj;
        cobj.save();
        cobj.beginPath();
        cobj.fillStyle = this.color;
        cobj.translate(this.x, this.y);
        cobj.scale(this.r, this.r)
        cobj.moveTo(0, 0);
        //cobj.bezierCurveTo(this.x1,this.y1,this.x2,this.y2,0,0);
        cobj.lineTo(this.x1, this.y1);
        cobj.lineTo(this.x2, this.y2);
        cobj.fill();
        cobj.restore();
    },
    update: function () {
        this.x += this.speedx;
        this.y += this.speedy;
        this.life -= 0.2;
        this.r -= 0.06;
    }
}

function stone(cobj, x, y, color) {
    var color = color || "#C2C2C2";
    var stoneArr = [];
    for (var i = 0; i < 8; i++) {
        var obj = new fire(cobj);
        obj.x = x;
        obj.y = y;
        obj.color = color;
        stoneArr.push(obj);
    }
    var t = setInterval(function () {
        for (var i = 0; i < stoneArr.length; i++) {
            stoneArr[i].draw();
            stoneArr[i].update();
            if (stoneArr[i].r < 0 || stoneArr[i].life < 0) {
                stoneArr.splice(i, 1);
            }
        }
        if (stoneArr.length == 0) {
            clearInterval(t);
        }
    }, 50)
}


//子弹
function bullet(canvas, cobj, cong) {
    this.canvas = canvas;
    this.cong = cong;
    this.x = 0;
    this.y = 0;
    this.width = 109;
    this.height = 31;
    this.color = "#fff";
    this.cobj = cobj;
    this.speedx = 5;
    this.speedy = 5;
    this.jia = 1;

}
bullet.prototype = {
    draw: function () {
        this.cobj.save();
        this.cobj.translate(this.x, this.y);
        // this.cobj.fillRect(0,0,this.width,this.height);
        this.cobj.drawImage(this.cong[0], 0, 0, 339, 171, 0, 0, this.width, this.height);
        this.cobj.restore();
    },
    /*update:function (){
     this.speedx+=this.jia;
     this.x+=this.speedx;
     }*/
}