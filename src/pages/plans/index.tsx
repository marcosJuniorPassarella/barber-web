import Head from "next/head";
import { Button, Flex, Heading, Text, useMediaQuery } from "@chakra-ui/react";
import { Sidebar } from "../../components/sidebar";

export default function Plans() {
  const [isMobile] = useMediaQuery("(max-width: 500px)");

  return (
    <>
      <Head>
        <title>Barber Pro - Planos</title>
      </Head>
      <Sidebar>
        <Flex
          w="100%"
          direction="column"
          align="flex-start"
          justify="flex-start"
        >
          <Heading color="white" fontSize="3xl" mt={4} mb={4} mr={4}>
            Planos
          </Heading>
        </Flex>

        <Flex
          pb={8}
          maxW="780px"
          w="100%"
          direction="column"
          align="flex-start"
          justify="flex-start"
        >
          <Flex gap={4} w="100%" flexDirection={isMobile ? "column" : "row"}>
            <Flex
              rounded={4}
              p={2}
              flex={1}
              bg="barber.400"
              flexDirection="column"
            >
              <Heading
                textAlign="center"
                fontSize="2xl"
                mt={2}
                mb={3}
                color="white"
              >
                Plano Grátis
              </Heading>
              <Text color="white" fontWeight="medium" ml={4} mb={2}>
                Registrar cortes
              </Text>
              <Text color="white" fontWeight="medium" ml={4} mb={2}>
                Criar apenas 3 modelos de corte
              </Text>
              <Text color="white" fontWeight="medium" ml={4} mb={2}>
                Editar dados do perfil
              </Text>
            </Flex>
            <Flex
              rounded={4}
              p={2}
              flex={1}
              bg="barber.400"
              flexDirection="column"
            >
              <Heading
                textAlign="center"
                fontSize="2xl"
                mt={2}
                mb={3}
                color="#31fb6a"
              >
                Plano Premium
              </Heading>
              <Text color="white" fontWeight="medium" ml={4} mb={2}>
                Registrar cortes ilimitados
              </Text>
              <Text color="white" fontWeight="medium" ml={4} mb={2}>
                Criar modelos de corte ilimitados
              </Text>
              <Text color="white" fontWeight="medium" ml={4} mb={2}>
                Editar modelos de corte
              </Text>
              <Text color="white" fontWeight="medium" ml={4} mb={2}>
                Editar dados do perfil
              </Text>
              <Text color="white" fontWeight="medium" ml={4} mb={2}>
                Receber todas atualizações
              </Text>
              <Text color="#31fb6a" fontWeight="bold" ml={4} mb={2}>
                R$ 9,99
              </Text>

              <Button
                bg="button.cta"
                m={2}
                color="white"
                _hover={{ bg: "#FFb13e" }}
                onClick={() => {}}
              >
                Se tornar Premium
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Sidebar>
    </>
  );
}
