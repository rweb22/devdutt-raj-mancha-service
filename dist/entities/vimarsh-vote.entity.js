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
exports.VimarshVote = void 0;
const typeorm_1 = require("typeorm");
const vote_type_enum_1 = require("./vote-type.enum");
const vimarsh_thread_entity_1 = require("./vimarsh-thread.entity");
let VimarshVote = class VimarshVote {
    id;
    threadId;
    username;
    voteType;
    votedAt;
    thread;
};
exports.VimarshVote = VimarshVote;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], VimarshVote.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'thread_id', type: 'uuid' }),
    __metadata("design:type", String)
], VimarshVote.prototype, "threadId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], VimarshVote.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'vote_type',
        type: 'enum',
        enum: vote_type_enum_1.VoteType,
    }),
    __metadata("design:type", String)
], VimarshVote.prototype, "voteType", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'voted_at' }),
    __metadata("design:type", Date)
], VimarshVote.prototype, "votedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => vimarsh_thread_entity_1.VimarshThread, (thread) => thread.votes, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'thread_id' }),
    __metadata("design:type", vimarsh_thread_entity_1.VimarshThread)
], VimarshVote.prototype, "thread", void 0);
exports.VimarshVote = VimarshVote = __decorate([
    (0, typeorm_1.Entity)('vimarsh_votes'),
    (0, typeorm_1.Unique)(['threadId', 'username'])
], VimarshVote);
//# sourceMappingURL=vimarsh-vote.entity.js.map