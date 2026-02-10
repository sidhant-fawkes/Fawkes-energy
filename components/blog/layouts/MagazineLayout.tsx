'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import { ArrowLeft, Calendar, Share2 } from 'lucide-react'
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

interface MagazineLayoutProps {
    post: Post
}

// Custom Portable Text components for Magazine style
const magazineComponents = {
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
                        <div className="relative w-full rounded-xl overflow-hidden bg-muted/20 flex items-center justify-center" style={{ minHeight: '200px' }}>
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
    block: {
        normal: ({ children }: any) => {
            // Check if this is the first paragraph for drop cap
            return <p>{children}</p>
        },
    },
}

export default function MagazineLayout({ post }: MagazineLayoutProps) {
    return (
        <article className="min-h-screen bg-background">
            {/* Header */}
            <header className="border-b border-border">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link 
                        href="/blog" 
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Blog
                    </Link>
                    <button 
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                        onClick={() => navigator.share?.({ title: post.title, url: window.location.href })}
                    >
                        <Share2 className="w-4 h-4" />
                        Share
                    </button>
                </div>
            </header>

            {/* Full-Bleed Hero Image */}
            {post.mainImage && (
                <div className="relative w-full h-[50vh] md:h-[60vh]">
                    <Image
                        src={urlForImage(post.mainImage).url()}
                        alt={post.title}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                </div>
            )}

            {/* Article Header */}
            <div className="max-w-3xl mx-auto px-6 -mt-20 relative z-10">
                <div className="bg-background p-8 md:p-12 rounded-t-2xl border border-border border-b-0">
                    {/* Category/Tag */}
                    <div className="flex items-center gap-3 mb-6">
                        <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                            Insights
                        </span>
                        <ReadingTime content={post.body} className="text-muted-foreground text-sm" />
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading leading-tight mb-6">
                        {post.title}
                    </h1>

                    {/* Excerpt */}
                    {post.excerpt && (
                        <p className="text-xl text-muted-foreground leading-relaxed mb-8 font-serif italic">
                            {post.excerpt}
                        </p>
                    )}

                    {/* Author & Date */}
                    <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-border">
                        {post.author && (
                            <div className="flex items-center gap-3">
                                {post.author.image && (
                                    <div className="relative w-12 h-12 rounded-full overflow-hidden">
                                        <Image
                                            src={urlForImage(post.author.image).url()}
                                            alt={post.author.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                )}
                                <div>
                                    <p className="font-medium">{post.author.name}</p>
                                    <p className="text-sm text-muted-foreground">Author</p>
                                </div>
                            </div>
                        )}
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            <time>
                                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                                    month: 'long',
                                    day: 'numeric',
                                    year: 'numeric'
                                })}
                            </time>
                        </div>
                    </div>
                </div>
            </div>

            {/* Article Content */}
            <div className="max-w-3xl mx-auto px-6">
                <div className="bg-background p-8 md:p-12 pt-0 border border-border border-t-0 rounded-b-2xl">
                    {/* Drop Cap Style Article Body */}
                    <div className="prose prose-lg dark:prose-invert 
                        prose-headings:font-heading prose-headings:font-bold 
                        prose-p:text-muted-foreground prose-p:leading-relaxed
                        prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                        prose-blockquote:border-l-4 prose-blockquote:border-primary 
                        prose-blockquote:bg-primary/5 prose-blockquote:py-4 prose-blockquote:px-6 
                        prose-blockquote:rounded-r-lg prose-blockquote:not-italic
                        prose-blockquote:text-foreground prose-blockquote:font-medium
                        prose-img:rounded-xl prose-img:shadow-lg
                        first:prose-p:first-letter:text-6xl first:prose-p:first-letter:font-bold 
                        first:prose-p:first-letter:text-primary first:prose-p:first-letter:float-left 
                        first:prose-p:first-letter:mr-3 first:prose-p:first-letter:mt-1
                        first:prose-p:first-letter:leading-none
                        max-w-none">
                        <PortableText value={post.body} components={magazineComponents} />
                    </div>
                </div>
            </div>

            {/* Footer Section */}
            <div className="max-w-3xl mx-auto px-6 py-12">
                {/* Author Card */}
                {post.author && (
                    <div className="mb-12">
                        <AuthorCard author={post.author} />
                    </div>
                )}

                {/* Back to Blog */}
                <div className="text-center pt-8 border-t border-border">
                    <Link 
                        href="/blog"
                        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to all articles
                    </Link>
                </div>
            </div>
        </article>
    )
}
