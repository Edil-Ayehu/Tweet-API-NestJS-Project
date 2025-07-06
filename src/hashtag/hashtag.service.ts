import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Hashtag } from './hashtag.entity';
import { In, Repository } from 'typeorm';
import { CreateHashtagDto } from './dto/create-hashtag.dto';

@Injectable()
export class HashtagService {
    constructor(
        @InjectRepository(Hashtag)
        private readonly hashtagRepo: Repository<Hashtag>
    ) {}

    public async createHashtag(createHashtagDto: CreateHashtagDto) {
        const hashtag = this.hashtagRepo.create(createHashtagDto)
        return this.hashtagRepo.save(hashtag)
    }

    async findHashtags(hashtags: number[]) {
        return await this.hashtagRepo.find({
            where: {id: In(hashtags)}
        })
    }
}
