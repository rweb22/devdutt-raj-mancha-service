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
exports.VimarshPoll = exports.PollType = void 0;
const typeorm_1 = require("typeorm");
const vimarsh_thread_entity_1 = require("./vimarsh-thread.entity");
const vimarsh_poll_vote_entity_1 = require("./vimarsh-poll-vote.entity");
var PollType;
(function (PollType) {
    PollType["SINGLE_CHOICE"] = "SINGLE_CHOICE";
    PollType["MULTIPLE_CHOICE"] = "MULTIPLE_CHOICE";
})(PollType || (exports.PollType = PollType = {}));
let VimarshPoll = class VimarshPoll {
    id;
    threadId;
    question;
    pollType;
    options;
    results;
    isClosed;
    createdAt;
    closedAt;
    thread;
    pollVotes;
};
exports.VimarshPoll = VimarshPoll;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], VimarshPoll.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'thread_id', type: 'uuid' }),
    __metadata("design:type", String)
], VimarshPoll.prototype, "threadId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 500 }),
    __metadata("design:type", String)
], VimarshPoll.prototype, "question", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'poll_type',
        type: 'enum',
        enum: PollType,
        default: PollType.SINGLE_CHOICE,
    }),
    __metadata("design:type", String)
], VimarshPoll.prototype, "pollType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb' }),
    __metadata("design:type", Array)
], VimarshPoll.prototype, "options", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', default: {} }),
    __metadata("design:type", Object)
], VimarshPoll.prototype, "results", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_closed', type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], VimarshPoll.prototype, "isClosed", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], VimarshPoll.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'closed_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], VimarshPoll.prototype, "closedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => vimarsh_thread_entity_1.VimarshThread, (thread) => thread.polls, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'thread_id' }),
    __metadata("design:type", vimarsh_thread_entity_1.VimarshThread)
], VimarshPoll.prototype, "thread", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => vimarsh_poll_vote_entity_1.VimarshPollVote, (vote) => vote.poll),
    __metadata("design:type", Array)
], VimarshPoll.prototype, "pollVotes", void 0);
exports.VimarshPoll = VimarshPoll = __decorate([
    (0, typeorm_1.Entity)('vimarsh_polls')
], VimarshPoll);
//# sourceMappingURL=vimarsh-poll.entity.js.map