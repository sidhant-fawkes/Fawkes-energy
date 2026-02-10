'use client'

import React, { useState, useEffect } from 'react'
import { Zap, Brain, RefreshCw, Target } from 'lucide-react'
import Section from '@/components/ui/Section'
import { Heading, Body } from '@/components/ui/Typography'
import { products } from '@/lib/data'

export default function ProductStackSection() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const getIcon = (iconName: string) => {
        switch (iconName) {
            case 'Zap': return <Zap className="w-5 h-5" />;
            case 'Brain': return <Brain className="w-5 h-5" />;
            case 'RefreshCw': return <RefreshCw className="w-5 h-5" />;
            case 'Target': return <Target className="w-5 h-5" />;
            default: return null;
        }
    };

    const getProductVideoName = (productName: string) => {
        return productName.toLowerCase().replace(/\s+/g, '');
    };

    const getPosterPath = (productName: string) => {
        const videoName = getProductVideoName(productName);
        // fawkesarc uses .png, others use .jpg
        if (videoName === 'fawkesarc') {
            return `/images/${videoName}-poster.png`;
        }
        return `/images/${videoName}-poster.jpg`;
    };

    const getVideoSources = (productName: string) => {
        const videoName = getProductVideoName(productName);
        
        if (isMobile) {
            // Mobile-optimized sources with fallback to desktop
            return (
                <>
                    <source src={`/videos/${videoName}-mobile.webm`} type="video/webm" />
                    <source src={`/videos/${videoName}-mobile.mp4`} type="video/mp4" />
                    <source src={`/videos/${videoName}.webm`} type="video/webm" />
                    <source src={`/videos/${videoName}.mp4`} type="video/mp4" />
                </>
            );
        }

        // Desktop sources
        return (
            <>
                <source src={`/videos/${videoName}.webm`} type="video/webm" />
                <source src={`/videos/${videoName}.mp4`} type="video/mp4" />
            </>
        );
    };

    return (
        <Section id="products" maxWidth="6xl" className="min-h-screen">
            <div className="text-center mb-12">
                <Heading variant="lg" className="mb-4">The Fawkes Product Stack</Heading>
                <Body variant="lg" className="max-w-2xl mx-auto">
                    A suite of interconnected products to monitor, manage, and monetize batteries at scale.
                </Body>
            </div>

            <div className="space-y-16">
                {products.map((product, index) => (
                    <div key={index} className={`grid md:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'md:grid-flow-dense' : ''}`}>
                        <div className={`${index % 2 === 1 ? 'md:col-start-2' : ''}`}>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                    {React.cloneElement(getIcon(product.iconName) as React.ReactElement, { className: 'w-6 h-6 text-primary' })}
                                </div>
                                <Heading variant="md" as="h3" className="mb-0">{product.name}</Heading>
                            </div>
                            <Body variant="lg">{product.description}</Body>
                        </div>

                        {/* Product video */}
                        <div className={`rounded-xl overflow-hidden ${index % 2 === 1 ? 'md:col-start-1' : ''}`}>
                            <video
                                autoPlay
                                muted
                                loop
                                playsInline
                                preload={isMobile ? "metadata" : "auto"}
                                className="w-full h-auto"
                                poster={getPosterPath(product.name)}
                            >
                                {getVideoSources(product.name)}
                            </video>
                        </div>
                    </div>
                ))}
            </div>
        </Section>
    );
}
