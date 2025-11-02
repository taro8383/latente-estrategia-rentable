import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";

interface VideoPlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
}

export const VideoPlayerModal = ({ isOpen, onClose, videoUrl }: VideoPlayerModalProps) => {
  // Extract shortcode from full URL
  const getEmbedUrl = (url: string) => {
    if (!url) return "";
    // If it's already an embed URL, return as-is
    if (url.includes("streamable.com/e/")) return url;
    const parts = url.split("/").filter(Boolean);
    const shortcode = parts[parts.length - 1] || "";
    return shortcode ? `https://streamable.com/e/${shortcode}` : url;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        style={{ top: "var(--dialog-top,45vh)" }}
        className="left-4 right-4 sm:left-1/2 sm:right-auto sm:transform sm:-translate-x-1/2 w-full p-0 overflow-hidden max-h-[60vh] sm:max-h-[80vh] box-border max-w-[calc(100vw-2rem)] sm:max-w-4xl"
      >
        <div className="relative aspect-video w-full max-h-[50vh] sm:max-h-[60vh] md:max-h-[70vh] lg:max-h-[80vh]">
          <iframe
            src={getEmbedUrl(videoUrl)}
            title="Video player"
            className="absolute inset-0 w-full h-full border-0 rounded-lg pointer-events-auto z-[60] bg-black"
            allowFullScreen={true}
            loading="lazy"
            allow="autoplay; fullscreen; picture-in-picture; encrypted-media; web-share"
          />
          <button
            onClick={onClose}
            className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-black/70 text-white rounded-full p-2 sm:p-2.5 hover:bg-black/90 transition-colors z-[70] touch-manipulation"
            aria-label="Close video"
          >
            <X className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};