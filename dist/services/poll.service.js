"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PollService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const entities_1 = require("../entities");
const thread_service_1 = require("./thread.service");
let PollService = class PollService {
    pollRepository;
    pollVoteRepository;
    threadService;
    constructor(pollRepository, pollVoteRepository, threadService) {
        this.pollRepository = pollRepository;
        this.pollVoteRepository = pollVoteRepository;
        this.threadService = threadService;
    }
    async createPoll(threadId, question, options, pollType = entities_1.PollType.SINGLE_CHOICE) {
        await this.threadService.getThreadById(threadId);
        if (options.length < 2) {
            throw new common_1.BadRequestException('Poll must have at least 2 options');
        }
        const results = {};
        options.forEach((option) => {
            results[option] = 0;
        });
        const poll = this.pollRepository.create({
            threadId,
            question,
            options,
            pollType,
            results,
        });
        return this.pollRepository.save(poll);
    }
    async getPollById(id) {
        const poll = await this.pollRepository.findOne({
            where: { id },
            relations: ['pollVotes'],
        });
        if (!poll) {
            throw new common_1.NotFoundException(`Poll with ID ${id} not found`);
        }
        return poll;
    }
    async votePoll(pollId, username, selectedOptions) {
        const poll = await this.getPollById(pollId);
        if (poll.isClosed) {
            throw new common_1.BadRequestException('Poll is closed');
        }
        const existingVote = await this.pollVoteRepository.findOne({
            where: { pollId, username },
        });
        if (existingVote) {
            throw new common_1.ConflictException('User has already voted on this poll');
        }
        if (poll.pollType === entities_1.PollType.SINGLE_CHOICE && selectedOptions.length !== 1) {
            throw new common_1.BadRequestException('Single choice poll requires exactly one option');
        }
        const invalidOptions = selectedOptions.filter((opt) => !poll.options.includes(opt));
        if (invalidOptions.length > 0) {
            throw new common_1.BadRequestException(`Invalid options: ${invalidOptions.join(', ')}`);
        }
        const vote = this.pollVoteRepository.create({
            pollId,
            username,
            selectedOptions,
        });
        const savedVote = await this.pollVoteRepository.save(vote);
        await this.updatePollResults(pollId);
        return savedVote;
    }
    async getPollResults(pollId) {
        const poll = await this.getPollById(pollId);
        const totalVotes = poll.pollVotes?.length || 0;
        return {
            question: poll.question,
            results: poll.results,
            totalVotes,
        };
    }
    async closePoll(pollId) {
        const poll = await this.getPollById(pollId);
        poll.isClosed = true;
        poll.closedAt = new Date();
        return this.pollRepository.save(poll);
    }
    async updatePollResults(pollId) {
        const poll = await this.getPollById(pollId);
        const votes = poll.pollVotes || [];
        const results = {};
        poll.options.forEach((option) => {
            results[option] = 0;
        });
        votes.forEach((vote) => {
            vote.selectedOptions.forEach((option) => {
                if (results[option] !== undefined) {
                    results[option]++;
                }
            });
        });
        poll.results = results;
        await this.pollRepository.save(poll);
    }
};
exports.PollService = PollService;
exports.PollService = PollService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.VimarshPoll)),
    __param(1, (0, typeorm_1.InjectRepository)(entities_1.VimarshPollVote)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        thread_service_1.ThreadService])
], PollService);
//# sourceMappingURL=poll.service.js.map