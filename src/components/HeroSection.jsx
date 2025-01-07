import React from "react";
import { Button } from "@nextui-org/react";
import eveMont from "../assets/eveMont.jpg";

const HeroSection = () => {
  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{ backgroundImage: `url(${eveMont})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <div className="text-center flex flex-col items-center justify-center">
            <h1 className="mx-auto max-w-4xl font-display text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-white flex flex-col items-center space-y-2">
              <span>Menjadi Solusi Bagi</span>
              <span className="relative whitespace-nowrap text-blue-400 block">
                Elektronik dan Air Conditioner Terbaik
              </span>
              <span>untuk Keluarga anda</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-gray-300 text-center">
              Everest Electronics menyediakan layanan dan produk elektronik
              berkualitas tinggi untuk memenuhi kebutuhan bisnis Anda.
            </p>
          </div>

          <div className="mt-10 flex justify-center gap-x-6">
            <Button
              size="lg"
              color="primary"
              href="#pemesanan"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg transform hover:scale-105 transition-all duration-200"
            >
              Mulai Pemesanan
            </Button>
            <Button
              size="lg"
              variant="bordered"
              href="#tentang-kami"
              className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white/10 transform hover:scale-105 transition-all duration-200"
            >
              Pelajari Lebih Lanjut
            </Button>
          </div>

          {/* Statistics Section */}
          <div className="w-full mt-16">
            <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                ["Pemasangan dan Pembelian", "500.000+"],
                ["Tahun Pengalaman", "15 Tahun++"],
                ["Client Puas", "1.000.000++"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="relative overflow-hidden rounded-xl bg-white/10 backdrop-blur-sm px-6 py-5 shadow-lg hover:shadow-xl hover:bg-white/20 transition-all duration-300 border border-white/20"
                >
                  <dt className="text-sm font-medium text-gray-200">{label}</dt>
                  <dd className="mt-2 text-3xl font-bold tracking-tight text-blue-400">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
