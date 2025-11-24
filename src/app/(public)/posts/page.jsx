import { PostCard } from '@/components/post-card';
import { AnimatedGroup } from '@/components/ui/animated-group';
import { TextEffect } from '@/components/ui/text-effect';
import React from 'react';

const page = async () => {

  const getPosts = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/posts", {
        cache: 'no-store',
      });

      const data = await res.json();
      return data.posts;
    } catch (error) {
      console.log("Error fetching posts:", error);
      return [];
    }
  };

  const posts = await getPosts();

  return (
    <div className='relative mx-auto max-w-6xl min-h-screen px-12 pt-24'>
      <TextEffect
        preset="fade-in-blur"
        speedSegment={0.3}
        as="h1"
        className="text-balance text-3xl font-medium "
      >
        All Posts
      </TextEffect>

      <AnimatedGroup variants={{
        container: {
          visible: {
            transition: {
              staggerChildren: 0.05,
              delayChildren: 0.75,
            },
          },
        },
      }}>
        <div className="grid grid-cols-3 gap-6 mt-3">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      </AnimatedGroup>
    </div>
  );
};

export default page;
