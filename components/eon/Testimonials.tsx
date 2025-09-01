'use client';

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      quote: "ÉON has redefined what luxury means to me. Each timepiece tells a story of craftsmanship that transcends time itself.",
      author: "Isabella Laurent",
      title: "Art Director, Paris",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face"
    },
    {
      id: 2,
      quote: "The attention to detail in every ÉON watch is extraordinary. It's not just a timepiece—it's wearable art.",
      author: "Marcus Chen",
      title: "Architect, New York",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"
    },
    {
      id: 3,
      quote: "Owning an ÉON watch is like carrying a piece of history. The timeless design speaks to generations past and future.",
      author: "Sophia Rodriguez",
      title: "Curator, London",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face"
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-light text-black mb-6 tracking-wide">
            What Our Collectors Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover why discerning individuals choose ÉON as their companion in the journey of time.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="group relative"
              style={{
                animationDelay: `${index * 200}ms`,
                animation: 'fadeInUp 0.8s ease-out forwards'
              }}
            >
              <div className="relative bg-gradient-to-br from-gray-50 to-white p-8 rounded-lg border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2">
                {/* Quote Icon */}
                <div className="absolute -top-4 left-8">
                  <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                    </svg>
                  </div>
                </div>

                {/* Quote Text */}
                <div className="mb-8 mt-4">
                  <p className="text-lg text-gray-700 leading-relaxed italic">
                    "{testimonial.quote}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img
                      src={testimonial.image}
                      alt={testimonial.author}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium text-black">
                      {testimonial.author}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {testimonial.title}
                    </p>
                  </div>
                </div>

                {/* Decorative Element */}
                <div className="absolute bottom-4 right-4 opacity-10">
                  <div className="w-16 h-16 border border-gray-300 rounded-full"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Editorial Section */}
        <div className="text-center bg-black text-white py-16 px-8 rounded-lg">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h3 className="text-3xl md:text-4xl font-light mb-6 tracking-wide">
                The Art of Time
              </h3>
              <p className="text-xl text-white/80 leading-relaxed max-w-3xl mx-auto">
                "In a world that moves at breakneck speed, ÉON stands as a testament to the beauty of taking time. 
                Each watch is crafted not just to tell time, but to remind us that the most precious moments are those 
                we choose to savor."
              </p>
            </div>
            
            <div className="text-center">
              <span className="text-lg text-white/60 font-light">
                — ÉON Editorial
              </span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
