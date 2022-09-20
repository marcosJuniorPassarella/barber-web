import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Flex, Text, Center, Input, Button } from "@chakra-ui/react";
import logoImg from "../../../public/images/logo.svg";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    console.log(email)
    console.log(password)
  }

  return (
    <>
      <Head>
        <title>BarberPro - Faça login para acessar</title>
      </Head>
      <Flex
        background="barber.900"
        height="100vh"
        alignItems="center"
        justifyContent="center"
      >
        <Flex width="640" direction="column" p="14" rounded="8">
          <Center p="4">
            <Image
              src={logoImg}
              quality={100}
              width="300"
              objectFit="fill"
              alt="Logo BarberPro"
            ></Image>
          </Center>
          <Input
            background="barber.400"
            variant="filled"
            size="lg"
            placeholder="email@barber.com"
            type="email"
            mb={3}
            color="button.gray"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            background="barber.400"
            variant="filled"
            size="lg"
            placeholder="*******"
            type="text"
            mb={6}
            color="button.gray"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            background="button.cta"
            mb={6}
            color="gray.900"
            size="lg"
            _hover={{ bg: "#ffb13e" }}
            onClick={handleLogin}
          >
            Acessar
          </Button>

          <Center mt={2}>
            <Link href="/register">
              <Text color="button.gray" cursor="pointer">
                Ainda não possui conta? <strong>Cadastre-se</strong>
              </Text>
            </Link>
          </Center>
        </Flex>
      </Flex>
    </>
  );
}
