"use client";
import { MienBacContent, Source, TitlesMienBac } from "@/type/types";
import { useEffect, useState } from "react";
import Containers from "../components/organisms/Content";
import Loading from "../components/molecules/Loading";
import { ScrollAnimation } from "../components/molecules/ScrollAnimation";
import Titles from "../components/molecules/Title";
import MetadataUpdater from "@/utils/Metadata";
import { getPageMetadata } from "@/utils/getPageMetadata";
export async function generateMetadata({ params }: { params: { slug?: string } }): Promise<Metadata> {
  const slug = params?.slug || "mien-bac"; // Đảm bảo có giá trị mặc định nếu slug không tồn tại
  return await getPageMetadata(slug);
}
export default function MienBac() {
  const [data, setData] = useState<Source>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/mienBac");
        if (!res.ok) {
          throw new Error("error");
        }
        const result = await res.json();
        setData(result[0]);
      } catch (err) {
        console.error("Error:", err);
        setError("Có lỗi");
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
    <>

      <ScrollAnimation delay={0.3}>
        <Titles session1={data?.acf.title as TitlesMienBac} />
      </ScrollAnimation>

      <Containers
        slug={data?.type}
        session2={data?.acf.mien_bac_content as MienBacContent}
      />
    </>
  );
}
