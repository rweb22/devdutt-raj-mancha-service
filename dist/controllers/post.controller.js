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
exports.PostController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const post_service_1 = require("../services/post.service");
const create_post_dto_1 = require("../dto/create-post.dto");
let PostController = class PostController {
    postService;
    constructor(postService) {
        this.postService = postService;
    }
    async createPost(threadId, dto) {
        return this.postService.createPost(threadId, dto.authorUsername, dto.content, dto.postType, dto.draftNumber, dto.replyToId);
    }
    async getPostById(id) {
        return this.postService.getPostById(id);
    }
    async getPostsByThread(threadId) {
        return this.postService.getPostsByThread(threadId);
    }
    async getPostsByDraft(threadId, draftNumber) {
        return this.postService.getPostsByDraft(threadId, draftNumber);
    }
    async verifyHashChain(id) {
        const valid = await this.postService.verifyHashChain(id);
        return { valid };
    }
    async verifyThreadHashChain(threadId) {
        return this.postService.verifyThreadHashChain(threadId);
    }
};
exports.PostController = PostController;
__decorate([
    (0, common_1.Post)('thread/:threadId'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new post in a thread' }),
    (0, swagger_1.ApiParam)({ name: 'threadId', description: 'Thread ID' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Post created successfully' }),
    __param(0, (0, common_1.Param)('threadId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_post_dto_1.CreatePostDto]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "createPost", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get post by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Post ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Post found' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Post not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "getPostById", null);
__decorate([
    (0, common_1.Get)('thread/:threadId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all posts in a thread' }),
    (0, swagger_1.ApiParam)({ name: 'threadId', description: 'Thread ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Posts retrieved' }),
    __param(0, (0, common_1.Param)('threadId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "getPostsByThread", null);
__decorate([
    (0, common_1.Get)('thread/:threadId/draft/:draftNumber'),
    (0, swagger_1.ApiOperation)({ summary: 'Get posts by draft number' }),
    (0, swagger_1.ApiParam)({ name: 'threadId', description: 'Thread ID' }),
    (0, swagger_1.ApiParam)({ name: 'draftNumber', description: 'Draft number' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Draft posts retrieved' }),
    __param(0, (0, common_1.Param)('threadId')),
    __param(1, (0, common_1.Param)('draftNumber')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "getPostsByDraft", null);
__decorate([
    (0, common_1.Get)(':id/verify-hash'),
    (0, swagger_1.ApiOperation)({ summary: 'Verify hash chain integrity for a post' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Post ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Hash verification result' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "verifyHashChain", null);
__decorate([
    (0, common_1.Get)('thread/:threadId/verify-chain'),
    (0, swagger_1.ApiOperation)({ summary: 'Verify entire hash chain for a thread' }),
    (0, swagger_1.ApiParam)({ name: 'threadId', description: 'Thread ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Hash chain verification result' }),
    __param(0, (0, common_1.Param)('threadId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "verifyThreadHashChain", null);
exports.PostController = PostController = __decorate([
    (0, swagger_1.ApiTags)('Posts'),
    (0, common_1.Controller)('posts'),
    __metadata("design:paramtypes", [post_service_1.PostService])
], PostController);
//# sourceMappingURL=post.controller.js.map