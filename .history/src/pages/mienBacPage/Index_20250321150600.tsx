import { ScrollAnimation } from "@/components/organisms/ScrollAnimation";
import { useEffect, useState } from "react";
import { MienBacContent, Source, TitlesMienBac } from "@/type/types";
import Loading from "@/components/molecules/Loading";
import Containers from "./Content";
import Titles from "./Title";
import Metadata from "@/components/molecules/Metadata";

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
      {/* <Carousel /> */}
      <Metadata slug={data?.type} />
      {/* <ScrollAnimation delay={0.3}>
        <Titles session1={data?.acf.title as TitlesMienBac} />
      </ScrollAnimation> */}
      {/* <ScrollAnimation delay={0.5}>
        <Containers session2={data?.acf.mien_bac_content as MienBacContent} />
      </ScrollAnimation> */}
    </>
  );
}
