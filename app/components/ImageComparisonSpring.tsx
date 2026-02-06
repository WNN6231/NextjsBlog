import {
  ImageComparison,
  ImageComparisonImage,
  ImageComparisonSlider,
} from '@/app/components/core/image-comparison';

export function ImageComparisonSpring() {
  return (
    <ImageComparison
      className='aspect-16/10 w-full rounded-lg border border-zinc-200 dark:border-zinc-800'
      enableHover
      springOptions={{
        bounce: 0.3,
      }}
    >
      <ImageComparisonImage
        src='charles-postiaux-DdTuylT4IkA-unsplash.webp'
        alt='Motion Primitives Dark'
        position='left'
      />
      <ImageComparisonImage
        src='gavin-wilson-vqUElZs3AeA-unsplash.webp'
        alt='Motion Primitives Light'
        position='right'
      />
      <ImageComparisonSlider className='w-0.5 bg-white/30 backdrop-blur-xs' />
    </ImageComparison>
  );
}
