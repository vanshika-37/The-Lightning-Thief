function Drop(x, y) {
    this.x = x;
    this.y = y;
    this.toDelete = false;

    this.show = function () {
        imageMode(CENTER);
        image(dropImg, this.x , this.y, 30, 30);
    }

    this.destroy1 = function () {
        this.toDelete = true;
    }

    this.hits = function (enemy) {
        var d = dist(this.x, this.y, enemy.x, enemy.y);
        if (d < 35) {
            return true;
        } else {
            return false;
        }
    }

    this.move = function () {
        this.y -=  5;
    }
}