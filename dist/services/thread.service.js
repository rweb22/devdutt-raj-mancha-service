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
exports.ThreadService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const entities_1 = require("../entities");
let ThreadService = class ThreadService {
    threadRepository;
    constructor(threadRepository) {
        this.threadRepository = threadRepository;
    }
    async createThread(title, samitiId, authorUsername, vimarshType = entities_1.VimarshType.PROPOSAL, assignedByUsername) {
        const thread = this.threadRepository.create({
            title,
            samitiId,
            currentSamitiId: samitiId,
            isNative: true,
            authorUsername,
            assignedByUsername,
            vimarshType,
            status: entities_1.VimarshStatus.DRAFT,
        });
        return this.threadRepository.save(thread);
    }
    async getThreadById(id) {
        const thread = await this.threadRepository.findOne({
            where: { id },
            relations: ['posts', 'votes', 'polls'],
        });
        if (!thread) {
            throw new common_1.NotFoundException(`Thread with ID ${id} not found`);
        }
        return thread;
    }
    async getThreadsBySamiti(samitiId) {
        return this.threadRepository.find({
            where: { currentSamitiId: samitiId },
            order: { createdAt: 'DESC' },
        });
    }
    async moveToDeliberation(threadId) {
        const thread = await this.getThreadById(threadId);
        if (thread.status !== entities_1.VimarshStatus.DRAFT) {
            throw new common_1.BadRequestException(`Thread must be in DRAFT status to move to DELIBERATION`);
        }
        thread.status = entities_1.VimarshStatus.DELIBERATION;
        return this.threadRepository.save(thread);
    }
    async moveToVoting(threadId) {
        const thread = await this.getThreadById(threadId);
        if (thread.status !== entities_1.VimarshStatus.DELIBERATION) {
            throw new common_1.BadRequestException(`Thread must be in DELIBERATION status to move to VOTING`);
        }
        thread.status = entities_1.VimarshStatus.VOTING;
        thread.votingStartedAt = new Date();
        return this.threadRepository.save(thread);
    }
    async finalizeVoting(threadId) {
        const thread = await this.getThreadById(threadId);
        if (thread.status !== entities_1.VimarshStatus.VOTING) {
            throw new common_1.BadRequestException(`Thread must be in VOTING status to finalize`);
        }
        thread.votingEndedAt = new Date();
        if (thread.voteForCount > thread.voteAgainstCount) {
            thread.status = entities_1.VimarshStatus.PASSED;
        }
        else {
            thread.status = entities_1.VimarshStatus.REJECTED;
        }
        return this.threadRepository.save(thread);
    }
    async archiveThread(threadId) {
        const thread = await this.getThreadById(threadId);
        thread.status = entities_1.VimarshStatus.ARCHIVED;
        return this.threadRepository.save(thread);
    }
    async lockThread(threadId) {
        const thread = await this.getThreadById(threadId);
        thread.isLocked = true;
        return this.threadRepository.save(thread);
    }
    async unlockThread(threadId) {
        const thread = await this.getThreadById(threadId);
        thread.isLocked = false;
        return this.threadRepository.save(thread);
    }
    async escalateToSamiti(threadId, newSamitiId) {
        const thread = await this.getThreadById(threadId);
        thread.currentSamitiId = newSamitiId;
        thread.isNative = false;
        return this.threadRepository.save(thread);
    }
    async incrementPostCount(threadId) {
        await this.threadRepository.increment({ id: threadId }, 'postCount', 1);
    }
    async updateVoteCounts(threadId, forCount, againstCount, abstainCount) {
        await this.threadRepository.update(threadId, {
            voteForCount: forCount,
            voteAgainstCount: againstCount,
            voteAbstainCount: abstainCount,
        });
    }
};
exports.ThreadService = ThreadService;
exports.ThreadService = ThreadService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.VimarshThread)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ThreadService);
//# sourceMappingURL=thread.service.js.map