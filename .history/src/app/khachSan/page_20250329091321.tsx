"use client";
import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaCalendarAlt, FaSearch, FaUser } from "react-icons/fa";
import Loading from "../components/molecules/Loading";
import { ScrollAnimation } from "../components/molecules/ScrollAnimation";
import CardZoom from "./card";
import { GET_KHACHSAN } from "@/utils/graphql/GetKhachSan";

export default function KhachSan() {
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/graphQLs", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query: GET_KHACHSAN }),
        });
        if (!res.ok) {
          throw new Error("error");
        }
        const result = await res.json();

        setData(result.data);
      } catch (err) {
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
      <Box
        bgImage="url('/quanCafe.jpg')"
        bgPosition="center"
        h="600px"
        position="relative"
        display={"flex"}
      >
        <Box
          position="absolute"
          top="0"
          left="0"
          w="100%"
          h="100%"
          bg="blackAlpha.600"
        >
          <ScrollAnimation delay={0.3}>
           
          </ScrollAnimation>
        </Box>
      </Box>
      <ScrollAnimation delay={0.5}>
        <CardZoom prop={data} />
      </ScrollAnimation>
    </>
  );
}
