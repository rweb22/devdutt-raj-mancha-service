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
exports.VimarshPollVote = void 0;
const typeorm_1 = require("typeorm");
const vimarsh_poll_entity_1 = require("./vimarsh-poll.entity");
let VimarshPollVote = class VimarshPollVote {
    id;
    pollId;
    username;
    selectedOptions;
    votedAt;
    poll;
};
exports.VimarshPollVote = VimarshPollVote;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], VimarshPollVote.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'poll_id', type: 'uuid' }),
    __metadata("design:type", String)
], VimarshPollVote.prototype, "pollId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], VimarshPollVote.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'selected_options', type: 'jsonb' }),
    __metadata("design:type", Array)
], VimarshPollVote.prototype, "selectedOptions", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'voted_at' }),
    __metadata("design:type", Date)
], VimarshPollVote.prototype, "votedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => vimarsh_poll_entity_1.VimarshPoll, (poll) => poll.pollVotes, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'poll_id' }),
    __metadata("design:type", vimarsh_poll_entity_1.VimarshPoll)
], VimarshPollVote.prototype, "poll", void 0);
exports.VimarshPollVote = VimarshPollVote = __decorate([
    (0, typeorm_1.Entity)('vimarsh_poll_votes'),
    (0, typeorm_1.Unique)(['pollId', 'username'])
], VimarshPollVote);
//# sourceMappingURL=vimarsh-poll-vote.entity.js.map