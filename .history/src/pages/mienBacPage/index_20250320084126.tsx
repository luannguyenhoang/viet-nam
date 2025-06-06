import { ScrollAnimation } from "@/components/organisms/ScrollAnimation";
import Metadata from "@/components/molecules/Metadata";
import { Box } from "@chakra-ui/react";
import SplitWithImage from "../HomePgae/Features";
import Carousel from "./Carousels";

export default function MienBac() {
  return (
    <>
      {" "}
      <Metadata
        title="Du lịch Miền Bắc Việt Nam | Khám phá Sapa, Hạ Long, Hà Giang"
        description="Khám phá vẻ đẹp hùng vĩ của miền Bắc Việt Nam với những điểm đến nổi tiếng như Vịnh Hạ Long, Sapa, Hà Giang, Ninh Bình và nhiều hơn nữa."
        keywords="du lịch miền Bắc, Việt Nam, Hạ Long, Sapa, Hà Giang, Ninh Bình, Hà Nội, Tràng An, Mai Châu, Mộc Châu"
        ogImage="/images/northern-vietnam.jpg"
      />
      <Carousel />
      <ScrollAnimation delay={0.3}>
        <SplitWithImage />
      </ScrollAnimation>
    </>
  );
}
