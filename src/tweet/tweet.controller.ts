import { Body, Controller, Get, Param, ParseIntPipe, Post, Patch, Delete, Query } from '@nestjs/common';
import { TweetService } from './tweet.service';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { UpdateTweetDto } from './dto/update-tweet.dto';
import { PaginationQueryDto } from 'src/common/pagination/dto/pagination-query.dto';
import { GetTweetQueryDto } from './dto/get-tweet-query.dto';

@Controller('tweet')
export class TweetController {
    constructor(
        private readonly tweetService: TweetService
    ){}

    @Get(':userId')
    public getTweets(
        @Param('userId', ParseIntPipe) userId: number,
        @Query() getTweetQueryDto: GetTweetQueryDto,
    ){
        return this.tweetService.getTweets(userId,getTweetQueryDto)
    }

    @Post()
    createTweet(@Body() createTweetDto: CreateTweetDto) {
        return this.tweetService.createTweet(createTweetDto);
    }

    @Patch()
    updateTweet(@Body() updateTweetDto: UpdateTweetDto) {
        return this.tweetService.updateTweet(updateTweetDto)
    }

    @Delete(':id')
    deleteTweet(@Param('id', ParseIntPipe) id: number) {
        return this.tweetService.deleteTweet(id)
    }
}
