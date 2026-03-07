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
exports.PostService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const entities_1 = require("../entities");
const hash_service_1 = require("./hash.service");
const thread_service_1 = require("./thread.service");
let PostService = class PostService {
    postRepository;
    hashService;
    threadService;
    constructor(postRepository, hashService, threadService) {
        this.postRepository = postRepository;
        this.hashService = hashService;
        this.threadService = threadService;
    }
    async createPost(threadId, authorUsername, content, postType = entities_1.PostType.NORMAL, draftNumber, replyToId) {
        const thread = await this.threadService.getThreadById(threadId);
        if (thread.isLocked) {
            throw new common_1.BadRequestException('Thread is locked');
        }
        const lastPost = await this.postRepository.findOne({
            where: { threadId },
            order: { postNumber: 'DESC' },
        });
        const postNumber = lastPost ? lastPost.postNumber + 1 : 1;
        const previousHash = lastPost ? lastPost.contentHash : null;
        const contentHash = this.hashService.generatePostHash(threadId, authorUsername, content, postNumber, previousHash);
        const post = this.postRepository.create({
            threadId,
            authorUsername,
            content,
            postType,
            draftNumber,
            replyToId,
            contentHash,
            previousHash,
            postNumber,
        });
        const savedPost = await this.postRepository.save(post);
        await this.threadService.incrementPostCount(threadId);
        return savedPost;
    }
    async getPostById(id) {
        const post = await this.postRepository.findOne({
            where: { id },
            relations: ['likes', 'replyTo'],
        });
        if (!post) {
            throw new common_1.NotFoundException(`Post with ID ${id} not found`);
        }
        return post;
    }
    async getPostsByThread(threadId) {
        return this.postRepository.find({
            where: { threadId },
            order: { postNumber: 'ASC' },
            relations: ['likes'],
        });
    }
    async getPostsByDraft(threadId, draftNumber) {
        return this.postRepository.find({
            where: { threadId, draftNumber },
            order: { postNumber: 'ASC' },
        });
    }
    async verifyHashChain(postId) {
        const post = await this.getPostById(postId);
        return this.hashService.verifyHashChain(post.contentHash, post.threadId, post.authorUsername, post.content, post.postNumber, post.previousHash);
    }
    async verifyThreadHashChain(threadId) {
        const posts = await this.getPostsByThread(threadId);
        for (const post of posts) {
            const isValid = await this.verifyHashChain(post.id);
            if (!isValid) {
                return { valid: false, brokenAt: post.postNumber };
            }
        }
        return { valid: true };
    }
    async incrementLikeCount(postId) {
        await this.postRepository.increment({ id: postId }, 'likeCount', 1);
    }
    async decrementLikeCount(postId) {
        await this.postRepository.decrement({ id: postId }, 'likeCount', 1);
    }
};
exports.PostService = PostService;
exports.PostService = PostService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.VimarshPost)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        hash_service_1.HashService,
        thread_service_1.ThreadService])
], PostService);
//# sourceMappingURL=post.service.js.map