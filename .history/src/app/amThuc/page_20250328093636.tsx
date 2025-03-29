import { Source } from "@/type/types";
import { Box, Container } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Loading from "../components/molecules/Loading";
import Conten from "./Conten";
import Headers from "./Headers";

export default function AmThuc() {
  const [data, setData] = useState<Source>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/amThuc");
        if (!res.ok) {
          throw new Error("error");
        }
        const result = await res.json();
        setData(result[0]);
      } catch (err) {
        console.error("Error:", err);
        setError("Có lỗi");
      }
      setLoading(false);
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
    <Box pt={24} pb={16}>
      <Container maxW="container.xl">
        <Headers session1={data?.acf} /> ;
        <Conten session2={data?.acf} />;
      </Container>
    </Box>
  );
}
