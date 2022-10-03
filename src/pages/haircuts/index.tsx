import Head from "next/head";
import Link from "next/link";
import {
  Flex,
  Heading,
  Button,
  Stack,
  Switch,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { IoMdPricetag } from "react-icons/io";
import { Sidebar } from "../../components/sidebar";
import { canSSRAuth } from "../../utils/canSSRAuth";
import { setupAPIClient } from "../../services/api";

interface HaircutsItem {
  id: string;
  name: string;
  price: number | string;
  status: boolean;
  user_id: string;
}

interface HaircutsProps {
  haircuts: HaircutsItem[];
}

export default function Haircuts({ haircuts }: HaircutsProps) {
  const [isMobile] = useMediaQuery("(max-width: 500px)");

  return (
    <>
      <Head>
        <title>Modelos de corte - Minha barbearia</title>
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
            justifyContent="center"
            mb={0}
          >
            <Heading
              fontSize={isMobile ? "28px" : "3xl"}
              mt={4}
              mb={4}
              mr={4}
              color="orange.900"
            >
              Modelos de corte
            </Heading>

            <Link href="/haircuts/new">
              <Button background="barber.400" color="white">
                Cadastrar novo
              </Button>
            </Link>

            <Stack ml="auto" align="center" direction="row">
              <Text fontWeight="bold" color="white">
                ATIVOS
              </Text>
              <Switch colorScheme="green" size="lg" />
            </Stack>
          </Flex>

          <Link href="/haircuts/123">
            <Flex
              cursor="pointer"
              w="100%"
              p={4}
              bg="barber.400"
              direction={isMobile ? "column" : "row"}
              align={isMobile ? "flex-start" : "center"}
              rounded="4"
              mb={2}
              justifyContent="space-between"
            >
              <Flex
                mb={isMobile ? 2 : 0}
                direction="row"
                alignItems="center"
                justifyContent="center"
              >
                <IoMdPricetag size={28} color="#fba931" />
                <Text ml={4} noOfLines={2} fontWeight="bold" color="white">
                  Corte completo
                </Text>
              </Flex>
              <Text fontWeight="bold" color="white">
                Preço R$ 59,90
              </Text>
            </Flex>
          </Link>
        </Flex>
      </Sidebar>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  try {
    const apiClient = setupAPIClient(ctx);
    const response = await apiClient.get("/haircuts", {
      params: {
        status: true,
      },
    });

    if (response.data === null) {
      return {
        redirect: {
          destination: "/dashboard",
          permanent: false,
        },
      };
    }

    return {
      props: {
        haircuts: response.data,
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
