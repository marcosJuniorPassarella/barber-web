import Head from "next/head";
import { Sidebar } from "../../components/sidebar/index";
import { Flex, Heading } from "@chakra-ui/react";

export default function EditHaircut() {
  return (
    <>
      <Head>
        <title>Editar modelo de corte - BarberPro</title>
      </Head>
      <Sidebar>
        <Flex>
          <Flex>
            <Heading>Editar corte</Heading>
          </Flex>
        </Flex>
      </Sidebar>
    </>
  );
}
