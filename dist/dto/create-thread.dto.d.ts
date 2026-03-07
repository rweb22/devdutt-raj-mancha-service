import { VimarshType } from '../entities';
export declare class CreateThreadDto {
    title: string;
    samitiId: string;
    authorUsername: string;
    vimarshType?: VimarshType;
    assignedByUsername?: string;
}
