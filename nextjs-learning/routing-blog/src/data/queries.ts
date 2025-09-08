import { createClient } from '@libsql/client';

type Post = {
    id: number;
    title: string;
    description: string;
};

export async function getAllPosts() {
    const client = createClient({
        url: process.env.DB_URL ?? '',
    });
    const data = await client.execute(
        'SELECT id, title, description FROM posts',
    );
    client.close();
    return data.rows as unknown as Post[];
}

export async function getFilteredPosts(
    criteria: string,
) {
    const client = createClient({
        url: process.env.DB_URL ?? '',
    });
    const data = await client.execute(
        'SELECT id, title, description FROM posts WHERE title LIKE ?',
        [`%${criteria}%`]
    );
    client.close();
    return data.rows as unknown as Post[];
}

export async function getPost(id: number) {
    const client = createClient({
        url: process.env.DB_URL ?? '',
    });
    const data = await client.execute(
        'SELECT id, title, description FROM posts WHERE id = ?',
        [id]
    );
    client.close();
    if (data.rows.length === 0) {
        return undefined;
    }
    return data.rows[0] as unknown as Post;
}