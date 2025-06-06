import { useEffect, useState } from "react";
import Loading from "@/components/molecules/Loading";
import { Container } from "@chakra-ui/react";

export default function MienBac() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // Replace with your WordPress site's API endpoint
        const res = await fetch("/api/baiViet");
        if (!res.ok) {
          throw new Error("Failed to fetch data from WordPress");
        }
        const result = await res.json();
        console.log(result);

        // Assuming you want the first post; adjust as needed
        setData(result[0]);
      } catch (err) {
        console.error("Error:", err);
        setError("Có lỗi khi tải dữ liệu từ WordPress");
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

  // Render WordPress data (e.g., title and content)
  return (
    <div>
      {data && (
        <>
         <Container
      maxW={"7xl"}
      display="flex"
      gap="30px"
      flexDirection={{ base: "column", sm: "row" }}
      justifyContent="space-between"
    >
      <Box flex={5}>
        {groups.map((group, index) => (
          <DestinationGroup index={index} key={index} group={group} />
        ))}
      </Box>
      <Box 
        flex={3} 
        mt={"20"}
        position={{ base: "static", lg: "sticky" }}
        top={{ lg: "16" }}
        alignSelf="flex-start"
        height="fit-content"
        display={{ base: "none", md: "block" }}
      >
        {groups.map((group, index) => (
          <SlideConten key={index} group={group} />
        ))}
      </Box>
    </Container>
          <div className="text-red-500" dangerouslySetInnerHTML={{ __html: data.content.rendered }} />
        </>
      )}
      {/* Add ScrollAnimation or other components as needed */}
    </div>
  );
}
