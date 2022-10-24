import Head from "next/head";
import Link from "next/link";
import {
  Flex,
  Heading,
  Button,
  Link as ChakraLink,
  useMediaQuery,
  Text,
} from "@chakra-ui/react";
import { IoMdPerson } from "react-icons/io";
import { canSSRAuth } from "../../utils/canSSRAuth";
import { Sidebar } from "../../components/sidebar";
import { setupAPIClient } from "../../services/api";
import { useState } from "react";

export interface ScheduleItem {
  id: string;
  customer: string;
  haircut: {
    id: string;
    name: string;
    price: string | number;
    user_id: string;
  };
}

interface DashboardProps {
  schedule: ScheduleItem[];
}

export default function Dashboard({ schedule }: DashboardProps) {
  const [list, setList] = useState(schedule);
  const [isMobile] = useMediaQuery("(max-width: 500px)");

  return (
    <>
      <Head>
        <title>BarberPro - Dashboard</title>
      </Head>
      <Sidebar>
        <Flex direction="column" align="flex-start" justify="flex-start">
          <Flex
            width="100%"
            direction="row"
            align="center"
            justify="flex-start"
          >
            <Heading color="white" fontSize="3xl" mt={4} mb={4} mr={4}>
              Agenda
            </Heading>
            <Link href="/new">
              <Button background="barber.400" color="white">
                Registrar
              </Button>
            </Link>
          </Flex>

          {list.map((item) => (
            <ChakraLink
              key={item?.id}
              w="100%"
              m={0}
              p={0}
              mt={1}
              bg="transparent"
              style={{ textDecoration: "none" }}
            >
              <Flex
                w="100%"
                direction={isMobile ? "column" : "row"}
                p={4}
                rounded={4}
                mb={3}
                bg="barber.400"
                justify="space-between"
                align={isMobile ? "flex-start" : "center"}
              >
                <Flex
                  direction="row"
                  mb={isMobile ? 2 : 0}
                  align="center"
                  justify="center"
                >
                  <IoMdPerson size={28} color="orange" />
                  <Text fontWeight="bold" color="white" ml={4} noOfLines={1}>
                    {item?.customer}
                  </Text>
                </Flex>

                <Text color="white" mb={isMobile ? 2 : 0} fontWeight="bold">
                  {item?.haircut?.name}
                </Text>
                <Text color="white" mb={isMobile ? 2 : 0} fontWeight="bold">
                  R${item?.haircut?.price}
                </Text>
              </Flex>
            </ChakraLink>
          ))}
        </Flex>
      </Sidebar>
    </>
  );
}

// ROTA PROTEGIDA COM A VALIDAÇÃO FEITA NO canSSRAuth
export const getServerSideProps = canSSRAuth(async (ctx) => {
  try {
    const apiClient = setupAPIClient(ctx);
    const response = await apiClient.get("/schedule");

    return {
      props: {
        schedule: response.data,
      },
    };
  } catch (error) {
    console.log(error);

    return {
      props: {
        schedule: [],
      },
    };
  }
});
