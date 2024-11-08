export interface IToken {
    id: string;
    role: string;
    name: string;
}

export interface TokenResponse {
    success: boolean;
    data?: any;
    error?: {
        message: string;
        type: 'expired' | 'invalid' | 'no_secret';
    };
}