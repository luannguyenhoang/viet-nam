import Loading from "@/components/molecules/Loading";
import {  AmThuc, Source } from "@/type/types";
import { useColorModeValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Containers from "./Containers";

export default function AmThuc() {
  const [data, setData] = useState<Source>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/trangChu");
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

  return <Containers session1={data?.acf.am_thuc as AmThuc} />;
}
