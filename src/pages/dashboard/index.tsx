import Head from "next/head";
import Link from "next/link";
import {
  Flex,
  Heading,
  Button,
  Link as ChakraLink,
  useMediaQuery,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { IoMdPerson } from "react-icons/io";
import { canSSRAuth } from "../../utils/canSSRAuth";
import { Sidebar } from "../../components/sidebar";
import { setupAPIClient } from "../../services/api";
import { useState } from "react";
import { ModalInfo } from "../../components/modal/index";

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
  const [service, setService] = useState<ScheduleItem>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isMobile] = useMediaQuery("(max-width: 500px)");

  function handleOpenModal(item: ScheduleItem) {
    setService(item);
    onOpen();
  }

  async function handleFinish(id: string) {
    try {
      const apiClient = setupAPIClient();
      await apiClient.delete("/schedule", {
        params: {
          schedule_id: id,
        },
      });
      const filterItem = list.filter((item) => {
        return item?.id !== id;
      });
      setList(filterItem);
      onClose();
    } catch (error) {
      console.log(error);
      onClose();
      alert("Erro ao finalizar este serviço");
    }
  }

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
              <Button
                background="barber.400"
                _hover={{ background: "gray.700" }}
                color="white"
              >
                Registrar
              </Button>
            </Link>
          </Flex>

          {list.map((item) => (
            <ChakraLink
              onClick={() => handleOpenModal(item)}
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

      <ModalInfo
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        data={service}
        finishService={async () => handleFinish(service?.id)}
      />
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
