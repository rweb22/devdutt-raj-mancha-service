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
exports.PollController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const poll_service_1 = require("../services/poll.service");
const create_poll_dto_1 = require("../dto/create-poll.dto");
const vote_poll_dto_1 = require("../dto/vote-poll.dto");
let PollController = class PollController {
    pollService;
    constructor(pollService) {
        this.pollService = pollService;
    }
    async createPoll(threadId, dto) {
        return this.pollService.createPoll(threadId, dto.question, dto.options, dto.pollType);
    }
    async getPollById(id) {
        return this.pollService.getPollById(id);
    }
    async votePoll(id, dto) {
        return this.pollService.votePoll(id, dto.username, dto.selectedOptions);
    }
    async getPollResults(id) {
        return this.pollService.getPollResults(id);
    }
    async closePoll(id) {
        return this.pollService.closePoll(id);
    }
};
exports.PollController = PollController;
__decorate([
    (0, common_1.Post)('thread/:threadId'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a poll in a thread' }),
    (0, swagger_1.ApiParam)({ name: 'threadId', description: 'Thread ID' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Poll created successfully' }),
    __param(0, (0, common_1.Param)('threadId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_poll_dto_1.CreatePollDto]),
    __metadata("design:returntype", Promise)
], PollController.prototype, "createPoll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get poll by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Poll ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Poll found' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Poll not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PollController.prototype, "getPollById", null);
__decorate([
    (0, common_1.Post)(':id/vote'),
    (0, swagger_1.ApiOperation)({ summary: 'Vote on a poll' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Poll ID' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Vote cast successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Poll is closed or invalid options' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'User has already voted' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, vote_poll_dto_1.VotePollDto]),
    __metadata("design:returntype", Promise)
], PollController.prototype, "votePoll", null);
__decorate([
    (0, common_1.Get)(':id/results'),
    (0, swagger_1.ApiOperation)({ summary: 'Get poll results' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Poll ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Poll results retrieved' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PollController.prototype, "getPollResults", null);
__decorate([
    (0, common_1.Put)(':id/close'),
    (0, swagger_1.ApiOperation)({ summary: 'Close a poll' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Poll ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Poll closed successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PollController.prototype, "closePoll", null);
exports.PollController = PollController = __decorate([
    (0, swagger_1.ApiTags)('Polls'),
    (0, common_1.Controller)('polls'),
    __metadata("design:paramtypes", [poll_service_1.PollService])
], PollController);
//# sourceMappingURL=poll.controller.js.map