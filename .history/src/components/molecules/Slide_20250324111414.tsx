import { useEffect, useState } from "react";
import { MienBacContent, Source, TitlesMienBac } from "@/type/types";
import Loading from "@/components/molecules/Loading";
import Link from "next/link";
import { Box, Heading, HStack, Image, Text } from "@chakra-ui/react";
import styles from "@/styles/Post.module.css";

export default function SlideConten({slug}:{}) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const apiUrl = `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/posts?_embed`;
        const res = await fetch(apiUrl);
        if (!res.ok) {
          throw new Error("error");
        }
        const result = await res.json();
        setData(result);
      } catch (err) {
        console.error("Error:", err);
        setError("error");
      } finally {
        setLoading(false);
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <Box mb={6} borderColor="gray.200" pb={4}>
        {data.map((post: any) => {
          const featuredImage =
            post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null;

          return (
            <Box
              mb={5}
              _hover={{
                img: {
                  transform: "scale(1.1)",
                },
                p: {
                  color: "#359DF3FF",
                },
              }}
            >
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                style={{ display: "block" }}
              >
                <Heading as="h1" size="md" color="red.400" mb={2}>
                  {post.title.rendered}
                </Heading>
                <Box borderRadius="md" position="relative" overflow="hidden">
                  {featuredImage && (
                    <Image
                      maxHeight="72"
                      width="100%"
                      src={featuredImage}
                      alt={post.title.rendered}
                      borderRadius="md"
                      objectFit="cover"
                      transition="transform 0.3s ease-in-out"
                    />
                  )}
                </Box>
                <div
                  dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                />
              </Link>
            </Box>
          );
        })}
      </Box>
    </div>
  );
}
