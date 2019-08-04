export interface ISubCategory {
    name: string;
    description: string;
    parentType: string;
    type: string;
    id: number;
    categoryId: number;
}

export class SubCategory implements ISubCategory {
    name: string;
    description: string;
    parentType: string;
    type: string;
    id: number;
    categoryId: number;
}