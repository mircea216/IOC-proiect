import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-drawing-numbers',
  templateUrl: './drawing-numbers.component.html',
  styleUrls: ['./drawing-numbers.component.scss']
})
export class DrawingNumbersComponent{

    container:any;
    charscontainer:any;
     c:any;
     cx:any ;
     letter:any = null;
     fontsize = 300;
     paintcolour = [240, 240, 240];
     textcolour = [255, 30, 20];
     xoffset = 0;
     yoffset = 0;
     linewidth = 20;
     pixels :any = 0;
     letterpixels = 0;

     mousedown = false;
     touched = false;
     oldx = 0;
     oldy = 0;

     state = 'intro';
     sound = true;
     currentstate:any;
     startbutton:any ;
     infobutton :any;
     winbutton:any;
     reloadbutton:any;
     errorbutton:any;
     errorsound:any;
     winsound:any;
  
    ngAfterViewInit(){
      this.container = document.querySelector('#container') as HTMLDivElement;

      this.startbutton = document.querySelector('#intro button')!!.addEventListener('click', this.start, false);
      this.winbutton = document.querySelector('#win button')!!.addEventListener('click', this.winner, false);
      this.reloadbutton = document.querySelector('#reload')!!.addEventListener('click', this.cancel, false);
      this.errorbutton = document.querySelector('#error button')!!.addEventListener('click', this.retry, false);
   
       this.winsound = document.querySelector('#winsound') as HTMLAudioElement;
       this.errorsound = document.querySelector('#errorsound') as HTMLAudioElement;
       this.c = document.querySelector('canvas')
       this.cx = this.c.getContext('2d');

       console.log("da")
       this.xoffset = this.container.offsetLeft;
       this.yoffset = this.container.offsetTop;
       this.fontsize = this.container.offsetHeight / 1.5;
       this.linewidth = this.container.offsetHeight / 19;
       this.paintletter();
       this.setstate('intro');
    }

    showerror=()=> {
      this.setstate('error');
      if (this.sound) {
        let audio = new Audio();
        audio.src = "assets/error-126627.mp3";
        audio.load();
        audio.play();
      }
      if (navigator.vibrate) {
        navigator.vibrate(100);
      }
    }
  
    setstate(newstate:string) {
      this.state = newstate;
      this.container.className = newstate;
    }
    retry=(ev:any) =>{
      this.mousedown = false;
      this.oldx = 0;
      this.oldy = 0;
      this.paintletter(this.letter);
    }
    winner=()=> {
      this.paintletter();
    }
    start=()=> {
      this.paintletter(this.letter);
    }
    cancel=()=> {
      this.paintletter();
    }
    paintletter(retryletter?:string) {
      this.letter = retryletter || '4';
      this.c.width = this.container.offsetWidth;
      this.c.height = this.container.offsetHeight;
      this.cx.font = 'bold ' + this.fontsize + 'px Open Sans';
      this.cx.fillStyle = 'rgb(' + this.textcolour.join(',') + ')';
      this.cx.strokeStyle = 'rgb(' + this.paintcolour.join(',') + ')';
      this.cx.shadowOffsetX = 2;
      this.cx.shadowOffsetY = 2;
      this.cx.shadowBlur = 4;
      this.cx.shadowColor = '#666';
  
      this.cx.textBaseline = 'ideographic';
      this.cx.lineWidth = this.linewidth;
      this.cx.lineCap = 'round';
      this.cx.fillText(
        this.letter,
        (this.c.width - this.cx.measureText(this.letter).width) / 1.9,
        (this.c.height / 1.1)
      );
      this.pixels = this.cx.getImageData(0, 0, this.c.width, this.c.height);
      this.letterpixels = this.getpixelamount(
        this.textcolour[0],
        this.textcolour[1],
        this.textcolour[2]
      );
      this.cx.shadowOffsetX = 0;
      this.cx.shadowOffsetY = 0;
      this.cx.shadowBlur = 0;
      this.cx.shadowColor = '#333';
      this.setstate('play');
    }
  
    getpixelamount(r:any, g:any, b:any) {
      var pixels = this.cx.getImageData(0, 0, this.c.width, this.c.height);
      var all = pixels.data.length;
      var amount = 0;
      for (let i = 0; i < all; i += 4) {
        if (pixels.data[i] === r &&
            pixels.data[i+1] === g &&
            pixels.data[i+2] === b) {
          amount++;
        }
      }
      return amount;
    }
  
    paint(x:any, y:any) {
      var rx = x - this.xoffset;
      var ry = y - this.yoffset;
      var colour = this.pixelcolour(x, y);
      if( colour.r === 0 && colour.g === 0 && colour.b === 0) {
        this.showerror();
      } else {
        this.cx.beginPath();
        if (this.oldx > 0 && this.oldy > 0) {
          this.cx.moveTo(this.oldx, this.oldy);
        }
        this.cx.lineTo(rx, ry);
        this.cx.stroke();
        this.cx.closePath();
        this.oldx = rx;
        this.oldy = ry;
      }
    }
  
    pixelcolour(x:any, y:any) {
      var index = ((y * (this.pixels.width * 4)) + (x * 4));
      return {
        r:this.pixels.data[index],
        g:this.pixels.data[index + 1],
        b:this.pixels.data[index + 2],
        a:this.pixels.data[index + 3]
      };
    }
  
    pixelthreshold() {
      if (this.state !== 'error') {
        if (this.getpixelamount(
          this.paintcolour[0],
          this.paintcolour[1],
          this.paintcolour[2]
        ) / this.letterpixels > 0.50) {
         this.setstate('win');
         if (this.sound) {
            this.winsound.play().then(function() {
            }).catch(function(error:any) {
            });
         }
        }
      }
    }
  
  
    onmouseup=(ev:any) =>{
      ev.preventDefault();
      this.oldx = 0;
      this.oldy = 0;
      this.mousedown = false;
      this.pixelthreshold();
    }
    onmousedown=(ev:any) =>{
      ev.preventDefault();
      this.mousedown = true;
    }
    onmousemove=(ev:any)=> {
      ev.preventDefault();
      if (this.mousedown) {
        this.paint(ev.clientX, ev.clientY);
        ev.preventDefault();
      }
    }
  
  
  ontouchstart(ev:any) {
      this.touched = true;
    }
    ontouchend(ev:any) {
      this.touched = false;
      this.oldx = 0;
      this.oldy = 0;
      this.pixelthreshold();
    }
    ontouchmove(ev:any) {
      if (this.touched) {
        this.paint(
          ev.changedTouches[0].pageX,
          ev.changedTouches[0].pageY
        );
        ev.preventDefault();
      }
    }

}
