import { useState, ChangeEvent } from "react";
import Head from "next/head";
import { Sidebar } from "../../components/sidebar";
import { Flex, Heading, Input, Select, Button } from "@chakra-ui/react";
import { canSSRAuth } from "../../utils/canSSRAuth";
import { setupAPIClient } from "../../services/api";
import { useRouter } from "next/router";

interface HaircutProps {
  id: string;
  name: string;
  price: string | number;
  status: boolean;
  user_id: string;
}

interface NewProps {
  haircuts: HaircutProps[];
}

export default function New({ haircuts }: NewProps) {
  const [customer, setCustomer] = useState("");
  const [haircutSelected, setHaircutSelected] = useState(haircuts[0]);
  const router = useRouter();

  function handleChancheSelect(id: string) {
    const haircutItem = haircuts.find((item) => item.id === id);
    setHaircutSelected(haircutItem);
  }

  async function handleRegister() {
    if (customer === "") {
      alert("Preencha o nome do cliente.");
      return;
    }

    try {
      const apiClient = setupAPIClient();
      apiClient.post("/schedule", {
        customer: customer,
        haircut_id: haircutSelected?.id,
      });

      router.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Head>
        <title>Barber Pro - Novo agendamento</title>
      </Head>

      <Sidebar>
        <Flex direction="column" align="flex-start" justify="flex-start">
          <Flex direction="row" w="100%" align="center" justify="flex-start">
            <Heading color="white" fontSize="3xl" mt={4} mr={4} mb={2}>
              Novo corte
            </Heading>
          </Flex>

          <Flex
            maxW="700px"
            pt={8}
            pb={8}
            width="100%"
            direction="column"
            align="center"
            justify="center"
            bg="barber.400"
          >
            <Input
              placeholder="Nome do cliente"
              w="85%"
              mb={3}
              size="lg"
              type="text"
              bg="barber.900"
              color="white"
              value={customer}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setCustomer(e.target.value)
              }
            />

            <Select
              color="white"
              bg="barber.900"
              mb={3}
              size="lg"
              w="85%"
              onChange={(e) => handleChancheSelect(e.target.value)}
            >
              {haircuts?.map((item) => (
                <option key={item?.id} value={item?.id}>
                  {item?.name}
                </option>
              ))}
            </Select>

            <Button
              w="85%"
              size="lg"
              color="gray.900"
              bg="button.cta"
              _hover={{ bg: "#FFb13e" }}
              onClick={handleRegister}
              disabled={!customer}
            >
              Cadastrar
            </Button>
          </Flex>
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
