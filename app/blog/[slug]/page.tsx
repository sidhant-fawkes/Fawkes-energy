import { client } from '@/sanity/lib/client'
import { notFound } from 'next/navigation'
import { ImmersiveLayout, MagazineLayout, MinimalLayout } from '@/components/blog/layouts'

async function getPost(slug: string) {
    const query = `*[_type == "post" && slug.current == $slug][0] {
        _id,
        title,
        mainImage,
        "heroVideoUrl": heroVideo.asset->url,
        body[]{
            ...,
            _type == "image" => {
                ...,
                asset->{
                    _id,
                    _ref,
                    _type,
                    url,
                    metadata {
                        dimensions {
                            width,
                            height,
                            aspectRatio
                        }
                    }
                }
            }
        },
        publishedAt,
        excerpt,
        postStyle,
        "author": author->{name, image, bio}
    }`
    return client.fetch(query, { slug })
}

export async function generateStaticParams() {
    try {
        // Fetch all posts with valid slugs
        const query = `*[_type == "post" && defined(slug.current)]{ "slug": slug.current }`
        const posts = await client.fetch(query)

        // If no posts exist, return at least one dummy path to satisfy static export
        if (!posts || posts.length === 0) {
            return [{ slug: 'coming-soon' }]
        }

        return posts.map((post: any) => ({
            slug: post.slug,
        }))
    } catch (error) {
        console.error('Error in generateStaticParams:', error)
        // Return dummy path on error to allow build to proceed
        return [{ slug: 'coming-soon' }]
    }
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const post = await getPost(slug)

    if (!post) {
        return notFound()
    }

    // Render the appropriate layout based on postStyle
    // Default to 'immersive' if not specified
    const style = post.postStyle || 'immersive'

    switch (style) {
        case 'magazine':
            return <MagazineLayout post={post} />
        case 'minimal':
            return <MinimalLayout post={post} />
        case 'immersive':
        default:
            return <ImmersiveLayout post={post} />
    }
}
