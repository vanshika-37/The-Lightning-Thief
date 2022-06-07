function Percy() {
    this.x = width / 2;
    this.y = height - 70;
    this.xdir = 0;


    this.show = function () {
        imageMode(CENTER);
        image(percyImg, this.x, this.y, 170, 130);
    }

    this.setDir = function (dir) {
        this.xdir = dir;
    }

    this.move = function (dir) {
        this.x += this.xdir * 3;
    }
}