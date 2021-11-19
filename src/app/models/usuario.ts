import { Direccion } from './direccion';
import { Company } from './company';
export class Usuario{
    constructor(
        public id: number, 
        public name: string, 
        public username: string, 
        public email: string, 
        public address: Direccion,
        public phone: string,
        public website: string,
        public company: Company
        ){
        
    }
}