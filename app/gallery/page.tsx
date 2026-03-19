'use client';

import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import Foter from "@/components/Foter";
import Navbar from "@/components/Navbar";

interface GalleryImage {
    id: number;
    src: string;
    alt: string;
    category: string;
}

const images: GalleryImage[] = [
    {
        id: 1,
        src: '/HlavniSal.png',
        alt: 'Silová zóna',
        category: 'Silová zóna'
    },
    {
        id: 2,
        src: '/HlavniSal2.png',
        alt: 'Silová zóna',
        category: 'Silová zóna'
    },
    {
        id: 3,
        src: '/Hlavnisal3.png',
        alt: 'Silová zóna',
        category: 'Silová zóna'
    },
    {
        id: 4,
        src: '/Sal1.png',
        alt: 'Silová zóna',
        category: 'Silová zóna'
    },
    {
        id: 5,
        src: '/Sal1,1.png',
        alt: 'Silová zóna',
        category: 'Silová zóna'
    },
    {
        id: 6,
        src: '/Sal1,2.png',
        alt: 'Silová zóna',
        category: 'Silová zóna'
    },
    {
        id: 7,
        src: '/Sal2.png',
        alt: 'Funkční zóna',
        category: 'Funkční zóna'
    },
    {
        id: 8,
        src: '/Sal2.2.png',
        alt: 'Funkční zóna',
        category: 'Funkční zóna'
    },
    {
        id: 9,
        src: '/Sal2,3.png',
        alt: 'Funkční zóna',
        category: 'Funkční zóna'
    },
    {
        id: 10,
        src: '/Boxerna.png',
        alt: 'Funkční sál',
        category: 'Funkční sál'
    },
    {
        id: 11,
        src: '/Boxerna2.png',
        alt: 'Funkční sál',
        category: 'Funkční sál'
    },
    {
        id: 12,
        src: '/CardioSal.png',
        alt: 'Kardio sál',
        category: 'Kardio sál'
    },
    {
        id: 13,
        src: '/Maserna1.jpeg',
        alt: 'Masérna',
        category: 'Masérna'
    },
    {
        id: 14,
        src: '/Maserna2.jpeg',
        alt: 'Masérna',
        category: 'Masérna'
    },
    {
        id: 15,
        src: '/Recepce.png',
        alt: 'Recepce',
        category: 'Recepce'
    },
];

export default function Gallery() {
    const [selectedImage, setSelectedImage] = useState<number | null>(null);

    useEffect(() => {
        if (selectedImage !== null) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [selectedImage]);

    const openModal = (index: number) => setSelectedImage(index);
    const closeModal = () => setSelectedImage(null);

    const nextImage = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (selectedImage !== null) {
            setSelectedImage((selectedImage + 1) % images.length);
        }
    };

    const prevImage = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (selectedImage !== null) {
            setSelectedImage((selectedImage - 1 + images.length) % images.length);
        }
    };

    return (
        <>
            <Navbar />
            <section id="galerie" className="py-16 md:py-24 bg-zinc-100 px-4 sm:px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-12">
                        <h2 className="text-red-600 font-bold tracking-widest uppercase text-sm mb-4">
                            Fotogalerie
                        </h2>
                        <h3 className="text-4xl md:text-5xl font-black uppercase text-black mb-6 leading-tight">
                            Nahlédněte do <span className="text-red-600">Bulldog Gymu</span>
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {images.map((image, index) => (
                            <div
                                key={image.id}
                                className="group relative cursor-pointer overflow-hidden rounded-2xl bg-zinc-800 aspect-[4/3]"
                                onClick={() => openModal(index)}
                            >
                                <img
                                    src={image.src}
                                    alt={image.alt}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:opacity-50"
                                />
                                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <Maximize2 className="text-white mb-2" size={32} />
                                    <span className="text-white font-bold uppercase tracking-wider text-sm">{image.category}</span>
                                </div>
                                <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent">
                                    <p className="text-white font-bold">{image.alt}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {selectedImage !== null && (
                    <div
                        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 p-4 md:p-10 touch-none"
                        onClick={closeModal}
                    >
                        <button
                            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-[10000] p-2 cursor-pointer"
                            onClick={(e) => {
                                e.stopPropagation();
                                closeModal();
                            }}
                            type="button"
                        >
                            <X size={40} />
                        </button>

                        <button
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-[10000] p-2 hidden md:block cursor-pointer"
                            onClick={prevImage}
                            type="button"
                        >
                            <ChevronLeft size={60} />
                        </button>

                        <div
                            className="relative max-w-5xl w-full h-full flex items-center justify-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={images[selectedImage].src}
                                alt={images[selectedImage].alt}
                                className="max-w-full max-h-[80vh] object-contain select-none"
                            />
                            <div className="absolute bottom-[-60px] left-0 right-0 text-center">
                                <p className="text-white text-lg font-medium">
                                    {images[selectedImage].alt}
                                </p>
                                <p className="text-zinc-500 text-sm">
                                    {selectedImage + 1} / {images.length}
                                </p>
                            </div>
                        </div>

                        <button
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-[10000] p-2 hidden md:block cursor-pointer"
                            onClick={nextImage}
                            type="button"
                        >
                            <ChevronRight size={60} />
                        </button>
                    </div>
                )}
            </section>
            <Foter />
        </>
    );
}