import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import * as tf from '@tensorflow/tfjs';
import { DrawableDirective } from './drawable.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  
  model: tf.Model;

  //singlemodel: tf.Model;
  //layers: tf.layers;
  predictions: any;
  summary: any;
  // laypred1: tf.Tensor2D;

  // canvas1: HTMLCanvasElement;
  rectW:number = 50;
  rectH:number = 100;
  rectColor:string = "#FF0000";
  context1:CanvasRenderingContext2D;
  context2:CanvasRenderingContext2D;
  context3:CanvasRenderingContext2D;
  context4:CanvasRenderingContext2D;
  context5:CanvasRenderingContext2D;
  context6:CanvasRenderingContext2D;
  context7:CanvasRenderingContext2D;
  context8:CanvasRenderingContext2D;
  context9:CanvasRenderingContext2D;
  context10:CanvasRenderingContext2D;
  context11:CanvasRenderingContext2D;
  context12:CanvasRenderingContext2D;
  context13:CanvasRenderingContext2D;
  context14:CanvasRenderingContext2D;
  context15:CanvasRenderingContext2D;
  context16:CanvasRenderingContext2D;
  context17:CanvasRenderingContext2D;
  context18:CanvasRenderingContext2D;
  context19:CanvasRenderingContext2D;
  context20:CanvasRenderingContext2D;
  context21:CanvasRenderingContext2D;
  context22:CanvasRenderingContext2D;
  context23:CanvasRenderingContext2D;
  context24:CanvasRenderingContext2D;
  context25:CanvasRenderingContext2D;
  context26:CanvasRenderingContext2D;
  context27:CanvasRenderingContext2D;
  context28:CanvasRenderingContext2D;
  context29:CanvasRenderingContext2D;
  context30:CanvasRenderingContext2D;
  context31:CanvasRenderingContext2D;
  context32:CanvasRenderingContext2D;
 


  @ViewChild("newImage1") myCanvas1;
  @ViewChild("abcdImage") myCanvas2;
  @ViewChild("newImage3") myCanvas3;
  @ViewChild("newImage4") myCanvas4;
  @ViewChild("newImage5") myCanvas5;
  @ViewChild("newImage6") myCanvas6;
  @ViewChild("newImage7") myCanvas7;
  @ViewChild("newImage8") myCanvas8;
  @ViewChild("newImage9") myCanvas9;
  @ViewChild("newImage10") myCanvas10;
  @ViewChild("newImage11") myCanvas11;
  @ViewChild("newImage12") myCanvas12;
  @ViewChild("newImage13") myCanvas13;
  @ViewChild("newImage14") myCanvas14;
  @ViewChild("newImage15") myCanvas15;
  @ViewChild("newImage16") myCanvas16;
  @ViewChild("newImage17") myCanvas17;
  @ViewChild("newImage18") myCanvas18;
  @ViewChild("newImage19") myCanvas19;
  @ViewChild("newImage20") myCanvas20;
  @ViewChild("newImage21") myCanvas21;
  @ViewChild("newImage22") myCanvas22;
  @ViewChild("newImage23") myCanvas23;
  @ViewChild("newImage24") myCanvas24;
  @ViewChild("newImage25") myCanvas25;
  @ViewChild("newImage26") myCanvas26;
  @ViewChild("newImage27") myCanvas27;
  @ViewChild("newImage28") myCanvas28;
  @ViewChild("newImage29") myCanvas29;
  @ViewChild("newImage30") myCanvas30;
  @ViewChild("newImage31") myCanvas31;
  @ViewChild("newImage32") myCanvas32;
  @ViewChild(DrawableDirective) canvas;
  
  ngOnInit(){
    this.loadModel();  
  }

  async loadModel() {
    // Load a model
    this.model = await tf.loadModel('./assets/model.json');
  }

  async predict(imageData: ImageData) {
    const pred = await tf.tidy(() => {
      // convert canvas pixes to 
      let img = tf.fromPixels(imageData, 1);
      let img1 = img.reshape([1, 28, 28, 1]);
      img1 = tf.cast(img1, 'float32');
  
      //Make and format the predictions
      const output = this.model.predict(img1) as any;

      //visualize
     // const vis = this.model.
      //this.model.summary();

      //console.log(imageData);

      const ip = tf.input({shape: [28, 28, 1]}) as any;
      const conv = this.model.getLayer('conv2d_1') as any;
      const op = conv.apply(ip) as any;
      const singlemodel = tf.model({inputs: ip, outputs: op});
      const laypred = singlemodel.predict(img1) as any;

      //console.log(singlemodel);

      //console.log(img1);
      //console.log(conv);      
      //console.log(singlemodel);
      //console.log(laypred);
      //console.log(op);

      //laypred1 = laypred[26, 26][0];
      //var laypred1 = new Float32Array([]);
      var laypred1 = [];
      laypred1 = Array.from(laypred.dataSync());

      //console.log(laypred)
      //tf.keep(laypred1);
      //console.log('LAYERPRED1', laypred1);
      const max = Math.max(...laypred1);
      const min = Math.min(...laypred1);

      var canvasid = 1;
      for (var loop = 0; loop < 21632; loop = loop+676) {
      
      var newArr = [[]];

      //var i = 0;
      //var j = 0;
      //var k = 0;
      
      var k = loop;
      for (var i = 0; i < 26; i++) {
        newArr[i] = [];
        for (var j = 0; j < 26; j++) {
          k = k+32;
          newArr[i][j] = laypred1[k];          
        }         
      } 
      
      var imglinear = [];
      for (var i = 0; i < newArr.length; i++) {
        imglinear = imglinear.concat(newArr[i]);
      }
     
      let imglineardata = new Uint8ClampedArray(imglinear.length * 4)
      for (var i = 0; i < imglinear.length; i++) {
        imglineardata[i * 4] = 0;
        imglineardata[i * 4 + 1] = 0;
        imglineardata[i * 4 + 2] = 0;
        imglineardata[i * 4 + 3] = 255 * (imglinear[i] - min) / (max-min);
      }
      
      //console.log(newArr);
      //console.log(imglinear);
      //console.log(max);
      //console.log(min);
      //console.log(imglineardata);
      
      var convvis = new ImageData(imglineardata, 26, 26);
      console.log(canvasid);
      switch (canvasid) {
        case 1:
            const canvas1: HTMLCanvasElement = this.myCanvas1.nativeElement;
            this.context1 = canvas1.getContext("2d")!;
            canvasid++;              
            this.context1.putImageData(convvis, 0, 0);
            break;
        case 2:
            const canvas2: HTMLCanvasElement = this.myCanvas2.nativeElement;
            console.log('inside case 2');
            this.context2 = canvas2.getContext("2d")!;
            canvasid++;              
            this.context2.putImageData(convvis, 0, 0);
            break;
        case 3:
            const canvas3: HTMLCanvasElement = this.myCanvas3.nativeElement;
            this.context3 = canvas3.getContext("2d")!;
            canvasid++;              
            this.context3.putImageData(convvis, 0, 0);
            break;
        case 4:
            const canvas4: HTMLCanvasElement = this.myCanvas4.nativeElement;
            this.context4 = canvas4.getContext("2d")!;
            canvasid++;              
            this.context4.putImageData(convvis, 0, 0);
            break;
            case 5:
            const canvas5: HTMLCanvasElement = this.myCanvas5.nativeElement;
            this.context5 = canvas5.getContext("2d")!;
            canvasid++;              
            this.context5.putImageData(convvis, 0, 0);
            break;
        case 6:
            const canvas6: HTMLCanvasElement = this.myCanvas6.nativeElement;
            this.context6 = canvas6.getContext("2d")!;
            canvasid++;              
            this.context6.putImageData(convvis, 0, 0);
            break;
        case 7:
            const canvas7: HTMLCanvasElement = this.myCanvas7.nativeElement;
            this.context7 = canvas7.getContext("2d")!;
            canvasid++;              
            this.context7.putImageData(convvis, 0, 0);
            break;
        case 8:
            const canvas8: HTMLCanvasElement = this.myCanvas8.nativeElement;
            this.context8 = canvas8.getContext("2d")!;
            canvasid++;              
            this.context8.putImageData(convvis, 0, 0);
            break;
        case 9:
            const canvas9: HTMLCanvasElement = this.myCanvas9.nativeElement;
            this.context9 = canvas9.getContext("2d")!;
            canvasid++;              
            this.context9.putImageData(convvis, 0, 0);
            break;
        case 10:
            const canvas10: HTMLCanvasElement = this.myCanvas10.nativeElement;
            this.context10 = canvas10.getContext("2d")!;
            canvasid++;              
            this.context10.putImageData(convvis, 0, 0);
            break;
        case 11:
            const canvas11: HTMLCanvasElement = this.myCanvas11.nativeElement;
            this.context11 = canvas11.getContext("2d")!;
            canvasid++;              
            this.context11.putImageData(convvis, 0, 0);
            break;
        case 12:
            const canvas12: HTMLCanvasElement = this.myCanvas12.nativeElement;
            this.context12 = canvas12.getContext("2d")!;
            canvasid++;              
            this.context12.putImageData(convvis, 0, 0);
            break;
        case 13:
            const canvas13: HTMLCanvasElement = this.myCanvas13.nativeElement;
            this.context13 = canvas13.getContext("2d")!;
            canvasid++;              
            this.context13.putImageData(convvis, 0, 0);
            break;
        case 14:
            const canvas14: HTMLCanvasElement = this.myCanvas14.nativeElement;
            this.context14 = canvas14.getContext("2d")!;
            canvasid++;              
            this.context14.putImageData(convvis, 0, 0);
            break;
        case 15:
            const canvas15: HTMLCanvasElement = this.myCanvas15.nativeElement;
            this.context15 = canvas15.getContext("2d")!;
            canvasid++;              
            this.context15.putImageData(convvis, 0, 0);
            break;
        case 16:
            const canvas16: HTMLCanvasElement = this.myCanvas16.nativeElement;
            this.context16 = canvas16.getContext("2d")!;
            canvasid++;              
            this.context16.putImageData(convvis, 0, 0);
            break;
        case 17:
            const canvas17: HTMLCanvasElement = this.myCanvas17.nativeElement;
            this.context17 = canvas17.getContext("2d")!;
            canvasid++;              
            this.context17.putImageData(convvis, 0, 0);
            break;
        case 18:
            const canvas18: HTMLCanvasElement = this.myCanvas18.nativeElement;
            this.context18 = canvas18.getContext("2d")!;
            canvasid++;              
            this.context18.putImageData(convvis, 0, 0);
            break;
        case 19:
            const canvas19: HTMLCanvasElement = this.myCanvas19.nativeElement;
            this.context19 = canvas19.getContext("2d")!;
            canvasid++;              
            this.context19.putImageData(convvis, 0, 0);
            break;
        case 20:
            const canvas20: HTMLCanvasElement = this.myCanvas20.nativeElement;
            this.context20 = canvas20.getContext("2d")!;
            canvasid++;              
            this.context20.putImageData(convvis, 0, 0);
            break;
        case 21:
            const canvas21: HTMLCanvasElement = this.myCanvas21.nativeElement;
            this.context21 = canvas21.getContext("2d")!;
            canvasid++;              
            this.context21.putImageData(convvis, 0, 0);
            break;
        case 22:
            const canvas22: HTMLCanvasElement = this.myCanvas22.nativeElement;
            this.context22 = canvas22.getContext("2d")!;
            canvasid++;              
            this.context22.putImageData(convvis, 0, 0);
            break;
        case 23:
            const canvas23: HTMLCanvasElement = this.myCanvas23.nativeElement;
            this.context23 = canvas23.getContext("2d")!;
            canvasid++;              
            this.context23.putImageData(convvis, 0, 0);
            break;
        case 24:
            const canvas24: HTMLCanvasElement = this.myCanvas24.nativeElement;
            this.context24 = canvas24.getContext("2d")!;
            canvasid++;              
            this.context24.putImageData(convvis, 0, 0);
            break;
        case 25:
            const canvas25: HTMLCanvasElement = this.myCanvas25.nativeElement;
            this.context25 = canvas25.getContext("2d")!;
            canvasid++;              
            this.context25.putImageData(convvis, 0, 0);
            break;
        case 26:
            const canvas26: HTMLCanvasElement = this.myCanvas26.nativeElement;
            this.context26 = canvas26.getContext("2d")!;
            canvasid++;              
            this.context26.putImageData(convvis, 0, 0);
            break;
        case 27:
            const canvas27: HTMLCanvasElement = this.myCanvas27.nativeElement;
            this.context27 = canvas27.getContext("2d")!;
            canvasid++;              
            this.context27.putImageData(convvis, 0, 0);
            break;
        case 28:
            const canvas28: HTMLCanvasElement = this.myCanvas28.nativeElement;
            this.context28 = canvas28.getContext("2d")!;
            canvasid++;              
            this.context28.putImageData(convvis, 0, 0);
            break;
        case 29:
            const canvas29: HTMLCanvasElement = this.myCanvas29.nativeElement;
            this.context29 = canvas29.getContext("2d")!;
            canvasid++;              
            this.context29.putImageData(convvis, 0, 0);
            break;
        case 30:
            const canvas30: HTMLCanvasElement = this.myCanvas30.nativeElement;
            this.context30 = canvas30.getContext("2d")!;
            canvasid++;              
            this.context30.putImageData(convvis, 0, 0);
            break;
        case 31:
            const canvas31: HTMLCanvasElement = this.myCanvas31.nativeElement;
            this.context31 = canvas31.getContext("2d")!;
            canvasid++;              
            this.context31.putImageData(convvis, 0, 0);
            break;
        case 32:
            const canvas32: HTMLCanvasElement = this.myCanvas32.nativeElement;
            this.context32 = canvas32.getContext("2d")!;
            canvasid++;              
            this.context32.putImageData(convvis, 0, 0);
            break;
        default:
            break;
      }


      
      //var ctx = this.context;
      

    }


/*       async convertTypedArray(src, type) {
        var buffer = new ArrayBuffer(src.byteLength);
        var baseView = new src.constructor(buffer).set(src1);
        return new type(buffer);
      } */

      
      //var buffer = new ArrayBuffer(laypred1.byteLength);
      //var baseView = new laypred1.constructor(buffer).set(laypred1);
      //const ret = new Uint8ClampedArray(laypred1);

      //var newArr1 = this.convertTypedArray(newArr, Uint8ClampedArray);
/*       for (var i = 0; i < 26; i++) {
        for (var j = 0; j < 26; j++) {
          convvis.data[(i*26*4+j*4)] = newArr[i][j];

          // 0,0 - 4  0,1 - 8  0,3 - 12
        
        }         
      }  */
      //console.log(laypred1);



      //this.context.clearRect(0, 0, 400, 400);
      //this.context.fillStyle = this.rectColor;
      //this.context.fillRect(0, 0, this.rectW, this.rectH);

/*       for (i=0; i < )
      for (var k = 0; k < 32; k+32) {
        console.log(laypred1[k]);
        newArr.push(laypred1[k]);
      } 
 */

      
      //while(laypred1.length) newArr.push((laypred1.splice(0,1)).splice(0,26));

      //console.log(newArr);


      //tf.toPixels(newArr, canvas1);
      
      //console.log(buffer);
      //console.log(ret);

      //save predictions on the component
      this.predictions = Array.from(output.dataSync());
      //this.summary = Array.from(modelsummary.dataSync());
  
    });
    
  }
}


