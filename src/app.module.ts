import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TweetModule } from './tweet/tweet.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { ProfileModule } from './profile/profile.module';
import { HashtagModule } from './hashtag/hashtag.module';

@Module({
  imports: [
    TweetModule, 
    UsersModule, 
    AuthModule,
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        // entities: [User],
        autoLoadEntities: true,
        synchronize: true,
        username: 'postgres',
        database: 'nestjs2',
        password: 'edilayehu',
        port: 5432,
        host: 'localhost'
      })
    }),
    ProfileModule,
    HashtagModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {} 
