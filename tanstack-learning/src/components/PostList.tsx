'use client'

import {Loading} from './Loading';
import {ErrorAlert} from './ErrorAlert';
import {useQuery} from '@tanstack/react-query';
import Link from 'next/link';
import {ReactElement} from 'react';
import { postsSchema } from '@/data/schema';

export function PostList({
                             criteria,
                         }: {
    criteria: string | string[] | undefined;
}): ReactElement {

    const {
        data: resolvedPosts,
        isPending,
        error,
    } = useQuery({
        queryKey: ['posts', criteria],
        queryFn: async () => {
            const path =
                typeof criteria === 'string'
                    ? `/api/posts/?criteria=${
                          encodeURIComponent(criteria)
                      }`
                    : '/api/posts/';
            const response = await fetch(path);
            if (!response.ok) {
                throw new Error('Problem fetching data');
            }
            return postsSchema.parse(
                await response.json(),
            );
        },
    });
    if (isPending) {
        return <Loading/>;
    }
    if (error) {
        return <ErrorAlert error={error}/>;
    }

    const posts: { id: number; title: string; description: string }[] = resolvedPosts ?? [];

    return (
        <ul>
            {posts.map((post) => (
                <li key={post.id}>
                    <Link href={`/posts/${post.id}`}>
                        {post.title}
                    </Link>
                    <p>{post.description}</p>
                </li>
            ))}
        </ul>
    );
}
