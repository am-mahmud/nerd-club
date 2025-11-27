import { PostCard } from '@/components/post-card';
import { AnimatedGroup } from '@/components/ui/animated-group';
import { 
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis
} from '@/components/ui/pagination';
import { TextEffect } from '@/components/ui/text-effect';
import React from 'react';

const page = async ({ searchParams }) => {
  const params = await searchParams;
  const getPosts = async () => {
    const currentPage = Number(params.page) || 1;
    
    try {
      const baseUrl = process.env.NEXTAUTH_URL;
      const res = await fetch(`${baseUrl}/api/posts?page=${currentPage}&limit=6`, {
        cache: 'no-store',
      });

      const data = await res.json();
      const totalPages = Math.ceil(data.totalPosts / 6);
      return {
        posts: data.posts,
        totalPages: totalPages,
        currentPage: currentPage,
      };
    } catch (error) {
      console.log("Error fetching posts:", error);
      return { posts: [], totalPages: 1, currentPage: 1 };
    }
  };

  const { posts, totalPages, currentPage } = await getPosts();

  
  const generatePageNumbers = () => {
    const pages = [];
    const showEllipsisStart = currentPage > 3;
    const showEllipsisEnd = currentPage < totalPages - 2;

    if (totalPages <= 6) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (showEllipsisStart) {
        pages.push('ellipsis-start');
      }
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (showEllipsisEnd) {
        pages.push('ellipsis-end');
      }
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = generatePageNumbers();

  return (
    <div className='relative mx-auto max-w-6xl min-h-screen px-12 pt-24'>
      <title>All Posts</title>
      <TextEffect
        preset="fade-in-blur"
        speedSegment={0.3}
        as="h1"
        className="text-balance text-center text-3xl font-medium pb-3"
      >
        Recent Posts
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
        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6 mt-3">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      </AnimatedGroup>

      {totalPages > 1 && (
        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                href={currentPage > 1 ? `?page=${currentPage - 1}` : '#'}
                aria-disabled={currentPage === 1}
                className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>

            {pageNumbers.map((pageNum, idx) => (
              <PaginationItem key={`page-${pageNum}-${idx}`}>
                {typeof pageNum === 'number' ? (
                  <PaginationLink
                    href={`?page=${pageNum}`}
                    isActive={currentPage === pageNum}
                  >
                    {pageNum}
                  </PaginationLink>
                ) : (
                  <PaginationEllipsis />
                )}
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext 
                href={currentPage < totalPages ? `?page=${currentPage + 1}` : '#'}
                aria-disabled={currentPage === totalPages}
                className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default page;