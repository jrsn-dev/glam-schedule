import { useEffect } from 'react';

interface SEOProps {
    title: string;
    description?: string;
    ogImage?: string;
    ogType?: string;
}

const SEO = ({ title, description, ogImage, ogType = 'website' }: SEOProps) => {
    useEffect(() => {
        const fullTitle = `${title} | Agenda.AI - Agendamento Premium`;
        document.title = fullTitle;

        // Update Meta Description
        if (description) {
            let metaDesc = document.querySelector('meta[name="description"]');
            if (!metaDesc) {
                metaDesc = document.createElement('meta');
                metaDesc.setAttribute('name', 'description');
                document.head.appendChild(metaDesc);
            }
            metaDesc.setAttribute('content', description);
        }

        // Update OG Tags
        const updateOgTag = (property: string, content: string) => {
            let tag = document.querySelector(`meta[property="${property}"]`);
            if (!tag) {
                tag = document.createElement('meta');
                tag.setAttribute('property', property);
                document.head.appendChild(tag);
            }
            tag.setAttribute('content', content);
        };

        updateOgTag('og:title', fullTitle);
        if (description) updateOgTag('og:description', description);
        if (ogImage) updateOgTag('og:image', ogImage);
        updateOgTag('og:type', ogType);
        updateOgTag('og:url', window.location.href);

        // Update Canonical
        let canonical = document.querySelector('link[rel="canonical"]');
        if (!canonical) {
            canonical = document.createElement('link');
            canonical.setAttribute('rel', 'canonical');
            document.head.appendChild(canonical);
        }
        canonical.setAttribute('href', window.location.href);

    }, [title, description, ogImage, ogType]);

    return null;
};

export default SEO;
