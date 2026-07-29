import { LucideIcon } from "lucide-react";

export interface Amenidad {
  icon: LucideIcon;
  label: string;
}

export default function Amenidades({ items }: { items: Amenidad[] }) {
  if (items.length === 0) return null;
  return (
    <div className="mb-16 max-w-3xl">
      <h2 className="font-display text-2xl mb-6">Lo que este lugar ofrece</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-3">
            <Icon size={20} className="text-terracota shrink-0" />
            <span className="text-noche/80">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
