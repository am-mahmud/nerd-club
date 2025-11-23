'use client';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { DynamicIcon } from 'lucide-react/dynamic';
import Link from 'next/link'

export default function FAQsThree() {
    const faqItems = [
        {
            id: 'item-1',
            icon: 'circle-question-mark',
            question: 'How do I ask a research question?',
            answer: 'Click the “Ask Question” after login. Provide a clear title, detailed context, and any references or data you have so researchers can give precise and valuable answers.',
        },
        {
            id: 'item-2',
            icon: 'message-square-text',
            question: 'Who can answer questions?',
            answer: 'Any verified member of the community can answer. Researchers, students, and domain experts contribute based on their expertise. Quality responses are highlighted through upvotes and moderation.',
        },
        {
            id: 'item-3',
            icon: 'search',
            question: 'How do I find existing research or similar questions?',
            answer: 'Use the search bar at the top of the site. You can filter by tags, field of study, date, or popularity to quickly find relevant discussions or previously answered questions.',
        },
        {
            id: 'item-4',
           icon: 'thumbs-up',
            question: 'How do upvotes and reputation work?',
            answer: 'Quality questions and answers earn upvotes, which increase your reputation score. Higher reputation unlocks privileges like commenting, editing, and moderating.',
        },
        {
            id: 'item-5',
            icon: 'square-pen',
            question: 'Can I edit my question after posting?',
            answer: 'Yes. You can update your question anytime to add clarifications, additional data, or corrections. Editing helps others give more accurate answers.',
        },
    ]

    return (
        <section className="py-16 md:py-32">
            <div className="mx-auto max-w-5xl px-4 md:px-6">
                <div className="flex flex-col gap-10 md:flex-row md:gap-16">
                    <div className="md:w-1/3">
                        <div className="sticky top-20">
                            <h2 className="mt-4 text-3xl font-bold">Frequently Asked Questions</h2>
                            <p className="text-muted-foreground mt-4">
                                Can't find what you're looking for? Contact our{' '}
                                <Link href="#" className="text-primary font-medium hover:underline">
                                    customer support team
                                </Link>
                            </p>
                        </div>
                    </div>
                    <div className="md:w-2/3">
                        <Accordion type="single" collapsible className="w-full space-y-2">
                            {faqItems.map((item) => (
                                <AccordionItem
                                    key={item.id}
                                    value={item.id}
                                    className="bg-background shadow-xs rounded-lg border px-4 last:border-b">
                                    <AccordionTrigger className="cursor-pointer items-center py-5 hover:no-underline">
                                        <div className="flex items-center gap-3">
                                            <div className="flex size-6">
                                                <DynamicIcon name={item.icon} className="m-auto size-4" />
                                            </div>
                                            <span className="text-base">{item.question}</span>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="pb-5">
                                        <div className="px-9">
                                            <p className="text-base">{item.answer}</p>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </div>
            </div>
        </section>
    );
}
