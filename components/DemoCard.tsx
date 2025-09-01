import Link from "next/link";

export default function DemoCard({
  title,
  desc,
  href,
  img,
}: {
  title: string;
  desc: string;
  href: string;
  img: string;
}) {
  return (
    <Link
      href={href}
      className="group block rounded-card overflow-hidden ring-1 ring-white/10 bg-[#0F1428] hover:ring-white/20 transition will-change-transform"
      style={{ transform: "translateZ(0)" }}
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <img src={img} alt="" className="w-full h-full object-cover group-hover:scale-[1.03] transition duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-black/0" />
      </div>
      <div className="p-5">
        <h3 className="text-white text-lg font-semibold tracking-[-0.01em]">{title}</h3>
        <p className="text-white/70 text-sm mt-1">{desc}</p>
        <div className="mt-4 inline-flex items-center gap-2 text-nl-accent2">
          View live demo <span>→</span>
        </div>
      </div>
    </Link>
  );
}



























