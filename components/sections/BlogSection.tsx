'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import Section from '@/components/ui/Section'
import Card from '@/components/ui/Card'
import { Heading, Body } from '@/components/ui/Typography'
import { client } from '@/sanity/lib/client'
import { urlForImage } from '@/sanity/lib/image'

interface BlogPost {
    _id: string
    title: string
    slug: { current: string }
    mainImage?: any
    publishedAt: string
    authorName?: string
    excerpt?: string
}

export default function BlogSection() {
    const [posts, setPosts] = useState<BlogPost[]>([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function fetchPosts() {
            try {
                const query = `*[_type == "post"] | order(publishedAt desc)[0...6] {
                    _id,
                    title,
                    slug,
                    mainImage,
                    publishedAt,
                    "authorName": author->name,
                    "excerpt": coalesce(excerpt, body[0].children[0].text)
                }`
                const data = await client.fetch(query)
                setPosts(data)
            } catch (error) {
                console.error('Error fetching posts:', error)
                setPosts([])
            } finally {
                setIsLoading(false)
            }
        }
        fetchPosts()
    }, [])

    const handlePrevious = () => {
        setCurrentIndex((prev) => (prev === 0 ? posts.length - 1 : prev - 1))
    }

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === posts.length - 1 ? 0 : prev + 1))
    }

    // Calculate visible cards based on screen size
    const getVisibleCards = () => {
        if (typeof window === 'undefined') return 3
        if (window.innerWidth < 768) return 1
        if (window.innerWidth < 1024) return 2
        return 3
    }

    const [visibleCards, setVisibleCards] = useState(3)

    useEffect(() => {
        const handleResize = () => setVisibleCards(getVisibleCards())
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    if (isLoading) {
        return (
            <Section id="blog" maxWidth="7xl" background="secondary">
                <div className="text-center">
                    <Heading variant="lg" className="mb-4">From the Blog</Heading>
                    <Body variant="lg" className="text-muted-foreground">Loading insights...</Body>
                </div>
            </Section>
        )
    }

    if (posts.length === 0) {
        return (
            <Section id="blog" maxWidth="7xl" background="secondary">
                <div className="text-center">
                    <Heading variant="lg" className="mb-4">From the Blog</Heading>
                    <Body variant="lg" className="text-muted-foreground">
                        No posts yet. Check back soon for insights on battery intelligence.
                    </Body>
                </div>
            </Section>
        )
    }

    return (
        <Section id="blog" maxWidth="7xl" background="secondary">
            <div className="text-center mb-12">
                <Heading variant="lg" className="mb-4">From the Blog</Heading>
                <Body variant="lg" className="text-muted-foreground max-w-2xl mx-auto">
                    Insights on battery intelligence, circularity, and the future of energy storage
                </Body>
            </div>

            <div className="relative">
                {/* Navigation Arrows */}
                {posts.length > visibleCards && (
                    <>
                        <button
                            onClick={handlePrevious}
                            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 rounded-full bg-primary/90 hover:bg-primary text-primary-foreground flex items-center justify-center shadow-lg transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                            aria-label="Previous posts"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                            onClick={handleNext}
                            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 rounded-full bg-primary/90 hover:bg-primary text-primary-foreground flex items-center justify-center shadow-lg transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                            aria-label="Next posts"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </>
                )}

                {/* Carousel Container */}
                <div className="overflow-hidden">
                    <div
                        className="flex transition-transform duration-500 ease-out"
                        style={{
                            transform: `translateX(-${currentIndex * (100 / visibleCards)}%)`,
                        }}
                    >
                        {posts.map((post) => (
                            <div
                                key={post._id}
                                className="flex-shrink-0 px-3"
                                style={{ width: `${100 / visibleCards}%` }}
                            >
                                <Link href={`/blog/${post.slug.current}`} className="group block h-full">
                                    <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
                                        {post.mainImage && (
                                            <div className="relative h-48 w-full overflow-hidden">
                                                <Image
                                                    src={urlForImage(post.mainImage).url()}
                                                    alt={post.title}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                            </div>
                                        )}
                                        <div className="p-6 flex-1 flex flex-col">
                                            <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                                                {post.title}
                                            </h3>
                                            <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                                                {post.authorName && <span>{post.authorName}</span>}
                                                <time>{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</time>
                                            </div>
                                            {post.excerpt && (
                                                <p className="text-sm text-muted-foreground line-clamp-2 flex-1">
                                                    {post.excerpt}
                                                </p>
                                            )}
                                            <div className="mt-4 flex items-center text-primary text-sm font-medium group-hover:gap-2 transition-all">
                                                Read more
                                                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </div>
                                    </Card>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Dot Indicators */}
                {posts.length > visibleCards && (
                    <div className="flex justify-center gap-2 mt-8">
                        {Array.from({ length: Math.ceil(posts.length / visibleCards) }).map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentIndex(idx)}
                                className={`w-2 h-2 rounded-full transition-all ${
                                    Math.floor(currentIndex / visibleCards) === idx
                                        ? 'bg-primary w-8'
                                        : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                                }`}
                                aria-label={`Go to slide ${idx + 1}`}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* View All Link */}
            <div className="text-center mt-12">
                <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors group"
                >
                    View All Posts
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
        </Section>
    )
}





