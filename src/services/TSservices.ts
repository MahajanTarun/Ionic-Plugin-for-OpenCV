// // import { Component } from '@angular/core';
// // import { NavController } from 'ionic-angular';
// // import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions } from '@ionic-native/camera-preview';
// // import { Camera, CameraOptions } from '@ionic-native/camera';
// import * as Posenet from '@tensorflow-models/posenet';
// // const imageScaleFactor = 0.5;


// export class TSservices {
//   const imageScaleFactor = 0.5;
//   const outputStride = 16;
//   const flipHorizontal = false;

//   constructor(public posenet: Posenet){}

//   async estimatePoseOnImage(){
//     // load the posenet model from a checkpoint
//     const net = this.posenet.load();
//     const pose = await net.estimateSinglePose(imageElement, imageScaleFactor, flipHorizontal, outputStride);
//     return pose;
//   }
// }
