"use client";

import {
  Box,
  chakra,
  Flex,
  Icon,
  IconProps,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { FaPlane, FaHotel, FaUmbrellaBeach } from "react-icons/fa";

interface StatsCardProps {
  title: string;
  stat: string;
  icon: ReactNode;
}

function StatsCard(props: StatsCardProps) {
  const { title, stat, icon } = props;
  return (
    <Stat
      px={{ base: 2, md: 4 }}
      py={"5"}
      shadow={"xl"}
      border={"1px solid"}
      borderColor={useColorModeValue("gray.800", "gray.500")}
      rounded={"lg"}
    >
      <Flex justifyContent={"space-between"}>
        <Box pl={{ base: 2, md: 4 }}>
          <StatLabel fontWeight={"medium"} isTruncated>
            {title}
          </StatLabel>
          <StatNumber fontSize={"2xl"} fontWeight={"medium"}>
            {stat}
          </StatNumber>
        </Box>
        <Box my={"auto"} color={"red.400"} alignContent={"center"}>
          {icon}
        </Box>
      </Flex>
    </Stat>
  );
}
const Blur = (props: IconProps) => {
  return (
    <Icon
      width={useBreakpointValue({ base: "100%", md: "50vw", lg: "30vw" })}
      zIndex={useBreakpointValue({ base: -1, md: -1, lg: 0 })}
      height="500px"
      viewBox="0 0 58 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="71" cy="61" r="111" fill="#F56565" />
      <circle cx="244" cy="106" r="139" fill="#ED64A6" />
      <circle cy="291" r="139" fill="#ED64A6" />
      <circle cx="80.5" cy="189.5" r="101.5" fill="#ED8936" />
      <circle cx="196.5" cy="317.5" r="101.5" fill="#ECC94B" />
      <circle cx="70.5" cy="458.5" r="101.5" fill="#48BB78" />
      <circle cx="426.5" cy="-0.5" r="101.5" fill="#4299E1" />
    </Icon>
  );
};
export default function BasicStatistics() {
  return (
    <Box bg={useColorModeValue("gray.100", "gray.700")}    position={"relative"}>
      <Box maxW="7xl" mx={"auto"} py={40} px={{ base: 2, sm: 12, md: 17 }}>
        <chakra.h1
          textAlign={"center"}
          fontSize={"4xl"}
          pb={10}
          fontWeight={"bold"}
        >
          Khám phá vẻ đẹp đất nước Việt Nam
        </chakra.h1>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
          <StatsCard
            title={"Điểm đến"}
            stat={"63 tỉnh thành"}
            icon={<FaUmbrellaBeach size={"3em"} />}
          />
          <StatsCard
            title={"Du khách/năm"}
            stat={"18 triệu"}
            icon={<FaPlane size={"3em"} />}
          />
          <StatsCard
            title={"Khách sạn"}
            stat={"3,000+"}
            icon={<FaHotel size={"3em"} />}
          />
        </SimpleGrid>
      </Box>
      <Blur
        position={"absolute"}
        top={0}
        left={-10}
        style={{ filter: "blur(70px)" }}
      />
    </Box>
  );
}
