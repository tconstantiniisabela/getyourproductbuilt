import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ExternalLink } from "@/components/external-link";

function loomEmbedId(url: string): string | null {
  if (!url || url.includes("[YOUR_LOOM")) return null;
  const shareMatch = url.match(/loom\.com\/share\/([a-zA-Z0-9]+)/);
  if (shareMatch) return shareMatch[1];
  const embedMatch = url.match(/loom\.com\/embed\/([a-zA-Z0-9]+)/);
  if (embedMatch) return embedMatch[1];
  return null;
}

export function hasLoomWalkthrough(url: string): boolean {
  return loomEmbedId(url) !== null;
}

export function LoomWalkthrough({
  url,
  title = "Product walkthrough",
}: {
  url: string;
  title?: string;
}) {
  const id = loomEmbedId(url);

  if (!id) {
    return (
      <div className="rounded-md border border-dashed border-border bg-muted/30 p-4 text-sm text-muted-foreground">
        <p className="font-medium text-foreground">Public walkthrough pending</p>
        <p className="mt-2 leading-relaxed">
          We record a Loom of this build shape for the site as soon as the demo environment is
          ready. Until then, ask for a live walkthrough on the intro call—no invented client logos
          or unnamed “case study” claims.
        </p>
      </div>
    );
  }

  const shareUrl = `https://www.loom.com/share/${id}`;

  return (
    <div className="space-y-4">
      <Card className="overflow-hidden border-border p-0">
        <div className="relative aspect-video w-full bg-muted">
          <iframe
            src={`https://www.loom.com/embed/${id}`}
            title={title}
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
          />
        </div>
      </Card>
      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Play className="h-4 w-4" />
          </span>
          <div>
            <div className="text-sm font-semibold">{title}</div>
            <div className="text-sm text-muted-foreground">
              Product walkthrough
            </div>
          </div>
        </div>
        <Button asChild variant="outline" size="sm">
          <ExternalLink href={shareUrl}>Open in Loom</ExternalLink>
        </Button>
      </div>
    </div>
  );
}
