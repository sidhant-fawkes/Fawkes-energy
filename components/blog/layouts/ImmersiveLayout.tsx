'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import { ArrowLeft, Clock, Calendar } from 'lucide-react'
import { urlForImage } from '@/sanity/lib/image'
import AuthorCard from '../shared/AuthorCard'
import ReadingTime from '../shared/ReadingTime'
import PortableTextTable from '../shared/PortableTextTable'

interface Post {
    _id: string
    title: string
    mainImage?: any
    heroVideoUrl?: string
    body: any
    publishedAt: string
    excerpt?: string
    author?: {
        name: string
        image?: any
        bio?: string
    }
}

interface ImmersiveLayoutProps {
    post: Post
}

// Custom Portable Text components for Immersive style
const immersiveComponents = {
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
        table: PortableTextTable,
    },
}

export default function ImmersiveLayout({ post }: ImmersiveLayoutProps) {
    const [scrollY, setScrollY] = useState(0)
    const [readProgress, setReadProgress] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY)
            
            // Calculate reading progress
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
            {/* Reading Progress Bar */}
            <div 
                className="fixed top-0 left-0 h-1 bg-primary z-50 transition-all duration-150"
                style={{ width: `${readProgress}%` }}
            />

            {/* Immersive Hero Section */}
            <section className="relative h-screen flex items-end overflow-hidden">
                {/* Background Media with Parallax (video preferred, image fallback) */}
                <div
                    className="absolute inset-0 w-full h-[120%] overflow-hidden"
                    style={{
                        transform: `translateY(${scrollY * 0.3}px)`,
                    }}
                >
                    {post.heroVideoUrl ? (
                        <video
                            className="w-full h-full object-cover"
                            autoPlay
                            muted
                            loop
                            playsInline
                            poster={post.mainImage ? urlForImage(post.mainImage).url() : undefined}
                        >
                            <source src={post.heroVideoUrl} />
                        </video>
                    ) : post.mainImage ? (
                        <Image
                            src={urlForImage(post.mainImage).url()}
                            alt={post.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    ) : (
                        <div className="h-full w-full bg-gradient-to-br from-primary/30 via-primary/10 to-background" />
                    )}
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-background/60 to-transparent" />

                {/* Back Navigation - Fixed */}
                <Link 
                    href="/blog" 
                    className="fixed top-6 left-6 z-40 inline-flex items-center gap-2 px-4 py-2 bg-background/80 backdrop-blur-md rounded-full text-sm text-muted-foreground hover:text-foreground transition-colors border border-border/50"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                </Link>

                {/* Hero Content */}
                <div className="relative z-10 w-full max-w-4xl mx-auto px-6 pb-20">
                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-white/80">
                        {post.author && (
                            <div className="flex items-center gap-2">
                                {post.author.image && (
                                    <div className="relative w-8 h-8 rounded-full overflow-hidden ring-2 ring-white/20">
                                        <Image
                                            src={urlForImage(post.author.image).url()}
                                            alt={post.author.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                )}
                                <span className="font-medium">{post.author.name}</span>
                            </div>
                        )}
                        <span className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4" />
                            {new Date(post.publishedAt).toLocaleDateString('en-US', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric'
                            })}
                        </span>
                        <ReadingTime content={post.body} className="text-white/80" />
                    </div>

                    {/* Title */}
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading leading-tight text-white mb-6"
                        style={{ textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}
                    >
                        {post.title}
                    </h1>

                    {/* Excerpt */}
                    {post.excerpt && (
                        <p className="text-lg md:text-xl text-white/90 max-w-2xl leading-relaxed"
                           style={{ textShadow: '0 1px 10px rgba(0,0,0,0.2)' }}
                        >
                            {post.excerpt}
                        </p>
                    )}

                    {/* Scroll Indicator */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
                            <div className="w-1 h-2 bg-white/60 rounded-full animate-pulse" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Article Content */}
            <section className="relative bg-background">
                <div className="max-w-3xl mx-auto px-6 py-16">
                    {/* Article Body */}
                    <div className="prose prose-lg dark:prose-invert prose-headings:font-heading prose-headings:font-bold prose-p:text-muted-foreground prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-blockquote:border-l-primary prose-blockquote:bg-primary/5 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:not-italic prose-img:rounded-xl prose-img:shadow-lg max-w-none">
                        <PortableText value={post.body} components={immersiveComponents} />
                    </div>

                    {/* Divider */}
                    <div className="my-16 flex items-center gap-4">
                        <div className="flex-1 h-px bg-border" />
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <div className="flex-1 h-px bg-border" />
                    </div>

                    {/* Author Card */}
                    {post.author && (
                        <AuthorCard author={post.author} />
                    )}

                    {/* Back to Blog */}
                    <div className="mt-12 text-center">
                        <Link 
                            href="/blog"
                            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to all articles
                        </Link>
                    </div>
                </div>
            </section>
        </article>
    )
}
