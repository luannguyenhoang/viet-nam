import { ScrollAnimation } from "@/components/organisms/ScrollAnimation";
import Metadata from "@/components/molecules/Metadata";
import SplitWithImage from "../HomePgae/Features";
import Carousel from "./Carousels";
import { useEffect, useState } from "react";
import { Source } from "@/type/types";
import Loading from "@/components/molecules/Loading";
import Containers from "./Content";
import Titles from "./Title";

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
      {/* <Metadata title="Du lịch Miền Bắc Việt Nam | Khám phá Sapa, Hạ Long, Hà Giang" /> */}
      {/* <Carousel /> */}
      <ScrollAnimation delay={0.3}>
        <Titles session1={}/>
      </ScrollAnimation>
      <ScrollAnimation delay={0.3}>
        <Containers session2={data?.acf.mien_bac_content}/>
      </ScrollAnimation>
    </>
  );
}
