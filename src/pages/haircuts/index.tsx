import Head from "next/head";
import Link from "next/link";
import { Flex, Heading, Button, Stack, Switch, Text } from "@chakra-ui/react";
import { Sidebar } from "../../components/sidebar";

export default function Haircuts() {
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
            direction="row"
            w="100%"
            alignItems="center"
            justifyContent="center"
            mb={0}
          >
            <Heading fontSize="3xl" mt={4} mb={4} mr={4} color="orange.900">
              Modelos de corte
            </Heading>

            <Link href="/haircuts/new">
              <Button>Cadastrar novo</Button>
            </Link>

            <Stack ml="auto" align="center" direction="row">
              <Text fontWeight="bold" color="white">
                ATIVOS
              </Text>
              <Switch colorScheme="green" size="lg" />
            </Stack>
          </Flex>
        </Flex>
      </Sidebar>
    </>
  );
}
