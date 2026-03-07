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
exports.CreateThreadDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const entities_1 = require("../entities");
class CreateThreadDto {
    title;
    samitiId;
    authorUsername;
    vimarshType;
    assignedByUsername;
}
exports.CreateThreadDto = CreateThreadDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Thread title', maxLength: 500 }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], CreateThreadDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Samiti ID where thread is created' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateThreadDto.prototype, "samitiId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Author username' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateThreadDto.prototype, "authorUsername", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Vimarsh type', enum: entities_1.VimarshType }),
    (0, class_validator_1.IsEnum)(entities_1.VimarshType),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateThreadDto.prototype, "vimarshType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Username who assigned this thread' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateThreadDto.prototype, "assignedByUsername", void 0);
//# sourceMappingURL=create-thread.dto.js.map