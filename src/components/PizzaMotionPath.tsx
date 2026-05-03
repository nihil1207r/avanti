import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import pizza3d from "@/assets/pizza-3d.png";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

/**
 * PizzaMotionPath
 * ──────────────
 * Renders a hidden SVG path that spans the full page height.
 * A floating pizza-slice image follows the path as the user scrolls,
 * creating a weightless "antigravity" effect.
 *
 * The SVG and its path are invisible (visibility: hidden).
 * Only the pizza image moves.
 */
export function PizzaMotionPath() {
  const pizzaRef = useRef<HTMLImageElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const pizza = pizzaRef.current;
    const svg = svgRef.current;
    if (!pizza || !svg) return;

    // Wait one tick so the DOM is fully painted and layout is stable.
    const rafId = requestAnimationFrame(() => {
      // Re-measure the SVG height to match current document height
      const docH = document.documentElement.scrollHeight;
      svg.setAttribute("height", `${docH}px`);
      svg.style.height = `${docH}px`;

      // Build the GSAP timeline
      const ctx = gsap.context(() => {
        gsap.to(pizza, {
          motionPath: {
            path: "#pizzaPath",
            align: "#pizzaPath",
            alignOrigin: [0.5, 0.5],
            autoRotate: false,
            start: 0,
            end: 1,
          },
          ease: "none",
          scrollTrigger: {
            trigger: ".why-avanti-section",
            endTrigger: ".our-story-section",
            start: "top top",
            end: "bottom bottom",
            scrub: 2,       // floaty, weightless lag
            invalidateOnRefresh: true,
          },
        });
      });

      // Refresh after all assets are loaded to avoid position drift
      const onLoad = () => ScrollTrigger.refresh();
      window.addEventListener("load", onLoad);

      return () => {
        ctx.revert();
        window.removeEventListener("load", onLoad);
      };
    });

    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <>
      {/* ── Invisible SVG Path ── */}
      <svg
        ref={svgRef}
        id="pizzaMotionSvg"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh", // will be updated by JS to full doc height
          pointerEvents: "none",
          zIndex: 0,
          visibility: "hidden",
          overflow: "visible",
        }}
        aria-hidden="true"
      >
        {/*
          Path traces a wide S-curve starting near the "Why Avanti?" section,
          looping around the feature cards, swooping past the CTA buttons,
          then curving into the "Our Story" section.

          Coordinates are in % of viewport width (vw) converted to px via
          a 1400-unit viewBox so the path adapts reasonably across screen sizes.
          Fine-tune these numbers with the MotionPathHelper if needed.
        */}
        <path
          id="pizzaPath"
          d="
            M 280 200
            C 180 400,
              100 650,
              300 900
            S 620 980,
              750 850
            C 860 740,
              950 580,
              1100 480
            S 1250 280,
              1150 600
            C 1080 780,
              900 950,
              700 1100
            S 400 1300,
              350 1500
          "
          fill="none"
          stroke="transparent"
          strokeWidth="0"
        />
      </svg>

      {/* ── Floating Pizza Slice ── */}
      <img
        ref={pizzaRef}
        src={pizza3d}
        alt=""
        aria-hidden="true"
        id="pizzaSlice"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "clamp(160px, 18vw, 260px)",
          zIndex: 10,
          pointerEvents: "none",
          willChange: "transform",
          filter: "drop-shadow(0px 12px 28px rgba(0,0,0,0.22))",
          // Start hidden; GSAP places it at path start on first scroll tick
          opacity: 0,
        }}
        onLoad={(e) => {
          // Make visible once the image has loaded
          (e.currentTarget as HTMLImageElement).style.opacity = "1";
        }}
      />
    </>
  );
}
