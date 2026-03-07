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
exports.VoteService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const entities_1 = require("../entities");
const thread_service_1 = require("./thread.service");
let VoteService = class VoteService {
    voteRepository;
    threadService;
    constructor(voteRepository, threadService) {
        this.voteRepository = voteRepository;
        this.threadService = threadService;
    }
    async castVote(threadId, username, voteType) {
        const thread = await this.threadService.getThreadById(threadId);
        if (thread.status !== entities_1.VimarshStatus.VOTING) {
            throw new common_1.BadRequestException('Thread must be in VOTING status to cast votes');
        }
        const existingVote = await this.voteRepository.findOne({
            where: { threadId, username },
        });
        if (existingVote) {
            throw new common_1.ConflictException('User has already voted on this thread');
        }
        const vote = this.voteRepository.create({
            threadId,
            username,
            voteType,
        });
        const savedVote = await this.voteRepository.save(vote);
        await this.updateThreadVoteCounts(threadId);
        return savedVote;
    }
    async getVotes(threadId) {
        return this.voteRepository.find({
            where: { threadId },
            order: { votedAt: 'ASC' },
        });
    }
    async countVotes(threadId) {
        const votes = await this.getVotes(threadId);
        const forCount = votes.filter((v) => v.voteType === entities_1.VoteType.FOR).length;
        const againstCount = votes.filter((v) => v.voteType === entities_1.VoteType.AGAINST).length;
        const abstainCount = votes.filter((v) => v.voteType === entities_1.VoteType.ABSTAIN).length;
        return {
            forCount,
            againstCount,
            abstainCount,
            total: votes.length,
        };
    }
    async hasVoted(threadId, username) {
        const vote = await this.voteRepository.findOne({
            where: { threadId, username },
        });
        return !!vote;
    }
    async updateThreadVoteCounts(threadId) {
        const counts = await this.countVotes(threadId);
        await this.threadService.updateVoteCounts(threadId, counts.forCount, counts.againstCount, counts.abstainCount);
    }
};
exports.VoteService = VoteService;
exports.VoteService = VoteService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.VimarshVote)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        thread_service_1.ThreadService])
], VoteService);
//# sourceMappingURL=vote.service.js.map