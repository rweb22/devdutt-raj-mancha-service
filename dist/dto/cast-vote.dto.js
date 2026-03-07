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
exports.CastVoteDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const entities_1 = require("../entities");
class CastVoteDto {
    username;
    voteType;
}
exports.CastVoteDto = CastVoteDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Username of voter' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CastVoteDto.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Vote type', enum: entities_1.VoteType }),
    (0, class_validator_1.IsEnum)(entities_1.VoteType),
    __metadata("design:type", String)
], CastVoteDto.prototype, "voteType", void 0);
//# sourceMappingURL=cast-vote.dto.js.map