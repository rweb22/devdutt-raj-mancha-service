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
exports.LikeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const entities_1 = require("../entities");
const post_service_1 = require("./post.service");
let LikeService = class LikeService {
    likeRepository;
    postService;
    constructor(likeRepository, postService) {
        this.likeRepository = likeRepository;
        this.postService = postService;
    }
    async likePost(postId, username) {
        await this.postService.getPostById(postId);
        const existingLike = await this.likeRepository.findOne({
            where: { postId, username },
        });
        if (existingLike) {
            throw new common_1.ConflictException('User has already liked this post');
        }
        const like = this.likeRepository.create({
            postId,
            username,
        });
        const savedLike = await this.likeRepository.save(like);
        await this.postService.incrementLikeCount(postId);
        return savedLike;
    }
    async unlikePost(postId, username) {
        const like = await this.likeRepository.findOne({
            where: { postId, username },
        });
        if (!like) {
            throw new common_1.NotFoundException('Like not found');
        }
        await this.likeRepository.remove(like);
        await this.postService.decrementLikeCount(postId);
    }
    async hasLiked(postId, username) {
        const like = await this.likeRepository.findOne({
            where: { postId, username },
        });
        return !!like;
    }
    async getLikesByPost(postId) {
        return this.likeRepository.find({
            where: { postId },
            order: { createdAt: 'DESC' },
        });
    }
};
exports.LikeService = LikeService;
exports.LikeService = LikeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.VimarshLike)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        post_service_1.PostService])
], LikeService);
//# sourceMappingURL=like.service.js.map