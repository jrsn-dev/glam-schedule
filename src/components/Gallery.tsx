import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Maximize2, ChevronLeft, ChevronRight } from "lucide-react";

// Mock more images to demonstrate pagination and masonry
const allImages = [
    { id: 1, src: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=2070&auto=format&fit=crop", category: "Cortes", aspect: "aspect-[3/4]" },
    { id: 2, src: "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=2069&auto=format&fit=crop", category: "Coloração", aspect: "aspect-square" },
    { id: 3, src: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=2070&auto=format&fit=crop", category: "Estilo", aspect: "aspect-[4/3]" },
    { id: 4, src: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=2070&auto=format&fit=crop", category: "Barba", aspect: "aspect-[3/5]" },
    { id: 5, src: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=2070&auto=format&fit=crop", category: "Estética", aspect: "aspect-video" },
    { id: 6, src: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=2087&auto=format&fit=crop", category: "Cortes", aspect: "aspect-[4/5]" },
    { id: 7, src: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?q=80&w=2080&auto=format&fit=crop", category: "Barba", aspect: "aspect-square" },
    { id: 8, src: "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=2074&auto=format&fit=crop", category: "Estilo", aspect: "aspect-[3/4]" },
    { id: 9, src: "https://images.unsplash.com/photo-1493246507139-91e8bef99c02?q=80&w=2070&auto=format&fit=crop", category: "Estética", aspect: "aspect-video" },
    { id: 10, src: "https://images.unsplash.com/photo-1501719539451-126fddec9024?q=80&w=2148&auto=format&fit=crop", category: "Coloração", aspect: "aspect-[3/5]" },
    { id: 11, src: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=2074&auto=format&fit=crop", category: "Cortes", aspect: "aspect-square" },
    { id: 12, src: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?q=80&w=2070&auto=format&fit=crop", category: "Barba", aspect: "aspect-[4/5]" },
];

const IMAGES_PER_PAGE = 8;

const Gallery = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [selectedImage, setSelectedImage] = useState<typeof allImages[0] | null>(null);

    const paginatedImages = useMemo(() => {
        const start = currentPage * IMAGES_PER_PAGE;
        return allImages.slice(start, start + IMAGES_PER_PAGE);
    }, [currentPage]);

    const totalPages = Math.ceil(allImages.length / IMAGES_PER_PAGE);

    return (
        <section className="py-24 px-6 relative overflow-hidden" id="galeria">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-20"
                >
                    <span className="glam-section-label justify-center">PORTFÓLIO</span>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mt-4 text-white">Nossa Parede de Arte</h2>
                </motion.div>

                {/* Masonry Container - Responsive Height based on content */}
                <div className="relative">
                    <div className="overflow-hidden">
                        <motion.div
                            key={currentPage}
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.02 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 w-full"
                        >
                            {paginatedImages.map((image) => (
                                <motion.div
                                    key={image.id}
                                    layoutId={`img-${image.id}`}
                                    whileHover={{ scale: 1.05, zIndex: 10 }}
                                    className="relative break-inside-avoid cursor-pointer group overflow-hidden transition-all duration-500"
                                    onClick={() => setSelectedImage(image)}
                                >
                                    <img
                                        src={image.src}
                                        alt=""
                                        className="w-full h-auto object-cover grayscale-[0.3] group-hover:grayscale-0 group-hover:brightness-110 transition-all duration-700 active:scale-95 border-none"
                                    />
                                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[2px]">
                                        <div className="p-3 rounded-full bg-black/40 border border-white/20 transform scale-0 group-hover:scale-100 transition-transform duration-500">
                                            <Maximize2 size={24} className="text-white drop-shadow-lg" />
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 flex items-center gap-8 z-20">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                                disabled={currentPage === 0}
                                className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center bg-black/40 backdrop-blur-md text-muted-foreground hover:border-primary hover:text-primary disabled:opacity-20 transition-all"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <div className="flex gap-2">
                                {[...Array(totalPages)].map((_, i) => (
                                    <div
                                        key={i}
                                        className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${currentPage === i ? "bg-primary w-4" : "bg-primary/20"
                                            }`}
                                    />
                                ))}
                            </div>
                            <button
                                onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
                                disabled={currentPage === totalPages - 1}
                                className="w-12 h-12 rounded-full border border-primary/10 flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary disabled:opacity-20 transition-all"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    )}
                </div>

                {/* Lightbox Modal */}
                <AnimatePresence>
                    {selectedImage && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-background/95 backdrop-blur-2xl"
                            onClick={() => setSelectedImage(null)}
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                className="relative max-w-5xl w-full max-h-[85vh]"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <button
                                    onClick={() => setSelectedImage(null)}
                                    className="absolute -top-14 right-0 text-foreground hover:text-primary transition-colors flex items-center gap-2"
                                >
                                    <span className="text-[10px] uppercase tracking-[0.2em]">Fechar</span>
                                    <X size={24} />
                                </button>
                                <img
                                    src={selectedImage.src}
                                    alt=""
                                    className="w-full h-full object-contain shadow-2xl border border-primary/10"
                                />
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default Gallery;
