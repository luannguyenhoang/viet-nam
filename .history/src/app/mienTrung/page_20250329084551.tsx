"use server";
import { MienBacContent, Source, TitlesMienBac } from "@/type/types";
import { getMetadata } from "@/utils/getPageMetadata";
import { Metadata } from "next";
import Loading from "../components/molecules/Loading";
import Titles from "../components/molecules/Title";
import Containers from "../components/organisms/Content";

export async function generateMetadata(): Promise<Metadata> {
  const metadata = await getMetadata("mien-trung");
  return {
    ...metadata,
  };
}

export default async function MienBac() {
  let data: Source | undefined;
  let error: string | null = null;

  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_API_RMS_URL,
      {
        next: { revalidate: 300 },
      }
    );

    if (!res.ok) {
      throw new Error(`Error: ${res.status} - ${res.statusText}`);
    }

    const result = await res.json();
    data = result[0];
  } catch (err) {
    console.error("Error:", err);
    error = "Có lỗi khi tải dữ liệu";
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!data) {
    return <Loading />;
  }

  return (
    <>
      {data?.type}
      <Titles session1={data?.acf.title as TitlesMienBac} />
      <Containers
        slug={data?.type}
        session2={data?.acf.mien_bac_content as MienBacContent}
      />
    </>
  );
}
