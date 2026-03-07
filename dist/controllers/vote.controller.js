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
exports.VoteController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const vote_service_1 = require("../services/vote.service");
const cast_vote_dto_1 = require("../dto/cast-vote.dto");
let VoteController = class VoteController {
    voteService;
    constructor(voteService) {
        this.voteService = voteService;
    }
    async castVote(threadId, dto) {
        return this.voteService.castVote(threadId, dto.username, dto.voteType);
    }
    async getVotes(threadId) {
        return this.voteService.getVotes(threadId);
    }
    async countVotes(threadId) {
        return this.voteService.countVotes(threadId);
    }
    async hasVoted(threadId, username) {
        const hasVoted = await this.voteService.hasVoted(threadId, username);
        return { hasVoted };
    }
};
exports.VoteController = VoteController;
__decorate([
    (0, common_1.Post)('thread/:threadId'),
    (0, swagger_1.ApiOperation)({ summary: 'Cast a vote on a thread' }),
    (0, swagger_1.ApiParam)({ name: 'threadId', description: 'Thread ID' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Vote cast successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Thread not in VOTING status' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'User has already voted' }),
    __param(0, (0, common_1.Param)('threadId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, cast_vote_dto_1.CastVoteDto]),
    __metadata("design:returntype", Promise)
], VoteController.prototype, "castVote", null);
__decorate([
    (0, common_1.Get)('thread/:threadId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all votes for a thread' }),
    (0, swagger_1.ApiParam)({ name: 'threadId', description: 'Thread ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Votes retrieved' }),
    __param(0, (0, common_1.Param)('threadId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VoteController.prototype, "getVotes", null);
__decorate([
    (0, common_1.Get)('thread/:threadId/count'),
    (0, swagger_1.ApiOperation)({ summary: 'Count votes by type' }),
    (0, swagger_1.ApiParam)({ name: 'threadId', description: 'Thread ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Vote counts retrieved' }),
    __param(0, (0, common_1.Param)('threadId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VoteController.prototype, "countVotes", null);
__decorate([
    (0, common_1.Get)('thread/:threadId/has-voted'),
    (0, swagger_1.ApiOperation)({ summary: 'Check if user has voted' }),
    (0, swagger_1.ApiParam)({ name: 'threadId', description: 'Thread ID' }),
    (0, swagger_1.ApiQuery)({ name: 'username', description: 'Username to check' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Vote status retrieved' }),
    __param(0, (0, common_1.Param)('threadId')),
    __param(1, (0, common_1.Query)('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], VoteController.prototype, "hasVoted", null);
exports.VoteController = VoteController = __decorate([
    (0, swagger_1.ApiTags)('Votes'),
    (0, common_1.Controller)('votes'),
    __metadata("design:paramtypes", [vote_service_1.VoteService])
], VoteController);
//# sourceMappingURL=vote.controller.js.map