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
exports.VimarshPost = void 0;
const typeorm_1 = require("typeorm");
const post_type_enum_1 = require("./post-type.enum");
const vimarsh_thread_entity_1 = require("./vimarsh-thread.entity");
const vimarsh_like_entity_1 = require("./vimarsh-like.entity");
let VimarshPost = class VimarshPost {
    id;
    threadId;
    authorUsername;
    content;
    postType;
    draftNumber;
    contentHash;
    previousHash;
    postNumber;
    replyToId;
    likeCount;
    createdAt;
    thread;
    likes;
    replyTo;
};
exports.VimarshPost = VimarshPost;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], VimarshPost.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'thread_id', type: 'uuid' }),
    __metadata("design:type", String)
], VimarshPost.prototype, "threadId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'author_username', type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], VimarshPost.prototype, "authorUsername", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], VimarshPost.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'post_type',
        type: 'enum',
        enum: post_type_enum_1.PostType,
        default: post_type_enum_1.PostType.NORMAL,
    }),
    __metadata("design:type", String)
], VimarshPost.prototype, "postType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'draft_number', type: 'int', nullable: true }),
    __metadata("design:type", Number)
], VimarshPost.prototype, "draftNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'content_hash', type: 'varchar', length: 64 }),
    __metadata("design:type", String)
], VimarshPost.prototype, "contentHash", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'previous_hash', type: 'varchar', length: 64, nullable: true }),
    __metadata("design:type", Object)
], VimarshPost.prototype, "previousHash", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'post_number', type: 'int' }),
    __metadata("design:type", Number)
], VimarshPost.prototype, "postNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'reply_to_id', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], VimarshPost.prototype, "replyToId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'like_count', type: 'int', default: 0 }),
    __metadata("design:type", Number)
], VimarshPost.prototype, "likeCount", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], VimarshPost.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => vimarsh_thread_entity_1.VimarshThread, (thread) => thread.posts, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'thread_id' }),
    __metadata("design:type", vimarsh_thread_entity_1.VimarshThread)
], VimarshPost.prototype, "thread", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => vimarsh_like_entity_1.VimarshLike, (like) => like.post),
    __metadata("design:type", Array)
], VimarshPost.prototype, "likes", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => VimarshPost, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'reply_to_id' }),
    __metadata("design:type", VimarshPost)
], VimarshPost.prototype, "replyTo", void 0);
exports.VimarshPost = VimarshPost = __decorate([
    (0, typeorm_1.Entity)('vimarsh_posts')
], VimarshPost);
//# sourceMappingURL=vimarsh-post.entity.js.map