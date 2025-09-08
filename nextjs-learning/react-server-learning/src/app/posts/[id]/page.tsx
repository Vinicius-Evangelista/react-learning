import { Suspense } from 'react';
import { Loading } from '@/components/Loading';
import { PostDetail } from '@/components/PostDetail';
import { ErrorBoundary } from 'react-error-boundary';

export default async function Post({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);

  return (
    <main>
      <Suspense fallback={<Loading />}>
        <ErrorBoundary fallback={<Loading />}>
          <PostDetail id={id} />
        </ErrorBoundary>
      </Suspense>
    </main>
  );
}
