"use client";
import { useEffect, useState, useRef } from "react";
import { Box, Heading } from "@chakra-ui/react";
import styles from "@/styles/Post.module.css";
import Loading from "../../components/molecules/Loading";
import { useParams } from "next/navigation";
import { replaceSeoRM } from "@/utils/replaceSeoRM";

export default function BaiVietDetail() {
  const { slug } = useParams() as { slug: string };
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;

    if (!slug) {
      if (isMounted.current) {
        setLoading(false);
      }
      return;
    }

    async function fetchData() {
      try {
        const apiUrl = `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/posts?slug=${slug}`;

        const res = await fetch(apiUrl);
        if (!res.ok) throw new Error("Không tìm thấy bài viết");
        const result = await res.json();

        if (isMounted.current) {
          setData(result[0]);
        }
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_RMS_URL}/${slug}`
        );

        const data = await response.json();
        lo

        const processedHead = replaceSeoRM(data.head);

        const getTitleFromMeta = (head: any) => {
          const match = head.match(
            /<meta\s+property="og:title"\s+content="([^"]*)"/
          );
          return match ? match[1] : null;
        };

        const getDescriptionFromMeta = (head: any) => {
          const match = head.match(
            /<meta\s+property="og:description"\s+content="([^"]*)"/
          );
          return match ? match[1] : null;
        };
        const title = getTitleFromMeta(processedHead);
        const description = getDescriptionFromMeta(processedHead);
        return {
          title,
          description,
        };
      } catch (err) {
        console.error("Error:", err);
      } finally {
        if (isMounted.current) {
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      isMounted.current = false;
    };
  }, [slug]);

  if (loading) return <Loading />;
  if (!data) return <div>Không tìm thấy bài viết</div>;

  return (
    <Box pt={"16"} maxW={"7xl"} mx={"auto"}>
      <Heading
        as="h1"
        fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
        fontWeight="bold"
        lineHeight="1.2"
        pb={3}
        textAlign="center"
        position="relative"
        color="gray.800"
        _dark={{ color: "white" }}
        _after={{
          content: '""',
          display: "block",
          width: "100px",
          height: "4px",
          bg: "red.400",
          mx: "auto",
          mt: 4,
          borderRadius: "full",
        }}
        dangerouslySetInnerHTML={{ __html: data?.title?.rendered || "" }}
      />
      <div
        className={styles["post__heading"]}
        dangerouslySetInnerHTML={{ __html: data?.content?.rendered || "" }}
      />
    </Box>
  );
}
