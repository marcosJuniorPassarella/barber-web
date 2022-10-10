import Head from "next/head";
import { Sidebar } from "../../components/sidebar/index";
import { Flex, Heading, useMediaQuery, Button } from "@chakra-ui/react";
import { FiChevronLeft } from "react-icons/fi";
import Link from "next/link";

export default function EditHaircut() {
  const [isMobile] = useMediaQuery("(max-width: 500px)");
  return (
    <>
      <Head>
        <title>Editar modelo de corte - BarberPro</title>
      </Head>
      <Sidebar>
        <Flex
          direction="column"
          alignItems="flex-start"
          justifyContent="flex-start"
        >
          <Flex
            direction={isMobile ? "column" : "row"}
            w="100%"
            alignItems={isMobile ? "flex-start" : "center"}
            justifyContent="flex-start"
            mb={isMobile ? 4 : 0}
          >
            <Link href="/haircuts">
              <Button
                mr={3}
                p={4}
                display="flex"
                alignItems="center"
                justifyContent="center"
                background="barber.400"
                color="white"
              >
                <FiChevronLeft size={24} color="#fff" />
                Voltar
              </Button>
            </Link>
            <Heading fontSize={isMobile ? "22px" : "3xl"} color="white">
              Editar corte
            </Heading>
          </Flex>
        </Flex>
      </Sidebar>
    </>
  );
}
