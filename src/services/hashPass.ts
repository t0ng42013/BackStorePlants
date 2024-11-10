import bcrypt from 'bcryptjs';


export const hashPass =async (password: string):Promise<string> => {
    return await bcrypt.hash(password, 10);
};


export const comparePass = async (password: string, hash: string):Promise<boolean> => {
    return await bcrypt.compare(password, hash);
};

