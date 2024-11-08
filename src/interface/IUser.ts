export interface IUser{
    name: string;
    password: string;
    email?: string;
    role: string;
    created_at: Date;
    updated_at: Date;
    
}