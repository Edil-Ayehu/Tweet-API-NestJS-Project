import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { Tweet } from './tweet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { HashtagService } from 'src/hashtag/hashtag.service';

@Injectable()
export class TweetService {
  constructor(
    private readonly usersService: UsersService,
    private readonly hashtagService: HashtagService,

    @InjectRepository(Tweet)
    private readonly tweetRepo: Repository<Tweet>,
  ) {}

  public async getTweets(userId: number) {
    const user = await this.usersService.getUserById(userId);
    if (!user)
      throw new NotFoundException('No user found with userId value ' + userId);

    return this.tweetRepo.find({
      where: { user: { id: userId } },
      relations: { user: true },
    });
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

  async updateTweet() {}
}
