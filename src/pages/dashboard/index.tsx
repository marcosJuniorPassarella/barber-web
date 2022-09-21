import Head from "next/head";
import { Flex, Text } from "@chakra-ui/react";
import { canSSRAuth } from "../../utils/canSSRAuth";

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>BarberPro - Dashboard</title>
      </Head>
      <Flex>
        <Text>Bem vindo ao dashboard!</Text>
      </Flex>
    </>
  );
}

// ROTA PROTEGIDA COM A VALIDAÇÃO FEITA NO canSSRAuth
export const getServerSideProps = canSSRAuth(async (ctx) => {
  return {
    props: {},
  };
});
