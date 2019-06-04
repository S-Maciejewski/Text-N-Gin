import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent implements OnInit {
  storyTitle: String = 'storyTitle';
  author: String = 'author';
  storyFile: String = 'story.json';
  story: any;
  currentNode: Number = 0;
  storyLoaded: Boolean = false;

  constructor(private http: Http) {

  }

  ngOnInit() {
    this.loadStory(this.storyFile);
  }

  async loadStory(storyFile) {
    this.http.get('../../../assets/' + storyFile).subscribe(res => {
      this.story = res.json();
      console.log('Story loaded: ', this.story);
      this.author = this.story.author;
      this.storyTitle = this.story.title;
      this.storyLoaded = true;
    });
  }

  getNodeText(): String {
    return this.story.nodes.filter(node => node.nodeID === this.currentNode)[0].text;
  }

  getNodeAnswers() {
    return this.story.nodes.filter(node => node.nodeID === this.currentNode)[0].answers;
  }
}
