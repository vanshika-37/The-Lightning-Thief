function Enemy(x, y) {
    this.x = x;
    this.y = y;
    this.xdir = 2;
    this.toDelete1 = false;

    this.show = function () {
        imageMode(CENTER);
        image(enemyImg ,this.x, this.y, 40, 40);
    }

    this.destroy2 = function () {
        this.toDelete1 = true;
    }

    this.shiftDown = function () {
        this.xdir *= -1;
        this.y += 60;
    }

    this.move = function () {
        this.x += this.xdir;
    }
}