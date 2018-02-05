import { Component, OnInit } from '@angular/core';
import { FeedService } from './feed.service';
import { FeedEntry } from './model/feed-entry';

// Add the RxJS Observable operators we need in this app.
import './rxjs-operators';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    
    feedUrl: string = 'http://www.feedforall.com/sample.xml';
    feeds: Array<FeedEntry> = [];
    InputRssFeed: string;
    feedUrls: Array<string> = [];
    selected: number;
    
    constructor (private feedService: FeedService){}
    
    ngOnInit() {
        if(localStorage.length > 0) {
            let storedList = localStorage.getItem("feed URL");
            this.feedUrls = JSON.parse(storedList);
        }
    }
    
    refreshFeed() {
        this.feeds.length = 0;
        // Adds 1s of delay to provide user's feedback.
        this.feedService.getFeedContent(this.feedUrl).delay(1000)
            .subscribe(
                feed => this.feeds = feed.items,
                error => console.log(error));
        if(this.feedUrls.indexOf(this.feedUrl) !== -1) {
            console.log('the url exist in the list');
        } else {
            this.feedUrls.unshift(this.feedUrl);
            localStorage.setItem("feed URL", JSON.stringify(this.feedUrls));
        }
    }  
    
    getClickedFeed(i) {
        this.feeds.length = 0;
        this.feedService.getFeedContent(this.feedUrls[i]).delay(1000)
            .subscribe(
                feed => this.feeds = feed.items,
                error => console.log(error));
        this.feedUrl = this.feedUrls[i];
        this.selected = i; 
    }

    
    // When clicking on an item (URL) from the feed list, it get an “active” class
    isActive(item) {
        return this.selected === item;
    }
    
    // Delete Feed by index
    deleteFeed(i) {
        this.feedUrls.splice(i, 1);
        localStorage.setItem("feed URL", JSON.stringify(this.feedUrls));
    }
    
    // The function triggered by 'load feed'
    ChangeFeed() {
        // Change the RSS feed
        this.feedUrl = this.InputRssFeed;
        // Trigger getting of the feed
        this.refreshFeed();
    };
}
