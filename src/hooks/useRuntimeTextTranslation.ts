import { useEffect } from 'react';
import type { AppLanguage } from './useAppLanguage';
import {
  EN_TO_ZH_RUNTIME_TEXT_MAP,
  ZH_TO_EN_RUNTIME_TEXT_MAP,
} from '../i18n/runtimeTextMap';

const TRANSLATABLE_ATTRIBUTES = ['placeholder', 'aria-label', 'title', 'alt'] as const;
const EXCLUDED_TAGS = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'CODE']);

const replacePreservingWhitespace = (
  raw: string,
  map: Record<string, string>
): string => {
  const trimmed = raw.trim();
  if (!trimmed) return raw;
  const translated = map[trimmed];
  if (!translated) return raw;
  return raw.replace(trimmed, translated);
};

const translateElementAttributes = (
  element: Element,
  map: Record<string, string>
) => {
  TRANSLATABLE_ATTRIBUTES.forEach((attributeName) => {
    const currentValue = element.getAttribute(attributeName);
    if (!currentValue) return;
    const nextValue = replacePreservingWhitespace(currentValue, map);
    if (nextValue !== currentValue) {
      element.setAttribute(attributeName, nextValue);
    }
  });
};

const translateTextTree = (root: Node, map: Record<string, string>) => {
  if (root.nodeType === Node.TEXT_NODE) {
    const textNode = root as Text;
    const parentTag = textNode.parentElement?.tagName;
    if (parentTag && EXCLUDED_TAGS.has(parentTag)) return;
    const current = textNode.nodeValue ?? '';
    const next = replacePreservingWhitespace(current, map);
    if (next !== current) {
      textNode.nodeValue = next;
    }
    return;
  }

  if (root.nodeType === Node.ELEMENT_NODE) {
    translateElementAttributes(root as Element, map);
  }

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let currentNode = walker.nextNode();
  while (currentNode) {
    const textNode = currentNode as Text;
    const parentTag = textNode.parentElement?.tagName;
    if (!parentTag || !EXCLUDED_TAGS.has(parentTag)) {
      const current = textNode.nodeValue ?? '';
      const next = replacePreservingWhitespace(current, map);
      if (next !== current) {
        textNode.nodeValue = next;
      }
    }
    currentNode = walker.nextNode();
  }

  if (root.nodeType === Node.ELEMENT_NODE) {
    (root as Element)
      .querySelectorAll('*')
      .forEach((element) => translateElementAttributes(element, map));
  }
};

export const useRuntimeTextTranslation = (language: AppLanguage) => {
  useEffect(() => {
    const map = language === 'en-US' ? ZH_TO_EN_RUNTIME_TEXT_MAP : EN_TO_ZH_RUNTIME_TEXT_MAP;

    translateTextTree(document.body, map);

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'characterData' && mutation.target) {
          translateTextTree(mutation.target, map);
        }
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => translateTextTree(node, map));
        }
        if (
          mutation.type === 'attributes' &&
          mutation.target &&
          mutation.target.nodeType === Node.ELEMENT_NODE
        ) {
          translateElementAttributes(mutation.target as Element, map);
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: [...TRANSLATABLE_ATTRIBUTES],
    });

    return () => observer.disconnect();
  }, [language]);
};

