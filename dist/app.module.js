"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const entities_1 = require("./entities");
const thread_controller_1 = require("./controllers/thread.controller");
const post_controller_1 = require("./controllers/post.controller");
const vote_controller_1 = require("./controllers/vote.controller");
const like_controller_1 = require("./controllers/like.controller");
const poll_controller_1 = require("./controllers/poll.controller");
const thread_service_1 = require("./services/thread.service");
const post_service_1 = require("./services/post.service");
const vote_service_1 = require("./services/vote.service");
const like_service_1 = require("./services/like.service");
const poll_service_1 = require("./services/poll.service");
const hash_service_1 = require("./services/hash.service");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => ({
                    type: 'postgres',
                    host: configService.get('POSTGRES_HOST', 'localhost'),
                    port: configService.get('POSTGRES_PORT', 5432),
                    username: configService.get('POSTGRES_USER', 'devdutt'),
                    password: configService.get('POSTGRES_PASSWORD', 'devdutt_secret'),
                    database: configService.get('POSTGRES_DB', 'devdutt_institute'),
                    schema: 'raj_mancha',
                    entities: [
                        entities_1.VimarshThread,
                        entities_1.VimarshPost,
                        entities_1.VimarshVote,
                        entities_1.VimarshLike,
                        entities_1.VimarshPoll,
                        entities_1.VimarshPollVote,
                    ],
                    synchronize: false,
                    logging: configService.get('NODE_ENV') === 'development',
                }),
                inject: [config_1.ConfigService],
            }),
            typeorm_1.TypeOrmModule.forFeature([
                entities_1.VimarshThread,
                entities_1.VimarshPost,
                entities_1.VimarshVote,
                entities_1.VimarshLike,
                entities_1.VimarshPoll,
                entities_1.VimarshPollVote,
            ]),
        ],
        controllers: [
            app_controller_1.AppController,
            thread_controller_1.ThreadController,
            post_controller_1.PostController,
            vote_controller_1.VoteController,
            like_controller_1.LikeController,
            poll_controller_1.PollController,
        ],
        providers: [
            app_service_1.AppService,
            thread_service_1.ThreadService,
            post_service_1.PostService,
            vote_service_1.VoteService,
            like_service_1.LikeService,
            poll_service_1.PollService,
            hash_service_1.HashService,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map