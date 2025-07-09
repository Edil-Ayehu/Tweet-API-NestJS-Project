import { Body, Controller, Delete, Param, ParseIntPipe, Post } from '@nestjs/common';
import { HashtagService } from './hashtag.service';
import { CreateHashtagDto } from './dto/create-hashtag.dto';

@Controller('hashtag')
export class HashtagController {
    constructor(
        private readonly hashtagService: HashtagService
    ) {}

    @Post()
    createHashtag(@Body() createHashtagDto: CreateHashtagDto) {
        return this.hashtagService.createHashtag(createHashtagDto)
    }

    @Delete(':id')
    deleteHashtag(@Param('id', ParseIntPipe) id: number) {
        return this.hashtagService.deleteHashtag(id)
    }

    @Delete('softDelete/:id')
    softDeleteHashtag(@Param('id', ParseIntPipe) id: number) {
        return this.hashtagService.softDeleteHashtag(id)
    }
}
