import { NextSeo } from "next-seo";
import { useEffect, useState } from "react";

interface MetadataProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
  slug?: string;
}

export default function Metadata({
  title = "Du Lịch Việt Nam - Khám phá vẻ đẹp đất nước Việt Nam",
  description = "Khám phá những địa điểm du lịch tuyệt vời tại Việt Nam: Vịnh Hạ Long, Phố cổ Hội An, Sapa, Phong Nha, Mũi Né và nhiều điểm đến hấp dẫn khác.",
  canonicalUrl = "https://dulichvietnam.example.com",
  ogImage = "https://images.unsplash.com/photo-1528127269322-539801943592",
  slug,
}: MetadataProps) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      if (!slug) {
        setLoading(false);
        return; // Nếu không có slug, dùng giá trị mặc định
      }

      try {
        const apiUrl = `${process.env.NEXT_PUBLIC_API_RMS_URL}/${slug}`;
        const res = await fetch(apiUrl);

        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }

        const result = await res.json();

        setData(result);
      } catch (err) {
        console.error("Error:", err);
        setError("Có lỗi khi tải dữ liệu");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [slug]); // Thêm slug vào dependency array để fetch lại khi slug thay đổi

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  let metaTitle = title;
  if (data?.head) {
    const ogTitleMatch = data.head.match(
      /<meta property="og:title" content="([^"]+)"/
    );
    if (ogTitleMatch && ogTitleMatch[1]) {
      metaTitle = ogTitleMatch[1];
    }
  }
  let metaDescription = description;
  if (data?.head) {
    const ogTitleMatch = data.head.match(
      /<meta property="og:description" content="([^"]+)"/
    );
    if (ogTitleMatch && ogTitleMatch[1]) {
      metaDescription = ogTitleMatch[1];
    }
  }
  // let metaImage = description;
  // if (data?.head) {
  //   const ogTitleMatch = data.head.match(
  //     /<meta property="og:description" content="([^"]+)"/
  //   );
  //   if (ogTitleMatch && ogTitleMatch[1]) {
  //     metaImage = ogTitleMatch[1];
  //   }
  // }

  // const metaDescription =
  //   data?.head
  //     ?.find((tag: string) => tag.includes('name="description"'))
  //     ?.match(/content="([^"]+)"/)?.[1] || description;
  const metaCanonical =
    data?.head
      ?.find((tag: string) => tag.includes('property="og:url"'))
      ?.match(/content="([^"]+)"/)?.[1] || canonicalUrl;
  // const metaImage =
  //   data?.head
  //     ?.find((tag: string) => tag.includes('property="og:image"'))
  //     ?.match(/content="([^"]+)"/)?.[1] || ogImage;
  // const metaRobots =
  //   data?.head
  //     ?.find((tag: string) => tag.includes('name="robots"'))
  //     ?.match(/content="([^"]+)"/)?.[1] || "index, follow";

  return (
    <NextSeo
      title={metaTitle}
      description={metaDescription}
      // canonical={metaCanonical}
      // noindex={metaRobots.includes("noindex")}
      // nofollow={metaRobots.includes("nofollow")}
      openGraph={{
        url: metaCanonical,
        title: metaTitle,
        description: metaDescription,
        images: [
          {
            url: metaImage,
            width: 1200, // Có thể lấy từ API nếu có (og:image:width)
            height: 630, // Có thể lấy từ API nếu có (og:image:height)
            alt: "Du lịch Việt Nam",
          },
        ],
        siteName: "Du Lịch Việt Nam",
      }}
      // twitter={{
      //   handle: "@dulichvietnam",
      //   site: "@dulichvietnam",
      //   cardType: "summary_large_image",
      // }}
      // additionalMetaTags={[
      //   {
      //     name: "keywords",
      //     content:
      //       "du lịch Việt Nam, Hạ Long, Hội An, Sapa, Phong Nha, Mũi Né, đặt tour du lịch",
      //   },
      // ]}
    />
  );
}
