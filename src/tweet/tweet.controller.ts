import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { TweetService } from './tweet.service';
import { CreateTweetDto } from './dto/create-tweet.dto';

@Controller('tweet')
export class TweetController {
    constructor(
        private readonly tweetService: TweetService
    ){}

    @Get(':userId')
    public getTweets(@Param('userId', ParseIntPipe) userId: number){
        return this.tweetService.getTweets(userId)
    }

    @Post()
    createTweet(@Body() createTweetDto: CreateTweetDto) {
        return this.tweetService.createTweet(createTweetDto);
    }
}
