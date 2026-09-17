"use client";

/**
 * useMdxContent — dynamically imports an MDX topic file client-side.
 *
 * Returns the MDX React component for the requested module + topic,
 * or null while loading. Falls back gracefully if the MDX file is
 * not found (e.g. during development when files are being added).
 */

import { useState, useEffect } from "react";
import type { JSX } from "react";
import type { TopicMeta } from "@/lib/content";

interface MdxModule {
  meta: TopicMeta;
  default: () => JSX.Element;
}

interface UseMdxContentResult {
  Content: (() => JSX.Element) | null;
  meta: TopicMeta | null;
  loading: boolean;
  error: boolean;
}

export function useMdxContent(
  moduleId: string,
  topicNumber: string
): UseMdxContentResult {
  const [result, setResult] = useState<UseMdxContentResult>({
    Content: null,
    meta: null,
    loading: true,
    error: false,
  });

  useEffect(() => {
    let cancelled = false;
    setResult({ Content: null, meta: null, loading: true, error: false });

    import(`@/content/${moduleId}/${topicNumber}.mdx`)
      .then((mod: MdxModule) => {
        if (!cancelled) {
          setResult({
            Content: mod.default,
            meta: mod.meta,
            loading: false,
            error: false,
          });
        }
      })
      .catch(() => {
        if (!cancelled) {
          setResult({ Content: null, meta: null, loading: false, error: true });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [moduleId, topicNumber]);

  return result;
}
