declare module "@react-three/postprocessing" {
  import type { ReactNode } from "react";

  export const EffectComposer: (props: { children?: ReactNode }) => JSX.Element;
  export const Bloom: (props: Record<string, unknown>) => JSX.Element;
  export const DepthOfField: (props: Record<string, unknown>) => JSX.Element;
  export const Vignette: (props: Record<string, unknown>) => JSX.Element;
}

declare module "postprocessing" {
  export const BlendFunction: {
    NORMAL: number;
    [key: string]: number;
  };
}


