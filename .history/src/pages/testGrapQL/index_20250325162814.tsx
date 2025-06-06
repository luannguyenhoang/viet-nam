import Loading from "@/components/molecules/Loading";
import { Source } from "@/type/types";
import { useEffect, useState } from "react";

export default function MienBac() {
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const query = `
          query MyQuery {
            allGraphQL {
              nodes {
                graphqlItem {
                  graphqlChild {
                    a1 {
                      image {
                        node {
                          mediaItemUrl
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        `;

        const res = await fetch("/api/graphQL", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query }),
        });

        if (!res.ok) {
          throw new Error("error");
        }
        const result = await res.json();
        console.log("Result từ API:", result);
        setData(result.data);
      } catch (err) {
        console.error("Error:", err);
        setError("Có lỗi");
      } f
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
    <div>
      {data?.allGraphQL?.nodes?.map((node: any, index: number) => {
        return node?.graphqlItem?.graphqlChild?.a1?.map((item: any, i: number) => {
          const imageUrl = item?.image?.node?.mediaItemUrl;
          console.log(`URL ảnh thứ ${index}-${i}:`, imageUrl);
          
          return (
            <div key={`${index}-${i}`}>
              <img src={imageUrl} alt={`image-${index}-${i}`} />
            </div>
          );
        });
      })}
    </div>
  );
}
