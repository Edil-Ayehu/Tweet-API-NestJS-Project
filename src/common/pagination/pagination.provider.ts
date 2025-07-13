import { Inject, Injectable } from '@nestjs/common';
import { FindManyOptions, FindOptionsWhere, ObjectLiteral, Repository } from 'typeorm';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import { Request } from 'express';
import { REQUEST } from '@nestjs/core';
import { Paginated } from './pagination.interface';

@Injectable()
export class PaginationProvider {
    constructor(
        @Inject(REQUEST) private readonly request: Request,
    ){}

  public async paginateQuery<T extends ObjectLiteral>(
    paginationQueryDto: PaginationQueryDto,
    repository: Repository<T>,
    where?: FindOptionsWhere<T>,
    relations?: string[],  
  ) : Promise<Paginated<T>>{
    const findOptions: FindManyOptions = {
        skip: (paginationQueryDto.page! - 1) * paginationQueryDto.limit!,
        take: paginationQueryDto.limit,
    };

    if(where) {
        findOptions.where = where
    }
    if(relations) {
        findOptions.relations = relations
    }

    const result = await repository.find(findOptions);

    const totalItems = await repository.count();
    const totalPages = Math.ceil(totalItems / paginationQueryDto.limit!)
    const currentPage = paginationQueryDto.page!;

    const nextPage = currentPage === totalPages ? currentPage: currentPage  + 1 ;
    const previousPage = currentPage === 1 ? currentPage : currentPage - 1 ;
    const baseUrl = this.request.protocol +'://' + this.request.headers.host + '/ '
    const newUrl = new URL(this.request.url, baseUrl)

    const response: Paginated<T> = {
        data: result,
        meta: {
            itemsPerPage: paginationQueryDto.limit!,
            totalItems: totalItems,
            currentPage: currentPage,
            totalPages: totalPages,
        },
        links: {
            firstPage: `${newUrl.origin}${newUrl.pathname}?limit=${paginationQueryDto.limit}&page=1`,
            lastPage:  `${newUrl.origin}${newUrl.pathname}?limit=${paginationQueryDto.limit}&page=${totalPages}`,
            currentPage:  `${newUrl.origin}${newUrl.pathname}?limit=${paginationQueryDto.limit}&page=${currentPage}`,
            nextPage:  `${newUrl.origin}${newUrl.pathname}?limit=${paginationQueryDto.limit}&page=${nextPage}`,
            previousPage:  `${newUrl.origin}${newUrl.pathname}?limit=${paginationQueryDto.limit}&page=${previousPage}`,
        }
    }

    return response;
  }
}
