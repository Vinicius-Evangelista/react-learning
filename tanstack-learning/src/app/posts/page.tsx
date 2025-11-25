'use client'
import { PostList } from '@/components/PostList';
import { NewPost } from '@/components/NewPost';

export default function Posts({
  searchParams,
}: {
  searchParams: string | string[] | undefined
}) {
  const criteria = (searchParams);
  const resolvedHeading =
    typeof criteria === 'string'
      ? `Posts for ${criteria}`
      : 'Posts';

  return (
      <main>
          <h2>{resolvedHeading}</h2>
          <NewPost />
          <PostList criteria={criteria} />
      </main>
  );
}
    