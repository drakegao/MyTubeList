import { Component, OnInit, Input } from '@angular/core';
import { VideoProperty } from '../video-property';
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import { Pipe, PipeTransform } from '@angular/core';

import { VideoServiceComponent } from '../video-service/video-service.component';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})

export class VideoPlayerComponent implements OnInit {
  
  @Input() video: VideoProperty;

  constructor( private videoService: VideoServiceComponent ) { }

  save(e) {
  	this.videoService.findOne(this.video._id, this.video.userName).subscribe(res => {
  		if(Array.isArray(res) || res !== null) {
  			console.log('existed');
  			return;

  		} else if(res === null) {
        this.video.userName = localStorage.getItem("userName");
        console.log(this.video);
  			this.videoService.safeVideo(this.video)
  							 .subscribe(res => {
  							 	console.log("saved");
  							 	console.log(res);
  							 });
  		} 
  		e.preventDefault();
  	});
  }

  ngOnInit() {
  }

}
