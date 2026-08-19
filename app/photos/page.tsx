import { getPhotos } from '@/lib/photos';
import { PhotoWall } from './photo-wall';

export default function PhotosPage() {
  const photos = getPhotos();

  return (
    <div className='w-full '>
      <section className='flex h-screen w-full items-center justify-center'>
        <div className='-mt-60 text-center'>
          <p className='animate-pulse text-lg uppercase tracking-[0.3em] text-zinc-500'>
            Friends, Myself &amp; Photos
          </p>
          {/* 这里可以放你之前的瘦长菱形代码 */}
          <div className='mx-auto mt-4 h-20 w-px bg-gradient-to-b from-zinc-500 to-transparent' />
        </div>
      </section>

      {/* 第二部分：justified 行布局图片墙（从左到右、从上到下，不裁切） */}
      <div className='py-20'>
        <PhotoWall photos={photos} />
      </div>
    </div>
  );
}
