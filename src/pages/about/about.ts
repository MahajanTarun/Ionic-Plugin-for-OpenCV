import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions } from '@ionic-native/camera-preview';
// import { Camera, CameraOptions } from '@ionic-native/camera';


@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  picture:any;
	public options:CameraPreviewOptions = {
	  x: 40,
	  y: 220,
	  width: window.screen.width-70,
	  height: window.screen.height-300,
	  camera: 'rear',
	  tapPhoto: true,
	  previewDrag: false,
	  toBack: false,
	  alpha: 1
	}
  	public pictureOpts:CameraPreviewPictureOptions = {
	  width: 1280,
	  height: 1280,
	  quality: 85
	}
  constructor(public navCtrl: NavController,
  			  private cameraPreview: CameraPreview) {
  	console.log("\n\n\n\n\nScreen_Width:"+window.screen.width);
  	console.log("\n\n\n\n\nScreen_Height:"+window.screen.height);
  }

  startCamera(){
   	this.cameraPreview.startCamera(this.options).then(
	(res) => {
	  console.log('>>>>>>>>>>>>>>',res);
	},
	(err) => {
	  console.log('>>>>>>>error>>>>>>>',err);
	});
	  this.cameraPreview.show();
  }

  takePicture(){
    this.cameraPreview.takePicture(this.pictureOpts).then((imageData) => {
	  // console.log("\n\n\nPicture:"+imageData+"\n\n\n");
	  this.picture = 'data:image/jpeg;base64,' + imageData;
	   // (<HTMLInputElement>document.getElementById('previewPicture')).src = this.picture;
	  console.log("\n\n\nPicture_path:"+this.picture+"\n\n\n");
	  // this.processImg(this.picture);
    this.processImg(imageData);
	}, (err) => {
	  console.log(err);
	  // this.picture = 'assets/img/test.jpg';
	});
  }

  stopCamera(){
  	this.cameraPreview.stopCamera();
  }

  processImg(src){
  	// console.log("\n\n\n\n\n\n\n>>>>>>>>>>:"+src+"\n\n\n\n\n\n\n");
  	var image = new Image();
  	image.src = src;
  	console.log("\n\n\n\n\n\n>>>>>1234");

  	(<any>window).opencv.testStr(src).then((result)=>{
  		console.log("\n\n\n\n\n\n\nPLUGIN CALLED SUCCESSFULLY:"+result+"\n\n\n\n\n\n\n");
      (<HTMLInputElement>document.getElementById('previewPicture')).src = result;
      this.stopCamera();
  	}, (error)=>{
  		console.log("\n\n\n\n\n\n\n<><>Error:"+error+"\n\n\n\n\n\n\n");
  	});

  	// this.stopCamera();

   //  var input:string = src;
  	// (<any>window).opencv.greyImg(input).then((result)=>{
  	// 	console.log("Output from Plugin:",result);
  	// 	// (<HTMLInputElement>document.getElementById('previewPicture')).src = result;
   //    this.stopCamera();
  	// }, (error)=>{
  	// 	console.log("Plugin error:",error);
  	// });
  }
}
