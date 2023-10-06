var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
class Name {
}
__decorate([
    Column(),
    __metadata("design:type", String)
], Name.prototype, "first", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Name.prototype, "last", void 0);
let Client = class Client extends BaseEntity {
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", String)
], Client.prototype, "id", void 0);
__decorate([
    Column(() => Name),
    __metadata("design:type", Name)
], Client.prototype, "name", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Client.prototype, "address", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], Client.prototype, "phone", void 0);
__decorate([
    Column({ unique: true }),
    __metadata("design:type", String)
], Client.prototype, "email", void 0);
__decorate([
    Column({ length: 8 }),
    __metadata("design:type", String)
], Client.prototype, "password", void 0);
Client = __decorate([
    Entity()
], Client);
export { Client };
