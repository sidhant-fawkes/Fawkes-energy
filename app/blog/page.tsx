import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ArrowRight, Calendar, User } from 'lucide-react'
import { client } from '@/sanity/lib/client'
import { urlForImage } from '@/sanity/lib/image'

interface Post {
    _id: string
    title: string
    slug: { current: string }
    mainImage?: any
    publishedAt: string
    authorName?: string
    excerpt?: string
}

async function getPosts(): Promise<Post[]> {
    const query = `*[_type == "post"] | order(publishedAt desc) {
        _id,
        title,
        slug,
        mainImage,
        publishedAt,
        "authorName": author->name,
        "excerpt": coalesce(excerpt, body[0].children[0].text)
    }`
    try {
        const posts = await client.fetch(query)
        return posts
    } catch (error) {
        console.error('Error fetching posts:', error)
        return []
    }
}

export default async function BlogPage() {
    const posts = await getPosts()
    const featuredPost = posts[0]
    const remainingPosts = posts.slice(1)

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Header */}
            <section className="relative bg-gradient-to-b from-primary/10 via-primary/5 to-background border-b border-border">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent opacity-50" />
                <div className="relative max-w-6xl mx-auto px-6 py-20">
                    {/* Back Navigation */}
                    <Link 
                        href="/" 
                        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Home
                    </Link>
                    
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-4">
                        Insights & Perspectives
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
                        Exploring battery intelligence, circularity, and the future of energy storage in India's EV ecosystem.
                    </p>
                </div>
            </section>

            <div className="max-w-6xl mx-auto px-6 py-12">
                {posts.length === 0 ? (
                    /* Empty State */
                    <div className="text-center py-20">
                        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                            <Calendar className="w-10 h-10 text-primary" />
                        </div>
                        <h2 className="text-2xl font-semibold mb-3">Coming Soon</h2>
                        <p className="text-muted-foreground max-w-md mx-auto mb-6">
                            We're working on insightful content about battery intelligence and the EV ecosystem. Check back soon!
                        </p>
                        <Link 
                            href="/studio" 
                            className="text-primary hover:text-primary/80 font-medium"
                        >
                            Go to Sanity Studio →
                        </Link>
                    </div>
                ) : (
                    <>
                        {/* Featured Post */}
                        {featuredPost && (
                            <section className="mb-16">
                                <div className="flex items-center gap-2 mb-6">
                                    <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                                        Featured
                                    </span>
                                    <span className="text-muted-foreground text-sm">Latest article</span>
                                </div>
                                
                                <Link href={`/blog/${featuredPost.slug.current}`} className="group block">
                                    <article className="grid md:grid-cols-2 gap-8 bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/30 transition-colors">
                                        {/* Image */}
                                        {featuredPost.mainImage ? (
                                            <div className="relative h-64 md:h-full min-h-[300px] overflow-hidden">
                                                <Image
                                                    src={urlForImage(featuredPost.mainImage).url()}
                                                    alt={featuredPost.title}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                    priority
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                                            </div>
                                        ) : (
                                            <div className="relative h-64 md:h-full min-h-[300px] bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                                                <span className="text-6xl opacity-30">📝</span>
                                            </div>
                                        )}
                                        
                                        {/* Content */}
                                        <div className="p-8 flex flex-col justify-center">
                                            <h2 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
                                                {featuredPost.title}
                                            </h2>
                                            
                                            {featuredPost.excerpt && (
                                                <p className="text-muted-foreground mb-6 line-clamp-3">
                                                    {featuredPost.excerpt}
                                                </p>
                                            )}
                                            
                                            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                                                {featuredPost.authorName && (
                                                    <span className="flex items-center gap-1.5">
                                                        <User className="w-4 h-4" />
                                                        {featuredPost.authorName}
                                                    </span>
                                                )}
                                                <span className="flex items-center gap-1.5">
                                                    <Calendar className="w-4 h-4" />
                                                    {new Date(featuredPost.publishedAt).toLocaleDateString('en-US', {
                                                        month: 'long',
                                                        day: 'numeric',
                                                        year: 'numeric'
                                                    })}
                                                </span>
                                            </div>
                                            
                                            <span className="inline-flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
                                                Read Article
                                                <ArrowRight className="w-4 h-4" />
                                            </span>
                                        </div>
                                    </article>
                                </Link>
                            </section>
                        )}

                        {/* Remaining Posts Grid */}
                        {remainingPosts.length > 0 && (
                            <section>
                                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                                    <span className="w-8 h-0.5 bg-primary rounded-full" />
                                    More Articles
                                </h2>
                                
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {remainingPosts.map((post) => (
                                        <Link 
                                            key={post._id} 
                                            href={`/blog/${post.slug.current}`} 
                                            className="group"
                                        >
                                            <article className="h-full bg-card border border-border rounded-xl overflow-hidden hover:border-primary/30 hover:shadow-lg transition-all">
                                                {/* Image */}
                                                {post.mainImage ? (
                                                    <div className="relative h-48 overflow-hidden">
                                                        <Image
                                                            src={urlForImage(post.mainImage).url()}
                                                            alt={post.title}
                                                            fill
                                                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="h-48 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                                                        <span className="text-4xl opacity-30">📝</span>
                                                    </div>
                                                )}
                                                
                                                {/* Content */}
                                                <div className="p-5">
                                                    <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                                                        {post.title}
                                                    </h3>
                                                    
                                                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                                                        {post.authorName && (
                                                            <span className="truncate">{post.authorName}</span>
                                                        )}
                                                        <time className="flex-shrink-0">
                                                            {new Date(post.publishedAt).toLocaleDateString('en-US', {
                                                                month: 'short',
                                                                day: 'numeric'
                                                            })}
                                                        </time>
                                                    </div>
                                                </div>
                                            </article>
                                        </Link>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Single Post - Show CTA */}
                        {posts.length === 1 && (
                            <section className="mt-16 text-center py-12 border-t border-border">
                                <p className="text-muted-foreground mb-4">
                                    More insights coming soon. Stay tuned for articles on battery health, EV ecosystems, and sustainable energy.
                                </p>
                                <Link 
                                    href="/#contact" 
                                    className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium"
                                >
                                    Get notified about new posts
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </section>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}
