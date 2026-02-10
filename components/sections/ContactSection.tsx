'use client'

import React, { useState } from 'react'
import { Building, Mail } from 'lucide-react'
import Section from '@/components/ui/Section'
import { Heading, Subheading, Body } from '@/components/ui/Typography'
import { Button } from '@/components/ui/button'

export default function ContactSection() {
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitStatus('idle');

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        try {
            const response = await fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams(formData as any).toString(),
            });

            if (response.ok) {
                setSubmitStatus('success');
                form.reset();
                setTimeout(() => setSubmitStatus('idle'), 3000);
            } else {
                setSubmitStatus('error');
                setTimeout(() => setSubmitStatus('idle'), 3000);
            }
        } catch (error) {
            setSubmitStatus('error');
            setTimeout(() => setSubmitStatus('idle'), 3000);
        }
    };

    return (
        <Section id="contact" maxWidth="6xl" className="min-h-screen">
            <div className="text-center mb-12">
                <Heading variant="lg" className="mb-4">Get in Touch</Heading>
                <Body variant="lg" className="mb-4">
                    Let's talk about how Fawkes can unlock value in your battery assets.
                </Body>
            </div>

            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                {/* Address Column */}
                <div className="space-y-6">
                    <div>
                        <Subheading className="mb-4">Contact Information</Subheading>
                        <div className="space-y-4 text-muted-foreground">
                            <div className="flex items-start gap-3">
                                <Building className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                                <div>
                                    <p className="text-foreground font-medium">Fawkes Energy</p>
                                    <p>2nd Floor, C 59, Garudachar Palya</p>
                                    <p>Mahadevpura, Bengaluru - 560048</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Mail className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                                <div className="flex flex-col gap-2">
                                    <a href="mailto:akshay@fawkes.energy" className="hover:text-foreground transition-colors">
                                        akshay@fawkes.energy
                                    </a>
                                    <a href="mailto:karthik@fawkes.energy" className="hover:text-foreground transition-colors">
                                        karthik@fawkes.energy
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form Column */}
                <div>
                    <form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field" onSubmit={handleSubmit} className="space-y-6">
                        <input type="hidden" name="form-name" value="contact" />
                        <p className="hidden">
                            <label>
                                Don't fill this out if you're human: <input name="bot-field" />
                            </label>
                        </p>

                        <div className="grid md:grid-cols-2 gap-6">
                            <input
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                className="bg-background border border-border rounded-md px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Your Email"
                                className="bg-background border border-border rounded-md px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                required
                            />
                        </div>
                        <input
                            type="text"
                            name="subject"
                            placeholder="Subject"
                            className="w-full bg-background border border-border rounded-md px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            required
                        />
                        <textarea
                            name="message"
                            placeholder="Your Message"
                            rows={4}
                            className="w-full bg-background border border-border rounded-md px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            required
                        ></textarea>

                        <Button type="submit" className="w-full">
                            Send Message
                        </Button>

                        {submitStatus === 'success' && (
                            <p className="text-green-500 text-sm text-center">Message sent successfully!</p>
                        )}
                        {submitStatus === 'error' && (
                            <p className="text-red-500 text-sm text-center">Something went wrong. Please try again.</p>
                        )}
                    </form>
                </div>
            </div>
        </Section>
    );
}
