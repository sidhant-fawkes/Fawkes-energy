'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import { ArrowLeft, Calendar } from 'lucide-react'
import { urlForImage } from '@/sanity/lib/image'
import AuthorCard from '../shared/AuthorCard'
import ReadingTime from '../shared/ReadingTime'

interface Post {
    _id: string
    title: string
    mainImage?: any
    body: any
    publishedAt: string
    excerpt?: string
    author?: {
        name: string
        image?: any
        bio?: string
    }
}

interface MinimalLayoutProps {
    post: Post
}

// Custom Portable Text components for Minimal style
const minimalComponents = {
    types: {
        image: ({ value }: any) => {
            if (!value?.asset) {
                return null
            }
            
            try {
                // Handle expanded asset from GROQ (has url directly) vs reference asset
                let imageUrl: string
                let imageWidth: number
                let imageHeight: number
                
                if (value.asset.url) {
                    // Expanded asset from GROQ
                    imageUrl = value.asset.url
                    imageWidth = value.asset.metadata?.dimensions?.width || 1200
                    imageHeight = value.asset.metadata?.dimensions?.height || 800
                } else {
                    // Reference asset - use urlForImage
                    imageUrl = urlForImage(value).url()
                    imageWidth = value.asset?.metadata?.dimensions?.width || 1200
                    imageHeight = value.asset?.metadata?.dimensions?.height || 800
                }
                
                if (!imageUrl) {
                    return null
                }
                
                return (
                    <figure className="my-8">
                        <div className="relative w-full rounded-lg overflow-hidden bg-muted/20 flex items-center justify-center" style={{ minHeight: '200px' }}>
                            <Image
                                src={imageUrl}
                                alt={value.alt || 'Blog post image'}
                                width={imageWidth}
                                height={imageHeight}
                                className="object-contain max-w-full h-auto"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 800px"
                                unoptimized
                            />
                        </div>
                        {value.caption && (
                            <figcaption className="mt-4 text-sm text-center text-muted-foreground italic">
                                {value.caption}
                            </figcaption>
                        )}
                    </figure>
                )
            } catch (error) {
                console.error('Error rendering image:', error, value)
                return null
            }
        },
    },
}

export default function MinimalLayout({ post }: MinimalLayoutProps) {
    const [readProgress, setReadProgress] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            const windowHeight = window.innerHeight
            const documentHeight = document.documentElement.scrollHeight - windowHeight
            const progress = (window.scrollY / documentHeight) * 100
            setReadProgress(Math.min(progress, 100))
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <article className="min-h-screen bg-background">
            {/* Minimal Progress Bar */}
            <div 
                className="fixed top-0 left-0 h-0.5 bg-primary/60 z-50 transition-all duration-150"
                style={{ width: `${readProgress}%` }}
            />

            {/* Simple Header */}
            <header className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border/50 z-40">
                <div className="max-w-2xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link 
                        href="/blog" 
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Blog
                    </Link>
                    <ReadingTime content={post.body} className="text-sm text-muted-foreground" />
                </div>
            </header>

            {/* Content Container */}
            <div className="max-w-2xl mx-auto px-6 py-12">
                {/* Article Header */}
                <header className="mb-12">
                    {/* Date */}
                    <time className="text-sm text-muted-foreground flex items-center gap-2 mb-4">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.publishedAt).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric'
                        })}
                    </time>

                    {/* Title */}
                    <h1 className="text-3xl md:text-4xl font-bold font-heading leading-tight mb-4">
                        {post.title}
                    </h1>

                    {/* Excerpt */}
                    {post.excerpt && (
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            {post.excerpt}
                        </p>
                    )}

                    {/* Author */}
                    {post.author && (
                        <div className="flex items-center gap-3 mt-6 pt-6 border-t border-border">
                            {post.author.image && (
                                <div className="relative w-10 h-10 rounded-full overflow-hidden">
                                    <Image
                                        src={urlForImage(post.author.image).url()}
                                        alt={post.author.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            )}
                            <span className="text-sm text-muted-foreground">
                                By <span className="text-foreground font-medium">{post.author.name}</span>
                            </span>
                        </div>
                    )}
                </header>

                {/* Featured Image - Subtle */}
                {post.mainImage && (
                    <figure className="mb-12">
                        <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden">
                            <Image
                                src={urlForImage(post.mainImage).url()}
                                alt={post.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </figure>
                )}

                {/* Article Body - Clean Typography */}
                <div className="prose prose-neutral dark:prose-invert 
                    prose-headings:font-heading prose-headings:font-semibold
                    prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
                    prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                    prose-p:text-base prose-p:leading-7 prose-p:text-muted-foreground
                    prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                    prose-blockquote:border-l-2 prose-blockquote:border-muted-foreground/30
                    prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-muted-foreground
                    prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
                    prose-code:before:content-none prose-code:after:content-none
                    prose-pre:bg-muted prose-pre:border prose-pre:border-border
                    prose-img:rounded-lg
                    prose-li:text-muted-foreground
                    max-w-none">
                    <PortableText value={post.body} components={minimalComponents} />
                </div>

                {/* Simple Divider */}
                <hr className="my-12 border-border" />

                {/* Author Card */}
                {post.author && (
                    <div className="mb-12">
                        <AuthorCard author={post.author} />
                    </div>
                )}

                {/* Back Link */}
                <div className="text-center">
                    <Link 
                        href="/blog"
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to all articles
                    </Link>
                </div>
            </div>
        </article>
    )
}
