import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

export default function ContentSection() {
    return (
        <section className="py-16 md:py-32">
            <div className="mx-auto max-w-5xl px-6">
                <div className="grid gap-6 md:grid-cols-2 md:gap-12">
                    <h2 className="text-4xl font-medium">We believe in curiosity, creativity, and continuous learning.</h2>
                    <div className="space-y-6">
                        <p>Nerd Club is a community for builders, learners, and innovators who love exploring technology. Whether you’re a developer, researcher, designer, or just someone curious about how things work — this is your space.</p>
                        <p>
                           We focus on growing together by sharing knowledge, building projects, and supporting each other in our tech journeys <span className="font-bold">From AI to Web Development, from Cybersecurity to IoT, Nerd Club</span> — rings people together who want to push boundaries and create something meaningful.
                        </p>
                        <Button asChild variant="secondary" size="sm" className="gap-1 pr-1.5">
                            <Link href="/about">
                                <span>Learn More</span>
                                <ChevronRight className="size-2" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
