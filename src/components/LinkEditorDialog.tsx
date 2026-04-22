import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import type { LinkItem } from "@/lib/storage";

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: (link: LinkItem) => void;
  initial?: LinkItem | null;
};

const empty = { id: "", title: "", url: "", emoji: "🔗", enabled: true };

const LinkEditorDialog = ({ open, onClose, onSave, initial }: Props) => {
  const [data, setData] = useState<LinkItem>(empty);

  useEffect(() => {
    if (open) setData(initial ?? { ...empty, id: crypto.randomUUID() });
  }, [open, initial]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!data.title.trim() || !data.url.trim()) return;
    onSave(data);
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="glass-strong border-neon-purple/50">
        <DialogHeader>
          <DialogTitle className="font-orbitron tracking-widest neon-text">
            {initial ? "EDIT_LINK" : "NEW_LINK"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={submit} className="space-y-4">
          <div className="grid grid-cols-[80px_1fr] gap-3">
            <div>
              <Label className="font-mono text-xs">EMOJI</Label>
              <Input
                value={data.emoji}
                onChange={(e) => setData({ ...data, emoji: e.target.value })}
                className="text-center text-2xl"
                maxLength={2}
              />
            </div>
            <div>
              <Label className="font-mono text-xs">TITLE</Label>
              <Input
                value={data.title}
                onChange={(e) => setData({ ...data, title: e.target.value })}
                placeholder="My awesome link"
              />
            </div>
          </div>

          <div>
            <Label className="font-mono text-xs">URL</Label>
            <Input
              value={data.url}
              onChange={(e) => setData({ ...data, url: e.target.value })}
              placeholder="https://..."
              type="url"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-gradient-neon font-orbitron tracking-wider text-background hover:opacity-90 hover:shadow-glow-pink"
            >
              SAVE
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LinkEditorDialog;
