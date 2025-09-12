"use client";
import { Leaf, Coffee, Heart, Users } from "lucide-react"
import Image from "next/image";

function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div
      className={`rounded-2xl bg-white shadow p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:z-10 relative ${className || ""}`}
    >
      {children}
    </div>
  )
}


export default function Story() {
  return (
    <section className="bg-[#f5f0e8] py-16 px-6 lg:px-20">
      {/* Top Section */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-4xl font-bold text-brown-800 mb-4">Our Story</h2>
        <p className="text-lg text-brown-600">
          Born from a love for both traditional Nepali tea culture and modern coffee artistry, 
          Chiya & Coffee bridges two worlds in every cup we serve.
        </p>
      </div>

      {/* Where Tradition Meets Innovation */}
      <div className="grid lg:grid-cols-2 gap-10 items-center mb-20">
        <div>
          <h3 className="text-2xl font-bold text-brown-800 mb-4">Where Tradition Meets Innovation</h3>
          <p className="text-brown-700 mb-6 leading-relaxed">
            Founded by tea enthusiasts who fell in love with coffee culture, our café celebrates the rich 
            heritage of Nepali chiya while embracing the artistry of modern coffee making. We believe that 
            every cup should tell a story - whether it&apos;s the comforting warmth of masala chiya or the bold 
            complexity of a perfectly extracted espresso.
          </p>
          <p className="text-brown-700 leading-relaxed">
            Our cozy space is designed to be your home away from home, where conversations flow as smoothly 
            as our beverages and every visit feels like catching up with old friends.
          </p>
        </div>

        {/* Images */}
        <div className="grid grid-cols-2 gap-6">
          <div className="rounded-2xl overflow-hidden shadow-md">
            <Image 
              src="data:image/jpeg;base64,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" 
              alt="Authentic Nepali Chiya" 
              width={400} 
              height={200} 
              className="w-full h-48 object-cover"
            />
            <p className="text-center text-brown-600 mt-2">Authentic Nepali Chiya</p>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-md">
            <Image 
              src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=400&q=80" 
              alt="Artisan Coffee" 
              width={400} 
              height={200} 
              className="w-full h-48 object-cover"
            />
            <p className="text-center text-brown-600 mt-2">Artisan Coffee</p>
          </div>
        </div>
      </div>

      {/* Four Feature Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <Leaf className="mx-auto h-8 w-8 text-green-600 mb-4" />
          <h4 className="text-xl font-semibold mb-2">Traditional Chiya</h4>
          <p className="text-brown-600 text-sm">
            Authentic Nepali masala chiya brewed with traditional spices and 
            methods passed down through generations.
          </p>
        </Card>

        <Card>
          <Coffee className="mx-auto h-8 w-8 text-brown-700 mb-4" />
          <h4 className="text-xl font-semibold mb-2">Artisan Coffee</h4>
          <p className="text-brown-600 text-sm">
            Premium single-origin beans expertly roasted and brewed to 
            perfection by our skilled baristas.
          </p>
        </Card>

        <Card>
          <Heart className="mx-auto h-8 w-8 text-yellow-500 mb-4" />
          <h4 className="text-xl font-semibold mb-2">Cozy Atmosphere</h4>
          <p className="text-brown-600 text-sm">
            A warm, welcoming space where friends gather, stories are shared, 
            and memories are made.
          </p>
        </Card>

        <Card>
          <Users className="mx-auto h-8 w-8 text-brown-700 mb-4" />
          <h4 className="text-xl font-semibold mb-2">Community Hub</h4>
          <p className="text-brown-600 text-sm">
            More than a café - we&apos;re a place where culture, tradition, and 
            modern lifestyle beautifully blend.
          </p>
        </Card>
      </div>
    </section>
  )
}
