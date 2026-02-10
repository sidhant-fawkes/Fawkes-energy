import Studio from './Studio'

// Studio requires dynamic rendering (not static export)
export const dynamic = 'force-dynamic'

export default function StudioPage() {
    return <Studio />
}
