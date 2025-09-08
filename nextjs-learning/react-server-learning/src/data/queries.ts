import { createClient } from '@libsql/client';
import { postsSchema } from './schema';

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

    return postsSchema.parse(data.rows);
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
    return postsSchema.parse(data.rows);
    
}

async function delay() {
    await new Promise((resolve) =>
        setTimeout(resolve, 1000),
    );
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
    
    return postsSchema.parse(data.rows);
}