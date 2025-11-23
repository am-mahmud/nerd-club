

import { AnimatedGroup } from '@/components/ui/animated-group';
import { TextEffect } from '@/components/ui/text-effect';
import React from 'react';

const page = () => {
    return (
        <div className='relative mx-auto max-w-6xl min-h-screen px-12 pt-24'>
            <TextEffect
                preset="fade-in-blur"
                speedSegment={0.3}
                as="h1"
                className="text-balance text-3xl font-medium ">
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

                <div className='grid grid-cols-3 gap-2 mt-6'>
                    <div>
                        <h1>Post 1</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero unde placeat quas temporibus id est velit distinctio atque, magni quibusdam qui, optio reiciendis rem accusamus doloribus soluta, aut eos? Minima!</p>
                    </div>
                    <div>
                        <h1>Post 1</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero unde placeat quas temporibus id est velit distinctio atque, magni quibusdam qui, optio reiciendis rem accusamus doloribus soluta, aut eos? Minima!</p>
                    </div>
                    <div>
                        <h1>Post 1</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero unde placeat quas temporibus id est velit distinctio atque, magni quibusdam qui, optio reiciendis rem accusamus doloribus soluta, aut eos? Minima!</p>
                    </div>
                </div>
            </AnimatedGroup>




        </div>
    );
};

export default page;