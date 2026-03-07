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
Object.defineProperty(exports, "__esModule", { value: true });
exports.VimarshThread = void 0;
const typeorm_1 = require("typeorm");
const vimarsh_status_enum_1 = require("./vimarsh-status.enum");
const vimarsh_type_enum_1 = require("./vimarsh-type.enum");
const vimarsh_post_entity_1 = require("./vimarsh-post.entity");
const vimarsh_vote_entity_1 = require("./vimarsh-vote.entity");
const vimarsh_poll_entity_1 = require("./vimarsh-poll.entity");
let VimarshThread = class VimarshThread {
    id;
    title;
    samitiId;
    currentSamitiId;
    isNative;
    authorUsername;
    assignedByUsername;
    status;
    vimarshType;
    currentDraftNumber;
    postCount;
    isLocked;
    gazetteId;
    voteForCount;
    voteAgainstCount;
    voteAbstainCount;
    createdAt;
    updatedAt;
    votingStartedAt;
    votingEndedAt;
    posts;
    votes;
    polls;
};
exports.VimarshThread = VimarshThread;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], VimarshThread.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 500 }),
    __metadata("design:type", String)
], VimarshThread.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'samiti_id', type: 'uuid' }),
    __metadata("design:type", String)
], VimarshThread.prototype, "samitiId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'current_samiti_id', type: 'uuid' }),
    __metadata("design:type", String)
], VimarshThread.prototype, "currentSamitiId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_native', type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], VimarshThread.prototype, "isNative", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'author_username', type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], VimarshThread.prototype, "authorUsername", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'assigned_by_username', type: 'varchar', length: 50, nullable: true }),
    __metadata("design:type", String)
], VimarshThread.prototype, "assignedByUsername", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: vimarsh_status_enum_1.VimarshStatus,
        default: vimarsh_status_enum_1.VimarshStatus.DRAFT,
    }),
    __metadata("design:type", String)
], VimarshThread.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'vimarsh_type',
        type: 'enum',
        enum: vimarsh_type_enum_1.VimarshType,
        default: vimarsh_type_enum_1.VimarshType.PROPOSAL,
    }),
    __metadata("design:type", String)
], VimarshThread.prototype, "vimarshType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'current_draft_number', type: 'int', default: 1 }),
    __metadata("design:type", Number)
], VimarshThread.prototype, "currentDraftNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'post_count', type: 'int', default: 0 }),
    __metadata("design:type", Number)
], VimarshThread.prototype, "postCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_locked', type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], VimarshThread.prototype, "isLocked", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'gazette_id', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], VimarshThread.prototype, "gazetteId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'vote_for_count', type: 'int', default: 0 }),
    __metadata("design:type", Number)
], VimarshThread.prototype, "voteForCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'vote_against_count', type: 'int', default: 0 }),
    __metadata("design:type", Number)
], VimarshThread.prototype, "voteAgainstCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'vote_abstain_count', type: 'int', default: 0 }),
    __metadata("design:type", Number)
], VimarshThread.prototype, "voteAbstainCount", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], VimarshThread.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], VimarshThread.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'voting_started_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], VimarshThread.prototype, "votingStartedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'voting_ended_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], VimarshThread.prototype, "votingEndedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => vimarsh_post_entity_1.VimarshPost, (post) => post.thread),
    __metadata("design:type", Array)
], VimarshThread.prototype, "posts", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => vimarsh_vote_entity_1.VimarshVote, (vote) => vote.thread),
    __metadata("design:type", Array)
], VimarshThread.prototype, "votes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => vimarsh_poll_entity_1.VimarshPoll, (poll) => poll.thread),
    __metadata("design:type", Array)
], VimarshThread.prototype, "polls", void 0);
exports.VimarshThread = VimarshThread = __decorate([
    (0, typeorm_1.Entity)('vimarsh_threads')
], VimarshThread);
//# sourceMappingURL=vimarsh-thread.entity.js.map