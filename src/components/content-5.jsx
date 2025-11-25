import { Cpu, Handshake, Lock, Sparkles, SquareLibrary, Zap } from 'lucide-react'

export default function ContentSection() {
    return (
        <section>
            <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-12">
                <div >
                    <h1 className="text-balance text-center text-4xl font-medium lg:text-5xl pb-5">About Nerd Club</h1>
                    <p className='pb-3'>Nerd Club is a community-driven platform for developers, researchers, and tech enthusiasts. Whether you're just starting out or already building advanced systems, this is your space to learn, collaborate, and bring ideas to life.</p>
                    <p className='pb-3' >At Nerd Club, we believe technology grows when people grow.Our mission is to empower curious minds with knowledge, tools, and a supportive community. We bring together learners, builders, and innovators to collaborate, ask questions, share insights, and create meaningful projects that push technology forward.</p>
                    <p className='pb-3'>To become the most vibrant, accessible, and impactful tech community where anyone — regardless of background — can explore ideas, build skills, and participate in shaping the future of technology.</p>
                    <p className='pb-3'>We are programmers, designers, researchers, engineers, and lifelong learners.Nerd Club is built on curiosity, creativity, and a shared passion for solving problems. We’re not just a tech community — we’re a safe environment where growth, exploration, and experimentation are encouraged every day.</p>
                </div>
                <img
                    className="rounded-(--radius) grayscale"
                    src="https://images.unsplash.com/photo-1616587226960-4a03badbe8bf?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="team image"
                    height=""
                    width=""
                    loading="lazy" />

                <div
                    className="relative mx-auto grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-8 lg:grid-cols-4">
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <Handshake className="size-4" />
                            <h3 className="text-sm font-medium">Community Discussions</h3>
                        </div>
                        <p className="text-muted-foreground text-sm">Talk about programming, AI, research, cybersecurity, cloud computing, startups, productivity, and more.</p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Zap className="size-4" />
                            <h3 className="text-sm font-medium">Learning Resources</h3>
                        </div>
                        <p className="text-muted-foreground text-sm">Curated guides, tutorials, articles, and research summaries for all levels — beginner to advanced.</p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <SquareLibrary className="size-4" />
                            <h3 className="text-sm font-medium">Research</h3>
                        </div>
                        <p className="text-muted-foreground text-sm">Deep technical conversations for students, researchers, and engineers working on AI, IoT, ML, and advanced topics.</p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Sparkles className="size-4" />

                            <h3 className="text-sm font-medium">Events & Workshops</h3>
                        </div>
                        <p className="text-muted-foreground text-sm">Technical webinars, live coding sessions, Q&A streams, and community meetups.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
