const testimonials = [
  {
    id: 1,
    name: "Ahmad Dahlan, S.T.",
    role: "Kepala Jurusan RPL",
    company: "SMK Negeri 1",
    avatar: "AD",
    stars: 5,
    quote:
      "Siswa yang sangat berdedikasi dan memiliki pemahaman mendalam tentang konsep modern web development. Hasil kodingannya selalu bersih dan rapi.",
  },
  {
    id: 2,
    name: "Siti Rahma, M.Kom.",
    role: "Guru Produktif Web",
    company: "SMK Negeri 1",
    avatar: "SR",
    stars: 5,
    quote:
      "Selalu menyelesaikan tugas proyek tepat waktu dengan kualitas UI/UX yang sangat menarik dan fungsionalitas yang teruji.",
  },
];

export default function TestimonialPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-white mb-4">Testimonials</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Apa kata para pengajar dan rekan sejawat mengenai dedikasi, keterampilan, dan kerja sama tim saya saat berkolaborasi.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {testimonials.map((test) => (
          <div
            key={test.id}
            className="bg-gray-900/60 border border-gray-800 rounded-xl p-6 transition-all duration-300 hover:border-indigo-500/50 flex flex-col justify-between"
          >
            {/* Rating Stars */}
            <div>
              <div className="flex items-center gap-1 text-amber-400 mb-4">
                {Array.from({ length: test.stars }).map((_, i) => (
                  <span key={i} className="text-lg">
                    ★
                  </span>
                ))}
              </div>

              {/* Quote Block */}
              <blockquote className="text-gray-300 italic leading-relaxed text-sm mb-6">
                "{test.quote}"
              </blockquote>
            </div>

            {/* Author Info */}
            <div className="flex items-center gap-3 pt-4 border-t border-gray-800/80">
              <div className="w-10 h-10 rounded-full bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold text-sm shrink-0 border border-indigo-500/30">
                {test.avatar}
              </div>
              <div>
                <h4 className="text-sm font-bold text-white leading-none mb-1">
                  {test.name}
                </h4>
                <p className="text-xs text-indigo-400 leading-none mb-1">
                  {test.role}
                </p>
                <p className="text-xs text-gray-500 leading-none">
                  {test.company}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}