import Head from "next/head";
import { Flex, Text } from "@chakra-ui/react";
import { canSSRAuth } from "../../utils/canSSRAuth";
import { Sidebar } from "../../components/sidebar";

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>BarberPro - Dashboard</title>
      </Head>
      <Sidebar>
        <Flex>
          <Text>Bem vindo ao dashboard!</Text>
        </Flex>
      </Sidebar>
    </>
  );
}

// ROTA PROTEGIDA COM A VALIDAÇÃO FEITA NO canSSRAuth
export const getServerSideProps = canSSRAuth(async (ctx) => {
  return {
    props: {},
  };
});
