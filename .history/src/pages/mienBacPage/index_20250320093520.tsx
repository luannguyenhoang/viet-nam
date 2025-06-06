import { ScrollAnimation } from "@/components/organisms/ScrollAnimation";

import ArticleList from "./Container";

export default function MienBac() {
  // const [data, setData] = useState<Source>();
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const res = await fetch("/api/mienBac");
  //       if (!res.ok) {
  //         throw new Error("error");
  //       }
  //       const result = await res.json();
  //       setData(result[0]);
  //     } catch (err) {
  //       console.error("Error:", err);
  //       setError("Có lỗi");
  //     } finally {
  //       setLoading(false);
  //       window.scrollTo({
  //         top: 0,
  //         behavior: "smooth",
  //       });
  //     }
  //   }

  //   fetchData();
  // }, []);

  // if (loading) {
  //   return <Loading />;
  // }

  // if (error) {
  //   return <div>{error}</div>;
  // }

  return (
    <>
      {/* <Metadata title="Du lịch Miền Bắc Việt Nam | Khám phá Sapa, Hạ Long, Hà Giang" /> */}
      {/* <Carousel /> */}
      <ScrollAnimation delay={0.3}>
      <ArticleList/>
      </ScrollAnimation>
      
    </>
  );
}
