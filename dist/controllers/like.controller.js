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
exports.LikeController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const like_service_1 = require("../services/like.service");
let LikeController = class LikeController {
    likeService;
    constructor(likeService) {
        this.likeService = likeService;
    }
    async likePost(postId, username) {
        return this.likeService.likePost(postId, username);
    }
    async unlikePost(postId, username) {
        await this.likeService.unlikePost(postId, username);
        return { message: 'Post unliked successfully' };
    }
    async getLikesByPost(postId) {
        return this.likeService.getLikesByPost(postId);
    }
    async hasLiked(postId, username) {
        const hasLiked = await this.likeService.hasLiked(postId, username);
        return { hasLiked };
    }
};
exports.LikeController = LikeController;
__decorate([
    (0, common_1.Post)('post/:postId'),
    (0, swagger_1.ApiOperation)({ summary: 'Like a post' }),
    (0, swagger_1.ApiParam)({ name: 'postId', description: 'Post ID' }),
    (0, swagger_1.ApiQuery)({ name: 'username', description: 'Username' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Post liked successfully' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'User has already liked this post' }),
    __param(0, (0, common_1.Param)('postId')),
    __param(1, (0, common_1.Query)('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], LikeController.prototype, "likePost", null);
__decorate([
    (0, common_1.Delete)('post/:postId'),
    (0, swagger_1.ApiOperation)({ summary: 'Unlike a post' }),
    (0, swagger_1.ApiParam)({ name: 'postId', description: 'Post ID' }),
    (0, swagger_1.ApiQuery)({ name: 'username', description: 'Username' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Post unliked successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Like not found' }),
    __param(0, (0, common_1.Param)('postId')),
    __param(1, (0, common_1.Query)('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], LikeController.prototype, "unlikePost", null);
__decorate([
    (0, common_1.Get)('post/:postId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all likes for a post' }),
    (0, swagger_1.ApiParam)({ name: 'postId', description: 'Post ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Likes retrieved' }),
    __param(0, (0, common_1.Param)('postId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LikeController.prototype, "getLikesByPost", null);
__decorate([
    (0, common_1.Get)('post/:postId/has-liked'),
    (0, swagger_1.ApiOperation)({ summary: 'Check if user has liked a post' }),
    (0, swagger_1.ApiParam)({ name: 'postId', description: 'Post ID' }),
    (0, swagger_1.ApiQuery)({ name: 'username', description: 'Username to check' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Like status retrieved' }),
    __param(0, (0, common_1.Param)('postId')),
    __param(1, (0, common_1.Query)('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], LikeController.prototype, "hasLiked", null);
exports.LikeController = LikeController = __decorate([
    (0, swagger_1.ApiTags)('Likes'),
    (0, common_1.Controller)('likes'),
    __metadata("design:paramtypes", [like_service_1.LikeService])
], LikeController);
//# sourceMappingURL=like.controller.js.map