import {posts} from '@/app/data/posts';
import Link from 'next/link';
import {notFound} from "next/navigation";

export default async function Posts({
                                        searchParams,
                                    }: {
    searchParams: Promise<{
        [key: string]: string | string[] | undefined;
    }>;
}) {
    
    const criteria = (await searchParams).criteria;
    const resolvedPosts =
        typeof criteria === 'string'
            ? posts.filter((post) =>
                post.title
                    .toLowerCase()
                    .includes(criteria.toLowerCase()),
            )
            : posts;

    const resolvedHeading =
        typeof criteria === 'string'
             ? `Posts for ${criteria}`
        : 'Posts';
    
    return (
        <main>
            <h2>{resolvedHeading}</h2>
            <ul> {resolvedPosts.map((post) => (
                <li key={post.id}>
                    <Link href={`/posts/${post.id}`}>
                        <span>{post.title}</span>
                    </Link>
                    <p>{post.description}</p>
                </li>
            ))}
            </ul>
        </main>
    );
}