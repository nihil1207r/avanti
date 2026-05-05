import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

// ✅ PERF: Dynamic import — pizzaFrames.ts (10 MB) is now a SEPARATE lazy chunk.
// It is NOT included in the initial JS bundle, so the page loads instantly.
const loadFrames = (): Promise<string[]> =>
  import("@/assets/pizzaFrames").then((m) => m.default);

const FRAME_COUNT_ESTIMATE = 240; // used only for scroll height

export function PizzaScrollAnimation({
  primaryButton,
  secondaryButton,
}: {
  primaryButton?: React.ReactNode;
  secondaryButton?: React.ReactNode;
} = {}) {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Indexed cache: imagesRef.current[i] = HTMLImageElement | undefined
  const imagesRef = useRef<(HTMLImageElement | undefined)[]>([]);
  const rafRef = useRef<number>(0);
  const lastIdxRef = useRef<number>(-1);
  const totalRef = useRef<number>(FRAME_COUNT_ESTIMATE);
  const canvasSizedRef = useRef<boolean>(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // ✅ PERF: Pre-compute transforms at the top level (valid hooks usage)
  const heroOpacity = useTransform(
    scrollYProgress,
    [0, 0.05, 0.25, 0.35],
    [1, 1, 1, 0]
  );
  const heroY = useTransform(scrollYProgress, [0, 0.35], ["0%", "-8%"]);
  const scrollIndicatorOpacity = useTransform(
    scrollYProgress,
    [0, 0.08],
    [1, 0]
  );

  // ✅ PERF: Load frames lazily after first paint using requestIdleCallback
  useEffect(() => {
    let cancelled = false;

    const scheduleLoad = (cb: () => void) => {
      if (typeof window !== "undefined" && "requestIdleCallback" in window) {
        (window as Window & { requestIdleCallback: (cb: () => void, opts?: object) => number })
          .requestIdleCallback(cb, { timeout: 2500 });
      } else {
        setTimeout(cb, 150);
      }
    };

    scheduleLoad(() => {
      if (cancelled) return;

      loadFrames().then((frames) => {
        if (cancelled) return;
        totalRef.current = frames.length;

        // Seed the array with correct length so index access is safe
        imagesRef.current = new Array(frames.length);

        const canvas = canvasRef.current;
        if (!canvas) return;

        // --- Load and draw first frame immediately ---
        const first = new Image();
        first.onload = () => {
          if (cancelled) return;
          if (!canvasSizedRef.current) {
            // ✅ PERF: Set canvas dimensions ONCE — never resize again
            canvas.width = first.naturalWidth;
            canvas.height = first.naturalHeight;
            canvasSizedRef.current = true;
          }
          canvas.getContext("2d")?.drawImage(first, 0, 0);
          lastIdxRef.current = 0;
        };
        first.src = frames[0];
        imagesRef.current[0] = first;

        // --- Load remaining frames in small batches so the main thread stays free ---
        const loadBatch = (start: number, batchSize: number) => {
          if (cancelled || start >= frames.length) return;
          const end = Math.min(start + batchSize, frames.length);
          for (let i = start; i < end; i++) {
            if (imagesRef.current[i]) continue;
            const img = new Image();
            img.src = frames[i];
            imagesRef.current[i] = img;
          }
          // Small gap between batches keeps UI responsive
          setTimeout(() => loadBatch(end, batchSize), 40);
        };

        // Start loading from frame 1 (frame 0 already handled above)
        loadBatch(1, 24);
      });
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // ✅ PERF: Drive canvas via RAF — coalesces rapid scroll events into one draw per frame
  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      const total = totalRef.current;
      const idx = Math.round(
        Math.max(0, Math.min(total - 1, v * (total - 1)))
      );
      if (idx === lastIdxRef.current) return; // skip if same frame
      lastIdxRef.current = idx;

      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const img = imagesRef.current[idx];
        const canvas = canvasRef.current;
        if (!img?.complete || !canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        // ✅ PERF: NO canvas resize here — just draw. Resize was the #1 scroll-lag cause.
        ctx.drawImage(img, 0, 0);
      });
    });
  }, [scrollYProgress]);

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: `${FRAME_COUNT_ESTIMATE * 4}px` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black flex items-center justify-center">
        {/* ✅ PERF: will-change:contents enables GPU layer for the canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ objectFit: "cover", willChange: "contents" }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/70 z-10" />

        <motion.div
          className="relative z-20 text-center text-white px-6 flex flex-col items-center"
          style={{ opacity: heroOpacity, y: heroY }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 backdrop-blur px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-accent"
          >
            <span className="size-1.5 rounded-full bg-accent animate-pulse" />
            Botoșani · România
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35 }}
            className="max-w-4xl font-display text-5xl font-bold leading-[1.05] sm:text-6xl md:text-7xl lg:text-[5.5rem]"
          >
            {t("hero.title")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.55 }}
            className="mt-6 max-w-xl text-lg text-white/85 sm:text-xl"
          >
            {t("hero.subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.75 }}
            className="mt-10 flex flex-wrap gap-3 justify-center"
          >
            {secondaryButton || (
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary-glow shadow-warm text-base h-14 px-8"
              >
                <Link to="/contact">{t("hero.cta2")}</Link>
              </Button>
            )}
            {primaryButton || (
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-14 px-8 text-base bg-transparent border-white/40 text-white hover:bg-white hover:text-foreground"
              >
                <Link to="/meniu">
                  {t("hero.cta")} <ArrowRight className="ml-1" />
                </Link>
              </Button>
            )}
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/60"
          style={{ opacity: scrollIndicatorOpacity }}
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-px h-10 bg-white/30 animate-pulse" />
        </motion.div>
      </div>
    </div>
  );
}