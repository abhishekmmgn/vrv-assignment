export default function SectionWrapper({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-semibold md:text-2xl">{title}</h2>
      {children}
    </section>
  );
}
