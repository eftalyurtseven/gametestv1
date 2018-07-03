/** 
 * @author: Eftal Yurtseven - http://e-yurtseven.net/gameDev/
 * @version: #beta
*/


class Game {
        
    constructor(){
        this.canvas = document.getElementById('canvas');
        this.context = this.canvas.getContext('2d');

        document.addEventListener('keydown', (e) => this.onKeyPress(e))

    }

    init(){

        this.positionX = this.positionY = 10;
        this.dotWidth = 5;
        this.trailSize = 1;
        this.score = 0;
        this.dotLocation = [];
        this.gridSize = this.tileCount = 20;
        this.velocityX = this.velocityY = 0;
        this.topLimit = 50;

        this.timer = setInterval(this.loop.bind(this), 1000/30);


    }

    loop(){

        this.update();

        this.draw();
   
    }

    reset(){
        clearInterval(this.timer);
        this.init();
    }

    update() {
        
        this.positionX += this.velocityX;
        this.positionY += this.velocityY;

        if ( this.positionX < 0 ){
            this.positionX = this.tileCount - 1;
        }

        if ( this.positionX > this.tileCount - 1 ) {
            this.positionX = 0;
        }

        if ( this.positionY < 0 ) {
            this.positionY = this.tileCount - 1;
        }

        if ( this.positionY > this.tileCount -1 ) {
            this.positionY = 0;
        }

        this.dotLocation.push({positionX: this.positionX, positionY: this.positionY});
        

        while(this.dotLocation.lenght > this.trailSize) {
            this.dotLocation.shift()
        }

        if ( this.topLimit <= 0 ) 
        {
            this.reset();
        }



    }

    draw(){
        this.context.fillStyle = 'black';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.context.fillStyle = 'red';
        this.context.font = '20px sans-serif';
       
        this.context.fillText(this.topLimit, 20, 35);

        this.context.fillStyle = 'rgba(255,255,255,0.9)';
        this.dotLocation.forEach(dt => {
            this.context.fillRect(dt.positionX * this.gridSize , dt.positionY * this.gridSize, this.gridSize - 5, this.gridSize - 5);
        });




    }

    onKeyPress(e){
        //console.log(e);
        if ( e.keyCode === 37 && this.velocityX !== 1 ) {
            this.velocityX = -1;
            this.velocityY = 0;
        }

        if ( e.keyCode == 38 && this.velocityY !== 1 ) {
            this.velocityX = 0;
            this.velocityY = -1;
        }

        if ( e.keyCode == 39 && this.velocityX !== -1 ){
            this.velocityX = 1;
            this.velocityY = 0;
        }

        if ( e.keyCode == 40 && this.velocityY !== -1 ) {
            this.velocityX = 0;
            this.velocityY = 1;
        }

        this.topLimit--;

        

    }



}