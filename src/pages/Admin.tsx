import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  DndContext,
  PointerSensor,
  KeyboardSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Eye, EyeOff, LogOut, Plus, Save } from "lucide-react";
import { toast } from "sonner";

import CyberBackground from "@/components/CyberBackground";
import NeonCursor from "@/components/NeonCursor";
import PinLogin from "@/components/PinLogin";
import SortableLinkRow from "@/components/SortableLinkRow";
import LinkEditorDialog from "@/components/LinkEditorDialog";
import ProfileCard from "@/components/ProfileCard";
import LinkButton from "@/components/LinkButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  getLinks,
  getProfile,
  isAuthed,
  saveLinks,
  saveProfile,
  setAuthed,
  type LinkItem,
  type ProfileData,
} from "@/lib/storage";

const Admin = () => {
  const [authed, setIsAuthed] = useState(isAuthed());
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [profile, setProfile] = useState<ProfileData>({ name: "", bio: "", avatar: "" });
  const [editing, setEditing] = useState<LinkItem | null>(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  useEffect(() => {
    if (authed) {
      setLinks(getLinks());
      setProfile(getProfile());
    }
  }, [authed]);

  // Auto-save links
  useEffect(() => {
    if (authed && links.length >= 0) saveLinks(links);
  }, [links, authed]);

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    const oldIndex = links.findIndex((l) => l.id === active.id);
    const newIndex = links.findIndex((l) => l.id === over.id);
    setLinks(arrayMove(links, oldIndex, newIndex));
    toast.success("Order updated");
  };

  const saveLink = (link: LinkItem) => {
    setLinks((prev) => {
      const exists = prev.some((l) => l.id === link.id);
      return exists ? prev.map((l) => (l.id === link.id ? link : l)) : [...prev, link];
    });
    setEditorOpen(false);
    setEditing(null);
    toast.success(editing ? "Link updated" : "Link added");
  };

  const deleteLink = (id: string) => {
    setLinks((p) => p.filter((l) => l.id !== id));
    toast.success("Link deleted");
  };

  const toggleLink = (id: string) =>
    setLinks((p) => p.map((l) => (l.id === id ? { ...l, enabled: !l.enabled } : l)));

  const saveProfileData = () => {
    saveProfile(profile);
    toast.success("Profile saved");
  };

  const logout = () => {
    setAuthed(false);
    setIsAuthed(false);
    toast.success("Logged out");
  };

  const visibleLinks = useMemo(() => links.filter((l) => l.enabled), [links]);

  if (!authed) {
    return (
      <>
        <NeonCursor />
        <CyberBackground />
        <PinLogin onSuccess={() => setIsAuthed(true)} />
      </>
    );
  }

  return (
    <>
      <NeonCursor />
      <CyberBackground />

      <main className="relative min-h-screen px-4 py-8">
        <div className="mx-auto max-w-5xl">
          {/* Header */}
          <header className="mb-8 flex flex-wrap items-center justify-between gap-3 animate-fade-in-down">
            <div>
              <h1 className="font-orbitron text-2xl font-black tracking-[0.2em] neon-text sm:text-3xl">
                CONTROL.PANEL
              </h1>
              <p className="font-mono text-xs text-muted-foreground">
                // manage your neon link grid
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPreviewMode((p) => !p)}
                className="border-neon-cyan/50 text-neon-cyan hover:bg-neon-cyan/10 hover:text-neon-cyan"
              >
                {previewMode ? <EyeOff className="mr-1.5 h-4 w-4" /> : <Eye className="mr-1.5 h-4 w-4" />}
                {previewMode ? "Edit" : "Preview"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                asChild
                className="border-neon-purple/50 hover:bg-neon-purple/10"
              >
                <Link to="/">View Public</Link>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={logout}
                className="border-destructive/50 text-destructive hover:bg-destructive/10 hover:text-destructive"
              >
                <LogOut className="mr-1.5 h-4 w-4" /> Logout
              </Button>
            </div>
          </header>

          {previewMode ? (
            <div className="mx-auto max-w-md glass-strong rounded-2xl p-6 animate-scale-in">
              <div className="mb-3 text-center font-mono text-xs text-neon-cyan neon-text-cyan">
                [ PREVIEW MODE ]
              </div>
              <ProfileCard profile={profile} />
              <div className="mt-8 space-y-3">
                {visibleLinks.map((l, i) => (
                  <LinkButton key={l.id} link={l} index={i} />
                ))}
              </div>
            </div>
          ) : (
            <div className="grid gap-6 lg:grid-cols-[1fr_1.5fr]">
              {/* Profile editor */}
              <section className="glass-strong rounded-2xl p-6 animate-fade-in">
                <h2 className="mb-4 font-orbitron text-lg font-bold tracking-widest text-neon-cyan neon-text-cyan">
                  ▸ PROFILE
                </h2>

                <div className="space-y-4">
                  <div>
                    <Label className="font-mono text-xs">NAME</Label>
                    <Input
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label className="font-mono text-xs">BIO</Label>
                    <Textarea
                      value={profile.bio}
                      onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label className="font-mono text-xs">AVATAR URL (optional)</Label>
                    <Input
                      value={profile.avatar}
                      onChange={(e) => setProfile({ ...profile, avatar: e.target.value })}
                      placeholder="https://..."
                    />
                  </div>
                  <Button
                    onClick={saveProfileData}
                    className="w-full bg-gradient-neon font-orbitron tracking-wider text-background hover:opacity-90 hover:shadow-glow-pink"
                  >
                    <Save className="mr-2 h-4 w-4" /> SAVE PROFILE
                  </Button>
                </div>
              </section>

              {/* Links editor */}
              <section className="glass-strong rounded-2xl p-6 animate-fade-in" style={{ animationDelay: "100ms" }}>
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="font-orbitron text-lg font-bold tracking-widest text-neon-pink"
                    style={{ textShadow: "0 0 10px hsl(var(--neon-pink))" }}
                  >
                    ▸ LINKS ({links.length})
                  </h2>
                  <Button
                    size="sm"
                    onClick={() => {
                      setEditing(null);
                      setEditorOpen(true);
                    }}
                    className="bg-gradient-neon font-orbitron tracking-wider text-background hover:opacity-90"
                  >
                    <Plus className="mr-1 h-4 w-4" /> ADD
                  </Button>
                </div>

                <p className="mb-3 font-mono text-[10px] text-muted-foreground">
                  // drag handle to reorder · auto-saves
                </p>

                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                  <SortableContext items={links.map((l) => l.id)} strategy={verticalListSortingStrategy}>
                    <div className="space-y-2">
                      {links.map((link) => (
                        <SortableLinkRow
                          key={link.id}
                          link={link}
                          onEdit={(l) => {
                            setEditing(l);
                            setEditorOpen(true);
                          }}
                          onDelete={deleteLink}
                          onToggle={toggleLink}
                        />
                      ))}
                      {links.length === 0 && (
                        <p className="py-8 text-center font-mono text-sm text-muted-foreground">
                          // No links yet. Press ADD to create one.
                        </p>
                      )}
                    </div>
                  </SortableContext>
                </DndContext>
              </section>
            </div>
          )}
        </div>
      </main>

      <LinkEditorDialog
        open={editorOpen}
        initial={editing}
        onClose={() => {
          setEditorOpen(false);
          setEditing(null);
        }}
        onSave={saveLink}
      />
    </>
  );
};

export default Admin;
