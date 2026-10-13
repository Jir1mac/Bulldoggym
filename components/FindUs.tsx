import React from 'react';
import { Mail, Phone, MapPin, Youtube, Facebook, Instagram } from 'lucide-react';
import { Button } from '@/components/button';

export default function FindUs() {
    return (
        <section id="kontakt" className="py-16 md:py-24 bg-zinc-150 text-black px-4 sm:px-6 overflow-hidden">
            <div className="max-w-[1200px] mx-auto text-center">

                <div data-aos="fade-up">
                    <h2 className="text-red-600 font-bold tracking-widest uppercase text-sm mb-4">Kontakt</h2>
                    <h3 className="text-5xl md:text-6xl font-black uppercase text-black mb-16">
                        Kde nás <span className="text-red-600">najdete</span>
                    </h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    <div
                        data-aos="fade-up"
                        data-aos-delay="100"
                        className="w-full h-[400px] lg:h-[550px] rounded-lg overflow-hidden shadow-sm border border-zinc-800"
                    >
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2537.3868026240475!2d13.65197937776204!3d50.508369371603315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470a204933bc8dc1%3A0xe86660d22ad3770a!2sBulldog%20Gym!5e0!3m2!1scs!2scz!4v1768640947169!5m2!1scs!2scz"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen={false}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Mapa Bulldog Gym Most"
                        ></iframe>
                    </div>

                    <div
                        data-aos="fade-up"
                        data-aos-delay="200"
                        className="flex flex-col items-center lg:items-start text-center lg:text-left"
                    >
                        <h4 className="text-4xl font-bold mb-6">Bulldog Gym Most</h4>
                        <p className="text-zinc-400 mb-8 max-w-md lg:max-w-none">
                            Přijďte nás navštívit do naší největší posilovny v Mostě! Najdete nás v budově Sever, kde na vás čeká 1000 m² plochy, špičkové stroje a přátelská atmosféra.
                        </p>

                        <div className="space-y-4 mb-10 w-full max-w-sm">
                            <div className="flex items-center justify-center lg:justify-start text-zinc-300">
                                <MapPin className="text-red-600 mr-4 flex-shrink-0" size={24} />
                                <div>
                                    <p className="font-semibold text-black text-lg">Adresa:</p>
                                    <p className="text-zinc-400 font-medium">K. H. Máchy 344</p>
                                    <p className="text-zinc-400 font-medium">434 01 Most</p>
                                </div>
                            </div>
                            <div className="flex items-center justify-center lg:justify-start text-zinc-300">
                                <Phone className="text-red-600 mr-4 flex-shrink-0" size={24} />
                                <div>
                                    <p className="font-semibold text-black text-lg">Telefon:</p>
                                    <a href="tel:+420 777656367" className="text-zinc-400 hover:text-red-600 transition-colors font-medium cursor-pointer">+420 777 656 367</a>
                                </div>
                            </div>
                            <div className="flex items-center justify-center lg:justify-start text-zinc-300">
                                <Mail className="text-red-600 mr-4 flex-shrink-0" size={24} />
                                <div>
                                    <p className="font-semibold text-black text-lg">Email:</p>
                                    <a href="mailto:bulldog.gym@seznam.cz" className="text-zinc-400 hover:text-red-600 transition-colors font-medium cursor-pointer">bulldog.gym@seznam.cz</a>
                                </div>
                            </div>
                        </div>

                        <div className="flex space-x-4">
                            <Button variant="ghost" size="icon" asChild className="cursor-pointer">
                                <a href="https://www.youtube.com/channel/UCDtv1fhz07WQ5O2lVJWg0zg" target="_blank" rel="noopener noreferrer" aria-label="YouTube Bulldog Gym">
                                    <Youtube className="text-zinc-400 hover:text-red-600 transition-colors" size={28} />
                                </a>
                            </Button>
                            <Button variant="ghost" size="icon" asChild className="cursor-pointer">
                                <a href="https://www.facebook.com/profile.php?id=100057360913960&locale=cs_CZ" target="_blank" rel="noopener noreferrer" aria-label="Facebook Bulldog Gym">
                                    <Facebook className="text-zinc-400 hover:text-red-600 transition-colors" size={28} />
                                </a>
                            </Button>
                            <Button variant="ghost" size="icon" asChild className="cursor-pointer">
                                <a href="https://www.instagram.com/bulldoggym.most" target="_blank" rel="noopener noreferrer" aria-label="Instagram Bulldog Gym">
                                    <Instagram className="text-zinc-400 hover:text-red-600 transition-colors" size={28} />
                                </a>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
