export class Usuario {
    constructor(
        public name: string, 
        public password: string,
        public _id?: string, 
        public role?: string
    ){}
}