import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Pencil, Trash2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import type { LinkItem } from "@/lib/storage";

type Props = {
  link: LinkItem;
  onEdit: (l: LinkItem) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
};

const SortableLinkRow = ({ link, onEdit, onDelete, onToggle }: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: link.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : "auto",
    opacity: isDragging ? 0.7 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`glass flex items-center gap-2 rounded-xl p-3 transition-all ${
        link.enabled ? "" : "opacity-50"
      } ${isDragging ? "shadow-glow-pink" : "hover:border-neon-cyan/60"}`}
    >
      <button
        {...attributes}
        {...listeners}
        className="cursor-grab touch-none p-1 text-muted-foreground hover:text-neon-cyan active:cursor-grabbing"
        aria-label="Drag to reorder"
      >
        <GripVertical className="h-5 w-5" />
      </button>

      <span className="text-2xl">{link.emoji}</span>

      <div className="min-w-0 flex-1">
        <div className="truncate font-rajdhani font-semibold">{link.title}</div>
        <div className="truncate font-mono text-xs text-muted-foreground">{link.url}</div>
      </div>

      <Switch checked={link.enabled} onCheckedChange={() => onToggle(link.id)} />

      <button
        onClick={() => onEdit(link)}
        className="rounded-md p-2 text-neon-cyan transition-colors hover:bg-neon-cyan/10"
        aria-label="Edit"
      >
        <Pencil className="h-4 w-4" />
      </button>
      <button
        onClick={() => onDelete(link.id)}
        className="rounded-md p-2 text-destructive transition-colors hover:bg-destructive/10"
        aria-label="Delete"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
};

export default SortableLinkRow;
