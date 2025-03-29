"use client";
import { MienBacContent, Source, TitlesMienBac } from "@/type/types";
import { useEffect, useState } from "react";
import Containers from "../components/organisms/Content";
import Loading from "../components/molecules/Loading";
import { ScrollAnimation } from "../components/molecules/ScrollAnimation";
import Titles from "../components/molecules/Title";
import MetadataUpdater from "../components/molecules/Metadata";

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
      <MetadataUpdater slug={data?.type} />
  
        <Titles session1={data?.acf.title as TitlesMienBac} />

     
        <Containers
          slug={data?.type}
          session2={data?.acf.mien_bac_content as MienBacContent}
        />
  
    </>
  );
}
