import { Body, Controller, Get, Param, ParseIntPipe, Post, Patch } from '@nestjs/common';
import { TweetService } from './tweet.service';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { UpdateTweetDto } from './dto/update-tweet.dto';

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

    @Patch()
    updateTweet(@Body() updateTweetDto: UpdateTweetDto) {
        return this.tweetService.updateTweet(updateTweetDto)
    }
}
