import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Entities
import {
  VimarshThread,
  VimarshPost,
  VimarshVote,
  VimarshLike,
  VimarshPoll,
  VimarshPollVote,
} from './entities';

// Controllers
import { ThreadController } from './controllers/thread.controller';
import { PostController } from './controllers/post.controller';
import { VoteController } from './controllers/vote.controller';
import { LikeController } from './controllers/like.controller';
import { PollController } from './controllers/poll.controller';

// Services
import { ThreadService } from './services/thread.service';
import { PostService } from './services/post.service';
import { VoteService } from './services/vote.service';
import { LikeService } from './services/like.service';
import { PollService } from './services/poll.service';
import { HashService } from './services/hash.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST', 'localhost'),
        port: configService.get('POSTGRES_PORT', 5432),
        username: configService.get('POSTGRES_USER', 'devdutt'),
        password: configService.get('POSTGRES_PASSWORD', 'devdutt_secret'),
        database: configService.get('POSTGRES_DB', 'devdutt_institute'),
        schema: 'raj_mancha',
        entities: [
          VimarshThread,
          VimarshPost,
          VimarshVote,
          VimarshLike,
          VimarshPoll,
          VimarshPollVote,
        ],
        synchronize: false, // Use migrations in production
        logging: configService.get('NODE_ENV') === 'development',
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([
      VimarshThread,
      VimarshPost,
      VimarshVote,
      VimarshLike,
      VimarshPoll,
      VimarshPollVote,
    ]),
  ],
  controllers: [
    AppController,
    ThreadController,
    PostController,
    VoteController,
    LikeController,
    PollController,
  ],
  providers: [
    AppService,
    ThreadService,
    PostService,
    VoteService,
    LikeService,
    PollService,
    HashService,
  ],
})
export class AppModule {}
