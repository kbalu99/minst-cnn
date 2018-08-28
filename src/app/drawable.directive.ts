import {
  Directive,
  HostListener,
  HostBinding,
  ElementRef,
  Output,
  EventEmitter,
  OnInit
} from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';

@Directive({
  selector: '[drawable]'
})
export class DrawableDirective implements OnInit {
  pos = { x: 0, y: 0 };
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;

  @Output() newImage = new EventEmitter();

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.canvas = this.el.nativeElement as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d');    
  }

 
  @HostListener('touchend', ['$event'])
  @HostListener('mouseup', ['$event'])
  onUp(e) {
    this.newImage.emit(this.getImgData());
  }
   
  @HostListener('touchmove', ['$event'])
  @HostListener('mouseenter', ['$event'])
  onEnter(e) {
    this.setPosition(e);
  }
 
  @HostListener('touchmove', ['$event'])
  @HostListener('mousedown', ['$event'])
  onMove(e) {
    this.setPosition(e);
  }
  
  @HostListener('touchmove', ['$event'])
  @HostListener('mousemove', ['$event'])
  onDown(e) {

    if (e.buttons !== 1) {
      return;
    }
    
    this.ctx.beginPath(); // begin
    this.ctx.lineWidth = 10;
    this.ctx.lineCap = 'round';
    this.ctx.strokeStyle = '#111111';
    //console.log(this.pos.x, this.pos.y);
    this.ctx.moveTo(this.pos.x, this.pos.y);
    this.setPosition(e);
    this.ctx.lineTo(this.pos.x, this.pos.y);

    this.ctx.stroke();
  }

  @HostListener('touchmove', ['$event'])
  onTouchmove(e){
    this.newImage.emit(this.getImgData());
  }
  // @HostListener('touchstart', ['$event'])
  // @HostListener('touchmove', ['$event'])
  // onTouchmove(e){
  
  //   this.ctx.beginPath(); // begin
  //   this.ctx.lineWidth = 10;
  //   this.ctx.lineCap = 'round';
  //   this.ctx.strokeStyle = '#111111';
        
  //   console.log(e);
  //   console.log(e.type);
  //   console.log(e.changedTouches[0]);
  //   this.ctx.moveTo(e.touches[0].target.offsetLeft, e.touches[0].target.offsetTop);
  //   this.setPosition(e);
  //   this.ctx.lineTo(e.touches[0].target.offsetLeft, e.touches[0].target.offsetTop);

  //   this.ctx.stroke();
  // }

  @HostListener('resize', ['$event'])
  onResize(e) {
    this.ctx.canvas.width = window.innerWidth;
    this.ctx.canvas.height = window.innerHeight;
  }

  setPosition(e) {
    if (e.offsetX) {
      this.pos.x = e.offsetX;
      this.pos.y = e.offsetY;
   }
    else {
      this.pos.x = e.layerX;
      this.pos.y = e.layerY;
    }
  }

  clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  getImgData(): ImageData {
    const scaled = this.ctx.drawImage(this.canvas, 0, 0, 28, 28);
    return this.ctx.getImageData(0, 0, 28, 28);
  }
}