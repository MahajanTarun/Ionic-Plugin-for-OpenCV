import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
// import { Transfer, TransferObject } from '@ionic-native/transfer';
// import { FilePath } from '@ionic-native/file-path';
import { AndroidPermissions } from '@ionic-native/android-permissions';

declare let navigator: any;

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
	public selection :string;

  constructor(private androidPermissions: AndroidPermissions,
          public navCtrl: NavController,
  				private camera: Camera,
  				private file: File) {
  	 // this.selection = "camera-thmb";
     this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(
        result => console.log('Has permission?',result.hasPermission),
        err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA)
      );
     this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE).then(
        result => console.log('Has permission?',result.hasPermission),
        err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE)
      );
     this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE).then(
        result => console.log('Has permission?',result.hasPermission),
        err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE)
      );
     this.cameraFrames();
  }

  setOptions(srcType){
  	var options: CameraOptions = {
  	  quality: 100,
  	  destinationType: this.camera.DestinationType.FILE_URI,
  	  // In this app, dynamically set the picture source, Camera or photo gallery
      sourceType: srcType,
  	  encodingType: this.camera.EncodingType.JPEG,
  	  mediaType: this.camera.MediaType.PICTURE,
  	  allowEdit: false,
      correctOrientation: true,  //Corrects Android orientation quirks
  	  saveToPhotoAlbum: true
  	}
  	return options;
  }

  cameraFrames(){

    const constraints = {
      video: true
    };

    const video = document.querySelector('video');

    navigator.mediaDevices.getUserMedia(constraints).
      then((stream) => {video.srcObject = stream});

  }

  //Take a photo and retrieve the image's file location
  // Take a Picture and Return Thumbnails (Resize the Picture)
  openCamera(selection){
  	// var srcType = this.camera.PictureSourceType.CAMERA;
  	// var options = this.setOptions(srcType);

   //  // var func = createNewFileEntry;

   //  if (selection == "camera-thmb") {
   //      options.targetHeight = 100;
   //      options.targetWidth = 100;
   //  }
   var new_options: CameraOptions = {
      mediaType: this.camera.MediaType.ALLMEDIA
    }

    this.camera.getPicture(new_options).then((imageSrc) => {
  	 console.log("\n\n\nImage:"+imageSrc);
     // this.getFileEntry(imageSrc);
     this.getGreyImg(imageSrc);
  	 // this.displayImage(imageSrc);

  	 // If it's base64 (DATA_URL):
  	 // let base64Image = 'data:image/jpeg;base64,' + imageSrc;
  	}, (err) => {
  	 console.log("\n\n\nSome error occurred:"+err);
  	});
  }

  displayImage(imgUri){
  	(<HTMLInputElement>document.getElementById('previewPicture')).src = imgUri;
  }

  //Select a File from the Picture Library
  // Select an Image and Return Thumbnails (resized images)
  openFilePicker(selection){
  	var srcType = this.camera.PictureSourceType.SAVEDPHOTOALBUM;
  	var options = this.setOptions(srcType);
    // var func = createNewFileEntry;

    if (selection == "camera-thmb") {
        options.targetHeight = 100;
        options.targetWidth = 100;
    }

  	this.camera.getPicture(options).then((imageSrc) => {
	 console.log("\n\n\nGetPicture:"+imageSrc);
     this.getFileEntry(imageSrc);
     // this.getGreyImg(imageSrc);
	 // If it's base64 (DATA_URL):
	 // let base64Image = 'data:image/jpeg;base64,' + imageSrc;
	}, (err) => {
	 console.log("\n\n\nSome error occurred:"+err);
	});
  }

  // Take a picture and get a FileEntry Object
  getFileEntry(imgUri){
  	this.file.resolveLocalFilesystemUrl(imgUri).then(res=>{
  		console.log("\n\n\ngot file: " + JSON.stringify(res));
      this.getGreyImg(res.nativeURL);
  	}, err=>{
  		console.log("\n\n\nError occurred at getFileEntry:"+err);
  		this.createNewFileEntry(imgUri);
  	});
  }

  // if you don't get a valid FileEntry object
  createNewFileEntry(imgUri){
  	this.file.resolveLocalFilesystemUrl(this.file.cacheDirectory).then((res)=>{
  		// Do something with it, like write to it, upload it, etc.
        // writeFile(fileEntry, imgUri);
        console.log("\n\n\ngot file: "+res.fullPath);
        // displayFileData(fileEntry.fullPath, "File copied to");
  	}, (err)=>{
  		// onErrorResolveUrl
  	});
  }

  getGreyImg(src){
    (<any>window).opencv.rgbToGrey(src, (result)=>{
      console.log("\n\n\n\n\n\n\nPLUGIN CALLED SUCCESSFULLY:"+result+"\n\n\n\n\n\n\n");
      (<HTMLInputElement>document.getElementById('previewPicture')).src = result;
      
    }, (error)=>{
      console.log("\n\n\n\n\n\n\n<><>Error:"+error+"\n\n\n\n\n\n\n");
    });

    // (<any>window).opencv.strTest(src).then((result)=>{
    //   console.log("\n\n\n\n\n\n\nPLUGIN CALLED SUCCESSFULLY:"+result+"\n\n\n\n\n\n\n");
    //   // (<HTMLInputElement>document.getElementById('previewPicture')).src = result;
      
    // }, (error)=>{
    //   console.log("\n\n\n\n\n\n\n<><>Error:"+error+"\n\n\n\n\n\n\n");
    // });
  }

 
}
