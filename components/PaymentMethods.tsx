import React from 'react';
import Image from 'next/image';

interface PaymentMethod {
    title: string;
    description?: string;
    image: string;
}

const paymentMethods: PaymentMethod[] = [
    {
        title: "Hotovost",
        image: "/img.png"
    },
    {
        title: "QR Platba",
        description: "Rychlá platba pomocí bankovní aplikace.",
        image: "/img_2.png"
    },
    {
        title: "Papírové stravenky",
        description: "Akceptujeme stravenky Pluxee, Edenred a Up (Unišek, Cadhoc) v aktuálním časovém období.",
        image: "/unnamed.jpg"
    }
];

export default function PaymentMethods() {
    return (
        <section className="py-12 md:py-24 bg-white px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8 md:mb-12" data-aos="fade-up">
                    <h2 className="text-red-600 font-bold tracking-widest uppercase text-sm mb-3 md:mb-4">
                        Způsoby platby
                    </h2>
                    <h3 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-black leading-tight">
                        Další možnosti <br /> <span className="text-red-600">úhrady</span>
                    </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
                    {paymentMethods.map((method, index) => (
                        <div
                            key={method.title}
                            data-aos="fade-up"
                            data-aos-delay={(index % 3) * 100}
                            className="flex flex-col bg-zinc-50 border border-zinc-200 rounded-2xl p-5 md:p-8"
                        >
                            <div className="flex items-center justify-center mb-4 md:mb-6 overflow-hidden bg-white rounded-xl border border-zinc-100">
                                <div className="relative w-full aspect-[1.6/1]">
                                    <Image
                                        src={method.image}
                                        alt={method.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                        className="object-cover"
                                        priority
                                    />
                                </div>
                            </div>

                            <h4 className="text-black font-bold text-xl md:text-2xl mb-2 md:mb-3 uppercase tracking-tight">
                                {method.title}
                            </h4>

                            {method.description && (
                                <p className="text-zinc-500 text-sm leading-relaxed">
                                    {method.description}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}