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
exports.ThreadController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const thread_service_1 = require("../services/thread.service");
const create_thread_dto_1 = require("../dto/create-thread.dto");
let ThreadController = class ThreadController {
    threadService;
    constructor(threadService) {
        this.threadService = threadService;
    }
    async createThread(dto) {
        return this.threadService.createThread(dto.title, dto.samitiId, dto.authorUsername, dto.vimarshType, dto.assignedByUsername);
    }
    async getThreadById(id) {
        return this.threadService.getThreadById(id);
    }
    async getThreadsBySamiti(samitiId) {
        return this.threadService.getThreadsBySamiti(samitiId);
    }
    async moveToDeliberation(id) {
        return this.threadService.moveToDeliberation(id);
    }
    async moveToVoting(id) {
        return this.threadService.moveToVoting(id);
    }
    async finalizeVoting(id) {
        return this.threadService.finalizeVoting(id);
    }
    async archiveThread(id) {
        return this.threadService.archiveThread(id);
    }
    async lockThread(id) {
        return this.threadService.lockThread(id);
    }
    async unlockThread(id) {
        return this.threadService.unlockThread(id);
    }
    async escalateToSamiti(id, newSamitiId) {
        return this.threadService.escalateToSamiti(id, newSamitiId);
    }
};
exports.ThreadController = ThreadController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new thread' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Thread created successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_thread_dto_1.CreateThreadDto]),
    __metadata("design:returntype", Promise)
], ThreadController.prototype, "createThread", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get thread by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Thread ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Thread found' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Thread not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ThreadController.prototype, "getThreadById", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get threads by samiti' }),
    (0, swagger_1.ApiQuery)({ name: 'samitiId', description: 'Samiti ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Threads retrieved' }),
    __param(0, (0, common_1.Query)('samitiId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ThreadController.prototype, "getThreadsBySamiti", null);
__decorate([
    (0, common_1.Put)(':id/deliberation'),
    (0, swagger_1.ApiOperation)({ summary: 'Move thread to DELIBERATION status' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Thread ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Thread moved to DELIBERATION' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ThreadController.prototype, "moveToDeliberation", null);
__decorate([
    (0, common_1.Put)(':id/voting'),
    (0, swagger_1.ApiOperation)({ summary: 'Move thread to VOTING status' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Thread ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Thread moved to VOTING' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ThreadController.prototype, "moveToVoting", null);
__decorate([
    (0, common_1.Put)(':id/finalize'),
    (0, swagger_1.ApiOperation)({ summary: 'Finalize voting and determine outcome' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Thread ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Voting finalized' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ThreadController.prototype, "finalizeVoting", null);
__decorate([
    (0, common_1.Put)(':id/archive'),
    (0, swagger_1.ApiOperation)({ summary: 'Archive a thread' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Thread ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Thread archived' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ThreadController.prototype, "archiveThread", null);
__decorate([
    (0, common_1.Put)(':id/lock'),
    (0, swagger_1.ApiOperation)({ summary: 'Lock a thread' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Thread ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Thread locked' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ThreadController.prototype, "lockThread", null);
__decorate([
    (0, common_1.Put)(':id/unlock'),
    (0, swagger_1.ApiOperation)({ summary: 'Unlock a thread' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Thread ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Thread unlocked' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ThreadController.prototype, "unlockThread", null);
__decorate([
    (0, common_1.Put)(':id/escalate'),
    (0, swagger_1.ApiOperation)({ summary: 'Escalate thread to a different samiti' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Thread ID' }),
    (0, swagger_1.ApiQuery)({ name: 'newSamitiId', description: 'New Samiti ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Thread escalated' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('newSamitiId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ThreadController.prototype, "escalateToSamiti", null);
exports.ThreadController = ThreadController = __decorate([
    (0, swagger_1.ApiTags)('Threads'),
    (0, common_1.Controller)('threads'),
    __metadata("design:paramtypes", [thread_service_1.ThreadService])
], ThreadController);
//# sourceMappingURL=thread.controller.js.map