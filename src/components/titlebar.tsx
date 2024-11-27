export default function Titlebar({
  title,
  actions,
}: {
  title: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="py-8 w-full border-b">
      <div className="horizontal-padding flex flex-col gap-5 sm:flex-row sm:justify-between sm:items-center">
        <h1 className="leading-tight text-3xl font-medium md:text-4xl max-w-prose">
          {title}
        </h1>
        {actions && (
          <div className="flex flex-col gap-3 sm:flex-row">{actions}</div>
        )}
      </div>
    </div>
  );
}
