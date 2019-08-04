export interface ICategory {
    name: string;
    type: string;
    description: string;
    id: number;
}

export class Category implements ICategory {
    name: string;
    type: string;
    description: string;
    id: number;

    // constructor() {
    //     this.name = "";
    //     this.type = "";
    //     this.description = "";
    // }
}