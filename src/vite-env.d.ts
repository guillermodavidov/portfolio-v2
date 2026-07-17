/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** True in dev/test; false (undefined at runtime) in production build. */
  readonly INCLUDE_ADMIN: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
