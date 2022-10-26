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
import { FiChevronLeft } from "react-icons/fi";
import { Sidebar } from "../../../components/sidebar";
import { canSSRAuth } from "../../../utils/canSSRAuth";
import { setupAPIClient } from "../../../services/api";
import { useState } from "react";
import Router from "next/router";

interface NewHaircutPropsSubscription {
  subscription: boolean;
  count: number;
}

export default function NewHaircut({
  subscription,
  count,
}: NewHaircutPropsSubscription) {
  const [isMobile] = useMediaQuery("(max-width: 500px)");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  async function handleRegister() {
    if (name === "" || price === "") {
      return;
    }

    try {
      const apiClient = setupAPIClient();
      await apiClient.post("/haircut", {
        name: name,
        price: Number(price),
      });
      Router.push("/haircuts");
    } catch (error) {
      console.log(error);
      alert("Erro ao cadastrar esse modelo.");
    }
  }

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
                background="barber.400"
                _hover={{ background: "gray.700" }}
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
              color="white"
              disabled={!subscription && count >= 3}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              placeholder="Valor do corte ex: 59.90"
              size="lg"
              type="text"
              w="85%"
              bg="gray.900"
              mb={4}
              color="white"
              disabled={!subscription && count >= 3}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            <Button
              w="85%"
              size="lg"
              bg="button.cta"
              _hover={{ bg: "#FFb13e" }}
              color="gray.900"
              mb={6}
              onClick={handleRegister}
              disabled={!subscription && count >= 3}
            >
              Cadastrar
            </Button>

            {!subscription && count >= 3 && (
              <Flex direction="row" align="center" justifyContent="center">
                <Text color="white">Você atingiu seu limite de cortes. </Text>
                <Link href="/plans">
                  <Text
                    ml={1}
                    fontWeight="bold"
                    color="#31fb6a"
                    cursor="pointer"
                  >
                    Seja premium
                  </Text>
                </Link>
              </Flex>
            )}
          </Flex>
        </Flex>
      </Sidebar>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  try {
    const apiClient = setupAPIClient(ctx);

    const response = await apiClient.get("/haircut/check");
    const count = await apiClient.get("/haircut/count");

    return {
      props: {
        subscriptions:
          response.data?.subscriptions?.status === "active" ? true : false,
        count: count.data,
      },
    };
  } catch (error) {
    console.log(error);

    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }
});
