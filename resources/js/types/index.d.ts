export interface User {
    id: number;
    username: string;
    name?: string;
    email: string;
    phone?: string | null;
    role?: string;
    avatar?: string | null;
    email_verified_at?: string | null;
    created_at?: string;
    updated_at?: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
};
