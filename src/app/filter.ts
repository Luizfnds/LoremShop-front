export class Filter {

    public name!: string;
    public types: string[] = [];

    constructor(
        name: string,
        types: string
    ) {
        this.name = name;
        this.types.push(types);
    }
}
