import { Suspense } from 'react';
import { Loading } from '@/components/Loading';
import { PostList } from '@/components/PostList';
import { NewPost } from '@/components/NewPost';

export default async function Posts({
  searchParams,
}: {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}) {
  const criteria = searchParams.criteria;
  const resolvedHeading =
    typeof criteria === 'string'
      ? `Posts for ${criteria}`
      : 'Posts';

  return (
    <main>
      <h2>{resolvedHeading}</h2>
      <NewPost/>
        <Suspense fallback={<Loading />}>
            <PostList criteria={criteria} />
        </Suspense>
    </main>
  );
}
