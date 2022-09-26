import { ReactNode } from "react";
import Link from "next/link";
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  Drawer,
  DrawerContent,
  useColorModeValue,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
} from "@chakra-ui/react";
import { FiScissors, FiClipboard, FiSettings, FiMenu } from "react-icons/fi";
import { IconType } from "react-icons";

interface LinkItemProps {
  name: string;
  icon: IconType;
  route: string;
}

interface SideBarProps extends BoxProps {
  onClose: () => void;
}

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactNode;
  route: string;
}

interface MobileProps extends FlexProps {
  onOpen: () => void;
}

const LinkItems: Array<LinkItemProps> = [
  { name: "Agenda", icon: FiScissors, route: "/dashboard" },
  { name: "Cortes", icon: FiClipboard, route: "/haircuts" },
  { name: "Minha Conta", icon: FiSettings, route: "/profile" },
];

const NavItem = ({ icon, children, route, ...rest }: NavItemProps) => {
  return (
    <Link href={route} style={{ textDecoration: "none" }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "barber.900",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr={4}
            fontSize="16"
            as={icon}
            _groupHover={{
              color: "white",
            }}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

export function Sidebar({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg="barber.900">
      <SideBarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
        onClose={onClose}
      >
        <DrawerContent>
          <SideBarContent onClose={() => onClose()} />
        </DrawerContent>
      </Drawer>
      <MobileNav display={{ base: "flex", md: "none" }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p={4}>
        {children}
      </Box>
    </Box>
  );
}

const SideBarContent = ({ onClose, ...rest }) => {
  return (
    <Box
      bg="barber.400"
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.600", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" justifyContent="space-between" mx="8">
        <Link href="/dashboard">
          <Flex cursor="pointer" userSelect="none" flexDirection="row">
            <Text
              fontSize="2xl"
              color="button.gray"
              fontFamily="monospace"
              fontWeight="bold"
            >
              Barber
            </Text>
            <Text
              color="button.cta"
              fontSize="2xl"
              fontFamily="monospace"
              fontWeight="bold"
            >
              PRO
            </Text>
          </Flex>
        </Link>
        <CloseButton
          color="white"
          display={{ base: "flex", md: "none" }}
          onClick={onClose}
        />
      </Flex>

      {LinkItems.map((link) => (
        <NavItem
          color="button.gray"
          icon={link.icon}
          route={link.route}
          key={link.name}
        >
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("gray.600", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.700", "gray.700")}
      justifyContent="flex-start"
      {...rest}
    >
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      />
      <Flex flexDirection="row">
        <Text
          ml={8}
          fontSize="2xl"
          color="button.gray"
          fontFamily="monospace"
          fontWeight="bold"
        >
          Barber
        </Text>
        <Text
          color="button.cta"
          fontSize="2xl"
          fontFamily="monospace"
          fontWeight="bold"
        >
          PRO
        </Text>
      </Flex>
    </Flex>
  );
};
