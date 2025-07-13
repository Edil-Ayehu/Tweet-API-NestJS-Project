import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { Tweet } from './tweet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { HashtagService } from 'src/hashtag/hashtag.service';
import { UpdateTweetDto } from './dto/update-tweet.dto';
import { PaginationQueryDto } from 'src/common/pagination/dto/pagination-query.dto';
import { GetTweetQueryDto } from './dto/get-tweet-query.dto';
import { PaginationProvider } from 'src/common/pagination/pagination.provider';
import { Paginated } from 'src/common/pagination/pagination.interface';

@Injectable()
export class TweetService {
  constructor(
    private readonly usersService: UsersService,
    private readonly hashtagService: HashtagService,
    private readonly paginationProvider : PaginationProvider,

    @InjectRepository(Tweet)
    private readonly tweetRepo: Repository<Tweet>,
  ) {}

  public async getTweets(userId: number, paginationQueryDto: PaginationQueryDto): Promise<Paginated<Tweet>> {
    const user = await this.usersService.getUserById(userId);
    if (!user)
      throw new NotFoundException('No user found with userId value ' + userId);

    return this.paginationProvider.paginateQuery(
      paginationQueryDto,
      this.tweetRepo,
      {user: {id: userId}},
    );
  }

  public async createTweet(createTweetDto: CreateTweetDto) {
    // find user with the given userId from user table
    const user = await this.usersService.getUserById(createTweetDto.userId);
    if (!user) throw new NotFoundException('User not found with the given userId');

    // Fetch all the hashtags based on hashtag arry
    const hashtags = await this.hashtagService.findHashtags(createTweetDto.hashtags!)

    

    // Create a tweet
    const newTweet = this.tweetRepo.create({ ...createTweetDto, user, hashtags});

    // Save the tweet
    return await this.tweetRepo.save(newTweet);
  }

  async updateTweet(updateTweetDto:UpdateTweetDto) {
    // find all hashtags
    let hashtags = await this.hashtagService.findHashtags(updateTweetDto.hashtags!)

    // find the tweet by Id
    let tweet = await this.tweetRepo.findOneBy({id: updateTweetDto.id})
    if(!tweet) throw new NotFoundException('Tweet not found with the given Id')

    // update properties of the tweet
    tweet.text = updateTweetDto.text ?? tweet.text
    tweet.image = updateTweetDto.image ?? tweet.image
    tweet.hashtags = hashtags

    return await this.tweetRepo.save(tweet)  // save method of the repository is used to either create new record in the table or to update existing record
  }

  async deleteTweet(id:number) {
    await this.tweetRepo.delete({id})

    return {
      id,
      deleted: true,
    }
  }
}
