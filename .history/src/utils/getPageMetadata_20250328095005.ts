"use client";
import { useEffect } from "react";
import { replaceSeoRM } from "@/utils/replaceSeoRM";

export function useUpdateDocumentMetadata(slug?: string) {
  useEffect(() => {
    if (!slug) return;

    const addedMetaTags: HTMLElement[] = [];
    
    async function updateMetadata() {
      try {
        const apiUrl = `${process.env.NEXT_PUBLIC_API_RMS_URL}/${slug}`;
        const res = await fetch(apiUrl);
        if (!res.ok) return;

        const result = await res.json();
        const headData = result?.head;
        if (!headData) return;

        const processedHeadData = replaceSeoRM(headData);

        const titleMatch = processedHeadData.match(
          /<meta\s+property="og:title"\s+content="([^"]*)"/
        );
        if (titleMatch && titleMatch[1]) {
          document.title = titleMatch[1];
        }

        const parser = new DOMParser();
        const doc = parser.parseFromString(processedHeadData, "text/html");
        const metaTags = doc.querySelectorAll("meta");

        metaTags.forEach((tag) => {
          const propName =
            tag.getAttribute("property") || tag.getAttribute("name");
          if (propName) {
            const existingTag = document.querySelector(
              `meta[property="${propName}"], meta[name="${propName}"]`
            );
            if (existingTag) existingTag.remove();
          }

          const newTag = document.head.appendChild(tag);
          addedMetaTags.push(newTag);
        });
      } catch (err) {
        console.error("Error updating metadata:", err);
      }
    }

    updateMetadata();
    
    return () => {
      addedMetaTags.forEach(tag => {
        if (tag && tag.parentNode) {
          tag.parentNode.removeChild(tag);
        }
      });
      
      // Nếu cần, có thể reset title về giá trị mặc định
      // document.title = "Default Title";
    };
  }, [slug]);

  return null;
}
