import {
  Flex,
  Text,
  useMediaQuery,
  Button,
  Heading,
  Input,
} from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import { Sidebar } from "../../../components/sidebar";
import { FiChevronLeft } from "react-icons/fi";

export default function NewHaircut() {
  const [isMobile] = useMediaQuery("(max-width: 500px)");

  return (
    <>
      <Head>
        <title>BarberPro - Novo modelo de corte</title>
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
            align={isMobile ? "flex-start" : "center"}
            mb={isMobile ? 4 : 0}
          >
            <Link href="/haircuts">
              <Button
                bg="barber.400"
                color="white"
                display="flex"
                alignItems="center"
                justifyItems="center"
                p={4}
                mr={4}
              >
                <FiChevronLeft size={24} color="#fff" />
                Voltar
              </Button>
            </Link>

            <Heading
              color="orange.900"
              mt={4}
              mb={4}
              mr={4}
              fontSize={isMobile ? "28px" : "3xl"}
            >
              Modelos de corte
            </Heading>
          </Flex>

          <Flex
            direction="column"
            maxW="700px"
            bg="barber.400"
            w="100%"
            align="center"
            justify="center"
            pt={8}
            pb={8}
          >
            <Heading fontSize={isMobile ? "22px" : "3xl"} color="white" mb={4}>
              Cadastrar modelo
            </Heading>

            <Input
              placeholder="Nome do corte"
              size="lg"
              type="text"
              w="85%"
              bg="gray.900"
              mb={3}
            />
            <Input
              placeholder="Valor do corte ex: 59.90"
              size="lg"
              type="text"
              w="85%"
              bg="gray.900"
              mb={4}
            />

            <Button
              w="85%"
              size="lg"
              bg="button.cta"
              _hover={{ bg: "#FFb13e" }}
              color="gray.900"
              mb={6}
            >
              Cadastrar
            </Button>
          </Flex>
        </Flex>
      </Sidebar>
    </>
  );
}
